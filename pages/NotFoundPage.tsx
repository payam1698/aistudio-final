
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4 animate-fade-in">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full">
        <div className="w-24 h-24 bg-brand/5 rounded-full flex items-center justify-center mx-auto mb-6">
           <AlertTriangle size={48} className="text-brand" />
        </div>
        <h1 className="text-8xl font-extrabold text-brand mb-2 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">صفحه مورد نظر یافت نشد</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا آدرس آن تغییر کرده است.
        </p>
        <Link to="/">
          <Button size="lg" className="w-full gap-2 shadow-lg shadow-brand/20 transition-transform hover:-translate-y-1">
            <Home size={20} />
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
