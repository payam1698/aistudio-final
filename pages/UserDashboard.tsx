
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { toPersianDigits } from '../utils';
import { 
  User, BookOpen, FileText, ShieldCheck, 
  ChevronLeft, Award, Clock, ArrowLeft, LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const sections = [
    { id: 'courses', label: 'دوره‌های من', icon: BookOpen, count: 0 },
    { id: 'mcmi', label: 'آزمون میلون ۲', icon: FileText, count: user.mcmiStatus === 'approved' ? 1 : 0 },
    { id: 'certs', label: 'گواهینامه‌ها', icon: Award, count: 0 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center text-brand border-2 border-white shadow-lg">
                    <User size={40} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.fullNameFa}</h1>
                    <p className="text-gray-500 text-sm mt-1">خوش آمدید | {toPersianDigits(user.mobile)}</p>
                </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none text-red-500 border-red-100 hover:bg-red-50" onClick={logout}>
                    <LogOut size={18} className="ml-2" /> خروج
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <ShieldCheck className="text-green-500" /> وضعیت آموزشی
                    </h3>
                    <div className="space-y-4">
                        {sections.map(sec => (
                            <div key={sec.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                                        <sec.icon size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{sec.label}</span>
                                </div>
                                <span className="bg-brand text-white px-3 py-0.5 rounded-full text-xs font-bold font-mono">
                                    {toPersianDigits(sec.count)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-brand rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-2">اطلاعات پروفایل</h3>
                        <div className="space-y-3 text-sm opacity-90 font-light">
                            <p>سن: {toPersianDigits(user.age)} سال</p>
                            <p>تحصیلات: {user.education}</p>
                            <p>وضعیت تأهل: {user.maritalStatus}</p>
                        </div>
                    </div>
                    <div className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform duration-500">
                        <User size={120} />
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* MCMI-II Report Card */}
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="text-brand" /> نتایج آزمون میلون ۲
                        </h2>
                    </div>

                    {user.mcmiStatus === 'approved' ? (
                        <div className="bg-green-50 rounded-3xl p-6 border border-green-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">گزارش MCMI-II</h4>
                                    <p className="text-xs text-gray-500 mt-1">نسخه تحلیلی میلون ۲ آماده مشاهده است.</p>
                                </div>
                            </div>
                            <Link to="/mcmi">
                                <Button className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 gap-2">
                                    مشاهده گزارش کامل <ChevronLeft size={18} />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                            <h4 className="font-bold text-gray-700 mb-2">آزمون MCMI-II ثبت نشده است</h4>
                            <p className="text-sm text-gray-400 mb-6">برای دریافت پروفایل بالینی بر اساس نسخه میلون ۲، آزمون را شروع کنید.</p>
                            <Link to="/mcmi">
                                <Button size="sm" variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
                                    شروع آزمون میلون ۲
                                </Button>
                            </Link>
                        </div>
                    )}
                </section>

                {/* Courses Section */}
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <BookOpen className="text-brand" /> دوره‌های ثبت‌نام شده
                        </h2>
                    </div>
                    <div className="text-center py-12">
                        <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 text-sm">شما هنوز در دوره‌ای ثبت‌نام نکرده‌اید.</p>
                        <Link to="/courses" className="mt-4 inline-block text-brand font-bold text-sm hover:underline">
                            لیست دوره‌ها
                        </Link>
                    </div>
                </section>

            </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
