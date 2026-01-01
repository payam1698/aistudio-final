
import React from 'react';
import { ArrowLeft, CheckCircle2, Mail, Phone } from 'lucide-react';
import { instructors } from '../data/mockData';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const InstructorsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand mb-6 transition-colors text-sm">
              <ArrowLeft size={16} className="ml-1" />
              بازگشت به صفحه اصلی
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">اساتید روان کارگاه</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              اساتید مجرب و متخصص روان کارگاه با سال‌ها تجربه علمی و عملی در زمینه روانشناسی و روان‌درمانی
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {instructors.map((inst) => (
            <div key={inst.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Avatar */}
                <div className="shrink-0 mx-auto md:mx-0">
                  <div className="w-40 h-40 rounded-full p-2 border-2 border-brand/20">
                    <img 
                      src={inst.image} 
                      alt={inst.name} 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-right w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{inst.name}</h2>
                      <p className="text-brand font-medium">{inst.title}</p>
                    </div>
                    <Link to={`/instructors/${inst.id}`} className="hidden md:flex">
                        <Button variant="outline" size="sm">مشاهده پروفایل کامل</Button>
                    </Link>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8 max-w-4xl line-clamp-3">
                    {inst.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Specialties */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2 justify-center md:justify-start">
                        <span className="w-2 h-2 rounded-full bg-[#F4C700]"></span>
                        تخصص‌ها:
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {inst.specialties.map((spec) => (
                          <span key={spec} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Background */}
                    {inst.academicBackground && (
                        <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 rounded-full bg-[#002147]"></span>
                            سوابق علمی:
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            {inst.academicBackground.slice(0, 2).map((bg, idx) => (
                            <li key={idx} className="flex items-center gap-2 justify-center md:justify-start">
                                <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                                {bg}
                            </li>
                            ))}
                            <li className="flex items-center gap-2 justify-center md:justify-start text-gray-400">
                                <span className="w-3.5 h-3.5 block"></span>
                                و موارد دیگر...
                            </li>
                        </ul>
                        </div>
                    )}
                  </div>
                  
                  <div className="mt-8 md:hidden">
                    <Link to={`/instructors/${inst.id}`}>
                        <Button variant="outline" className="w-full">مشاهده پروفایل کامل</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-[#002147] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F4C700]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">علاقه‌مند به همکاری با روان کارگاه هستید؟</h2>
            <p className="text-brand-light mb-8 max-w-2xl mx-auto">
              اگر متخصص روانشناسی یا روان‌درمانی هستید و تمایل به تدریس در روان کارگاه دارید، با ما تماس بگیرید.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <a href="https://wa.me/989354684499" className="inline-block">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-[#F4C700] text-[#002147] hover:bg-[#CFA900]">
                  <Phone size={20} />
                  تماس از طریق واتساپ
                </Button>
               </a>
               <a href="mailto:info@ravankargah.ir" className="inline-block">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-white text-white hover:bg-white hover:text-[#002147]">
                  <Mail size={20} />
                  ارسال ایمیل
                </Button>
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
