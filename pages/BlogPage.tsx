
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const BlogPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">وبلاگ تخصصی روانشناسی</h1>
          <p className="text-gray-500">تازه‌ترین مقالات و یافته‌های علمی دنیای روانشناسی</p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                   <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                   </div>
                   <span className="bg-brand/5 text-brand px-2 py-0.5 rounded-md font-bold">{post.category}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug hover:text-brand transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User size={14} />
                      {post.author}
                   </div>
                   <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/5 gap-1">
                        ادامه مطلب <ArrowLeft size={16} />
                      </Button>
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
