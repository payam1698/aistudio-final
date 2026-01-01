
import React from 'react';
import { Clock, Video, Award, User, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { toPersianDigits } from '../utils';
import Button from './Button';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  if (!course) return null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          {course.category}
        </div>
        {course.hasCertificate && (
          <div className="absolute bottom-3 left-3 bg-brand/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <Award size={12} />
            <span>{course.certificateProvider || 'گواهی معتبر'}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
             <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                <Star size={10} fill="currentColor" />
                {toPersianDigits(course.rating || 5)}
             </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors line-clamp-2 min-h-[3.5rem]">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
          <User size={14} />
          <span className="truncate">{course.instructorName}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-6 mt-auto">
          <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded">
            <Clock size={14} className="text-brand" />
            <span className="font-bold text-gray-700">{toPersianDigits(course.durationHours)} ساعت</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded">
            <Video size={14} className="text-green-500" />
            <span className="font-bold text-gray-700">{course.mode}</span>
          </div>
        </div>

        <Link to={`/courses/${course.id}`} className="mt-auto">
          <Button variant="outline" className="w-full group-hover:bg-brand group-hover:text-white group-hover:border-brand">
            مشاهده جزئیات
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
