
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowLeft, Users, Award, BookOpen, GraduationCap, User, LogIn } from 'lucide-react';
import Button from './Button';
import { toPersianDigits } from '../utils';

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const stats = [
    { id: 1, label: 'دانشجوی فعال', value: '10,000+', icon: Users },
    { id: 2, label: 'رضایت شرکت‌کنندگان', value: '%98', icon: Award },
    { id: 3, label: 'دوره تخصصی', value: '15+', icon: BookOpen },
    { id: 4, label: 'گواهینامه صادره', value: '8,500', icon: GraduationCap },
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[550px] overflow-hidden bg-[#002147]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1617791160505-6f00504e3caf?auto=format&fit=crop&q=80&w=1600" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-40"
        />
        {/* Brand Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147] via-[#002147]/90 to-[#002147]/70 mix-blend-multiply"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        
        {/* SLIDE 1: Introduction */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out px-4 ${
            currentSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        >
          <span className="inline-block px-6 py-2 rounded-full bg-white/10 text-[#F4C700] border border-[#F4C700]/30 font-bold text-sm md:text-base mb-6 backdrop-blur-sm animate-fade-in-up">
            مرکز تخصصی آموزش‌های روانشناسی
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
            روانـــــــــکارگاه
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            مسیر حرفه‌ای شدن در روان‌درمانی. با بهره‌گیری از اساتید برجسته و متدهای آموزشی نوین، دانش و مهارت خود را در حوزه سلامت روان ارتقا دهید.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Link to="/login" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full bg-[#F4C700] hover:bg-[#CFA900] text-[#002147] border-none shadow-lg shadow-[#F4C700]/20 px-8 py-4 text-lg font-bold transition-transform hover:-translate-y-1 gap-2 flex items-center justify-center"
              >
                <LogIn size={20} />
                ورود به سامانه آموزشی
              </Button>
            </Link>
            <Link to="/courses" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-2 border-white/30 text-white hover:bg-white hover:text-[#002147] hover:border-white px-8 py-4 text-lg font-bold transition-all backdrop-blur-sm gap-2 flex items-center justify-center"
              >
                <BookOpen size={20} />
                مشاهده دوره‌ها
              </Button>
            </Link>
          </div>
        </div>

        {/* SLIDE 2: Stats & Credibility */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out px-4 ${
            currentSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            اعتبار ما، <span className="text-[#F4C700]">اعتماد شماست</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mb-12">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[#F4C700]/20 text-[#F4C700] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
                <span className="text-3xl md:text-4xl font-extrabold text-white mb-2 font-mono">
                  {toPersianDigits(stat.value)}
                </span>
                <span className="text-gray-300 text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          <Link to="/register">
             <Button 
              size="lg" 
              className="bg-[#F4C700] hover:bg-[#CFA900] text-[#002147] border-none shadow-lg shadow-[#F4C700]/20 px-8 py-4 text-lg font-bold transition-transform hover:-translate-y-1 gap-2"
            >
              ثبت‌نام کنید <ArrowLeft size={20} />
            </Button>
          </Link>
        </div>

      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-4">
        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          className="hidden md:flex w-10 h-10 rounded-full bg-white/10 hover:bg-[#F4C700] text-white hover:text-[#002147] items-center justify-center backdrop-blur-sm transition-colors border border-white/20"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx 
                  ? 'w-8 h-3 bg-[#F4C700]' 
                  : 'w-3 h-3 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          className="hidden md:flex w-10 h-10 rounded-full bg-white/10 hover:bg-[#F4C700] text-white hover:text-[#002147] items-center justify-center backdrop-blur-sm transition-colors border border-white/20"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
