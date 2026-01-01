
/* Fix: Added ScoreReport, UserData, and UserInfo interfaces to types.ts to centralize domain types and resolve import errors in api.ts */
export interface ScoreReport {
  rawScores: Record<string, number>;
  baseRates: Record<string, number>;
  adjustedScores: Record<string, any>;
  xScore: number;
  testDate?: string;
}

export interface UserData {
  fullNameFa: string;
  fullNameEn: string;
  fatherName: string;
  birthPlace: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
  age: number;
  gender: 'male' | 'female' | '';
  education: string;
  maritalStatus: string;
  mobile: string; 
  nationalCode: string; 
  role: 'admin' | 'user';
  mcmiStatus?: 'none' | 'approved';
  mcmiReport?: ScoreReport | null;
  city?: string;
}

export interface UserInfo {
  name: string;
  code: string;
  age: number;
  gender: 'male' | 'female';
  education: string;
  maritalStatus: string;
  inpatientStatus: '1' | '2' | '3' | '4' | '5';
}

export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  specialties: string[];
  academicBackground?: string[];
  fullBio?: string;
  workshops?: string[];
  status?: 'active' | 'inactive';
}

export interface Course {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  category: string;
  durationHours: number;
  sessions?: number;
  image: string;
  hasCertificate: boolean;
  certificateProvider?: string;
  isOnline: boolean;
  mode: string;
  installmentsAvailable: boolean;
  installmentsCount?: number; 
  rating?: number;
  description?: string;
  syllabus?: (string | SyllabusModule)[];
  price?: number;
  schedule?: string[];
  paymentInfo?: {
    cardNumber: string;
    cardHolder: string;
  };
  installmentsInfo?: string;
  objectives?: string[];
  prerequisites?: string[];
}

export interface Category {
  id: string;
  title: string;
  count: number;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}
