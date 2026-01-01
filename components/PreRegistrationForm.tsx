
import React, { useState } from 'react';
import { Course } from '../types';
import { formatPrice, toPersianDigits } from '../utils';
import Button from './Button';
import { Info, Calculator, ArrowLeft, User, Phone, Mail } from 'lucide-react';

interface PreRegistrationFormProps {
  course: Course;
  onNext: (userData: any) => void;
}

const PreRegistrationForm: React.FC<PreRegistrationFormProps> = ({ course, onNext }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: ''
  });

  const totalPrice = course.price || 0;
  const preRegAmount = Math.round(totalPrice * 0.10);
  
  // Use course-specific installment count
  const installmentCount = course.installmentsCount || 5; 
  const firstInstallmentAmount = Math.round(totalPrice / installmentCount);
  const remainingFirstPayment = firstInstallmentAmount - preRegAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.mobile) {
      onNext(formData);
    } else {
      alert('لطفاً نام و شماره موبایل را وارد کنید.');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <span className="font-bold text-[#002147] bg-blue-50 px-2 py-1 rounded">مرحله ۱</span>
        <span>اطلاعات و بررسی هزینه</span>
      </div>

      {/* Info Block */}
      <div className="bg-[#FFF9E6] border-r-4 border-[#F4C700] p-4 rounded-lg mb-8">
        <h3 className="font-bold text-[#D4A017] mb-2 flex items-center gap-2">
          <Info size={20} />
          شرایط پیش‌ثبت‌نام
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 leading-7">
          <li><strong>زمان ثبت نام اصلی:</strong> حداکثر دو هفته قبل از شروع دوره</li>
          <li><strong>مبلغ پیش ثبت نام:</strong> ۱۰٪ از شهریه کل دوره به عنوان رزرو صندلی</li>
        </ul>
      </div>

      {/* Calculation Block */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 p-5 rounded-2xl mb-8">
        <div className="flex items-center gap-2 mb-4 text-[#002147]">
          <Calculator size={20} />
          <h3 className="font-bold">محاسبه کسر هزینه (ویژه ثبت‌نام اقساطی)</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">شهریه کل دوره:</span>
            <span className="font-bold text-gray-900">{formatPrice(totalPrice)} تومان</span>
          </div>
          <div className="flex justify-between text-[#002147]">
            <span className="font-bold">مبلغ پیش‌ثبت‌نام (۱۰٪):</span>
            <span className="font-bold">{formatPrice(preRegAmount)} تومان</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <p className="text-gray-600 leading-6 text-xs text-justify">
            این دوره دارای {toPersianDigits(installmentCount)} قسط می‌باشد. مبلغ پیش‌ثبت‌نام شما در زمان شروع کلاس‌ها، از <strong className="text-[#002147]">قسط اول</strong> کسر خواهد شد.
          </p>
          <div className="flex justify-between bg-white p-3 rounded-xl border border-gray-200 mt-2">
            <span className="text-gray-600 text-xs flex items-center">مبلغ مانده از قسط اول در زمان شروع کلاس:</span>
            <span className="font-bold text-[#002147] dir-ltr">
              {formatPrice(remainingFirstPayment)} تومان
            </span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">نام و نام خانوادگی</label>
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
          <label className="block text-sm font-bold text-gray-700 mb-2">شماره موبایل</label>
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
          <label className="block text-sm font-bold text-gray-700 mb-2">ایمیل (اختیاری)</label>
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

        <div className="pt-4">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full py-4 text-base font-bold bg-[#F4C700] hover:bg-[#CFA900] text-[#002147] shadow-lg shadow-yellow-100 gap-2"
          >
            مرحله بعد: مشاهده اطلاعات پرداخت
            <ArrowLeft size={18} />
          </Button>
        </div>
      </form>

    </div>
  );
};

export default PreRegistrationForm;
