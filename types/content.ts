import { BookStageItem, SubCourseRow } from '../src/data/coursesData';

export interface BrandInfo {
  name: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
}

export interface HeroSection {
  headline: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
}

export interface BACMethodology {
  believe: string;
  active: string;
  control: string;
}

export interface Course {
  id: string;
  title: string;
  ageGroup: string;
  duration: string;
  description: string;
  features: string[];
  programName?: string;
  name?: string;
  badge?: string;
  category?: 'kidsbox' | 'cambridge' | 'ket' | 'pet' | 'ielts' | 'adults' | 'kindy' | 'ready' | string;
  targetAudience?: string;
  level?: string;
  courseCodes?: string;
  roadmap?: string;
  schedule?: string;
  sessionsPerCourse?: number;
  hoursPerSession?: number;
  testsPerCourse?: number;
  tuitionPerHour?: string;
  tuitionPerCourse?: string;
  textbook?: string;
  bookBreakdown?: BookStageItem[];
  subCourses?: SubCourseRow[];
  highlights?: string[];
  promotion?: string;
  tuitionNote?: string;
}

export interface SiteContent {
  brand: BrandInfo;
  hero: HeroSection;
  bac: BACMethodology;
  courses: Course[];
  updatedAt: string;
}
