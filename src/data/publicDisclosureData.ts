export interface LegalDisclosureInfo {
  centerName: string;
  centerFullName: string;
  centerCode: string;
  companyName: string;
  taxCode: string;
  businessLicenseDate: string;
  businessLicenseIssuer: string;
  centerType: string;
  investmentType: string;
  establishmentDecision: string;
  establishmentDate: string;
  establishmentIssuer: string;
  directorDecision: string;
  directorDecisionDate: string;
  directorName: string;
  directorBirthYear: string;
  directorQualification: string;
  directorTerm: string;
  legalRepresentative: string;
  legalRepPhone: string;
  legalRepEmail: string;
  address: string;
  ward: string;
  city: string;
  hotline1: string;
  hotline2: string;
  zalo: string;
  email: string;
  adminEmail: string;
  portalSystem: string;
  mission: string;
  vision: string;
  shareholders: Array<{
    name: string;
    capital: string;
    ratio: string;
  }>;
}

export interface TuitionDisclosureRow {
  stt: number;
  programName: string;
  levelCode: string;
  ageGroup: string;
  trainingMode: string;
  coursesCount: number;
  sessionsPerCourse: number;
  hoursPerSession: number;
  tuitionPerHour: string;
  tuitionPerCourse2Months: string;
  tuition2Courses4Months: string;
  tuition3Courses6Months: string;
  otherFees: string;
}

export interface StaffDisclosureRow {
  stt: number;
  fullName: string;
  birthYear: string;
  gender: string;
  roleGroup: 'Quản lý' | 'Nhân viên' | 'Giáo viên Việt Nam';
  position: string;
  degree: string;
  pedagogyCert: string;
  contractType: string;
  socialInsurance: string;
}

export interface FacilityRoomRow {
  stt: number;
  roomName: string;
  category: 'Phòng học' | 'Phòng chức năng';
  areaM2: number;
  floor: string;
  usageNote: string;
}

export interface CurriculumDisclosureRow {
  stt: number;
  programName: string;
  textbookName: string;
  authorPublisher: string;
  publishYear: string;
  distributor: string;
  sessionsPerWeek: string;
  periodsPerSession: string;
  minutesPerPeriod: number;
  totalPeriods: number;
}

export const LEGAL_DISCLOSURE_DATA: LegalDisclosureInfo = {
  centerName: 'Ngoại ngữ Niềm Tin Đông Tăng Long',
  centerFullName: 'Trung tâm Ngoại ngữ Niềm Tin Đông Tăng Long',
  centerCode: 'TTNN.TH-1897',
  companyName: 'CÔNG TY CỔ PHẦN ĐÀO TẠO QUỐC TẾ BELIS GROUP',
  taxCode: '0318836212',
  businessLicenseDate: '15/02/2025',
  businessLicenseIssuer: 'Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh',
  centerType: 'Trung tâm ngoại ngữ, tin học',
  investmentType: 'Vốn đầu tư trong nước (Quốc gia: Việt Nam)',
  establishmentDecision: '2046/QĐ-SGDĐT',
  establishmentDate: '10/11/2025',
  establishmentIssuer: 'Sở Giáo dục và Đào tạo Thành phố Hồ Chí Minh',
  directorDecision: '2105/QĐ-SGDĐT',
  directorDecisionDate: '12/11/2025',
  directorName: 'Nguyễn Đồng Trưởng',
  directorBirthYear: '19/2001',
  directorQualification: 'Cử nhân Ngôn ngữ Anh',
  directorTerm: '2025 – 2026',
  legalRepresentative: 'Nguyễn Quốc Khánh',
  legalRepPhone: '0377.757.877',
  legalRepEmail: 'benqk2743@gmail.com',
  address: 'Số 30 đường B1, Khu nhà ở thấp tầng Thủ Thiêm (KDC Đông Tăng Long), Khu phố Phước Lai, Phường Long Phước, TP. Hồ Chí Minh',
  ward: 'Phường Long Phước',
  city: 'Thành phố Hồ Chí Minh',
  hotline1: '0377.757.877',
  hotline2: '0969.366.641',
  zalo: '0377.757.877',
  email: 'beliefenglish.edu@gmail.com',
  adminEmail: 'beli.dtl.hcm@gmail.com',
  portalSystem: 'https://quanlyncl.hcm.edu.vn (Mã đơn vị: TTNN.TH-1897)',
  mission: 'Phát triển doanh nghiệp để phát triển thế hệ',
  vision: 'Tiên phong tri thức, hậu vận thành công',
  shareholders: [
    { name: 'Nguyễn Quốc Khánh', capital: '20.000.000 VNĐ', ratio: '20%' },
    { name: 'Nguyễn Quốc Học', capital: '40.000.000 VNĐ', ratio: '40%' },
    { name: 'Nguyễn Thị Mai', capital: '40.000.000 VNĐ', ratio: '40%' },
  ],
};

export const TUITION_DISCLOSURE_TABLE: TuitionDisclosureRow[] = [
  {
    stt: 1,
    programName: "Chương trình tiếng Anh thiếu nhi (KID'S BOX) - STARTERS",
    levelCode: 'STA 1 – STA 10',
    ageGroup: '5 – 8 tuổi',
    trainingMode: 'Trực tiếp (100% GVVN)',
    coursesCount: 10,
    sessionsPerCourse: 16,
    hoursPerSession: 2,
    tuitionPerHour: '80,000 đ/giờ',
    tuitionPerCourse2Months: '2,560,000 đ / khóa (16 buổi)',
    tuition2Courses4Months: '5,120,000 đ / 2 khóa (32 buổi)',
    tuition3Courses6Months: '7,680,000 đ / 3 khóa (48 buổi)',
    otherFees: 'Không thu thêm lệ phí ngoài học phí & giáo trình niêm yết',
  },
  {
    stt: 2,
    programName: "Chương trình tiếng Anh thiếu nhi (KID'S BOX) - MOVERS",
    levelCode: 'MOV 1 – MOV 6',
    ageGroup: '8 – 9 tuổi',
    trainingMode: 'Trực tiếp (100% GVVN)',
    coursesCount: 6,
    sessionsPerCourse: 16,
    hoursPerSession: 2,
    tuitionPerHour: '80,000 đ/giờ',
    tuitionPerCourse2Months: '2,560,000 đ / khóa (16 buổi)',
    tuition2Courses4Months: '5,120,000 đ / 2 khóa (32 buổi)',
    tuition3Courses6Months: '7,680,000 đ / 3 khóa (48 buổi)',
    otherFees: 'Không thu thêm lệ phí ngoài học phí & giáo trình niêm yết',
  },
  {
    stt: 3,
    programName: "Chương trình tiếng Anh thiếu nhi (KID'S BOX) - FLYERS",
    levelCode: 'FLY 1 – FLY 6',
    ageGroup: '9 – 10 tuổi',
    trainingMode: 'Trực tiếp (100% GVVN)',
    coursesCount: 6,
    sessionsPerCourse: 16,
    hoursPerSession: 2,
    tuitionPerHour: '80,000 đ/giờ',
    tuitionPerCourse2Months: '2,560,000 đ / khóa (16 buổi)',
    tuition2Courses4Months: '5,120,000 đ / 2 khóa (32 buổi)',
    tuition3Courses6Months: '7,680,000 đ / 3 khóa (48 buổi)',
    otherFees: 'Không thu thêm lệ phí ngoài học phí & giáo trình niêm yết',
  },
  {
    stt: 4,
    programName: 'Chương trình tiếng Anh luyện thi KET (Cambridge A2 Key)',
    levelCode: 'KET 1 – KET 10',
    ageGroup: '9 – 12 tuổi',
    trainingMode: 'Trực tiếp (100% GVVN)',
    coursesCount: 10,
    sessionsPerCourse: 16,
    hoursPerSession: 2,
    tuitionPerHour: '80,000 đ/giờ',
    tuitionPerCourse2Months: '2,560,000 đ / khóa (16 buổi)',
    tuition2Courses4Months: '5,120,000 đ / 2 khóa (32 buổi)',
    tuition3Courses6Months: '7,680,000 đ / 3 khóa (48 buổi)',
    otherFees: 'Không thu thêm lệ phí ngoài học phí & giáo trình niêm yết',
  },
  {
    stt: 5,
    programName: 'Chương trình tiếng Anh luyện thi PET (Cambridge B1 Preliminary)',
    levelCode: 'PET 1 – PET 10',
    ageGroup: '11 – 14 tuổi',
    trainingMode: 'Trực tiếp (100% GVVN)',
    coursesCount: 10,
    sessionsPerCourse: 16,
    hoursPerSession: 2,
    tuitionPerHour: '80,000 đ/giờ',
    tuitionPerCourse2Months: '2,560,000 đ / khóa (16 buổi)',
    tuition2Courses4Months: '5,120,000 đ / 2 khóa (32 buổi)',
    tuition3Courses6Months: '7,680,000 đ / 3 khóa (48 buổi)',
    otherFees: 'Không thu thêm lệ phí ngoài học phí & giáo trình niêm yết',
  },
  {
    stt: 6,
    programName: 'Chương trình tiếng Anh luyện thi IELTS',
    levelCode: 'IEL 1 – IEL 12',
    ageGroup: '15+ tuổi',
    trainingMode: 'Trực tiếp (100% GVVN)',
    coursesCount: 12,
    sessionsPerCourse: 16,
    hoursPerSession: 2,
    tuitionPerHour: '80,000 đ/giờ',
    tuitionPerCourse2Months: '2,560,000 đ / khóa (16 buổi)',
    tuition2Courses4Months: '5,120,000 đ / 2 khóa (32 buổi)',
    tuition3Courses6Months: '7,680,000 đ / 3 khóa (48 buổi)',
    otherFees: 'Không thu thêm lệ phí ngoài học phí & giáo trình niêm yết',
  },
  {
    stt: 7,
    programName: 'Chương trình tiếng Anh giao tiếp (ADULTS)',
    levelCode: 'ADT 1 – ADT 4',
    ageGroup: '18+ tuổi',
    trainingMode: 'Trực tiếp (100% GVVN)',
    coursesCount: 4,
    sessionsPerCourse: 24,
    hoursPerSession: 2,
    tuitionPerHour: '60,000 đ/giờ',
    tuitionPerCourse2Months: '2,880,000 đ / khóa (24 buổi)',
    tuition2Courses4Months: '5,760,000 đ / 2 khóa (48 buổi)',
    tuition3Courses6Months: '8,640,000 đ / 3 khóa (72 buổi)',
    otherFees: 'Không thu thêm lệ phí ngoài học phí & giáo trình niêm yết',
  },
];

export const FINANCIAL_EXPENSE_SUMMARY = [
  { item: 'Chi tiền lương, thù lao cán bộ quản lý, giáo viên & nhân viên', amount: '425,689,802 VNĐ' },
  { item: 'Chi thuê dịch vụ phục vụ trực tiếp cho hoạt động giáo dục', amount: '216,000,000 VNĐ' },
  { item: 'Chi trang thiết bị phục vụ giảng dạy', amount: '28,050,000 VNĐ' },
  { item: 'Chi bảo dưỡng, sửa chữa và vận hành cơ sở vật chất', amount: '22,725,000 VNĐ' },
  { item: 'Chi mua sắm học liệu, vật tư văn phòng', amount: '21,516,030 VNĐ' },
  { item: 'Chi phí hoạt động khác', amount: '14,302,000 VNĐ' },
  { item: 'Số dư quỹ hiện tại', amount: '13,447,003 VNĐ' },
];

export const STAFF_DISCLOSURE_LIST: StaffDisclosureRow[] = [
  {
    stt: 1,
    fullName: 'Nguyễn Đồng Trưởng',
    birthYear: '19/2001',
    gender: 'Nam',
    roleGroup: 'Quản lý',
    position: 'Giám đốc Trung tâm (QĐ số 2105/QĐ-SGDĐT)',
    degree: 'Cử nhân Ngôn ngữ Anh',
    pedagogyCert: 'Đạt chuẩn quản lý & chuyên môn',
    contractType: 'Hợp đồng lao động (Nhiệm kỳ 2025–2026)',
    socialInsurance: 'Đóng BHXH đầy đủ',
  },
  {
    stt: 2,
    fullName: 'Mai Phương Thảo',
    birthYear: '1988',
    gender: 'Nữ',
    roleGroup: 'Nhân viên',
    position: 'Kế toán trưởng',
    degree: 'Cử nhân',
    pedagogyCert: 'Nghiệp vụ kế toán - tài chính',
    contractType: 'Hợp đồng lao động',
    socialInsurance: 'Đóng BHXH đầy đủ',
  },
  {
    stt: 3,
    fullName: 'Nguyễn Quốc Khánh',
    birthYear: '2003',
    gender: 'Nam',
    roleGroup: 'Nhân viên',
    position: 'Ghi danh - Lễ tân / Người đại diện pháp luật Công ty',
    degree: 'Cử nhân',
    pedagogyCert: 'Tư vấn & quản trị giáo dục',
    contractType: 'Hợp đồng lao động',
    socialInsurance: 'Theo quy định doanh nghiệp',
  },
  {
    stt: 4,
    fullName: 'Nguyễn Bảo Long',
    birthYear: '1997',
    gender: 'Nam',
    roleGroup: 'Giáo viên Việt Nam',
    position: 'Giáo viên Tiếng Anh',
    degree: 'Cử nhân Quản lý',
    pedagogyCert: 'Có chứng chỉ nghiệp vụ sư phạm',
    contractType: 'Thỉnh giảng',
    socialInsurance: 'Đóng BHXH đầy đủ',
  },
  {
    stt: 5,
    fullName: 'Mai Thị Thanh Hương',
    birthYear: '1998',
    gender: 'Nữ',
    roleGroup: 'Giáo viên Việt Nam',
    position: 'Giáo viên Tiếng Anh',
    degree: 'Cử nhân Ngôn ngữ Anh',
    pedagogyCert: 'Có chứng chỉ nghiệp vụ sư phạm',
    contractType: 'Thỉnh giảng',
    socialInsurance: 'Đóng BHXH đầy đủ',
  },
];

export const FACILITY_DISCLOSURE_SUMMARY = {
  totalAreaM2: 221.5,
  buildingScale: 'Nhà 3 tầng kiên cố (Tầng trệt, Tầng 1, Tầng 2)',
  leaseDuration: '07 năm (Từ ngày 04/03/2025 đến ngày 30/06/2031)',
  landCertificate: 'Giấy chứng nhận QSDĐ số CS77239/DA do Sở Tài nguyên và Môi trường TP.HCM cấp ngày 08/07/2022',
  fireSafetyRecord: 'Biên bản kiểm tra an toàn PCCC ngày 15/09/2025 của Phòng Cảnh sát PCCC & CNCH (1 lối thoát hiểm thông thoáng, 3 đèn chiếu sáng sự cố, 6 bình chữa cháy hạn sử dụng đến năm 2029)',
  sanitationInfo: '02 nhà vệ sinh riêng biệt cho Nam và Nữ, hệ thống chiếu sáng, quạt và máy lạnh đầy đủ tại tất cả các phòng',
  publicNoticeLocation: 'Niêm yết công khai trực tiếp tại Khu vực Tiếp tân (Tầng trệt - 30 m²) và trên cổng thông tin điện tử chính thức của Trung tâm',
  rooms: [
    {
      stt: 1,
      roomName: 'Phòng học ngoại ngữ 01',
      category: 'Phòng học',
      areaM2: 30,
      floor: 'Tầng trệt',
      usageNote: 'Trang bị Tivi tương tác, bảng từ, bàn ghế tiêu chuẩn, máy lạnh',
    },
    {
      stt: 2,
      roomName: 'Phòng học ngoại ngữ 02',
      category: 'Phòng học',
      areaM2: 20,
      floor: 'Tầng 1',
      usageNote: 'Trang bị Tivi tương tác, bảng từ, bàn ghế tiêu chuẩn, máy lạnh',
    },
    {
      stt: 3,
      roomName: 'Phòng học ngoại ngữ 03',
      category: 'Phòng học',
      areaM2: 30,
      floor: 'Tầng 1',
      usageNote: 'Trang bị Tivi tương tác, máy chiếu, bảng từ, bàn ghế tiêu chuẩn',
    },
    {
      stt: 4,
      roomName: 'Phòng tiếp tân, ghi danh & khu vực niêm yết công khai',
      category: 'Phòng chức năng',
      areaM2: 30,
      floor: 'Tầng trệt',
      usageNote: 'Tiếp đón phụ huynh, tư vấn học vụ và niêm yết văn bản pháp lý, học phí',
    },
    {
      stt: 5,
      roomName: 'Phòng thư viện & học liệu',
      category: 'Phòng chức năng',
      areaM2: 6.2,
      floor: 'Tầng 2',
      usageNote: 'Lưu trữ sách giáo trình Cambridge, tài liệu tham khảo và máy tính tra cứu',
    },
    {
      stt: 6,
      roomName: 'Phòng Giáo viên & Giám đốc',
      category: 'Phòng chức năng',
      areaM2: 8,
      floor: 'Tầng 2',
      usageNote: 'Điều hành chuyên môn, họp hội đồng sư phạm và lưu trữ hồ sơ',
    },
  ] as FacilityRoomRow[],
  equipmentList: [
    { name: 'Bàn học sinh tiêu chuẩn', quantity: 26, unit: 'Cái' },
    { name: 'Ghế học sinh tiêu chuẩn', quantity: 55, unit: 'Cái' },
    { name: 'Bảng viết chống lóa', quantity: 5, unit: 'Cái' },
    { name: 'Tivi màn hình lớn giảng dạy', quantity: 5, unit: 'Cái' },
    { name: 'Máy tính quản lý & giảng dạy', quantity: 3, unit: 'Bộ' },
    { name: 'Máy chiếu đa năng', quantity: 1, unit: 'Cái' },
    { name: 'Máy in tài liệu học tập', quantity: 1, unit: 'Cái' },
  ],
};

export const CURRICULUM_DISCLOSURE_LIST: CurriculumDisclosureRow[] = [
  {
    stt: 1,
    programName: "Chương trình tiếng Anh thiếu nhi (KID'S BOX - Starters, Movers, Flyers)",
    textbookName: "Kid's Box Starter & Kid's Box 1, 2, 3, 4, 5, 6 New Generation (SB & WB)",
    authorPublisher: 'Caroline Nixon, Michael Tomlinson — NXB Đại học Cambridge (Cambridge University Press)',
    publishYear: '2023',
    distributor: 'Công ty Cổ phần Phát hành Sách TP.HCM (FAHASA)',
    sessionsPerWeek: '2 buổi / tuần',
    periodsPerSession: '2 tiết / buổi',
    minutesPerPeriod: 45,
    totalPeriods: 712,
  },
  {
    stt: 2,
    programName: 'Chương trình tiếng Anh luyện thi KET (A2 Key for Schools)',
    textbookName: 'Complete Key for Schools A2 & Compact Key for Schools A2 (SB & WB)',
    authorPublisher: 'David McKeegan, Emma Heyderman — NXB Đại học Cambridge',
    publishYear: '2019',
    distributor: 'Công ty Cổ phần Phát hành Sách TP.HCM (FAHASA)',
    sessionsPerWeek: '2 buổi / tuần',
    periodsPerSession: '2 tiết / buổi',
    minutesPerPeriod: 45,
    totalPeriods: 260,
  },
  {
    stt: 3,
    programName: 'Chương trình tiếng Anh luyện thi PET (B1 Preliminary for Schools)',
    textbookName: 'Complete Preliminary for Schools & Compact Preliminary for Schools (SB & WB)',
    authorPublisher: 'Emma Heyderman, Peter May — NXB Đại học Cambridge',
    publishYear: '2019',
    distributor: 'Công ty Cổ phần Phát hành Sách TP.HCM (FAHASA)',
    sessionsPerWeek: '2 buổi / tuần',
    periodsPerSession: '2 tiết / buổi',
    minutesPerPeriod: 45,
    totalPeriods: 200,
  },
  {
    stt: 4,
    programName: 'Chương trình tiếng Anh luyện thi IELTS',
    textbookName: 'Mindset for IELTS Foundation, Level 1, Level 2, Level 3 (SB & WB)',
    authorPublisher: 'Greg Archer, Lucy Passmore, Marc Loewenthal — Cambridge University Press',
    publishYear: '2017',
    distributor: 'Công ty Cổ phần Phát hành Sách TP.HCM (FAHASA)',
    sessionsPerWeek: '2 buổi / tuần',
    periodsPerSession: '2 tiết / buổi',
    minutesPerPeriod: 45,
    totalPeriods: 288,
  },
  {
    stt: 5,
    programName: 'Chương trình tiếng Anh giao tiếp (ADULTS)',
    textbookName: 'Market Leader - Intermediate (3rd Edition - SB & WB)',
    authorPublisher: 'David Cotton, David Falvey, Simon Kent — NXB Thời đại / Pearson',
    publishYear: '2010',
    distributor: 'Công ty Cổ phần Phát hành Sách TP.HCM (FAHASA)',
    sessionsPerWeek: '3 buổi / tuần',
    periodsPerSession: '2 tiết / buổi',
    minutesPerPeriod: 45,
    totalPeriods: 252,
  },
];

export const ACTIVE_OPERATION_STATISTICS = {
  totalClasses: 9,
  totalStudents: 40,
  foreignStudents: 0,
  foreignTeachers: 0,
  classBreakdown: [
    { level: 'Tiếng Anh Thiếu nhi - Starters', classes: 6, students: 23 },
    { level: 'Tiếng Anh Thiếu nhi - Movers', classes: 1, students: 7 },
    { level: 'Tiếng Anh Thiếu nhi - Flyers', classes: 1, students: 8 },
    { level: 'Luyện thi chứng chỉ IELTS', classes: 1, students: 2 },
  ],
  certificatesAchieved: [
    { cert: 'Chứng chỉ Cambridge Flyers', count: 3 },
    { cert: 'Chứng chỉ Quốc tế IELTS', count: 1 },
  ],
};
