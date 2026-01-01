
import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, Instagram, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import { toPersianDigits } from '../utils';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send email/message would go here
    alert('پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.');
    setFormData({ name: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#002147] text-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h1 className="text-3xl md:text-4xl font-bold mb-4">تماس با روانکارگاه</h1>
             <p className="text-brand-light text-lg">ما همیشه آماده پاسخگویی به سوالات شما هستیم</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Info Card */}
                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col h-full">
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#F4C700] rounded-full block"></span>
                            راه‌های ارتباطی
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs mb-1">تلفن تماس</span>
                                    <span className="text-gray-900 font-bold text-lg font-mono" dir="ltr">0935 468 4499</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs mb-1">پست الکترونیک</span>
                                    <span className="text-gray-900 font-bold font-mono">info@ravankargah.com</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs mb-1">ساعات کاری</span>
                                    <p className="text-gray-800 text-sm">شنبه تا پنجشنبه: {toPersianDigits(14)} تا {toPersianDigits(21)}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Socials Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4 text-center">ما را دنبال کنید</h4>
                        <div className="flex flex-col gap-3">
                            <a 
                                href="https://instagram.com/ravankargah" 
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white py-3 rounded-xl transition-opacity font-bold shadow-md shadow-pink-100"
                            >
                                <Instagram size={20} /> اینستاگرام
                            </a>
                            <a 
                                href="https://t.me/ravankargah" 
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white py-3 rounded-xl transition-colors font-bold shadow-md shadow-blue-100"
                            >
                                <Send size={20} /> کانال تلگرام
                            </a>
                            <a 
                                href="https://wa.me/989354684499" 
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl transition-colors font-bold shadow-md shadow-green-100"
                            >
                                <MessageCircle size={20} /> واتساپ
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Only (Map Removed) */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 h-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">ارسال پیام مستقیم</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
                                placeholder="مثال: علی محمدی"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                            <input 
                                type="tel" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
                                placeholder="0912..."
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">موضوع پیام</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">متن پیام</label>
                            <textarea 
                                rows={8}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
                                placeholder="پیام خود را بنویسید..."
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                required
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 text-left">
                            <Button type="submit" size="lg" className="px-8 shadow-lg shadow-brand/20 w-full md:w-auto">ارسال پیام</Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
