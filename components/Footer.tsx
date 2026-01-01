
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Instagram, Send, MessageCircle } from 'lucide-react';
import { toPersianDigits } from '../utils';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand text-white flex items-center justify-center text-xl font-bold rounded-lg">
                ر
              </div>
              <span className="text-xl font-bold text-white tracking-tight">روانـــکارگاه</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              مرکز تخصصی آموزش روانشناسی و روان‌درمانی با بیش از {toPersianDigits(10)} سال تجربه در تربیت متخصصان حرفه‌ای در حوزه سلامت روان.
            </p>
            <div className="flex flex-col gap-2 text-sm">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent"></span>{toPersianDigits(15)}+ دوره تخصصی</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent"></span>{toPersianDigits(10000)}+ دانشجو</span>
            </div>
            
            {/* Social Icons - Added to Footer */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-800">
                <a href="https://instagram.com/ravankargah" className="text-[#E1306C] hover:opacity-80 transition-opacity bg-white/5 p-2 rounded-lg" title="اینستاگرام">
                    <Instagram size={20} />
                </a>
                <a href="https://t.me/ravankargah" className="text-[#0088cc] hover:opacity-80 transition-opacity bg-white/5 p-2 rounded-lg" title="تلگرام">
                    <Send size={20} />
                </a>
                <a href="https://wa.me/989354684499" className="text-[#25D366] hover:opacity-80 transition-opacity bg-white/5 p-2 rounded-lg" title="واتساپ">
                    <MessageCircle size={20} />
                </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              {['صفحه اصلی', 'دوره‌ها', 'اساتید', 'درباره ما', 'تماس با ما', 'نمودار سیستم'].map((item, idx) => (
                <li key={idx}>
                  <Link to="/" className="text-sm hover:text-brand transition-colors flex items-center gap-2">
                    <span className="text-brand opacity-50">&lsaquo;</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">دسته‌بندی دوره‌ها</h3>
             <ul className="space-y-2">
              {['تخصصی روان‌درمانی', 'روانشناسی کودک و نوجوان', 'مشاوره و کوچینگ', 'سکس‌تراپی و اعتیاد', 'مشاوره تحصیلی و شغلی', 'تخصصی پیشرفته'].map((item, idx) => (
                <li key={idx}>
                  <Link to="/courses" className="text-sm hover:text-brand transition-colors flex items-center gap-2">
                    <span className="text-brand opacity-50">&lsaquo;</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">تماس با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand shrink-0 mt-1" />
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">تلفن تماس</span>
                    <span dir="ltr" className="text-right text-white font-mono text-lg">{toPersianDigits('09354684499')}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand shrink-0 mt-1" />
                <div className="flex flex-col">
                     <span className="text-xs text-gray-500">ایمیل</span>
                     <span className="text-sm hover:text-white transition-colors">info@ravankargah.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand shrink-0 mt-1" />
                 <div className="flex flex-col">
                     <span className="text-xs text-gray-500">ساعات پاسخگویی</span>
                     <span className="text-sm text-gray-400">شنبه تا پنجشنبه: {toPersianDigits(14)} تا {toPersianDigits(21)}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-500">
                تمامی حقوق مادی و معنوی این وب‌سایت متعلق به موسسه روانکارگاه می‌باشد.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
