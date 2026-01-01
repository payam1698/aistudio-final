
import React from 'react';
import { ChevronLeft, ArrowLeft, CheckCircle2, Brain, Baby, Users, HeartPulse, GraduationCap, Sparkles, Calendar, BookOpen } from 'lucide-react';
import { instructors, categories, testimonials } from '../data/mockData';
import { blogPosts } from '../data/blogData';
import { useCourses } from '../context/CourseContext';
import { toPersianDigits } from '../utils';
import Button from '../components/Button';
import CourseCard from '../components/CourseCard';
import HeroSlider from '../components/HeroSlider'; // Import the new slider
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { courses } = useCourses();
  const iconMap: Record<string, any> = { Brain, Baby, Users, HeartPulse, GraduationCap, Sparkles };

  // Section Divider with Mustard Highlight
  const SectionDivider = () => (
    <div className="w-full flex items-center justify-center my-0">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4A017] to-transparent opacity-60"></div>
    </div>
  );

  const CategoriesSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">دسته‌بندی‌های آموزشی</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">مسیر یادگیری خود را انتخاب کنید</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
             const Icon = iconMap[cat.iconName] || Brain;
             return (
              <Link 
                key={cat.id} 
                to={`/courses?category=${encodeURIComponent(cat.title)}`}
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-gray-400 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-between cursor-pointer h-32 hover:border-[#D4A017]/30"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand/5 text-brand flex items-center justify-center group-hover:bg-[#D4A017] group-hover:text-white transition-colors">
                    <Icon size={28} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand transition-colors mb-1">{cat.title}</h3>
                    <span className="text-sm text-gray-500">{toPersianDigits(cat.count)} دوره فعال</span>
                  </div>
                </div>
                <ChevronLeft className="text-gray-300 group-hover:text-[#D4A017] -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
             );
          })}
        </div>
      </div>
    </section>
  );

  const RecommendedCoursesSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">جدیدترین دوره‌ها</h2>
                <p className="text-gray-500">دوره‌های پیشنهادی برای شروع یادگیری</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-1 text-brand font-bold hover:gap-2 transition-all">
                مشاهده همه <ArrowLeft size={18} />
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {courses.slice(0, 4).map((course) => (
               <div key={course.id} className="h-full">
                   <CourseCard course={course} />
               </div>
           ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
            <Link to="/courses">
                <Button variant="outline">مشاهده همه دوره‌ها</Button>
            </Link>
        </div>
      </div>
    </section>
  );

  const InstructorsSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">اساتید برجسته</h2>
            <p className="text-gray-500">آموزش زیر نظر متخصصان باتجربه</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.slice(0, 6).map(inst => (
                <div key={inst.id} className="bg-white rounded-3xl p-6 text-center shadow-md shadow-gray-200 hover:shadow-xl transition-all h-full flex flex-col border border-transparent hover:border-[#D4A017]/30">
                    <div className="w-28 h-28 mx-auto rounded-full p-1 border-2 border-brand/10 mb-6 relative group">
                        <img 
                          src={inst.image} 
                          alt={inst.name} 
                          loading="lazy"
                          className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute bottom-0 right-0 bg-[#D4A017] text-white rounded-full p-1.5 border-2 border-white">
                            <CheckCircle2 size={14} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{inst.name}</h3>
                    <p className="text-brand font-medium text-sm mb-4">{inst.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">{inst.description}</p>
                    <Link to={`/instructors/${inst.id}`} className="mt-auto">
                      <Button variant="outline" size="sm" className="w-full hover:bg-brand hover:text-white hover:border-brand">مشاهده رزومه</Button>
                    </Link>
                </div>
            ))}
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">نظرات دانشجویان</h2>
            <p className="text-gray-500">تجربیات واقعی از کیفیت آموزش‌ها</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
                <div key={t.id} className="bg-gray-50 p-8 rounded-3xl relative h-full flex flex-col shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                    <div className="absolute top-6 left-6 text-brand/10">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 relative z-10 italic flex-grow">"{t.text}"</p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-200">
                        <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                            {t.name[0]}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                            <span className="text-xs text-gray-500">{t.role}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );

  const LatestArticlesSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">تازه‌های روانشناسی</h2>
            <p className="text-gray-500">آخرین مقالات و دستاوردهای علمی آکادمی</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {blogPosts.slice(0, 3).map(post => (
                <div key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-[#D4A017]/30">
                    <div className="h-48 overflow-hidden relative">
                         <img 
                            src={post.image} 
                            alt={post.title} 
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                         />
                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-brand shadow-sm">
                            {post.category}
                         </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                            <Calendar size={14} className="text-accent" />
                            {post.date}
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-brand transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow leading-relaxed">
                            {post.excerpt}
                        </p>
                        <Link to={`/blog/${post.id}`} className="mt-auto inline-flex items-center gap-1 text-brand font-bold text-sm hover:gap-2 transition-all">
                            مطالعه مقاله <ArrowLeft size={16} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center">
            <Link to="/blog">
                <Button variant="secondary" size="lg" className="shadow-lg shadow-accent/20 gap-2 transition-transform hover:-translate-y-1">
                    <BookOpen size={20} />
                    مشاهده تمام مقالات
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
      <section className="py-20 bg-brand text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-6">چرا آکادمی روانکارگاه؟</h2>
                      <p className="text-brand-light text-lg mb-8 leading-relaxed">
                          ما با تلفیق دانش آکادمیک و تجربیات بالینی، فضایی را فراهم کرده‌ایم که در آن یادگیری عمیق و کاربردی اتفاق می‌افتد.
                      </p>
                      <div className="space-y-6">
                          {[
                              { title: 'گواهینامه معتبر دانشگاهی', desc: 'ارائه مدرک قابل ترجمه از دانشگاه‌های معتبر' },
                              { title: 'اساتید مجرب و شناخته‌شده', desc: 'بهره‌گیری از تخصص اساتید برجسته کشوری' },
                              { title: 'پشتیبانی آموزشی ۲۴ ساعته', desc: 'همراهی گام‌به‌گام در طول مسیر یادگیری' },
                          ].map((item, i) => (
                              <div key={i} className="flex items-start gap-4">
                                  <div className="p-2 bg-white/10 rounded-lg shrink-0">
                                      <CheckCircle2 className="text-accent" />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-lg">{item.title}</h4>
                                      <p className="text-brand-light text-sm opacity-80">{item.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="text-center bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                      <h3 className="text-2xl font-bold mb-4">آغاز مسیر حرفه‌ای</h3>
                      <p className="text-brand-light mb-8">
                          برای دریافت مشاوره رایگان و انتخاب بهترین مسیر آموزشی، همین حالا اقدام کنید.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link to="/courses" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="w-full shadow-lg shadow-accent/20 transition-transform hover:-translate-y-1">مشاهده دوره‌ها</Button>
                          </Link>
                          <a href="https://wa.me/989354684499" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-brand transition-transform hover:-translate-y-1">ارتباط با مشاور</Button>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );

  return (
    <div className="animate-fade-in">
      <HeroSlider />
      <SectionDivider />
      <CategoriesSection />
      <SectionDivider />
      <RecommendedCoursesSection />
      <SectionDivider />
      <InstructorsSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <LatestArticlesSection />
      <SectionDivider />
      <FeaturesSection />
    </div>
  );
};

export default Home;
