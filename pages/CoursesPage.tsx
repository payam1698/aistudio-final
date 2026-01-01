
import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { categories, instructors } from '../data/mockData';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';

const CoursesPage: React.FC = () => {
  const { courses } = useCourses();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [instFilter, setInstFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = c.title.includes(search) || c.instructorName.includes(search);
      const matchCat = catFilter ? c.category === catFilter : true;
      const matchInst = instFilter ? c.instructorId === instFilter : true;
      return matchSearch && matchCat && matchInst;
    });
  }, [search, catFilter, instFilter, courses]);

  // Handler for category selection to reset instructor filter
  const handleCategorySelect = (title: string | null) => {
    setCatFilter(title);
    if (title !== null) {
      setInstFilter(null); // Reset instructor filter when a specific category is chosen
    }
  };

  // Handler for instructor selection to reset category filter
  const handleInstructorSelect = (id: string | null) => {
    setInstFilter(id);
    if (id !== null) {
      setCatFilter(null); // Reset category filter when a specific instructor is chosen
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">دوره‌های آموزشی</h1>
          <p className="text-gray-500">مسیر یادگیری تخصصی خود را انتخاب کنید</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'fixed inset-0 z-50 bg-black/50 flex justify-end' : 'hidden'}`}>
            <div className={`bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-100 p-6 h-full lg:h-auto overflow-y-auto w-80 lg:w-full ${showFilters ? 'animate-slide-in' : ''}`}>
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="font-bold text-lg">فیلترها</h3>
                <button onClick={() => setShowFilters(false)}><X /></button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">جستجو</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="نام دوره یا مدرس..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">دسته‌بندی‌ها</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleCategorySelect(null)}
                    className={`block w-full text-right text-sm px-3 py-2 rounded-lg ${catFilter === null ? 'bg-brand/10 text-brand font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    همه دسته‌ها
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.title)}
                      className={`block w-full text-right text-sm px-3 py-2 rounded-lg ${catFilter === cat.title ? 'bg-brand/10 text-brand font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructors */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">اساتید</h3>
                <div className="space-y-2">
                   <button 
                    onClick={() => handleInstructorSelect(null)}
                    className={`block w-full text-right text-sm px-3 py-2 rounded-lg ${instFilter === null ? 'bg-brand/10 text-brand font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    همه اساتید
                  </button>
                  {instructors.map(inst => (
                    <button 
                      key={inst.id}
                      onClick={() => handleInstructorSelect(inst.id)}
                      className={`block w-full text-right text-sm px-3 py-2 rounded-lg ${instFilter === inst.id ? 'bg-brand/10 text-brand font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {inst.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:hidden">
                <button onClick={() => setShowFilters(false)} className="w-full bg-brand text-white py-3 rounded-xl font-bold">مشاهده نتایج</button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 lg:hidden">
              <button 
                onClick={() => setShowFilters(true)}
                className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-xl border border-gray-200 font-bold text-gray-700"
              >
                <Filter size={20} /> فیلترها و جستجو
              </button>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-12 rounded-3xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">نتیجه‌ای یافت نشد</h3>
                <p className="text-gray-500">لطفاً فیلترها را تغییر دهید.</p>
                <button onClick={() => {setSearch(''); setCatFilter(null); setInstFilter(null)}} className="text-brand font-bold mt-4 hover:underline">
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
