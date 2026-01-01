
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComments, Comment } from '../context/CommentContext';
import Button from './Button';
import { Star, User, MessageSquare, Send, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toPersianDigits } from '../utils';

interface CommentsSectionProps {
  contentId: string;
  type: 'course' | 'blog';
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ contentId, type }) => {
  const { user, isAuthenticated } = useAuth();
  const { addComment, getCommentsByContentId } = useComments();
  
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  /* Fix: Introduced local state to store approved comments fetched asynchronously from context */
  const [approvedComments, setApprovedComments] = useState<Comment[]>([]);

  /* Fix: Use useEffect to fetch comments asynchronously when component mounts or contentId changes */
  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getCommentsByContentId(contentId);
      setApprovedComments(comments);
    };
    fetchComments();
  }, [contentId, getCommentsByContentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await addComment({
      userId: user.mobile,
      userName: user.fullNameFa,
      contentId,
      contentType: type,
      text: commentText,
      rating: type === 'course' ? rating : undefined
    });

    setCommentText('');
    setSubmitted(true);
    // Refresh comments after submission (it will be pending so it might not show up immediately depending on requirements)
    const comments = await getCommentsByContentId(contentId);
    setApprovedComments(comments);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mt-10">
      <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-100">
        <MessageSquare className="text-brand" size={24} />
        <h2 className="text-xl font-bold text-gray-900">نظرات و پرسش‌ها ({toPersianDigits(approvedComments.length)})</h2>
      </div>

      {/* List */}
      <div className="space-y-6 mb-10">
        {approvedComments.length > 0 ? (
          approvedComments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-400">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">{comment.userName}</span>
                    <span className="block text-xs text-gray-400">{comment.createdAt}</span>
                  </div>
                </div>
                {comment.rating && (
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={14} 
                        className={star <= comment.rating! ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-700 text-sm leading-7">{comment.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            هنوز نظری ثبت نشده است. اولین نفر باشید!
          </div>
        )}
      </div>

      {/* Form */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">ارسال نظر جدید</h3>
        
        {submitted ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 text-center">
            <span className="font-bold block mb-1">نظر شما با موفقیت ثبت شد</span>
            <span className="text-sm">پس از تأیید مدیریت در سایت نمایش داده خواهد شد.</span>
            <button onClick={() => setSubmitted(false)} className="mt-3 text-xs text-green-800 underline">ارسال نظر دیگر</button>
          </div>
        ) : isAuthenticated ? (
          <form onSubmit={handleSubmit} className="space-y-4">
             {type === 'course' && (
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">امتیاز شما</label>
                   <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            size={24} 
                            className={star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                          />
                        </button>
                      ))}
                   </div>
                </div>
             )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">متن نظر</label>
              <textarea
                required
                rows={4}
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
                placeholder="دیدگاه خود را بنویسید..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="gap-2">
                <Send size={18} />
                ارسال نظر
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-blue-50 text-blue-800 p-6 rounded-2xl border border-blue-100 text-center flex flex-col items-center gap-3">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 mb-1">
                <Lock size={24} />
             </div>
             <p className="font-bold">برای ثبت نظر باید وارد حساب کاربری خود شوید</p>
             <Link to="/login">
               <Button size="sm" variant="primary">ورود / ثبت‌نام</Button>
             </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
