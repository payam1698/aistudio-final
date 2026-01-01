
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Lock } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [error, setError] = useState('');

  /* Fix: Changed handleSubmit to async to correctly await the login promise from context */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(mobile, nationalCode);
    if (success) {
      navigate('/');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-brand p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <LogIn size={32} />
          </div>
          <h2 className="text-2xl font-bold">ورود به حساب کاربری</h2>
          <p className="text-brand-light mt-2">خوش آمدید، لطفاً وارد شوید</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center border border-red-100 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نام کاربری (شماره همراه)</label>
            <div className="relative">
              <input
                type="tel"
                required
                dir="ltr"
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand text-left font-mono"
                placeholder="0912..."
                value={mobile}
                onChange={e => setMobile(e.target.value)}
              />
              <Phone className="absolute right-3 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور (کد ملی)</label>
            <div className="relative">
              <input
                type="password"
                required
                dir="ltr"
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand text-left font-mono"
                placeholder="********"
                value={nationalCode}
                onChange={e => setNationalCode(e.target.value)}
              />
              <Lock className="absolute right-3 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-end text-sm">
            <Link to="/recovery" className="text-brand hover:text-brand-dark transition-colors font-medium">
              رمز عبورم را فراموش کرده‌ام
            </Link>
          </div>

          <Button className="w-full py-3 text-lg font-bold" type="submit">
            ورود
          </Button>

          <div className="text-center pt-4 border-t border-gray-50">
            <p className="text-sm text-gray-500">
              حساب کاربری ندارید؟ <Link to="/register" className="text-brand font-bold hover:underline">ثبت نام کنید</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
