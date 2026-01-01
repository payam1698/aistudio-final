
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';
import { api } from '../services/api';

interface CourseContextType {
  courses: Course[];
  isLoading: boolean;
  refreshCourses: () => Promise<void>;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (id: string, updatedData: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    setIsLoading(true);
    const data = await api.courses.getAll();
    setCourses(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (course: Course) => {
    await api.courses.upsert(course);
    await fetchCourses();
  };

  const updateCourse = async (id: string, updatedData: Partial<Course>) => {
    const course = courses.find(c => c.id === id);
    if (course) {
      await api.courses.upsert({ ...course, ...updatedData });
      await fetchCourses();
    }
  };

  const deleteCourse = async (id: string) => {
    await api.courses.delete(id);
    await fetchCourses();
  };

  return (
    <CourseContext.Provider value={{ 
      courses, isLoading, refreshCourses: fetchCourses, 
      addCourse, updateCourse, deleteCourse 
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
