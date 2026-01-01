
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Calendar, CheckCircle2, User, Award, 
  Video, Phone, ArrowLeft, 
  BookOpen, ChevronDown, ChevronUp, 
  PlayCircle, FileText, Mic, Instagram, Send, MessageCircle, CreditCard, Wallet 
} from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import { instructors } from '../data/mockData';
import { toPersianDigits, formatPrice } from '../utils';
import Button from '../components/Button';
import CourseCard from '../components/CourseCard';
import CommentsSection from '../components/CommentsSection';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

// Simple Accordion Component
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden">
      <button 
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-right"
        onClick={onClick}
        type="button"
      >
        <span className="font-bold text-gray-800">{title}</span>
        {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useCourses();
  const course = courses.find(c => c.id === id);
  const instructor = course ? instructors.find(i => i.id === course.instructorId) : null;
  const relatedCourses = course ? courses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3) : [];
  
  const [openSyllabusIndex, setOpenSyllabusIndex] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">دوره مورد نظر یافت نشد</h2>
          <Link to="/courses">
            <Button>بازگشت به لیست دوره‌ها</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Breadcrumbs
  const Breadcrumbs = () => (
    <div className="bg-white border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
          <Link to="/" className="hover:text-brand transition-colors">خانه</Link>
          <span className="text-gray-300">/</span>
          <Link to="/courses" className="hover:text-brand transition-colors">دوره‌ها</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{course.title}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Right Column (Main Content) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
                <img 
                  src={course.image} 
                  alt={`دوره آموزشی ${course.title}`} 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-brand text-xs font-bold shadow-sm">
                  {course.category}
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {course.title}
              </h1>
              
              <div 
                className="text-gray-600 text-lg leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: course.description || '' }}
              />

              {/* Quick Meta for Mobile */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 md:hidden">
                 <div className="flex items-center gap-1"><Clock size={16}/> <span className="font-bold">{toPersianDigits(course.durationHours)}</span> ساعت</div>
                 <div className="flex items-center gap-1"><User size={16}/> {course.instructorName}</div>
              </div>
            </div>

            {/* Objectives */}
            {course.objectives && course.objectives.length > 0 && (
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#F4C700] rounded-full block"></span>
                  اهداف دوره
                </h2>
                <div className="text-gray-700 leading-8 text-justify">
                  {course.objectives.map((obj, i) => (
                    <p key={i} className="mb-4">{obj}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Syllabus (Accordion) */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="text-brand" size={24} />
                سرفصل‌های دوره
              </h2>
              <div>
                {course.syllabus?.map((item, index) => {
                  const isString = typeof item === 'string';
                  const title = isString ? item : item.title;

                  return (
                    <AccordionItem 
                      key={index} 
                      title={title} 
                      isOpen={openSyllabusIndex === index}
                      onClick={() => setOpenSyllabusIndex(openSyllabusIndex === index ? null : index)}
                    >
                      {isString ? (
                        <p>{item} - توضیحات تکمیلی این سرفصل در کلاس ارائه خواهد شد.</p>
                      ) : (
                        <ul className="space-y-3">
                          {item.topics.map((topic: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F4C700] mt-2 shrink-0"></span>
                              <span className="leading-7">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionItem>
                  );
                })}
              </div>
            </section>

            {/* Instructor Bio */}
            {instructor && (
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 overflow-hidden relative">
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-[100px] -z-0"></div>

                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2 relative z-10">
                  <span className="w-1 h-6 bg-[#F4C700] rounded-full block"></span>
                  <User className="text-brand" size={24} />
                  معرفی مدرس
                </h2>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-right relative z-10">
                  <div className="shrink-0 relative">
                     {/* Round Image */}
                    <div className="w-32 h-32 rounded-full p-1.5 border-2 border-dashed border-[#F4C700]">
                        <img 
                          src={instructor.image} 
                          alt={instructor.name} 
                          loading="lazy"
                          className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 bg-brand text-white text-[10px] px-2 py-0.5 rounded-full border border-white">
                        مدرس دوره
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-brand mb-2">{instructor.name}</h3>
                    <p className="text-gray-500 font-medium text-sm mb-4 bg-gray-100 inline-block px-3 py-1 rounded-lg">
                        {instructor.title}
                    </p>
                    <p className="text-gray-600 text-sm leading-8 mb-6 text-justify">
                        {instructor.description}
                    </p>
                    <Link to={`/instructors/${instructor.id}`}>
                       <Button variant="outline" size="sm" className="gap-2 border-brand text-brand hover:bg-brand hover:text-white transition-colors">
                          مشاهده رزومه کامل <ArrowLeft size={16} />
                       </Button>
                    </Link>
                  </div>
                </div>
              </section>
            )}
            
            {/* Comments Section */}
            <CommentsSection contentId={course.id} type="course" />

          </div>

          {/* Left Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Summary Card */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                
                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                  <span className="text-gray-500 text-xs block mb-1">شهریه دوره</span>
                  <div className="text-3xl font-extrabold text-[#002147] flex items-center justify-center gap-1">
                    {course.price ? formatPrice(course.price) : 'تماس بگیرید'} 
                    <span className="text-sm font-normal text-gray-500 mt-2">تومان</span>
                  </div>
                  {course.installmentsAvailable && (
                    <div className="mt-2 inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md font-medium">
                      امکان پرداخت اقساطی
                    </div>
                  )}
                </div>

                {/* Info List */}
                <div className="space-y-4 mb-6">
                  {instructor && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-2"><User size={16}/> مدرس:</span>
                      <Link to={`/instructors/${instructor.id}`} className="font-bold text-gray-900 hover:text-brand transition-colors border-b border-dashed border-gray-300 pb-0.5">
                        {instructor.name}
                      </Link>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Clock size={16}/> مدت دوره:</span>
                    <span className="font-bold text-gray-900">{toPersianDigits(course.durationHours)} ساعت</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Video size={16}/> نحوه برگزاری:</span>
                    <span className="font-bold text-gray-900">{course.mode}</span>
                  </div>
                  {course.hasCertificate && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-2"><Award size={16}/> گواهینامه:</span>
                      <span className="font-bold text-gray-900 text-xs bg-gray-100 px-2 py-1 rounded">
                        {course.certificateProvider || 'معتبر'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Schedule */}
                {course.schedule && (
                  <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <h4 className="font-bold text-brand text-xs mb-2 flex items-center gap-1">
                      <Calendar size={14} /> زمان‌بندی کلاس‌ها:
                    </h4>
                    <div className="space-y-2">
                      {course.schedule.map((sch, i) => (
                        <div key={i} className="text-xs text-gray-800 font-bold flex items-start gap-1.5 leading-5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand/50 mt-1.5 shrink-0"></span>
                          {sch}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info & Promo Block */}
                <div className="bg-[#FFF9E6] border-r-4 border-[#F4C700] p-4 rounded-lg mb-6 text-sm text-gray-700 leading-7 text-justify shadow-sm">
                   <p className="mb-2">
                     جهت اطلاع از برنامه دقیق و روز شروع دوره آموزشی می‌توانید از طریق صفحه <strong className="text-gray-900">اینستاگرام</strong> و <strong className="text-gray-900">کانال تلگرام</strong> و یا با <strong className="text-gray-900">واتساپ</strong> از طریق لینک‌های زیر اطلاع پیدا کنید.
                   </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mb-8">
                   <a href="https://instagram.com/ravankargah" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 text-white shadow-md hover:scale-110 transition-transform">
                      <Instagram size={20} />
                   </a>
                   <a href="https://t.me/ravankargah" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:scale-110 transition-transform">
                      <Send size={20} />
                   </a>
                   <a href="https://wa.me/989354684499" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md hover:scale-110 transition-transform">
                      <MessageCircle size={20} />
                   </a>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-6">
                   <Link to={`/courses/${course.id}/register?mode=full`} className="block">
                     <Button variant="secondary" className="w-full py-3 font-bold text-base shadow-md shadow-yellow-100 bg-[#F4C700] text-[#002147] hover:bg-[#CFA900]">
                        <CreditCard size={18} className="ml-2" />
                        ثبت نام کامل
                     </Button>
                   </Link>
                   
                   {course.installmentsAvailable && (
                      <Link to={`/courses/${course.id}/register?mode=installment`} className="block">
                        <Button variant="primary" className="w-full py-3 font-bold text-base bg-brand hover:bg-brand-dark">
                           <Wallet size={18} className="ml-2" />
                           ثبت نام با شرایط اقساطی
                        </Button>
                      </Link>
                   )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
                  {[
                    { icon: PlayCircle, text: 'مشاهده فیلم' },
                    { icon: Mic, text: 'فایل صوتی' },
                    { icon: FileText, text: 'پاورپوینت' },
                    { icon: Award, text: 'گواهینامه' },
                  ].map((feat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition-colors">
                      <feat.icon size={20} className="text-gray-400 mb-1" />
                      <span className="text-[10px] font-bold text-gray-600">{feat.text}</span>
                    </div>
                  ))}
                </div>

                {/* Payment Info (Conditional) */}
                {course.paymentInfo && (
                   <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="bg-[#FFF9E6] border border-[#F4C700]/30 rounded-lg p-3 text-center">
                          <p className="text-[10px] text-gray-600 mb-1">شماره کارت جهت واریز:</p>
                          <p className="font-sans font-bold text-[#002147] text-sm select-all" dir="ltr">{course.paymentInfo.cardNumber}</p>
                          <p className="text-[10px] text-gray-600 mt-1">{course.paymentInfo.cardHolder}</p>
                      </div>
                   </div>
                )}

              </div>

            </div>
          </div>

        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-right">دوره‌های مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCourses.map(relCourse => (
                <CourseCard key={relCourse.id} course={relCourse} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default CourseDetailsPage;
