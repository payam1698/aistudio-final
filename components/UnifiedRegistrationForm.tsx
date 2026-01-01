
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { formatPrice, toPersianDigits } from '../utils';
import Button from './Button';
import { User, Phone, Mail, Calculator, CreditCard, Wallet, ArrowLeft, AlertTriangle } from 'lucide-react';

export type RegistrationType = 'full' | 'installment';

interface UnifiedRegistrationFormProps {
  course: Course;
  type: RegistrationType;
  onPayment: (userData: any) => void;
}

const UnifiedRegistrationForm: React.FC<UnifiedRegistrationFormProps> = ({ 
  course, 
  type, 
  onPayment 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: ''
  });

  // --- Redirect if installment requested but not available ---
  useEffect(() => {
    if (type === 'installment' && !course.installmentsAvailable) {
        // Handled by return block below
    }
  }, [type, course]);

  // --- Calculations ---
  const totalPrice = course.price || 0;
  
  // Use course-specific installment count, default to 1 if not defined (though logic ensures it exists for installment type)
  const installmentCount = course.installmentsCount || 1; 
  const firstInstallmentAmount = Math.round(totalPrice / installmentCount);

  // --- Dynamic Content Config ---
  let title = '';
  let icon = null;
  let infoContent = null;
  let ctaText = '';
  let ctaIcon = <ArrowLeft size={20} />;
  let ctaColorClass = 'bg-[#F4C700] hover:bg-[#CFA900] text-[#002147] shadow-yellow-100';

  // Handle Invalid Access
  if (type === 'installment' && !course.installmentsAvailable) {
      return (
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">خطا در انتخاب نوع پرداخت</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                  متأسفانه برای دوره «{course.title}» امکان پرداخت اقساطی وجود ندارد و شهریه فقط به صورت نقدی دریافت می‌گردد.
              </p>
              <Button onClick={() => navigate(`/courses/${course.id}/register?mode=full`)} className="w-full">
                  انتقال به پرداخت نقدی
              </Button>
          </div>
      );
  }

  switch (type) {
    case 'full':
      title = `نهایی‌سازی ثبت‌نام`;
      icon = <CreditCard className="text-[#F4C700]" size={28} />;
      ctaText = 'پرداخت کامل شهریه';
      infoContent = (
        <div className="bg-[#002147]/5 border border-[#002147]/10 p-5 rounded-2xl mb-8">
           <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">شهریه قابل پرداخت:</span>
              <span className="font-bold text-[#002147] text-lg">{formatPrice(totalPrice)} تومان</span>
           </div>
           <p className="text-xs text-gray-500">پرداخت از طریق درگاه امن بانکی انجام خواهد شد.</p>
        </div>
      );
      break;

    case 'installment':
      title = `ثبت‌نام اقساطی (${toPersianDigits(installmentCount)} قسط)`;
      icon = <Wallet className="text-[#F4C700]" size={28} />;
      ctaText = 'پرداخت قسط اول';
      infoContent = (
        <div className="bg-[#002147]/5 border border-[#002147]/10 p-5 rounded-2xl mb-8">
           <div className="flex items-center gap-2 mb-4 text-[#002147]">
              <Calculator size={20} />
              <h3 className="font-bold">محاسبه اقساط دوره</h3>
           </div>
           <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">کل شهریه:</span>
                <span className="font-bold text-gray-900">{formatPrice(totalPrice)} تومان</span>
              </div>
              <div className="flex justify-between text-[#002147]">
                <span className="font-bold">تعداد کل اقساط:</span>
                <span className="font-bold">{toPersianDigits(installmentCount)} مرحله</span>
              </div>
              <div className="flex justify-between text-[#002147]">
                <span className="font-bold">مبلغ هر قسط (قابل پرداخت):</span>
                <span className="font-bold text-lg">{formatPrice(firstInstallmentAmount)} تومان</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <p className="text-gray-600 leading-6 text-xs italic">
                مبلغ فوق مربوط به قسط اول می‌باشد. مابقی شهریه در {toPersianDigits(installmentCount - 1)} قسط ماهانه دریافت می‌گردد.
              </p>
           </div>
        </div>
      );
      break;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile) {
      alert('لطفاً نام و شماره تماس را وارد کنید.');
      return;
    }
    onPayment(formData);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
        <div className="w-14 h-14 bg-[#002147] rounded-2xl flex items-center justify-center shadow-lg shadow-[#002147]/20 shrink-0">
           {icon}
        </div>
        <div>
           <h2 className="text-xl font-bold text-gray-900">{title}</h2>
           <p className="text-sm text-gray-500 mt-1 line-clamp-1">{course.title}</p>
        </div>
      </div>

      {infoContent}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">نام و نام خانوادگی شرکت‌کننده</label>
          <div className="relative">
            <input 
              type="text" required
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4C700] focus:border-[#F4C700] transition-all"
              placeholder="مثال: علی محمدی"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
            <User className="absolute right-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">شماره موبایل (جهت هماهنگی و دریافت لینک کلاس)</label>
          <div className="relative">
            <input 
              type="tel" required dir="ltr"
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4C700] focus:border-[#F4C700] transition-all text-left font-mono"
              placeholder="0912..."
              value={formData.mobile}
              onChange={e => setFormData({...formData, mobile: e.target.value})}
            />
            <Phone className="absolute right-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">پست الکترونیک (اختیاری)</label>
        <div className="relative">
            <input 
            type="email" dir="ltr"
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F4C700] focus:border-[#F4C700] transition-all text-left"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
        </div>
        </div>

        <div className="pt-6">
          <Button 
            type="submit" 
            size="lg" 
            className={`w-full py-4 text-base font-bold gap-2 ${ctaColorClass}`}
          >
            {ctaText}
            {ctaIcon}
          </Button>
          <p className="text-center text-[10px] text-gray-400 mt-4 leading-5">
             اطلاعات شما نزد موسسه روانکارگاه محفوظ است و صرفاً جهت هماهنگی‌های آموزشی استفاده می‌گردد.
          </p>
        </div>
      </form>

    </div>
  );
};

export default UnifiedRegistrationForm;
