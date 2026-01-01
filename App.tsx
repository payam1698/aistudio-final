
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CourseRegisterPage from './pages/CourseRegisterPage';
import InstructorsPage from './pages/InstructorsPage';
import InstructorDetailsPage from './pages/InstructorDetailsPage';
import McmiPage from './pages/McmiPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GuidePage from './pages/GuidePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPanel from './pages/AdminPanel';
import UserDashboard from './pages/UserDashboard';
import BlogPage from './pages/BlogPage';
import PostDetailsPage from './pages/PostDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatbotButton from './components/ChatbotButton';
import ChatbotWidget from './components/ChatbotWidget';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { CommentProvider } from './context/CommentContext';

// Placeholder for recovery
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-500">این بخش در حال به‌روزرسانی است.</p>
    </div>
  </div>
);

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <AuthProvider>
      <CourseProvider>
        <CommentProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen bg-gray-50 font-sans relative">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:id" element={<CourseDetailsPage />} />
                  <Route path="/courses/:id/register" element={<CourseRegisterPage />} />
                  <Route path="/instructors" element={<InstructorsPage />} />
                  <Route path="/instructors/:id" element={<InstructorDetailsPage />} />
                  <Route path="/mcmi" element={<McmiPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/guide" element={<GuidePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<PostDetailsPage />} />
                  <Route path="/recovery" element={<PlaceholderPage title="بازیابی رمز عبور" />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              
              <ChatbotButton 
                isOpen={isChatOpen} 
                onClick={() => setIsChatOpen(!isChatOpen)} 
              />
              <ChatbotWidget 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
              />
            </div>
          </HashRouter>
        </CommentProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
