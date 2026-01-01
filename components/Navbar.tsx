
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, Send, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'خانه', path: '/' },
    { name: 'دوره‌ها', path: '/courses' },
    { name: 'اساتید', path: '/instructors' },
    { name: 'وبلاگ', path: '/blog' },
    { name: 'آزمون میلون', path: '/mcmi' },
    { name: 'راهنمایی و دانلود', path: '/guide' },
    { name: 'تماس با ما', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand text-white flex items-center justify-center text-xl font-bold rounded-lg group-hover:bg-brand-dark transition-colors">
                ر
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">روانـــکارگاه</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-brand font-bold bg-brand-light' 
                      : 'text-gray-600 hover:text-brand hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Admin Link */}
              {user?.role === 'admin' && (
                 <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-1 ${
                    location.pathname === '/admin' 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Settings size={16} /> پنل مدیریت
                </Link>
              )}
            </div>
          </div>

          {/* Left Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                 <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2 border-brand text-brand hover:bg-brand hover:text-white transition-all font-bold">
                        <LayoutDashboard size={18} />
                        پنل کاربری
                    </Button>
                 </Link>
                 <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <User size={18} className="text-brand" />
                    <span>{user.fullNameFa}</span>
                 </div>
                 <button 
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                  title="خروج"
                 >
                   <LogOut size={20} />
                 </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/register" className="text-sm font-medium text-gray-600 hover:text-brand hidden xl:block">
                  ثبت نام
                </Link>
                <Link to="/login">
                  <Button size="sm" className="gap-2 bg-brand hover:bg-brand-dark text-white shadow-sm">
                    <User size={18} />
                    ورود به سیستم
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-brand-light hover:text-brand"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             {user && (
                 <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-bold text-brand bg-brand-light"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-2"><LayoutDashboard size={18} /> پنل کاربری</span>
                </Link>
              )}
             {user?.role === 'admin' && (
                 <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-bold text-red-600 bg-red-50"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-2"><Settings size={18} /> پنل مدیریت</span>
                </Link>
              )}
            <div className="border-t border-gray-100 pt-4 mt-2 space-y-4">
               {user ? (
                 <div className="space-y-3">
                    <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 gap-2" onClick={() => { logout(); setIsOpen(false); }}>
                       <LogOut size={18} /> خروج از حساب
                    </Button>
                 </div>
               ) : (
                 <div className="space-y-3">
                   <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                     <Button className="w-full py-3 bg-brand text-white font-bold">
                        ورود
                     </Button>
                   </Link>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
