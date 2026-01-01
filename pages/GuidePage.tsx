
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, Monitor, Smartphone, Apple, 
  Keyboard, CheckCircle2, Globe, MessageCircle, 
  Video, DollarSign, Command 
} from 'lucide-react';
import Button from '../components/Button';
import { toPersianDigits } from '../utils';

const GuidePage: React.FC = () => {
  // Breadcrumbs Component
  const Breadcrumbs = () => (
    <div className="bg-white border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
          <Link to="/" className="hover:text-brand transition-colors">خانه</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">راهنمایی و دانلود</span>
        </div>
      </div>
    </div>
  );

  const steps = [
    {
      id: 1,
      title: 'دریافت اطلاعات ورود',
      desc: 'دریافت لینک کلاس و نام کاربری و رمز عبور از طریق پیامک یا واتساپ پس از نهایی شدن ثبت‌نام.'
    },
    {
      id: 2,
      title: 'اجرای نرم‌افزار',
      desc: 'باز کردن لینک کلاس در مرورگر یا اپلیکیشن Adobe Connect نصب شده روی دستگاه.'
    },
    {
      id: 3,
      title: 'ورود اطلاعات',
      desc: 'وارد کردن نام کاربری و رمز عبور در کادرهای مربوطه (انتخاب گزینه Registered User).'
    },
    {
      id: 4,
      title: 'ورود به کلاس',
      desc: 'کلیک بر روی دکمه ورود (Enter Room) و صبر برای تایید ورود توسط مدرس یا سیستم.'
    }
  ];

  const downloads = [
    {
      os: 'نسخه ویندوز',
      icon: Monitor,
      link: 'https://www.adobe.com/go/ConnectShell11', // Official Link
      desc: 'قابل نصب روی ویندوز 10 و 11',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      os: 'نسخه اندروید',
      icon: Smartphone,
      link: 'https://play.google.com/store/apps/details?id=air.com.adobe.connectpro', // Google Play
      desc: 'دانلود مستقیم از گوگل پلی',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      os: 'نسخه iOS',
      icon: Apple,
      link: 'https://apps.apple.com/us/app/adobe-connect/id430437503', // App Store
      desc: 'دانلود از اپ استور (آیفون/آیپد)',
      color: 'text-gray-800',
      bg: 'bg-gray-100'
    },
    {
      os: 'نسخه مک (Mac)',
      icon: Command,
      link: 'https://www.adobe.com/go/ConnectMac11', // Official Link
      desc: 'مخصوص سیستم عامل macOS',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const benefits = [
    {
      title: 'ضبط کلاس‌ها',
      desc: 'امکان مشاهده مجدد فیلم کلاس‌ها برای مرور مطالب در هر زمان.',
      icon: Video
    },
    {
      title: 'بدون محدودیت جغرافیایی',
      desc: 'شرکت در کلاس‌ها از هر کجای ایران و جهان بدون نیاز به سفر.',
      icon: Globe
    },
    {
      title: 'تعامل دوطرفه',
      desc: 'امکان صحبت صوتی، چت متنی و اشتراک فایل با استاد و سایر دانشجویان.',
      icon: MessageCircle
    },
    {
      title: 'هزینه مناسب‌تر',
      desc: 'حذف هزینه‌های رفت و آمد و اقامت و صرفه‌جویی در زمان.',
      icon: DollarSign
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            راهنمای کامل استفاده از پلتفرم Adobe Connect
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            برای تجربه بهتر در کلاس‌های آنلاین، لطفاً نرم‌افزار متناسب با دستگاه خود را دانلود کرده و طبق راهنما وارد شوید.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">مراحل ورود به کلاس</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-shadow">
                <div className="absolute -top-4 right-6 w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
                  {toPersianDigits(step.id)}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mt-4 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-7">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
             <h2 className="text-2xl font-bold text-gray-900 mb-2">دانلود نرم‌افزار</h2>
             <p className="text-gray-500">نرم افزار ادوبی کانکت را با لینک مستقیم دانلود کنید</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloads.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center hover:border-brand/30 transition-all">
                <div className={`w-16 h-16 mx-auto ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.os}</h3>
                <p className="text-xs text-gray-400 mb-6">{item.desc}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full gap-2 group">
                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    دانلود
                  </Button>
                </a>
              </div>
            ))}
          </div>

          {/* Persian Keyboard Special Card */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-brand/5 border border-brand/20 p-6 rounded-3xl flex items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white text-brand rounded-xl flex items-center justify-center shadow-sm">
                      <Keyboard size={24} />
                  </div>
                  <div className="text-right">
                      <h3 className="font-bold text-gray-900 text-sm">کیبورد فارسی</h3>
                      <p className="text-xs text-gray-500">مخصوص چت در کلاس (رفع مشکل ی)</p>
                  </div>
               </div>
               <a href="#" className="shrink-0">
                   <Button size="sm">دانلود فایل</Button>
               </a>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
           <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">مزایای کلاس آنلاین</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                  <div key={idx} className="text-center">
                      <div className="w-14 h-14 bg-gray-50 text-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                          <benefit.icon size={24} />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-500 leading-6">{benefit.desc}</p>
                  </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default GuidePage;
