
import React, { useState } from 'react';
import { Target, Eye, Heart, Shield, Users, Award, History } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#002147] text-white py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F4C700]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">درباره آکادمی روانکارگاه</h1>
          <p className="text-lg md:text-xl text-brand-light max-w-3xl mx-auto leading-relaxed">
            پیشرو در ارائه آموزش‌های تخصصی روانشناسی و تربیت درمانگر با استانداردهای جهانی
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 left-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={150} className="text-[#002147]" />
            </div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-[#002147]/10 rounded-2xl flex items-center justify-center text-[#002147] mb-6 group-hover:scale-110 transition-transform">
                    <Target size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">مأموریت ما</h2>
                <p className="text-gray-600 leading-8 text-justify">
                  مأموریت آکادمی روانکارگاه، پر کردن شکاف میان دانش نظری دانشگاهی و مهارت‌های عملی مورد نیاز در اتاق درمان است. ما متعهد هستیم با بهره‌گیری از اساتید برجسته و متدهای نوین آموزشی، نسلی از درمانگران متخصص، اخلاق‌مدار و توانمند را برای ارتقای سلامت روان جامعه تربیت کنیم.
                </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
             <div className="absolute top-0 left-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Eye size={150} className="text-[#F4C700]" />
            </div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-[#F4C700]/10 rounded-2xl flex items-center justify-center text-[#F4C700] mb-6 group-hover:scale-110 transition-transform">
                    <Eye size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">چشم‌انداز ما</h2>
                <p className="text-gray-600 leading-8 text-justify">
                  تبدیل شدن به معتبرترین مرجع تخصصی آموزش روان‌درمانی در کشور و ایجاد بستری جامع که در آن هر دانشجوی روانشناسی و مشاوره، مسیر رشد حرفه‌ای خود را با اطمینان و کیفیت طی کند. ما به آینده‌ای می‌نگریم که در آن دسترسی به آموزش‌های حرفه‌ای روانشناسی برای همه تسهیل شده باشد.
                </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">ارزش‌های بنیادین</h2>
                <div className="w-20 h-1 bg-[#002147] mx-auto rounded-full mb-4"></div>
                <p className="text-gray-500">اصولی که به آن‌ها پایبندیم</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'تعهد به کیفیت', desc: 'ارائه محتوای علمی دقیق و به‌روز', icon: Award, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { title: 'احترام به دانشجو', desc: 'پشتیبانی مستمر و پاسخگویی', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
                    { title: 'اعتبار علمی', desc: 'همکاری با اساتید و دانشگاه‌های معتبر', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { title: 'مسئولیت اجتماعی', desc: 'تلاش برای ارتقای سلامت روان جامعه', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((val, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
                        <div className={`w-16 h-16 mx-auto ${val.bg} rounded-full flex items-center justify-center ${val.color} mb-4`}>
                            <val.icon size={28} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{val.title}</h3>
                        <p className="text-sm text-gray-500">{val.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#002147]/10 p-2 rounded-lg">
                        <History className="text-[#002147]" size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">داستان شکل‌گیری روانکارگاه</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-8 text-justify">
                    <p>
                        آکادمی روانکارگاه فعالیت خود را با هدف پاسخگویی به نیاز روزافزون جامعه روانشناسی به آموزش‌های کاربردی و مهارتی آغاز کرد. در سال‌های ابتدایی، تمرکز ما بر برگزاری کارگاه‌های حضوری محدود بود، اما با استقبال گسترده دانشجویان و نیاز به دسترسی عادلانه به آموزش در سراسر کشور، پلتفرم آموزش آنلاین خود را راه‌اندازی کردیم.
                    </p>
                    <p>
                        امروز، روانکارگاه افتخار دارد که با برگزاری صدها دوره آموزشی و تربیت هزاران درمانگر متخصص، سهمی کوچک اما مؤثر در ارتقای سطح علمی روانشناسی کشور ایفا کرده است. همکاری با اساتید بنام و دانشگاه‌های معتبر نظیر دانشگاه تهران و خوارزمی، گواهی بر کیفیت و اعتبار فعالیت‌های ماست.
                    </p>
                </div>
            </div>
            <div className="md:w-1/2 relative order-1 md:order-2 w-full">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#002147] to-[#F4C700] opacity-10 rounded-3xl transform rotate-3"></div>
                <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                    alt="داستان ما" 
                    className="relative rounded-3xl shadow-lg w-full h-64 md:h-80 object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                />
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
