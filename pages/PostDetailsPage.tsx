
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Button from '../components/Button';
import CommentsSection from '../components/CommentsSection';

const PostDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">مقاله مورد نظر یافت نشد</h2>
          <Link to="/blog">
            <Button>بازگشت به وبلاگ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
            <Link to="/" className="hover:text-brand transition-colors">خانه</Link>
            <span className="text-gray-300">/</span>
            <Link to="/blog" className="hover:text-brand transition-colors">وبلاگ</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-medium truncate max-w-[200px]">{post.title}</span>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Article Container */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10">
            
            {/* Image */}
            <div className="h-64 md:h-96 w-full relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 right-6 text-white z-10">
                    <span className="bg-accent text-white px-3 py-1 rounded-md text-xs font-bold mb-2 inline-block">
                        {post.category}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight shadow-black drop-shadow-lg">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Meta */}
            <div className="px-6 md:px-10 py-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <User size={18} className="text-brand" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar size={18} className="text-brand" />
                        <span>{post.date}</span>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-brand transition-colors">
                    <Share2 size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 text-gray-800 leading-9 text-lg text-justify blog-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Author Box */}
            <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {post.author[0]}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-1">درباره نویسنده</h4>
                    <p className="text-sm text-gray-600">
                        {post.author} از اساتید و نویسندگان بخش علمی آکادمی روانکارگاه.
                    </p>
                </div>
            </div>

        </article>

        {/* Comments Section */}
        <CommentsSection contentId={post.id} type="blog" />

      </div>
    </div>
  );
};

export default PostDetailsPage;
