import type { SiteContent } from '../types/content';
import { COURSES_DATA } from '../src/data/coursesData';

export const defaultContent: SiteContent = {
  brand: {
    name: 'Belief English - BELIS GROUP',
    logoUrl: '',
    address: '30 đường B1, KDC Đông Tăng Long, Phường Long Phước, TP. Thủ Đức, TP. HCM',
    phone: '0377.757.877',
    email: 'beliefenglish.edu@gmail.com',
    facebookUrl: 'https://facebook.com/beliefenglish',
  },
  hero: {
    headline: 'Tiên phong tri thức, hậu vận thành công',
    subtitle:
      'Hệ sinh thái học tập toàn diện khơi dậy niềm tin và phát triển thế hệ tương lai với phương pháp độc quyền BAC và chuẩn khảo thí quốc tế Cambridge.',
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
