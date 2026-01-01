
import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import Button from '../components/Button';
import UnifiedRegistrationForm, { RegistrationType } from '../components/UnifiedRegistrationForm';

const CourseRegisterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode') || 'full';
  
  // Convert URL 'mode' to Component 'type'
  // Note: 'pre' is no longer supported and will default to 'full'
  const formType: RegistrationType = modeParam === 'installment' ? 'installment' : 'full';

  const { courses } = useCourses();
  const course = courses.find(c => c.id === id);

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

  // Handle Payment for Full/Installment
  const handlePayment = (userData: any) => {
    console.log('Payment Request:', userData);
    alert('اطلاعات شما ثبت شد. در حال انتقال به درگاه پرداخت بانکی...');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">ثبت نام در دوره</h1>
            <Link to={`/courses/${id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft size={16} />
                    بازگشت به جزئیات
                </Button>
            </Link>
        </div>

        {/* The Unified Form handling all logic (Full, Installment) */}
        <UnifiedRegistrationForm 
            course={course}
            type={formType}
            onPayment={handlePayment}
        />

      </div>
    </div>
  );
};

export default CourseRegisterPage;
