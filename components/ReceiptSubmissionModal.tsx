
import React from 'react';
import { X, CreditCard, Copy, MessageCircle } from 'lucide-react';
import Button from './Button';
import { formatPrice } from '../utils';

interface ReceiptSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  userData: { fullName: string; mobile: string } | null;
  courseTitle: string;
}

const ReceiptSubmissionModal: React.FC<ReceiptSubmissionModalProps> = ({ 
  isOpen, 
  onClose, 
  amount, 
  userData, 
  courseTitle 
}) => {
  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('شماره کارت کپی شد');
  };

  const cardNumber = "5859831821096517";
  const whatsappNumber = "989354684499";

  // Construct WhatsApp Message
  const message = `*درخواست پیش ثبت‌نام جدید*
*دوره:* ${courseTitle}
*نام کامل:* ${userData?.fullName || ''}
*شماره تماس:* ${userData?.mobile || ''}
*اطلاعیه:* لطفاً تصویر فیش واریزی را به این پیام پیوست کنید.`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="bg-[#002147] p-6 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CreditCard size={20} className="text-[#F4C700]" />
            پرداخت ۱۰٪ و ارسال فیش
          </h2>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          
          {/* Amount Display */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">مبلغ قابل پرداخت</p>
            <div className="text-3xl font-extrabold text-[#002147] dir-rtl">
              {formatPrice(amount)} <span className="text-sm text-gray-400 font-normal">تومان</span>
            </div>
          </div>

          {/* Bank Info Block */}
          <div className="bg-gray-50 border-2 border-dashed border-[#002147]/20 rounded-2xl p-5 text-center relative group">
            <p className="text-sm text-[#002147] font-medium mb-3">
              لطفاً مبلغ فوق را به شماره کارت زیر واریز نمایید:
            </p>
            
            <div className="bg-white border border-gray-200 rounded-xl p-3 mb-2 flex items-center justify-between shadow-sm">
                <span className="font-sans font-bold text-xl text-[#002147] tracking-wider w-full text-center select-all" dir="ltr">
                  {cardNumber.match(/.{1,4}/g)?.join(' ')}
                </span>
                <button 
                  onClick={() => copyToClipboard(cardNumber)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#F4C700] transition-colors"
                  title="کپی شماره کارت"
                >
                  <Copy size={18} />
                </button>
            </div>
            
            <p className="text-sm text-gray-600">
              به نام: <strong className="text-gray-900">محمد اسماعیل‌زاده</strong>
            </p>
          </div>

          {/* Warning / Instructions */}
          <div className="bg-[#FFF9E6] text-[#856404] text-xs p-3 rounded-xl leading-5 text-justify border border-[#F4C700]/30">
             پس از واریز وجه، روی دکمه زیر کلیک کنید تا به واتساپ هدایت شوید. سپس تصویر فیش واریزی را ارسال نمایید تا ثبت‌نام شما نهایی شود.
          </div>

          {/* WhatsApp Button */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button 
              size="lg" 
              className="w-full py-4 text-base font-bold bg-[#F4C700] hover:bg-[#CFA900] text-[#002147] shadow-lg shadow-yellow-100 gap-2"
            >
              <MessageCircle size={20} />
              ارسال فیش و تکمیل پیش ثبت‌نام در واتساپ
            </Button>
          </a>

        </div>
      </div>
    </div>
  );
};

export default ReceiptSubmissionModal;
