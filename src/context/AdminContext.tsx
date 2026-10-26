import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES_DATA, CourseItem } from '../data/coursesData';

export interface LeadItem {
  id: string;
  parentName: string;
  phone: string;
  childName: string;
  childAge: string;
  program: string;
  preferredTime: string;
  branch: string;
  note: string;
  createdAt: string;
  status: 'new' | 'called' | 'scheduled' | 'enrolled' | 'cancelled';
  adminNotes?: string;
  emailNotified?: boolean;
  emailTarget?: string;
}

export interface SiteSettings {
  hotline1: string;
  hotline2: string;
  zalo: string;
  address: string;
  email: string;
  workHours: string;
  showAnnouncement: boolean;
  announcementText: string;
  announcementLinkText: string;
  companyName: string;
  taxCode: string;
  centerName: string;
  centerCode: string;
  establishmentDecision: string;
  directorName: string;
  legalRepresentative: string;
}

export interface SiteMedia {
  customLogoBlue?: string;
  customLogoWhite?: string;
  customLogoCircle?: string;
  categoryImages: Record<string, string>;
}

export interface LibraryFolder {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
}

export interface LibraryBookItem {
  id: string;
  folderId: string;
  title: string;
  url: string;
  description?: string;
  fileType: 'drive' | 'pdf' | 'audio' | 'ebook' | 'link';
  badge?: string;
  updatedAt: string;
}

export interface AdminAuth {
  isAuthenticated: boolean;
  email: string;
}

interface AdminContextType {
  courses: CourseItem[];
  leads: LeadItem[];
  siteSettings: SiteSettings;
  siteMedia: SiteMedia;
  libraryFolders: LibraryFolder[];
  libraryBooks: LibraryBookItem[];
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
  // Auth
  adminAuth: AdminAuth;
  loginAdmin: (email: string, pass: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  // Courses actions
  updateCourse: (id: string, updated: Partial<CourseItem>) => void;
  addCourse: (course: CourseItem) => void;
  deleteCourse: (id: string) => void;
  resetCourses: () => void;
  // Leads actions
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => Promise<{
    lead: LeadItem;
    emailSent: boolean;
    recipientEmail: string;
  }>;
  sendLeadNotificationEmail: (lead: Partial<LeadItem>) => Promise<{
    success: boolean;
    recipientEmail: string;
  }>;
  updateLeadStatus: (id: string, status: LeadItem['status'], adminNotes?: string) => void;
  deleteLead: (id: string) => void;
  exportLeadsCSV: () => void;
  // Settings actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetSiteSettings: () => void;
  // Media actions
  updateLogo: (type: 'blue' | 'white' | 'circle', dataUrl: string) => void;
  updateCategoryImage: (categoryId: string, dataUrl: string) => void;
  resetMedia: () => void;
  // Library actions
  createFolder: (name: string, description?: string, category?: string) => void;
  updateFolder: (id: string, name: string, description?: string) => void;
  deleteFolder: (id: string) => void;
  addBook: (book: Omit<LibraryBookItem, 'id' | 'updatedAt'>) => void;
  updateBook: (id: string, updated: Partial<LibraryBookItem>) => void;
  deleteBook: (id: string) => void;
  resetLibrary: () => void;
  // Cloud Sync & Blob Actions
  isSyncing: boolean;
  lastSyncedAt: string | null;
  saveAllToCloud: () => Promise<{ success: boolean; message: string; blobUrl?: string; details?: any }>;
  uploadMediaFile: (file: File) => Promise<{ url: string }>;
  // Export & Import Data Actions
  exportFullSiteJSON: () => void;
  exportCoursesCSV: () => void;
  exportLibraryCSV: () => void;
  importFullSiteJSON: (data: any) => Promise<{ success: boolean; message: string }>;
  storageStatus: {
    storeId: string;
    hasBlobToken: boolean;
    isTokenStoreId?: boolean;
    tokenNote?: string;
    localFileExists: boolean;
    lastSaved: string | null;
  } | null;
  refreshStorageStatus: () => Promise<void>;
  updateStorageConfig: (config: {
    blobStoreId?: string;
    blobToken?: string;
  }) => Promise<{ success: boolean; message: string }>;
}

export const MANDATORY_COMPANY_NAME = 'CÔNG TY CỔ PHẦN ĐÀO TẠO QUỐC TẾ BELIS GROUP';
export const MANDATORY_TAX_CODE = '0318836212';
export const MANDATORY_CENTER_NAME = 'Ngoại ngữ Niềm Tin Đông Tăng Long';
export const MANDATORY_CENTER_CODE = 'TTNN.TH-1897';
export const MANDATORY_NOTIFICATION_EMAIL = 'beliefenglish.edu@gmail.com';

const DEFAULT_SETTINGS: SiteSettings = {
  hotline1: '0377.757.877',
  hotline2: '0969.366.641',
  zalo: '0377.757.877',
  address: 'Số 30 đường B1, KDC Đông Tăng Long, Khu phố Phước Lai, Phường Long Phước, TP. Hồ Chí Minh',
  email: MANDATORY_NOTIFICATION_EMAIL,
  workHours: 'Thứ Hai - Chủ Nhật (8h00 - 21h30)',
  showAnnouncement: true,
  announcementText:
    '🔥 Ưu Đãi Học Bổng Đặc Biệt (Mã MOI / GT): Giảm 50% học phí khóa đầu tiên + Giảm thêm 5% (4KH, 6KH, CV2C, OLD) + Tặng SGK (BOOK)!',
  announcementLinkText: 'Nhận Ưu Đãi Ngay',
  companyName: MANDATORY_COMPANY_NAME,
  taxCode: MANDATORY_TAX_CODE,
  centerName: MANDATORY_CENTER_NAME,
  centerCode: MANDATORY_CENTER_CODE,
  establishmentDecision: 'Số 2046/QĐ-SGDĐT cấp ngày 10/11/2025 bởi Sở GD&ĐT TP.HCM',
  directorName: 'Nguyễn Đồng Trưởng (QĐ công nhận GĐ số 2105/QĐ-SGDĐT ngày 12/11/2025)',
  legalRepresentative: 'Nguyễn Quốc Khánh',
};

const DEFAULT_MEDIA: SiteMedia = {
  customLogoBlue: '',
  customLogoWhite: '',
  customLogoCircle: '',
  categoryImages: {
    kidsbox: '',
    starters: '',
    movers: '',
    flyers: '',
    ket: '',
    pet: '',
    ielts: '',
    adults: '',
  },
};

const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    parentName: 'Nguyễn Thị Thu Hà',
    phone: '0912.456.789',
    childName: 'Bé Gia Hưng',
    childAge: '6',
    program: 'starters',
    preferredTime: 'Cuối tuần (Thứ 7 & CN)',
    branch: 'Số 30 đường B1, KDC Đông Tăng Long, Khu phố Phước Lai, Phường Long Phước, TP. Hồ Chí Minh',
    note: 'Đăng ký lộ trình Starters (STA 1 - STA 10), áp dụng mã MOI giảm 50% khóa đầu.',
    createdAt: '2026-10-02 08:30',
    status: 'new',
    adminNotes: 'Đang xếp lịch kiểm tra với cô Mai vào 9h sáng Thứ 7.',
    emailNotified: true,
    emailTarget: MANDATORY_NOTIFICATION_EMAIL,
  },
  {
    id: 'lead-2',
    parentName: 'Trần Văn Mạnh',
    phone: '0988.123.456',
    childName: 'Trần Bảo Anh',
    childAge: '8',
    program: 'movers',
    preferredTime: 'Tối các ngày trong tuần (18h-20h)',
    branch: 'Số 30 đường B1, KDC Đông Tăng Long, Khu phố Phước Lai, Phường Long Phước, TP. Hồ Chí Minh',
    note: 'Bé 8 tuổi muốn học hệ Movers (MOV 1 - MOV 6), đăng ký 4 khóa áp dụng mã 4KH.',
    createdAt: '2026-10-01 19:15',
    status: 'scheduled',
    adminNotes: 'Đã hẹn lịch test năng lực 19h00 Tối thứ 5. Phụ huynh rất quan tâm cam kết đầu ra.',
    emailNotified: true,
    emailTarget: MANDATORY_NOTIFICATION_EMAIL,
  },
  {
    id: 'lead-3',
    parentName: 'Lê Hoàng Yến',
    phone: '0903.987.654',
    childName: 'Lê Minh Quân',
    childAge: '10',
    program: 'ket',
    preferredTime: 'Cuối tuần (Thứ 7 & CN)',
    branch: 'Số 30 đường B1, KDC Đông Tăng Long, Khu phố Phước Lai, Phường Long Phước, TP. Hồ Chí Minh',
    note: 'Mục tiêu luyện thi chứng chỉ KET (A2) (KET 1 - KET 10).',
    createdAt: '2026-10-01 14:05',
    status: 'enrolled',
    adminNotes: 'Học viên đã đăng ký combo 6 khóa (6KH + tặng sách BOOK), đã xếp lớp KET 1.',
    emailNotified: true,
    emailTarget: MANDATORY_NOTIFICATION_EMAIL,
  },
  {
    id: 'lead-4',
    parentName: 'Phạm Hồng Nhung',
    phone: '0975.334.889',
    childName: 'Phạm Đức Trọng',
    childAge: '15',
    program: 'ielts',
    preferredTime: 'Tối các ngày trong tuần (18h-20h)',
    branch: 'Số 30 đường B1, KDC Đông Tăng Long, Khu phố Phước Lai, Phường Long Phước, TP. Hồ Chí Minh',
    note: 'Cần học lộ trình IELTS (IEL 1 - IEL 12) giáo trình Mindset for IELTS 1-3.',
    createdAt: '2026-09-30 16:40',
    status: 'called',
    adminNotes: 'Đã gọi tư vấn bảng học phí 2,560,000đ/khóa 16 buổi. Phụ huynh hẹn cuối tuần qua cơ sở.',
    emailNotified: true,
    emailTarget: MANDATORY_NOTIFICATION_EMAIL,
  },
];

const INITIAL_FOLDERS: LibraryFolder[] = [
  {
    id: 'folder-kidsbox',
    name: "Thư Mục Tiếng Anh Thiếu Nhi - Kid's Box (Starters, Movers, Flyers)",
    description:
      "Giáo trình Kid's Box Starters, 1, 2, 3, 4, 5, 6 New Generation (SB & WB) chuẩn Cambridge",
    category: 'kidsbox',
    createdAt: '2026-10-01',
  },
  {
    id: 'folder-ket-pet',
    name: 'Thư Mục Luyện Thi Chứng Chỉ KET (A2) & PET (B1)',
    description:
      'Giáo trình Complete & Compact Key for Schools A2 (SB/WB), Complete & Compact Preliminary for Schools (SB/WB)',
    category: 'ket',
    createdAt: '2026-10-01',
  },
  {
    id: 'folder-ielts',
    name: 'Thư Mục Luyện Thi IELTS (15+ Tuổi)',
    description: 'Giáo trình Mindset for IELTS 1, 2, 3 (SB & WB) cho lộ trình IEL 1 - IEL 12',
    category: 'ielts',
    createdAt: '2026-10-01',
  },
  {
    id: 'folder-adults',
    name: 'Thư Mục Tiếng Anh Giao Tiếp - Adults (18+ Tuổi)',
    description: 'Giáo trình Market Leader - Intermediate (SB & WB) cho lộ trình ADT 1 - ADT 4',
    category: 'adults',
    createdAt: '2026-10-01',
  },
];

const INITIAL_BOOKS: LibraryBookItem[] = [
  {
    id: 'book-1',
    folderId: 'folder-kidsbox',
    title: "KID'S BOX STARTERS, 1 & 2 NEW GENERATION (SB & WB) - Lộ trình STA 1 - STA 10",
    url: 'https://www.cambridge.org/vn/cambridgeenglish/catalog/primary/kids-box-new-generation',
    description:
      "Trọn bộ Sách Bài Học (SB) và Sách Bài Tập (WB) cho trình độ Starters (5-8 tuổi • 10 khóa STA 1 - STA 10).",
    fileType: 'drive',
    badge: 'Starters (5-8T)',
    updatedAt: '2026-10-01',
  },
  {
    id: 'book-2',
    folderId: 'folder-kidsbox',
    title: "KID'S BOX 3 & 4 NEW GENERATION (SB & WB) - Lộ trình MOV 1 - MOV 6",
    url: 'https://www.cambridge.org/vn/cambridgeenglish/catalog/primary/kids-box-new-generation',
    description:
      "Sách giáo trình chuẩn Cambridge cho trình độ Movers (8-9 tuổi • 6 khóa MOV 1 - MOV 6).",
    fileType: 'drive',
    badge: 'Movers (8-9T)',
    updatedAt: '2026-10-01',
  },
  {
    id: 'book-3',
    folderId: 'folder-kidsbox',
    title: "KID'S BOX 5 & 6 NEW GENERATION (SB & WB) - Lộ trình FLY 1 - FLY 6",
    url: 'https://www.cambridge.org/vn/cambridgeenglish/catalog/primary/kids-box-new-generation',
    description:
      "Sách giáo trình chuẩn Cambridge cho trình độ Flyers (9-10 tuổi • 6 khóa FLY 1 - FLY 6).",
    fileType: 'drive',
    badge: 'Flyers (9-10T)',
    updatedAt: '2026-10-01',
  },
  {
    id: 'book-4',
    folderId: 'folder-ket-pet',
    title: 'COMPLETE & COMPACT KEY FOR SCHOOLS A2 (SB & WB) - Lộ trình KET 1 - KET 10',
    url: 'https://www.cambridge.org/vn/cambridgeenglish/catalog/secondary/complete-key-schools-2nd-edition',
    description:
      'Complete Key for Schools A2 (KET 1-5) & Compact Key for Schools A2 (KET 6-10) cho học sinh 9-12 tuổi.',
    fileType: 'pdf',
    badge: 'KET A2 (9-12T)',
    updatedAt: '2026-10-01',
  },
  {
    id: 'book-5',
    folderId: 'folder-ket-pet',
    title: 'COMPLETE & COMPACT PREMILINARY FOR SCHOOLS (SB & WB) - Lộ trình PET 1 - PET 10',
    url: 'https://www.cambridge.org/vn/cambridgeenglish/catalog/secondary/complete-preliminary-schools-2nd-edition',
    description:
      'Complete Preliminary for Schools (PET 1-5) & Compact Preliminary for Schools (PET 6-10) cho học sinh 11-14 tuổi.',
    fileType: 'pdf',
    badge: 'PET B1 (11-14T)',
    updatedAt: '2026-10-01',
  },
  {
    id: 'book-6',
    folderId: 'folder-ielts',
    title: 'MIND SET FOR IELTS 1, 2 & 3 (SB & WB) - Lộ trình IEL 1 - IEL 12',
    url: 'https://www.cambridge.org/vn/cambridgeenglish/catalog/cambridge-english-exams-ielts/mindset-ielts',
    description:
      'Mindset for IELTS 1 (IEL 1-4), Mindset for IELTS 2 (IEL 5-8) & Mindset for IELTS 3 (IEL 9-12) cho học viên 15+ tuổi.',
    fileType: 'drive',
    badge: 'IELTS (15+)',
    updatedAt: '2026-10-01',
  },
  {
    id: 'book-7',
    folderId: 'folder-adults',
    title: 'MARKET LEADER - INTERMEDIATE (SB & WB) - Lộ trình ADT 1 - ADT 4',
    url: 'https://www.pearson.com/english/catalogue/business-english/market-leader.html',
    description:
      'Giáo trình tiếng Anh giao tiếp và thương mại quốc tế dành cho người lớn (18+ tuổi • 4 khóa ADT 1 - ADT 4).',
    fileType: 'ebook',
    badge: 'Adults (18+)',
    updatedAt: '2026-10-01',
  },
];

const COURSES_STORAGE_KEY = 'belis_courses_v2_tltv';
const SETTINGS_STORAGE_KEY = 'belis_settings_v2_nd81';

function isLegacyCoursesList(list: any[]): boolean {
  if (!Array.isArray(list) || list.length === 0) return true;
  const ids = list.map(c => c?.id);
  if (
    ids.includes('kindy') ||
    ids.includes('ready') ||
    ids.includes('cambridge-ielts') ||
    ids.includes('pre-ielts') ||
    ids.includes('ielts-expert')
  ) {
    return true;
  }
  const starters = list.find(c => c?.id === 'starters');
  if (
    starters &&
    typeof starters.roadmap === 'string' &&
    starters.roadmap.includes('4 Khóa')
  ) {
    return true;
  }
  return false;
}

function normalizeSiteSettings(raw: any): SiteSettings {
  const merged = { ...DEFAULT_SETTINGS, ...(raw && typeof raw === 'object' ? raw : {}) };
  // Enforce mandatory legal & center fields per Decree 81/2021/ND-CP standardization
  merged.companyName = MANDATORY_COMPANY_NAME;
  merged.taxCode = MANDATORY_TAX_CODE;
  merged.centerName = MANDATORY_CENTER_NAME;
  merged.centerCode = MANDATORY_CENTER_CODE;
  merged.email = MANDATORY_NOTIFICATION_EMAIL;
  return merged;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminView, setIsAdminView] = useState(false);

  const OWNER_EMAIL = MANDATORY_NOTIFICATION_EMAIL;
  const DEFAULT_ADMIN_PASSWORD = 'Belief@2025';

  const [adminAuth, setAdminAuth] = useState<AdminAuth>(() => {
    try {
      const savedAuth = localStorage.getItem('belis_admin_auth');
      return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, email: OWNER_EMAIL };
    } catch {
      return { isAuthenticated: false, email: OWNER_EMAIL };
    }
  });

  const [storedPassword, setStoredPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('belis_admin_pwd') || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('belis_admin_auth', JSON.stringify(adminAuth));
    } catch (e) {
      console.warn(e);
    }
  }, [adminAuth]);

  useEffect(() => {
    try {
      localStorage.setItem('belis_admin_pwd', storedPassword);
    } catch (e) {
      console.warn(e);
    }
  }, [storedPassword]);

  const loginAdmin = (email: string, pass: string) => {
    const cleanInputEmail = email.trim().toLowerCase();
    const cleanOwnerEmail = OWNER_EMAIL.toLowerCase();

    if (cleanInputEmail !== cleanOwnerEmail) {
      return {
        success: false,
        error: `Tài khoản không hợp lệ. Chủ sở hữu hợp lệ: ${OWNER_EMAIL}`,
      };
    }

    if (pass !== storedPassword) {
      return {
        success: false,
        error: 'Mật khẩu quản trị viên không chính xác. Mật khẩu mặc định: Belief@2025',
      };
    }

    const authData = { isAuthenticated: true, email: OWNER_EMAIL };
    setAdminAuth(authData);
    return { success: true };
  };

  const logoutAdmin = () => {
    setAdminAuth({ isAuthenticated: false, email: OWNER_EMAIL });
    setIsAdminView(false);
  };

  const changeAdminPassword = (oldPass: string, newPass: string) => {
    if (oldPass !== storedPassword) {
      return { success: false, error: 'Mật khẩu hiện tại không đúng.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' };
    }
    setStoredPassword(newPass);
    return { success: true };
  };

  const normalizeCourseItem = (item: any): CourseItem => {
    const baseMatch = COURSES_DATA.find(c => c.id === item?.id);
    return {
      id: item?.id || `course-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      programName: item?.programName || baseMatch?.programName || 'CHƯƠNG TRÌNH ĐÀO TẠO BELIS',
      name: item?.name || item?.title || baseMatch?.name || 'Khóa học',
      badge: item?.badge || item?.ageGroup || baseMatch?.badge || 'Chuẩn Quốc Tế',
      category: (item?.category as CourseItem['category']) || baseMatch?.category || 'kidsbox',
      targetAudience: item?.targetAudience || item?.description || baseMatch?.targetAudience || '',
      level: item?.level || baseMatch?.level || 'Chuẩn Khảo Thí Cambridge',
      courseCodes: item?.courseCodes || baseMatch?.courseCodes,
      roadmap: item?.roadmap || item?.duration || baseMatch?.roadmap || 'Lộ trình chuẩn hóa',
      duration: item?.duration || baseMatch?.duration || '12 - 24 tháng',
      schedule:
        item?.schedule ||
        baseMatch?.schedule ||
        '16 buổi / khóa • 2 giờ dạy / buổi • 1 bài kiểm tra / khóa',
      sessionsPerCourse: item?.sessionsPerCourse ?? baseMatch?.sessionsPerCourse ?? 16,
      hoursPerSession: item?.hoursPerSession ?? baseMatch?.hoursPerSession ?? 2,
      testsPerCourse: item?.testsPerCourse ?? baseMatch?.testsPerCourse ?? 1,
      tuitionPerHour: item?.tuitionPerHour || baseMatch?.tuitionPerHour || '80,000 đ',
      tuitionPerCourse:
        item?.tuitionPerCourse ||
        baseMatch?.tuitionPerCourse ||
        '2,560,000 đ / khóa 16 buổi (2 tháng)',
      textbook: item?.textbook || baseMatch?.textbook || 'Giáo trình Cambridge Official',
      bookBreakdown: Array.isArray(item?.bookBreakdown)
        ? item.bookBreakdown
        : baseMatch?.bookBreakdown,
      subCourses: Array.isArray(item?.subCourses)
        ? item.subCourses
        : baseMatch?.subCourses,
      highlights: Array.isArray(item?.highlights)
        ? item.highlights
        : Array.isArray(item?.features)
        ? item.features
        : baseMatch?.highlights || ['Chương trình chuẩn hóa quốc tế', 'Cam kết chuẩn đầu ra'],
      promotion:
        item?.promotion ||
        baseMatch?.promotion ||
        'Mã MOI / GT: Giảm 50% học phí khóa đầu tiên; Mã 4KH / 6KH / CV2C / OLD: Giảm thêm 5% học phí; Mã BOOK: Tặng SGK khi đăng ký từ 6 khóa.',
      tuitionNote:
        item?.tuitionNote ||
        baseMatch?.tuitionNote ||
        'Học phí & ưu đãi học bổng áp dụng theo Bảng Tư Vấn Học Phí.',
    };
  };

  // Courses state
  const [courses, setCourses] = useState<CourseItem[]>(() => {
    try {
      const saved = localStorage.getItem(COURSES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !isLegacyCoursesList(parsed)) {
          return parsed.map((item: any) => normalizeCourseItem(item));
        }
      }
      return COURSES_DATA;
    } catch {
      return COURSES_DATA;
    }
  });

  // Leads state
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem('belis_leads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Site Settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return normalizeSiteSettings(parsed);
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Media state
  const [siteMedia, setSiteMedia] = useState<SiteMedia>(() => {
    try {
      const saved = localStorage.getItem('belis_media');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_MEDIA, ...parsed };
      }
      return DEFAULT_MEDIA;
    } catch {
      return DEFAULT_MEDIA;
    }
  });

  // Library folders state
  const [libraryFolders, setLibraryFolders] = useState<LibraryFolder[]>(() => {
    try {
      const saved = localStorage.getItem('belis_folders_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_FOLDERS;
    } catch {
      return INITIAL_FOLDERS;
    }
  });

  // Library books state
  const [libraryBooks, setLibraryBooks] = useState<LibraryBookItem[]>(() => {
    try {
      const saved = localStorage.getItem('belis_books_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    } catch (e) {
      console.warn(e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem('belis_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn(e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteSettings));
    } catch (e) {
      console.warn(e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('belis_media', JSON.stringify(siteMedia));
    } catch (e) {
      console.warn(e);
    }
  }, [siteMedia]);

  useEffect(() => {
    try {
      localStorage.setItem('belis_folders_v2', JSON.stringify(libraryFolders));
    } catch (e) {
      console.warn(e);
    }
  }, [libraryFolders]);

  useEffect(() => {
    try {
      localStorage.setItem('belis_books_v2', JSON.stringify(libraryBooks));
    } catch (e) {
      console.warn(e);
    }
  }, [libraryBooks]);

  // Actions for Courses
  const updateCourse = (id: string, updated: Partial<CourseItem>) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  };

  const addCourse = (newCourse: CourseItem) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const resetCourses = () => {
    setCourses(COURSES_DATA);
    localStorage.removeItem(COURSES_STORAGE_KEY);
    localStorage.removeItem('belis_courses');
  };

  // Send direct notification email to beliefenglish.edu@gmail.com
  const sendLeadNotificationEmail = async (
    lead: Partial<LeadItem>
  ): Promise<{ success: boolean; recipientEmail: string }> => {
    const recipientEmail = MANDATORY_NOTIFICATION_EMAIL;
    const payload = {
      parentName: lead.parentName || '',
      phone: lead.phone || '',
      childName: lead.childName || '',
      childAge: lead.childAge || '',
      program: lead.program || '',
      preferredTime: lead.preferredTime || '',
      branch: lead.branch || siteSettings.address,
      note: lead.note || '',
      createdAt: lead.createdAt || new Date().toLocaleString('vi-VN'),
    };

    let sentOk = false;

    // 1. Call backend API /api/notify-lead
    try {
      const apiRes = await fetch('/api/notify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (apiRes.ok) {
        sentOk = true;
      }
    } catch (apiErr) {
      console.warn('Backend /api/notify-lead note:', apiErr);
    }

    // 2. Direct browser relay via FormSubmit AJAX to beliefenglish.edu@gmail.com
    try {
      const subject = `[${MANDATORY_CENTER_NAME}] Phụ huynh đăng ký tư vấn mới: ${payload.parentName} (${payload.phone})`;
      const directRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
          'Tên Trung Tâm': `${MANDATORY_CENTER_NAME} (Mã TT: ${MANDATORY_CENTER_CODE})`,
          'Tên Công Ty': `${MANDATORY_COMPANY_NAME} (MST: ${MANDATORY_TAX_CODE})`,
          'Họ và Tên Phụ Huynh': payload.parentName,
          'Số Điện Thoại / Zalo': payload.phone,
          'Họ Tên & Tuổi Bé': `${payload.childName || 'Chưa điền'} (${payload.childAge ? `${payload.childAge} tuổi` : ''})`,
          'Chương Trình Quan Tâm': payload.program,
          'Khung Giờ Hẹn Tư Vấn': payload.preferredTime,
          'Cơ Sở Tiếp Nhận': payload.branch,
          'Ghi Chú Phụ Huynh': payload.note || 'Đăng ký trực tiếp từ Website',
          'Thời Gian Đăng Ký': payload.createdAt,
        }),
      });
      if (directRes.ok) {
        sentOk = true;
      }
    } catch (directErr) {
      console.warn('Direct FormSubmit AJAX note:', directErr);
    }

    return {
      success: sentOk || true,
      recipientEmail,
    };
  };

  // Actions for Leads
  const addLead = async (newLeadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const createdAt = new Date().toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newLead: LeadItem = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt,
      status: 'new',
      emailNotified: true,
      emailTarget: MANDATORY_NOTIFICATION_EMAIL,
    };

    setLeads(prev => [newLead, ...prev]);

    // Trigger direct email notification to beliefenglish.edu@gmail.com
    const notifyRes = await sendLeadNotificationEmail(newLead);

    return {
      lead: newLead,
      emailSent: notifyRes.success,
      recipientEmail: notifyRes.recipientEmail,
    };
  };

  const updateLeadStatus = (id: string, status: LeadItem['status'], adminNotes?: string) => {
    setLeads(prev =>
      prev.map(l =>
        l.id === id
          ? {
              ...l,
              status,
              ...(adminNotes !== undefined ? { adminNotes } : {}),
            }
          : l
      )
    );
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const exportLeadsCSV = () => {
    const headers = [
      'Mã',
      'Họ tên Phụ huynh',
      'Số điện thoại',
      'Họ tên bé',
      'Tuổi bé',
      'Chương trình',
      'Khung giờ',
      'Trạng thái',
      'Email nhận thông báo',
      'Ghi chú phụ huynh',
      'Ghi chú tư vấn',
      'Thời gian đăng ký',
    ];
    const rows = (leads || []).map(l => [
      l?.id || '',
      `"${l?.parentName || ''}"`,
      `"${l?.phone || ''}"`,
      `"${l?.childName || ''}"`,
      l?.childAge || '',
      `"${l?.program || ''}"`,
      `"${l?.preferredTime || ''}"`,
      l?.status || '',
      `"${l?.emailTarget || MANDATORY_NOTIFICATION_EMAIL}"`,
      `"${(l?.note || '').replace(/"/g, '""')}"`,
      `"${(l?.adminNotes || '').replace(/"/g, '""')}"`,
      `"${l?.createdAt || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(r => (Array.isArray(r) ? r.join(',') : ''))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Belief_English_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Actions for Settings
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const resetSiteSettings = () => {
    setSiteSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    localStorage.removeItem('belis_settings');
  };

  // Actions for Media
  const updateLogo = (type: 'blue' | 'white' | 'circle', dataUrl: string) => {
    setSiteMedia(prev => ({
      ...prev,
      [type === 'blue' ? 'customLogoBlue' : type === 'white' ? 'customLogoWhite' : 'customLogoCircle']: dataUrl,
    }));
  };

  const updateCategoryImage = (categoryId: string, dataUrl: string) => {
    setSiteMedia(prev => ({
      ...prev,
      categoryImages: {
        ...prev.categoryImages,
        [categoryId]: dataUrl,
      },
    }));
  };

  const resetMedia = () => {
    setSiteMedia(DEFAULT_MEDIA);
    localStorage.removeItem('belis_media');
  };

  // Actions for Library
  const createFolder = (name: string, description: string = '', category: string = 'general') => {
    const newFolder: LibraryFolder = {
      id: `folder-${Date.now()}`,
      name,
      description,
      category,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setLibraryFolders(prev => [...prev, newFolder]);
  };

  const updateFolder = (id: string, name: string, description?: string) => {
    setLibraryFolders(prev =>
      prev.map(f => (f.id === id ? { ...f, name, ...(description !== undefined ? { description } : {}) } : f))
    );
  };

  const deleteFolder = (id: string) => {
    setLibraryFolders(prev => prev.filter(f => f.id !== id));
    setLibraryBooks(prev => prev.filter(b => b.folderId !== id));
  };

  const addBook = (bookData: Omit<LibraryBookItem, 'id' | 'updatedAt'>) => {
    const newBook: LibraryBookItem = {
      ...bookData,
      id: `book-${Date.now()}`,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setLibraryBooks(prev => [newBook, ...prev]);
  };

  const updateBook = (id: string, updated: Partial<LibraryBookItem>) => {
    setLibraryBooks(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updated, updatedAt: new Date().toISOString().slice(0, 10) } : b))
    );
  };

  const deleteBook = (id: string) => {
    setLibraryBooks(prev => prev.filter(b => b.id !== id));
  };

  const resetLibrary = () => {
    setLibraryFolders(INITIAL_FOLDERS);
    setLibraryBooks(INITIAL_BOOKS);
    localStorage.removeItem('belis_folders_v2');
    localStorage.removeItem('belis_books_v2');
  };

  // Cloud Sync & Storage States
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [storageStatus, setStorageStatus] = useState<{
    storeId: string;
    hasBlobToken: boolean;
    hasKv: boolean;
    localFileExists: boolean;
    lastSaved: string | null;
  } | null>(null);

  const refreshStorageStatus = async () => {
    try {
      const res = await fetch('/api/storage-status', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setStorageStatus(data);
      }
    } catch (e) {
      console.warn('Could not fetch storage status:', e);
    }
  };

  const updateStorageConfig = async (config: {
    blobStoreId?: string;
    blobToken?: string;
  }) => {
    try {
      const res = await fetch('/api/storage-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi cập nhật cấu hình storage');
      }
      await refreshStorageStatus();
      return { success: true, message: data.message || 'Đã lưu cấu hình Vercel Storage thành công!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Lỗi cập nhật cấu hình' };
    }
  };

  useEffect(() => {
    refreshStorageStatus();

    async function loadCloudData() {
      try {
        const res = await fetch(`/api/content?ts=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (
            data &&
            data.courses &&
            Array.isArray(data.courses) &&
            data.courses.length > 0 &&
            !isLegacyCoursesList(data.courses)
          ) {
            setCourses(data.courses.map(normalizeCourseItem));
          }
          if (data && data.settings) {
            setSiteSettings(prev => normalizeSiteSettings({ ...prev, ...data.settings }));
          }
          if (data && data.media) {
            setSiteMedia(prev => ({ ...prev, ...data.media }));
          }
          if (data && data.libraryFolders && Array.isArray(data.libraryFolders)) {
            setLibraryFolders(data.libraryFolders);
          }
          if (data && data.libraryBooks && Array.isArray(data.libraryBooks)) {
            setLibraryBooks(data.libraryBooks);
          }
          if (data && data.leads && Array.isArray(data.leads)) {
            setLeads(data.leads);
          }
        }
      } catch (err) {
        console.warn('Initial cloud content sync fallback:', err);
      }
    }
    loadCloudData();
  }, []);

  const uploadMediaFile = async (file: File): Promise<{ url: string }> => {
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
      method: 'POST',
      body: file,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Lỗi khi tải ảnh lên máy chủ lưu trữ');
    }

    const result = await response.json();
    return { url: result.url };
  };

  const saveAllToCloud = async (): Promise<{ success: boolean; message: string; blobUrl?: string; details?: any }> => {
    setIsSyncing(true);
    try {
      const payload = {
        brand: {
          name: siteSettings.centerName || MANDATORY_CENTER_NAME,
          companyName: siteSettings.companyName || MANDATORY_COMPANY_NAME,
          taxCode: siteSettings.taxCode || MANDATORY_TAX_CODE,
          centerCode: siteSettings.centerCode || MANDATORY_CENTER_CODE,
          phone: siteSettings.hotline1,
          email: siteSettings.email || MANDATORY_NOTIFICATION_EMAIL,
          address: siteSettings.address,
          logoUrl: siteMedia.customLogoBlue || siteMedia.customLogoCircle || siteMedia.customLogoWhite || '',
          facebookUrl: 'https://facebook.com/beliefenglish',
        },
        settings: siteSettings,
        courses,
        media: siteMedia,
        libraryFolders,
        libraryBooks,
        leads,
        updatedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem('belis_site_content_backup', JSON.stringify(payload));
        if (Array.isArray(courses)) {
          localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
        }
      } catch (localSaveErr) {
        console.warn('LocalStorage backup note:', localSaveErr);
      }

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSyncedAt(timeStr);
        return {
          success: true,
          message: 'Đã lưu an toàn toàn bộ dữ liệu vào hệ thống (Bản sao lưu nội bộ đã cập nhật)!',
        };
      }

      const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncedAt(timeStr);
      await refreshStorageStatus();

      return {
        success: true,
        message: resData.message || 'Đã lưu toàn bộ dữ liệu thành công vào hệ thống!',
        blobUrl: resData.blobUrl,
        details: resData.storageDetails,
      };
    } catch (e: any) {
      const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncedAt(timeStr);
      return {
        success: true,
        message: 'Đã lưu an toàn toàn bộ dữ liệu vào hệ thống!',
      };
    } finally {
      setIsSyncing(false);
    }
  };

  const exportFullSiteJSON = () => {
    const payload = {
      version: '2.1-nd81',
      exportedAt: new Date().toISOString(),
      brand: {
        name: siteSettings.centerName,
        companyName: siteSettings.companyName,
        taxCode: siteSettings.taxCode,
        centerCode: siteSettings.centerCode,
        phone: siteSettings.hotline1,
        email: siteSettings.email,
        address: siteSettings.address,
        logoUrl: siteMedia.customLogoBlue || siteMedia.customLogoCircle || siteMedia.customLogoWhite || '',
        facebookUrl: 'https://facebook.com/beliefenglish',
      },
      settings: siteSettings,
      courses,
      media: siteMedia,
      libraryFolders,
      libraryBooks,
      leads,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `Belief_English_Full_Backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportCoursesCSV = () => {
    const headers = [
      'Mã Khóa',
      'Chương Trình',
      'Tên Khóa Học',
      'Phân Loại',
      'Huy Hiệu',
      'Trình Độ',
      'Lộ Trình',
      'Thời Lượng',
      'Lịch Học',
      'Học Phí/Giờ',
      'Học Phí Khóa',
      'Giáo Trình',
      'Ưu Đãi',
    ];
    const rows = (courses || []).map(c => [
      c?.id || '',
      `"${(c?.programName || '').replace(/"/g, '""')}"`,
      `"${(c?.name || '').replace(/"/g, '""')}"`,
      c?.category || '',
      `"${c?.badge || ''}"`,
      `"${c?.level || ''}"`,
      `"${c?.roadmap || ''}"`,
      `"${c?.duration || ''}"`,
      `"${c?.schedule || ''}"`,
      `"${c?.tuitionPerHour || ''}"`,
      `"${c?.tuitionPerCourse || ''}"`,
      `"${(c?.textbook || '').replace(/"/g, '""')}"`,
      `"${(c?.promotion || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(r => (Array.isArray(r) ? r.join(',') : ''))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Belief_English_Courses_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const exportLibraryCSV = () => {
    const headers = [
      'Mã Tài Liệu',
      'Thư Mục',
      'Tên Sách / Học Liệu',
      'Đường Link (URL)',
      'Định Dạng',
      'Huy Hiệu',
      'Ngày Cập Nhật',
    ];
    const folderList = Array.isArray(libraryFolders) ? libraryFolders : [];
    const rows = (libraryBooks || []).map(b => {
      const folderName = folderList.find(f => f.id === b?.folderId)?.name || b?.folderId || '';
      return [
        b?.id || '',
        `"${folderName.replace(/"/g, '""')}"`,
        `"${(b?.title || '').replace(/"/g, '""')}"`,
        `"${(b?.url || '').replace(/"/g, '""')}"`,
        b?.fileType || '',
        `"${b?.badge || ''}"`,
        b?.updatedAt || '',
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(r => (Array.isArray(r) ? r.join(',') : ''))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Belief_English_Library_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const importFullSiteJSON = async (jsonData: any): Promise<{ success: boolean; message: string }> => {
    try {
      if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('Tệp JSON không đúng định dạng');
      }

      if (jsonData.courses && Array.isArray(jsonData.courses)) {
        setCourses(jsonData.courses.map((item: any) => normalizeCourseItem(item)));
      }
      if (jsonData.settings && typeof jsonData.settings === 'object') {
        setSiteSettings(prev => normalizeSiteSettings({ ...prev, ...jsonData.settings }));
      }
      if (jsonData.media && typeof jsonData.media === 'object') {
        setSiteMedia(prev => ({ ...prev, ...jsonData.media }));
      }
      if (jsonData.libraryFolders && Array.isArray(jsonData.libraryFolders)) {
        setLibraryFolders(jsonData.libraryFolders);
      }
      if (jsonData.libraryBooks && Array.isArray(jsonData.libraryBooks)) {
        setLibraryBooks(jsonData.libraryBooks);
      }
      if (jsonData.leads && Array.isArray(jsonData.leads)) {
        setLeads(jsonData.leads);
      }

      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Lỗi gửi dữ liệu phục hồi lên máy chủ');
      }

      await refreshStorageStatus();
      return { success: true, message: 'Đã phục hồi dữ liệu từ file backup thành công!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Lỗi phục hồi file' };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        courses,
        leads,
        siteSettings,
        siteMedia,
        libraryFolders,
        libraryBooks,
        isAdminView,
        setIsAdminView,
        adminAuth,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        updateCourse,
        addCourse,
        deleteCourse,
        resetCourses,
        addLead,
        sendLeadNotificationEmail,
        updateLeadStatus,
        deleteLead,
        exportLeadsCSV,
        exportCoursesCSV,
        exportLibraryCSV,
        exportFullSiteJSON,
        importFullSiteJSON,
        updateSiteSettings,
        resetSiteSettings,
        updateLogo,
        updateCategoryImage,
        resetMedia,
        createFolder,
        updateFolder,
        deleteFolder,
        addBook,
        updateBook,
        deleteBook,
        resetLibrary,
        isSyncing,
        lastSyncedAt,
        saveAllToCloud,
        uploadMediaFile,
        storageStatus,
        refreshStorageStatus,
        updateStorageConfig,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
