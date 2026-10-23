import React from 'react';
import {
  FileText,
  UserCheck,
  TrendingUp,
  Award,
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import BeliefLogo from './BeliefLogo';

interface AdvisorySectionProps {
  onOpenConsultation: () => void;
}

export default function AdvisorySection({ onOpenConsultation }: AdvisorySectionProps) {
  const steps = [
    {
      step: '01',
      title: 'Khảo Sát Nhu Cầu & Mục Tiêu',
      desc: 'Lắng nghe mong muốn của phụ huynh và học viên về mục tiêu học tập, cải thiện điểm số trường lớp hay thi chứng chỉ quốc tế.',
      icon: FileText,
      color: 'bg-blue-50 text-[#1e3a8a]',
    },
    {
      step: '02',
      title: 'Kiểm Tra Năng Lực 4 Kỹ Năng 1-1',
      desc: 'Bài kiểm tra chuyên sâu Nghe - Nói - Đọc - Viết cùng giáo viên chuyên môn chuẩn Cambridge để định vị chính xác trình độ và lỗ hổng kiến thức.',
      icon: UserCheck,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      step: '03',
      title: 'Hoạch Định Lộ Trình & Xếp Lớp',
      desc: 'Tư vấn lộ trình học tối ưu theo từng giai đoạn (STA, MOV, FLY, KET, PET, IEL, ADT), xếp lớp đúng độ tuổi và năng lực thực tế.',
      icon: TrendingUp,
      color: 'bg-blue-50 text-[#1e3a8a]',
    },
    {
      step: '04',
      title: 'Trải Nghiệm Phương Pháp BAC',
      desc: 'Tham gia buổi học thử trực quan với phương pháp độc quyền Believe - Active - Control, làm quen với lớp học và thầy cô.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      step: '05',
      title: 'Áp Dụng Ưu Đãi & Bàn Giao Học Liệu',
      desc: 'Áp dụng mã ưu đãi học phí (MOI, GT, 4KH, 6KH, CV2C, OLD) và tặng SGK (mã BOOK khi đăng ký từ 6 khóa), cam kết chuẩn đầu ra.',
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  // Bảng Ma Trận đồng bộ 100% với BẢNG TƯ VẤN HỌC PHÍ - TÀI LIỆU TƯ VẤN
  const levelsMatrix = [
    {
      ageGroup: '5 - 8 Tuổi (Thiếu nhi)',
      program: "Tiếng Anh Thiếu Nhi (Kid's Box) - STARTERS (10 khóa: STA 1 - STA 10)",
      cefr: '16 buổi/khóa • 2 giờ/buổi • 80,000đ/giờ (2,560,000đ/khóa)',
      focus: "Giáo trình: Kid's Box Starters New Generation (STA 1-2), Kid's Box 1 (STA 3-6) & Kid's Box 2 (STA 7-10) (SB & WB).",
      tag: '160 Buổi • 20 Tháng',
    },
    {
      ageGroup: '8 - 9 Tuổi (Thiếu nhi)',
      program: "Tiếng Anh Thiếu Nhi (Kid's Box) - MOVERS (6 khóa: MOV 1 - MOV 6)",
      cefr: '16 buổi/khóa • 2 giờ/buổi • 80,000đ/giờ (2,560,000đ/khóa)',
      focus: "Giáo trình: Kid's Box 3 New Generation (MOV 1-3) & Kid's Box 4 New Generation (MOV 4-6) (SB & WB).",
      tag: '96 Buổi • 12 Tháng',
    },
    {
      ageGroup: '9 - 10 Tuổi (Thiếu nhi)',
      program: "Tiếng Anh Thiếu Nhi (Kid's Box) - FLYERS (6 khóa: FLY 1 - FLY 6)",
      cefr: '16 buổi/khóa • 2 giờ/buổi • 80,000đ/giờ (2,560,000đ/khóa)',
      focus: "Giáo trình: Kid's Box 5 New Generation (FLY 1-3) & Kid's Box 6 New Generation (FLY 4-6) (SB & WB).",
      tag: '96 Buổi • 12 Tháng',
    },
    {
      ageGroup: '9 - 12 Tuổi (THCS)',
      program: 'Luyện Thi Chứng Chỉ KET (A2) (10 khóa: KET 1 - KET 10)',
      cefr: '16 buổi/khóa • 2 giờ/buổi • 80,000đ/giờ (2,560,000đ/khóa)',
      focus: 'Giáo trình: Complete Key for Schools A2 (KET 1-5) & Compact Key for Schools A2 (KET 6-10) (SB & WB).',
      tag: '160 Buổi • 20 Tháng',
    },
    {
      ageGroup: '11 - 14 Tuổi (THCS)',
      program: 'Luyện Thi Chứng Chỉ PET (B1) (10 khóa: PET 1 - PET 10)',
      cefr: '16 buổi/khóa • 2 giờ/buổi • 80,000đ/giờ (2,560,000đ/khóa)',
      focus: 'Giáo trình: Complete Preliminary for Schools (PET 1-5) & Compact Preliminary for Schools (PET 6-10) (SB & WB).',
      tag: '160 Buổi • 20 Tháng',
    },
    {
      ageGroup: '15+ Tuổi (THPT & SV)',
      program: 'Luyện Thi IELTS (12 khóa: IEL 1 - IEL 12)',
      cefr: '16 buổi/khóa • 2 giờ/buổi • 80,000đ/giờ (2,560,000đ/khóa)',
      focus: 'Giáo trình: Mindset for IELTS 1 (IEL 1-4), Mindset for IELTS 2 (IEL 5-8) & Mindset for IELTS 3 (IEL 9-12) (SB & WB).',
      tag: '192 Buổi • 24 Tháng',
    },
    {
      ageGroup: '18+ Tuổi (Người lớn)',
      program: 'Tiếng Anh Giao Tiếp - ADULTS (4 khóa: ADT 1 - ADT 4)',
      cefr: '24 buổi/khóa • 2 giờ/buổi • 60,000đ/giờ (2,880,000đ/khóa)',
      focus: 'Giáo trình: Market Leader - Intermediate (SB & WB). Thực hành giao tiếp thương mại và công sở.',
      tag: '96 Buổi • 4 Khóa',
    },
  ];

  return (
    <section id="bang-tu-van" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BeliefLogo variant="circle" size="sm" />
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
              Quy Trình Tiếp Nhận & Khảo Thí Chuẩn Mực
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e3a8a] tracking-tight">
            Bảng Tư Vấn & Quy Trình Đào Tạo BELIS
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Mỗi học viên tại Belief English đều được thiết kế kế hoạch học tập chuẩn hóa theo Bảng Tư Vấn Học Phí, đảm bảo đúng điểm xuất phát và đạt chuẩn cam kết đầu ra.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {(steps || []).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-orange-500 transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#1e3a8a] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Age & Level Matrix Table */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a]">
                Bảng Ma Trận Phân Bổ Cấp Độ, Học Phí & Giáo Trình Theo Lứa Tuổi
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Đồng bộ chính xác theo Bảng Tư Vấn Học Phí - Tài Liệu Tư Vấn Belief English (1 bài kiểm tra định kỳ / khóa)
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Cam Kết 100% Chuẩn Đầu Ra
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Độ Tuổi & Cấp Độ</th>
                  <th className="py-3 px-4">Chương Trình & Mã Khóa</th>
                  <th className="py-3 px-4">Thời Lượng & Học Phí</th>
                  <th className="py-3 px-4">Giáo Trình Chính Thức (SB & WB)</th>
                  <th className="py-3 px-4 text-center">Tổng Lộ Trình</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-xs">
                {(levelsMatrix || []).map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {row.ageGroup}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#1e3a8a]">
                      {row.program}
                    </td>
                    <td className="py-4 px-4 font-semibold text-orange-600 whitespace-nowrap">
                      {row.cefr}
                    </td>
                    <td className="py-4 px-4 text-slate-600 max-w-sm">
                      {row.focus}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-blue-100 text-[#1e3a8a] whitespace-nowrap">
                        {row.tag}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advisory Action Banner */}
        <div className="bg-gradient-to-r from-[#1e3a8a] via-blue-900 to-[#0f172a] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left max-w-2xl">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              Tư Vấn Miễn Phí 24/7 Cùng Chuyên Viên BELIS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Quý phụ huynh cần tư vấn xếp lớp & nhận thông tin học bổng?
            </h3>
            <p className="text-sm text-blue-100 font-normal leading-relaxed">
              Liên hệ ngay qua Hotline hoặc Zalo chính thức của Belief English để được hỗ trợ kiểm tra trình độ và nhận bảng tư vấn lộ trình chi tiết nhất.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-200 pt-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Hotline: 0377.757.877 / 0969.366.641
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Zalo: 0377.757.877
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Cơ sở KDC Đông Tăng Long
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="https://zalo.me/0377757877"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Zalo Ngay (0377.757.877)</span>
            </a>
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Đăng Ký Test 1-1 Miễn Phí</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
