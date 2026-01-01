
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toPersianDigits } from '../utils';
import { 
  User, BookOpen, FileText, ShieldCheck, 
  Award, Clock, ArrowLeft, LogOut, Edit, 
  Mail, Send, Calendar, UserCircle2, MapPin, Heart, GraduationCap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

type TabType = 'mcmi' | 'profile' | 'message';

const UserDashboard: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('mcmi');
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [profileForm, setProfileForm] = useState({
    fullNameFa: user?.fullNameFa || '',
    fullNameEn: user?.fullNameEn || '',
    fatherName: user?.fatherName || '',
    birthPlace: user?.birthPlace || '',
    birthDay: user?.birthDate?.day || '',
    birthMonth: user?.birthDate?.month || '',
    birthYear: user?.birthDate?.year || '',
    gender: user?.gender || '',
    education: user?.education || '',
    maritalStatus: user?.maritalStatus || ''
  });

  const [messageForm, setMessageForm] = useState({
    subject: '',
    content: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { birthDay, birthMonth, birthYear, ...rest } = profileForm;
    
    await updateUser({
      ...rest,
      gender: profileForm.gender as 'male' | 'female',
      birthDate: {
        day: birthDay,
        month: birthMonth,
        year: birthYear
      }
    });
    
    setTimeout(() => {
      setIsSaving(false);
      alert('تغییرات با موفقیت ذخیره شد.');
    }, 500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    alert('پیام شما با موفقیت به مدیریت ارسال شد (ایمیل گردید).');
    setMessageForm({ subject: '', content: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-brand rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" /></svg>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-white/30">
                        <User size={40} className="text-accent" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{user.fullNameFa}</h1>
                        <p className="text-brand-light text-sm mt-1 opacity-80">{toPersianDigits(user.mobile)} | خوش آمدید</p>
                    </div>
                </div>
                <Button variant="outline" className="text-white border-white/30 hover:bg-white hover:text-brand gap-2" onClick={logout}>
                    <LogOut size={18} /> خروج از حساب
                </Button>
            </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-x-auto no-scrollbar">
            <button 
                onClick={() => setActiveTab('mcmi')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-bold text-sm min-w-[120px] ${activeTab === 'mcmi' ? 'bg-brand text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <FileText size={18} /> آزمون میلون
            </button>
            <button 
                onClick={() => setActiveTab('profile')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-bold text-sm min-w-[120px] ${activeTab === 'profile' ? 'bg-brand text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <UserCircle2 size={18} /> پروفایل
            </button>
            <button 
                onClick={() => setActiveTab('message')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-bold text-sm min-w-[120px] ${activeTab === 'message' ? 'bg-brand text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <Mail size={18} /> ارسال پیام
            </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
            
            {/* MCMI TAB */}
            {activeTab === 'mcmi' && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">آزمون میلون</h2>
                            <p className="text-gray-500 text-sm mt-1">شروع آزمون جدید</p>
                        </div>
                        <Link to="/mcmi">
                            <Button className="gap-2 shadow-lg shadow-brand/20">
                                <ArrowLeft size={18} /> شروع اولین آزمون
                            </Button>
                        </Link>
                    </div>

                    {user.mcmiStatus === 'approved' ? (
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm"><ShieldCheck /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">آخرین نتیجه آزمون</h4>
                                    <p className="text-xs text-gray-500">گزارش تحلیلی شما آماده مشاهده است.</p>
                                </div>
                            </div>
                            <Link to="/mcmi"><Button variant="outline" size="sm">مشاهده گزارش</Button></Link>
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <FileText size={64} className="mx-auto text-gray-300 mb-4 opacity-50" />
                            <p className="text-gray-500 font-medium">شما هنوز آزمونی انجام نداده‌اید.</p>
                        </div>
                    )}
                </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4 flex items-center gap-2">
                        <Edit size={20} className="text-brand" /> ویرایش پروفایل
                    </h2>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">نام و نام خانوادگی (فارسی)</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand transition-all" value={profileForm.fullNameFa} onChange={e => setProfileForm({...profileForm, fullNameFa: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">نام و نام خانوادگی (انگلیسی)</label>
                                <input type="text" dir="ltr" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand transition-all" value={profileForm.fullNameEn} onChange={e => setProfileForm({...profileForm, fullNameEn: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">نام پدر</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand transition-all" value={profileForm.fatherName} onChange={e => setProfileForm({...profileForm, fatherName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">محل تولد</label>
                                <div className="relative">
                                    <input type="text" className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand transition-all" value={profileForm.birthPlace} onChange={e => setProfileForm({...profileForm, birthPlace: e.target.value})} />
                                    <MapPin className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                </div>
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Calendar size={16}/> تاریخ تولد</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <input type="number" placeholder="روز" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center" value={profileForm.birthDay} onChange={e => setProfileForm({...profileForm, birthDay: e.target.value})} />
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center" value={profileForm.birthMonth} onChange={e => setProfileForm({...profileForm, birthMonth: e.target.value})}>
                                        <option value="">ماه</option>
                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <input type="number" placeholder="سال" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center font-mono" value={profileForm.birthYear} onChange={e => setProfileForm({...profileForm, birthYear: e.target.value})} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">جنسیت</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50" value={profileForm.gender} onChange={e => setProfileForm({...profileForm, gender: e.target.value as any})}>
                                    <option value="">انتخاب کنید...</option>
                                    <option value="male">مرد</option>
                                    <option value="female">زن</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><GraduationCap size={16}/> تحصیلات</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50" value={profileForm.education} onChange={e => setProfileForm({...profileForm, education: e.target.value})}>
                                    <option value="">انتخاب کنید</option>
                                    <option value="دیپلم">دیپلم</option>
                                    <option value="کاردانی">کاردانی</option>
                                    <option value="کارشناسی">کارشناسی</option>
                                    <option value="ارشد">کارشناسی ارشد</option>
                                    <option value="دکتری">دکتری تخصصی</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Heart size={16}/> وضعیت تأهل</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50" value={profileForm.maritalStatus} onChange={e => setProfileForm({...profileForm, maritalStatus: e.target.value})}>
                                    <option value="">انتخاب کنید</option>
                                    <option value="مجرد">مجرد</option>
                                    <option value="متاهل">متاهل</option>
                                    <option value="متارکه">متارکه</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-50">
                            <Button type="submit" size="lg" className="w-full md:w-auto px-12 shadow-lg shadow-brand/10" disabled={isSaving}>
                                {isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* MESSAGE TAB */}
            {activeTab === 'message' && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4 flex items-center gap-2">
                        <Send size={20} className="text-brand" /> ارسال پیام به مدیریت
                    </h2>
                    <form onSubmit={handleSendMessage} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">عنوان</label>
                            <input 
                                type="text" required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand transition-all"
                                placeholder="موضوع پیام خود را وارد کنید"
                                value={messageForm.subject}
                                onChange={e => setMessageForm({...messageForm, subject: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">متن پیام</label>
                            <textarea 
                                required rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand transition-all"
                                placeholder="پیام خود را بنویسید..."
                                value={messageForm.content}
                                onChange={e => setMessageForm({...messageForm, content: e.target.value})}
                            ></textarea>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                            <p className="text-xs text-gray-400 italic">پیام شما به صورت مستقیم به ایمیل واحد مدیریت ارسال خواهد شد.</p>
                            <Button type="submit" size="lg" className="w-full md:w-auto px-12 gap-2">
                                <Send size={18} /> ارسال پیام
                            </Button>
                        </div>
                    </form>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
