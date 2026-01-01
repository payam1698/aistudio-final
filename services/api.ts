
import { Course, Instructor, UserData, ScoreReport } from '../types';
import { Comment } from '../context/CommentContext';
import { courses as initialCourses, instructors as initialInstructors } from '../data/mockData';
import { blogPosts as initialBlogPosts, BlogPost } from '../data/blogData';

export interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface DB {
  users: UserData[];
  courses: Course[];
  comments: Comment[];
  orders: any[];
  instructors: Instructor[];
  blogPosts: BlogPost[];
  slides: Slide[];
}

const DB_KEY = 'ravankargah_db';

const getDB = (): DB => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    const initialDB: DB = {
      users: [
        {
          fullNameFa: 'مدیر سیستم',
          fullNameEn: 'Admin',
          age: 35,
          gender: 'male',
          education: 'دکتری روانشناسی',
          maritalStatus: 'متاهل',
          mobile: '09197926720',
          nationalCode: '09197926720',
          role: 'admin',
          mcmiStatus: 'none',
          fatherName: 'احمد',
          birthPlace: 'تهران'
        }
      ],
      courses: initialCourses,
      comments: [],
      orders: [],
      instructors: initialInstructors.map(i => ({...i, status: 'active'})),
      blogPosts: initialBlogPosts,
      slides: [
        { id: 's1', title: 'روانـــــــــکارگاه', description: 'مسیر حرفه‌ای شدن در روان‌درمانی.', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3caf?auto=format&fit=crop&q=80&w=1600' }
      ]
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialDB));
    return initialDB;
  }
  return JSON.parse(data);
};

const saveDB = (db: DB) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const delay = (ms: number = 400) => new Promise(res => setTimeout(res, ms));

export const api = {
  auth: {
    login: async (mobile: string, code: string) => {
      await delay();
      const db = getDB();
      const user = db.users.find(u => u.mobile === mobile && u.nationalCode === code);
      if (user) return { success: true, user };
      return { success: false, message: 'نام کاربری یا رمز عبور اشتباه است' };
    },
    register: async (data: UserData) => {
      await delay();
      const db = getDB();
      if (db.users.some(u => u.mobile === data.mobile)) {
        return { success: false, message: 'کاربری با این شماره همراه قبلاً ثبت‌نام کرده است' };
      }
      db.users.push(data);
      saveDB(db);
      return { success: true };
    },
    updateProfile: async (mobile: string, data: Partial<UserData>) => {
      const db = getDB();
      const index = db.users.findIndex(u => u.mobile === mobile);
      if (index !== -1) {
        db.users[index] = { ...db.users[index], ...data };
        saveDB(db);
        return db.users[index];
      }
      return null;
    },
    getAllUsers: () => getDB().users
  },

  courses: {
    getAll: async () => getDB().courses,
    upsert: async (course: Course) => {
      const db = getDB();
      const index = db.courses.findIndex(c => c.id === course.id);
      if (index !== -1) db.courses[index] = course;
      else db.courses.push(course);
      saveDB(db);
      return true;
    },
    delete: async (id: string) => {
      const db = getDB();
      db.courses = db.courses.filter(c => c.id !== id);
      saveDB(db);
      return true;
    }
  },

  instructors: {
    getAll: () => getDB().instructors,
    upsert: (inst: Instructor) => {
      const db = getDB();
      const idx = db.instructors.findIndex(i => i.id === inst.id);
      if (idx !== -1) db.instructors[idx] = inst;
      else db.instructors.push(inst);
      saveDB(db);
    },
    delete: (id: string) => {
      const db = getDB();
      db.instructors = db.instructors.filter(i => i.id !== id);
      saveDB(db);
    }
  },

  blog: {
    getAll: () => getDB().blogPosts,
    upsert: (post: BlogPost) => {
      const db = getDB();
      const idx = db.blogPosts.findIndex(p => p.id === post.id);
      if (idx !== -1) db.blogPosts[idx] = post;
      else db.blogPosts.push(post);
      saveDB(db);
    },
    delete: (id: string) => {
      const db = getDB();
      db.blogPosts = db.blogPosts.filter(p => p.id !== id);
      saveDB(db);
    }
  },

  slides: {
    getAll: () => getDB().slides,
    upsert: (slide: Slide) => {
      const db = getDB();
      const idx = db.slides.findIndex(s => s.id === slide.id);
      if (idx !== -1) db.slides[idx] = slide;
      else db.slides.push(slide);
      saveDB(db);
    },
    delete: (id: string) => {
      const db = getDB();
      db.slides = db.slides.filter(s => s.id !== id);
      saveDB(db);
    }
  },

  comments: {
    add: async (data: Omit<Comment, 'id' | 'status' | 'createdAt'>) => {
      await delay();
      const db = getDB();
      const newComment: Comment = {
        ...data,
        id: 'comm-' + Date.now(),
        status: 'pending',
        createdAt: new Date().toLocaleDateString('fa-IR')
      };
      db.comments.push(newComment);
      saveDB(db);
      return true;
    },
    getByContent: async (contentId: string) => {
      const db = getDB();
      return db.comments.filter(c => c.contentId === contentId && c.status === 'approved');
    },
    getPending: async () => getDB().comments.filter(c => c.status === 'pending'),
    moderate: async (id: string, action: 'approve' | 'delete') => {
      const db = getDB();
      if (action === 'approve') {
        const index = db.comments.findIndex(c => c.id === id);
        if (index !== -1) db.comments[index].status = 'approved';
      } else {
        db.comments = db.comments.filter(c => c.id !== id);
      }
      saveDB(db);
      return true;
    }
  }
};
