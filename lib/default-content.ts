import type { SiteContent } from '../types/content';
import { COURSES_DATA } from '../src/data/coursesData';

export const defaultContent: SiteContent = {
  brand: {
    name: 'Ngoại ngữ Niềm Tin Đông Tăng Long',
    companyName: 'CÔNG TY CỔ PHẦN ĐÀO TẠO QUỐC TẾ BELIS GROUP',
    taxCode: '0318836212',
    centerCode: 'TTNN.TH-1897',
    establishmentDecision: 'Số 2046/QĐ-SGDĐT ngày 10/11/2025 của Sở GD&ĐT TP.HCM',
    directorDecision: 'Số 2105/QĐ-SGDĐT ngày 12/11/2025 của Sở GD&ĐT TP.HCM',
    directorName: 'Nguyễn Đồng Trưởng',
    legalRepresentative: 'Nguyễn Quốc Khánh',
    logoUrl: '',
    address: 'Số 30 đường B1, KDC Đông Tăng Long, Khu phố Phước Lai, Phường Long Phước, TP. Hồ Chí Minh',
    phone: '0377.757.877',
    email: 'beliefenglish.edu@gmail.com',
    facebookUrl: 'https://facebook.com/beliefenglish',
  },
  hero: {
    headline: 'Tiên phong tri thức, hậu vận thành công',
    subtitle:
      'Trung tâm Ngoại ngữ Niềm Tin Đông Tăng Long (Mã TT: TTNN.TH-1897) trực thuộc CÔNG TY CỔ PHẦN ĐÀO TẠO QUỐC TẾ BELIS GROUP (MST: 0318836212) — Tiên phong phương pháp độc quyền BAC và chuẩn khảo thí quốc tế Cambridge.',
    ctaText: 'Đăng ký Test Năng Lực',
    secondaryCtaText: 'Khám Phá Lộ Trình',
  },
  bac: {
    believe:
      'BELIEVE (Niềm tin): Khơi dậy tình yêu ngôn ngữ, xóa bỏ tâm lý sợ hãi, xây dựng sự tự tin tuyệt đối cho học viên ngay từ ngày đầu tiếp cận tiếng Anh.',
    active:
      'ACTIVE (Chủ động): Phương pháp tương tác liên tục, lấy học viên làm trung tâm, phản xạ tự nhiên 100% tiếng Anh thông qua tình huống thực tế và trò chơi trí tuệ.',
    control:
      'CONTROL (Kiểm soát): Đo lường tiến độ khoa học theo chuẩn Cambridge & CEFR quốc tế, cá nhân hóa lộ trình, đảm bảo chuẩn hóa phát âm và ngữ pháp chuẩn xác.',
  },
  courses: COURSES_DATA.map(c => ({
    ...c,
    title: c.name,
    ageGroup: c.badge,
    description: c.targetAudience,
    features: c.highlights,
  })),
  updatedAt: new Date().toISOString(),
};
