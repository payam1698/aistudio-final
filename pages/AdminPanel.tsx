
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useComments, Comment } from '../context/CommentContext';
import { Course, UserData, Instructor } from '../types';
import { api, Slide } from '../services/api';
import { BlogPost } from '../data/blogData';
import Button from '../components/Button';
import { 
  Trash2, Edit, Plus, Users, BookOpen, 
  MessageSquare, ClipboardList, UserCircle2, 
  FileText, Image as ImageIcon, Search, 
  UserPlus, Upload, ShieldCheck, ChevronRight, X
} from 'lucide-react';
import { toPersianDigits, formatPrice } from '../utils';
import { useNavigate, Link } from 'react-router-dom';

type AdminTab = 'comments' | 'courses' | 'users' | 'exams' | 'instructors' | 'blog' | 'slider';

const AdminPanel: React.FC = () => {
  const { user, getAllUsers, updateUser } = useAuth();
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const { getPendingComments, approveComment, deleteComment } = useComments();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AdminTab>('comments');
  const [usersList, setUsersList] = useState<UserData[]>([]);
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);
  const [articlesList, setArticlesList] = useState<BlogPost[]>([]);
  const [slidesList, setSlidesList] = useState<Slide[]>([]);
  
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [editingInstructor, setEditingInstructor] = useState<Partial<Instructor> | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<BlogPost> | null>(null);
  const [editingSlide, setEditingSlide] = useState<Partial<Slide> | null>(null);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: '', instructorName: '', price: 0, category: 'تخصصی روان‌درمانی', durationHours: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    refreshData();
  }, [user, navigate]);

  const refreshData = () => {
    setUsersList(api.auth.getAllUsers());
    setInstructorsList(api.instructors.getAll());
    setArticlesList(api.blog.getAll());
    setSlidesList(api.slides.getAll());
    loadPendingComments();
  };

  const loadPendingComments = async () => {
    const comments = await getPendingComments();
    setPendingComments(comments);
  };

  const handleInstructorSave = () => {
    if (!editingInstructor?.name) return;
    const payload = {
      ...editingInstructor,
      id: editingInstructor.id || 'inst-' + Date.now(),
      image: editingInstructor.image || 'https://ui-avatars.com/api/?name=Instructor&background=002147&color=fff',
      specialties: editingInstructor.specialties || [],
      description: editingInstructor.description || '',
      title: editingInstructor.title || '',
      status: 'active'
    } as Instructor;
    api.instructors.upsert(payload);
    setEditingInstructor(null);
    refreshData();
  };

  const handleArticleSave = () => {
    if (!editingArticle?.title) return;
    const payload = {
      ...editingArticle,
      id: editingArticle.id || 'art-' + Date.now(),
      date: editingArticle.date || new Date().toLocaleDateString('fa-IR'),
      image: editingArticle.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      category: editingArticle.category || 'عمومی'
    } as BlogPost;
    api.blog.upsert(payload);
    setEditingArticle(null);
    refreshData();
  };

  const handleSlideSave = () => {
    if (!editingSlide?.title) return;
    const payload = {
      ...editingSlide,
      id: editingSlide.id || 'slide-' + Date.now(),
      image: editingSlide.image || 'https://images.unsplash.com/photo-1617791160505-6f00504e3caf?auto=format&fit=crop&q=80&w=1600'
    } as Slide;
    api.slides.upsert(payload);
    setEditingSlide(null);
    refreshData();
  };

  const menuItems = [
    { id: 'comments', label: 'مدیریت نظرات', icon: MessageSquare, count: pendingComments.length },
    { id: 'courses', label: 'مدیریت دوره‌ها', icon: BookOpen, count: courses.length },
    { id: 'users', label: 'مدیریت کاربران', icon: Users, count: usersList.length },
    { id: 'exams', label: 'نتایج آزمون‌ها', icon: ClipboardList, count: 16 },
    { id: 'instructors', label: 'مدیریت اساتید', icon: UserCircle2, count: instructorsList.length },
    { id: 'blog', label: 'مدیریت مقالات', icon: FileText, count: articlesList.length },
    { id: 'slider', label: 'مدیریت اسلایدر', icon: ImageIcon, count: slidesList.length },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex font-sans text-right" dir="rtl">
      <aside className="w-72 bg-brand text-white shrink-0 hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-accent text-brand flex items-center justify-center rounded-2xl font-bold text-2xl">ر</div>
          <h1 className="font-extrabold text-lg">پنل مدیریت</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as AdminTab)} className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-accent text-brand font-bold shadow-lg' : 'text-white/70 hover:bg-white/5'}`}>
              <div className="flex items-center gap-4"><item.icon size={20} /> <span className="text-sm">{item.label}</span></div>
              {item.count !== null && <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">{toPersianDigits(item.count)}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-10 overflow-x-hidden">
        <div className="mb-10 flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900">{menuItems.find(m => m.id === activeTab)?.label}</h2>
            <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-500">{user?.fullNameFa} خوش آمدید</span>
                <div className="w-10 h-10 bg-brand/5 text-brand rounded-full flex items-center justify-center"><ShieldCheck size={24} /></div>
            </div>
        </div>

        <div className="animate-fade-in-up">
            {/* INSTRUCTORS */}
            {activeTab === 'instructors' && (
                <div className="space-y-10">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-200 p-10">
                        <h3 className="font-black text-xl text-gray-900 mb-8 flex items-center gap-2">{editingInstructor ? <Edit className="text-brand" /> : <UserPlus className="text-brand" />} {editingInstructor ? 'ویرایش استاد' : 'افزودن استاد جدید'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <input type="text" placeholder="نام استاد" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingInstructor?.name || ''} onChange={e => setEditingInstructor({...editingInstructor, name: e.target.value})} />
                                <input type="text" placeholder="عنوان علمی" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingInstructor?.title || ''} onChange={e => setEditingInstructor({...editingInstructor, title: e.target.value})} />
                                <textarea placeholder="خلاصه رزومه" rows={4} className="w-full p-4 bg-gray-50 border rounded-2xl outline-none resize-none" value={editingInstructor?.description || ''} onChange={e => setEditingInstructor({...editingInstructor, description: e.target.value})}></textarea>
                            </div>
                            <div className="space-y-5 text-center">
                                <input type="text" placeholder="URL تصویر استاد" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingInstructor?.image || ''} onChange={e => setEditingInstructor({...editingInstructor, image: e.target.value})} />
                                <div className="h-40 border-2 border-dashed rounded-3xl flex items-center justify-center bg-gray-50 overflow-hidden">
                                    {editingInstructor?.image ? <img src={editingInstructor.image} className="h-full w-full object-cover" /> : <Upload size={32} className="text-gray-300" />}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                            {editingInstructor && <Button variant="ghost" onClick={() => setEditingInstructor(null)}>انصراف</Button>}
                            <Button className="px-10 py-4" onClick={handleInstructorSave}>ذخیره اطلاعات استاد</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {instructorsList.map(inst => (
                            <div key={inst.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 group">
                                <img src={inst.image} className="w-16 h-16 rounded-2xl object-cover" />
                                <div className="flex-grow">
                                    <h4 className="font-bold text-gray-900 text-sm">{inst.name}</h4>
                                    <div className="mt-2 flex gap-2">
                                        <button onClick={() => setEditingInstructor(inst)} className="p-1.5 text-blue-500 bg-blue-50 rounded-lg"><Edit size={14}/></button>
                                        <button onClick={() => { if(window.confirm('استاد حذف شود؟')){ api.instructors.delete(inst.id); refreshData(); }}} className="p-1.5 text-red-500 bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* BLOG */}
            {activeTab === 'blog' && (
                <div className="space-y-10">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-200 p-10">
                        <h3 className="font-black text-xl text-gray-900 mb-8 flex items-center gap-2"><FileText className="text-brand" /> {editingArticle ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}</h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="عنوان مقاله" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingArticle?.title || ''} onChange={e => setEditingArticle({...editingArticle, title: e.target.value})} />
                                <input type="text" placeholder="نام نویسنده" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingArticle?.author || ''} onChange={e => setEditingArticle({...editingArticle, author: e.target.value})} />
                            </div>
                            <input type="text" placeholder="URL تصویر اصلی مقاله" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingArticle?.image || ''} onChange={e => setEditingArticle({...editingArticle, image: e.target.value})} />
                            <textarea placeholder="خلاصه مقاله (Excerpt)" rows={2} className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingArticle?.excerpt || ''} onChange={e => setEditingArticle({...editingArticle, excerpt: e.target.value})}></textarea>
                            <textarea placeholder="متن کامل مقاله (HTML مجاز است)" rows={10} className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingArticle?.content || ''} onChange={e => setEditingArticle({...editingArticle, content: e.target.value})}></textarea>
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                            {editingArticle && <Button variant="ghost" onClick={() => setEditingArticle(null)}>انصراف</Button>}
                            <Button className="px-10 py-4" onClick={handleArticleSave}>انتشار / به‌روزرسانی مقاله</Button>
                        </div>
                    </div>
                    <div className="bg-white rounded-[2rem] border overflow-hidden">
                        <div className="divide-y">
                            {articlesList.map(post => (
                                <div key={post.id} className="p-5 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <img src={post.image} className="w-20 h-14 rounded-xl object-cover shadow-sm" />
                                        <div><h4 className="font-bold text-gray-900 text-sm">{post.title}</h4><p className="text-[10px] text-gray-400">{post.author} | {post.date}</p></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingArticle(post)} className="p-2 text-blue-500 bg-blue-50 rounded-lg"><Edit size={16}/></button>
                                        <button onClick={() => { if(window.confirm('مقاله حذف شود؟')){ api.blog.delete(post.id); refreshData(); }}} className="p-2 text-red-500 bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* SLIDER */}
            {activeTab === 'slider' && (
                <div className="space-y-10">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-200 p-10">
                        <h3 className="font-black text-xl text-gray-900 mb-8 flex items-center gap-2"><ImageIcon className="text-brand" /> مدیریت اسلایدها</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="عنوان اسلاید" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingSlide?.title || ''} onChange={e => setEditingSlide({...editingSlide, title: e.target.value})} />
                            <input type="text" placeholder="URL تصویر اسلاید" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingSlide?.image || ''} onChange={e => setEditingSlide({...editingSlide, image: e.target.value})} />
                            <textarea placeholder="توضیحات اسلاید" className="md:col-span-2 w-full p-4 bg-gray-50 border rounded-2xl outline-none" value={editingSlide?.description || ''} onChange={e => setEditingSlide({...editingSlide, description: e.target.value})}></textarea>
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                            {editingSlide && <Button variant="ghost" onClick={() => setEditingSlide(null)}>انصراف</Button>}
                            <Button className="px-10 py-4" onClick={handleSlideSave}>ذخیره اسلاید</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {slidesList.map(slide => (
                            <div key={slide.id} className="relative bg-white rounded-3xl overflow-hidden border shadow-sm group">
                                <img src={slide.image} className="w-full h-48 object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button onClick={() => setEditingSlide(slide)} className="p-3 bg-white rounded-full text-blue-600 shadow-xl"><Edit size={24}/></button>
                                    <button onClick={() => { if(window.confirm('اسلاید حذف شود؟')){ api.slides.delete(slide.id); refreshData(); }}} className="p-3 bg-white rounded-full text-red-600 shadow-xl"><Trash2 size={24}/></button>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-gray-900">{slide.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{slide.description}</p>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => setEditingSlide({})} className="border-2 border-dashed rounded-3xl p-12 text-gray-300 flex flex-col items-center hover:text-brand hover:border-brand transition-all">
                            <Plus size={48} /> <span className="mt-2 font-bold">افزودن اسلاید جدید</span>
                        </button>
                    </div>
                </div>
            )}

            {/* USERS & OTHERS */}
            {['comments', 'courses', 'users', 'exams'].includes(activeTab) && (
                <div className="bg-white rounded-[2.5rem] p-20 text-center text-gray-300">
                    <ClipboardList size={64} className="mx-auto mb-4 opacity-10" />
                    <p>بخش {menuItems.find(m => m.id === activeTab)?.label} در حال حاضر فعال است.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
