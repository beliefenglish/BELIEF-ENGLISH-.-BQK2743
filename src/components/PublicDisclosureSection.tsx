import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  FileText,
  DollarSign,
  Users,
  BookOpen,
  CheckCircle,
  Award,
  MapPin,
  Phone,
  Mail,
  Scale,
  Landmark,
  Sparkles,
  Flame,
  Info,
} from 'lucide-react';
import {
  LEGAL_DISCLOSURE_DATA,
  TUITION_DISCLOSURE_TABLE,
  FINANCIAL_EXPENSE_SUMMARY,
  STAFF_DISCLOSURE_LIST,
  FACILITY_DISCLOSURE_SUMMARY,
  CURRICULUM_DISCLOSURE_LIST,
  ACTIVE_OPERATION_STATISTICS,
} from '../data/publicDisclosureData';
import { PROMOTION_POLICIES } from '../data/coursesData';

interface PublicDisclosureSectionProps {
  onOpenModal?: () => void;
}

export default function PublicDisclosureSection({ onOpenModal }: PublicDisclosureSectionProps) {
  const [activeTab, setActiveTab] = useState<'legal' | 'tuition' | 'staff_facility' | 'curriculum'>('legal');

  return (
    <section
      id="cong-khai-nd81"
      className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Công Khai Minh Bạch Theo Nghị Định Số 81/2021/NĐ-CP & Thông Tư 09/2024/TT-BGDĐT</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1e3a8a] tracking-tight leading-tight">
            Cổng Công Khai Thông Tin Giáo Dục <br className="hidden sm:inline" />
            <span className="text-orange-500">{LEGAL_DISCLOSURE_DATA.centerName}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Thực hiện đúng quy định tại <strong className="text-slate-900">Nghị định số 81/2021/NĐ-CP</strong> của Chính phủ, Công văn số <strong className="text-slate-900">2908/SGDĐT-GDNCL</strong> của Sở Giáo dục và Đào tạo TP.HCM và <strong className="text-slate-900">Thông tư 09/2024/TT-BGDĐT</strong> (thay thế Thông tư 36/2017/TT-BGDĐT), <strong className="text-[#1e3a8a]">{LEGAL_DISCLOSURE_DATA.companyName}</strong> (MST: <strong className="text-orange-600">{LEGAL_DISCLOSURE_DATA.taxCode}</strong>) niêm yết công khai toàn bộ hồ sơ pháp lý, mức thu học phí, chính sách học bổng, đội ngũ giáo viên và điều kiện đảm bảo chất lượng giáo dục.
          </p>
        </div>

        {/* Highlight Banner: 3 Mandatory Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-[#1e3a8a] to-blue-900 text-white p-5 rounded-2xl shadow-md border border-blue-800 flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                Đơn Vị Chủ Quản (Tên Công Ty)
              </div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5 leading-snug">
                {LEGAL_DISCLOSURE_DATA.companyName}
              </div>
              <div className="text-[11px] text-orange-300 font-semibold mt-1">
                Đại diện pháp luật: Ông {LEGAL_DISCLOSURE_DATA.legalRepresentative}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border-2 border-orange-200 flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Mã Số Thuế & Mã Đơn Vị Sở GD&ĐT
              </div>
              <div className="text-lg sm:text-xl font-black text-orange-600 font-mono mt-0.5">
                MST: {LEGAL_DISCLOSURE_DATA.taxCode}
              </div>
              <div className="text-xs text-slate-700 font-bold mt-0.5">
                Mã Trung tâm: <span className="text-[#1e3a8a]">{LEGAL_DISCLOSURE_DATA.centerCode}</span> (Cấp ngày {LEGAL_DISCLOSURE_DATA.businessLicenseDate})
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border-2 border-blue-200 flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Tên Trung Tâm Được Cấp Phép
              </div>
              <div className="text-sm sm:text-base font-black text-[#1e3a8a] mt-0.5 leading-snug">
                {LEGAL_DISCLOSURE_DATA.centerName}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1">
                QĐ thành lập: Số {LEGAL_DISCLOSURE_DATA.establishmentDecision} ({LEGAL_DISCLOSURE_DATA.establishmentDate})
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('legal')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'legal'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'text-slate-600 hover:text-[#1e3a8a] hover:bg-blue-50/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>1. Pháp Lý & Chủ Sở Hữu (Mẫu 01)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tuition')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tuition'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/60'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>2. Học Phí & Học Bổng (NĐ 81/2021)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('staff_facility')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'staff_facility'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'text-slate-600 hover:text-[#1e3a8a] hover:bg-blue-50/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>3. Đội Ngũ GV & Cơ Sở Vật Chất</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'text-slate-600 hover:text-[#1e3a8a] hover:bg-blue-50/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>4. Chương Trình & Giáo Trình</span>
          </button>
        </div>

        {/* TAB 1: THÔNG TIN PHÁP LÝ & ĐƠN VỊ CHỦ QUẢN (MẪU SỐ 01) */}
        {activeTab === 'legal' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                  Biểu mẫu số 01 • Thông tư 21/2018/TT-BGDĐT & Thông tư 09/2024/TT-BGDĐT
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] mt-1">
                  Thông Tin Pháp Lý Chung Về Trung Tâm & Đơn Vị Chủ Quản
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                ✓ Đã phê duyệt bởi Sở GD&ĐT TP.HCM
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Legal Entity Details */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3.5 text-xs sm:text-sm">
                <div className="font-black text-[#1e3a8a] text-sm uppercase tracking-wide border-b border-slate-200 pb-2.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-500" />
                  <span>I. Thông Tin Pháp Nhân & Quyết Định Cấp Phép</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-semibold">Tên trung tâm:</span>
                  <span className="sm:col-span-2 font-black text-[#1e3a8a]">
                    {LEGAL_DISCLOSURE_DATA.centerName} ({LEGAL_DISCLOSURE_DATA.centerFullName})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-semibold">Tên công ty chủ quản:</span>
                  <span className="sm:col-span-2 font-black text-slate-900">
                    {LEGAL_DISCLOSURE_DATA.companyName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-semibold">Mã số thuế / GCNĐKDN:</span>
                  <span className="sm:col-span-2 font-bold text-orange-600 font-mono">
                    {LEGAL_DISCLOSURE_DATA.taxCode} (Cấp ngày {LEGAL_DISCLOSURE_DATA.businessLicenseDate} bởi {LEGAL_DISCLOSURE_DATA.businessLicenseIssuer})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-semibold">Mã định danh Sở GD&ĐT:</span>
                  <span className="sm:col-span-2 font-bold text-slate-800">
                    {LEGAL_DISCLOSURE_DATA.centerCode} — Loại hình: {LEGAL_DISCLOSURE_DATA.centerType}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-semibold">QĐ cho phép thành lập:</span>
                  <span className="sm:col-span-2 font-bold text-emerald-700">
                    Số {LEGAL_DISCLOSURE_DATA.establishmentDecision} cấp ngày {LEGAL_DISCLOSURE_DATA.establishmentDate} ({LEGAL_DISCLOSURE_DATA.establishmentIssuer})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-semibold">QĐ công nhận Giám đốc:</span>
                  <span className="sm:col-span-2 font-bold text-slate-800">
                    Số {LEGAL_DISCLOSURE_DATA.directorDecision} cấp ngày {LEGAL_DISCLOSURE_DATA.directorDecisionDate} (Sở GD&ĐT TP.HCM)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1.5">
                  <span className="text-slate-500 font-semibold">Nguồn vốn đầu tư:</span>
                  <span className="sm:col-span-2 font-semibold text-slate-700">
                    {LEGAL_DISCLOSURE_DATA.investmentType}
                  </span>
                </div>
              </div>

              {/* Right Column: Management, Contact & Shareholders */}
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
                  <div className="font-black text-[#1e3a8a] text-sm uppercase tracking-wide border-b border-slate-200 pb-2.5 flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span>II. Người Đại Diện Pháp Luật & Giám Đốc Trung Tâm</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-semibold">Giám đốc Trung tâm:</span>
                    <span className="sm:col-span-2 font-bold text-slate-900">
                      Ông {LEGAL_DISCLOSURE_DATA.directorName} ({LEGAL_DISCLOSURE_DATA.directorQualification} • Nhiệm kỳ {LEGAL_DISCLOSURE_DATA.directorTerm})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-semibold">Đại diện pháp luật Công ty:</span>
                    <span className="sm:col-span-2 font-bold text-slate-900">
                      Ông {LEGAL_DISCLOSURE_DATA.legalRepresentative} (Giám đốc Công ty)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-semibold">Trụ sở hoạt động:</span>
                    <span className="sm:col-span-2 font-semibold text-slate-800">
                      {LEGAL_DISCLOSURE_DATA.address}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-semibold">Điện thoại / Zalo:</span>
                    <span className="sm:col-span-2 font-bold text-orange-600">
                      {LEGAL_DISCLOSURE_DATA.hotline1} / {LEGAL_DISCLOSURE_DATA.hotline2}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1">
                    <span className="text-slate-500 font-semibold">Email tiếp nhận chính thức:</span>
                    <span className="sm:col-span-2 font-bold text-[#1e3a8a]">
                      {LEGAL_DISCLOSURE_DATA.email} (Hành chính: {LEGAL_DISCLOSURE_DATA.adminEmail})
                    </span>
                  </div>
                </div>

                {/* Mission, Vision & Shareholders */}
                <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-200/80 space-y-3 text-xs">
                  <div className="font-black text-[#1e3a8a] uppercase tracking-wider">
                    III. Sứ Mạng, Tầm Nhìn & Cơ Cấu Cổ Đông Góp Vốn
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <div className="text-[10px] font-bold text-orange-500 uppercase">Sứ mạng hoạt động</div>
                      <div className="font-bold text-slate-900 mt-0.5">“{LEGAL_DISCLOSURE_DATA.mission}”</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <div className="text-[10px] font-bold text-orange-500 uppercase">Tầm nhìn & Phương châm</div>
                      <div className="font-bold text-slate-900 mt-0.5">“{LEGAL_DISCLOSURE_DATA.vision}”</div>
                    </div>
                  </div>
                  <div className="pt-1">
                    <div className="font-bold text-slate-700 mb-1.5">Danh sách cổ đông góp vốn ({LEGAL_DISCLOSURE_DATA.companyName}):</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {LEGAL_DISCLOSURE_DATA.shareholders.map((sh, i) => (
                        <div key={i} className="bg-white px-3 py-2 rounded-lg border border-slate-200 flex items-center justify-between">
                          <span className="font-bold text-slate-800">{sh.name}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-[#1e3a8a] font-black">{sh.ratio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CÔNG KHAI HỌC PHÍ, GIÁ DỊCH VỤ & HỌC BỔNG (NGHỊ ĐỊNH 81/2021/NĐ-CP) */}
        {activeTab === 'tuition' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                  Mục 4 Công văn 2908/SGDĐT-GDNCL • Nghị định số 81/2021/NĐ-CP & Mẫu số 02, 08, 09
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] mt-1">
                  Công Khai Mức Thu Học Phí, Giá Dịch Vụ Giáo Dục & Chính Sách Học Bổng
                </h3>
              </div>
              <div className="text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200 px-3.5 py-2 rounded-xl">
                Cam kết biên độ điều chỉnh học phí: <strong>Không quá 15%/năm</strong> (NĐ 81/2021/NĐ-CP)
              </div>
            </div>

            {/* Key Tuition Rules Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
                <div className="font-black text-[#1e3a8a] uppercase">1. Hình Thức Đào Tạo Công Khai</div>
                <p className="text-slate-700 leading-relaxed">
                  Đào tạo <strong>trực tiếp tại trung tâm</strong> với 100% Giáo viên Việt Nam có trình độ Cử nhân và Chứng chỉ nghiệp vụ sư phạm (Hiện tại: 0 giáo viên nước ngoài).
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-black text-emerald-900 uppercase">2. Phương Thức Thu Học Phí</div>
                <p className="text-slate-700 leading-relaxed">
                  Thu định kỳ theo từng khóa 2 tháng (16 buổi: <strong>2,560,000 đ</strong>), 2 khóa 4 tháng (<strong>5,120,000 đ</strong>) hoặc 3 khóa 6 tháng (<strong>7,680,000 đ</strong>) bằng tiền mặt hoặc chuyển khoản có phiếu thu/biên lai.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="font-black text-amber-900 uppercase">3. Các Khoản Thu Khác & Phụ Đạo</div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Không thu thêm bất kỳ lệ phí nào khác</strong> ngoài học phí và giáo trình niêm yết. Tổ chức dạy kèm, bổ túc học sinh yếu <strong>hoàn toàn miễn phí</strong>.
                </p>
              </div>
            </div>

            {/* Tuition Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-3 text-center">STT</th>
                    <th className="py-3.5 px-4">Chương Trình Đào Tạo</th>
                    <th className="py-3.5 px-3">Mã Khóa</th>
                    <th className="py-3.5 px-3">Độ Tuổi</th>
                    <th className="py-3.5 px-3 text-center">Đơn Giá / Giờ</th>
                    <th className="py-3.5 px-4 text-right">Học Phí 1 Khóa (2 Tháng)</th>
                    <th className="py-3.5 px-4 text-right">Lộ Trình 2 Khóa (4 Tháng)</th>
                    <th className="py-3.5 px-4 text-right">Lộ Trình 3 Khóa (6 Tháng)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {TUITION_DISCLOSURE_TABLE.map(row => (
                    <tr key={row.stt} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-3 text-center font-bold text-slate-500">{row.stt}</td>
                      <td className="py-3.5 px-4 font-bold text-[#1e3a8a]">
                        <div>{row.programName}</div>
                        <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                          {row.trainingMode} • Tổng {row.coursesCount} khóa ({row.sessionsPerCourse} buổi/khóa, {row.hoursPerSession} giờ/buổi)
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-orange-600 whitespace-nowrap">
                        {row.levelCode}
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 font-semibold whitespace-nowrap">{row.ageGroup}</td>
                      <td className="py-3.5 px-3 text-center font-extrabold text-slate-900 whitespace-nowrap">
                        {row.tuitionPerHour}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-orange-600 whitespace-nowrap">
                        {row.tuitionPerCourse2Months}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                        {row.tuition2Courses4Months}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-700 whitespace-nowrap">
                        {row.tuition3Courses6Months}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 7 Scholarship & Fee Exemption Codes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-black text-[#1e3a8a] uppercase tracking-wider">
                <Award className="w-5 h-5 text-orange-500" />
                <span>Chính Sách Học Bổng, Miễn Giảm Học Phí & Hỗ Trợ Học Viên (7 Mã Ưu Đãi Công Khai)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PROMOTION_POLICIES.map(promo => (
                  <div
                    key={promo.code}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1e3a8a] text-white font-mono text-xs font-black">
                        Mã {promo.code}
                      </span>
                      <span className="text-xs font-extrabold text-orange-600">{promo.discount}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mb-1">{promo.title}</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{promo.condition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Transparency Summary (Mẫu 02) */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="text-xs sm:text-sm font-black text-[#1e3a8a] uppercase">
                  Báo Cáo Công Khai Tình Hình Tài Chính & Nghĩa Vụ Ngân Sách (Mẫu số 02)
                </div>
                <span className="text-[11px] text-emerald-700 font-bold">
                  ✓ Chấp hành đầy đủ Thuế Môn bài, Thuế TNDN, Thuế TNCN & Kiểm toán định kỳ
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {FINANCIAL_EXPENSE_SUMMARY.map((f, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                    <span className="text-slate-500 text-[11px] leading-snug">{f.item}</span>
                    <span className="font-black text-[#1e3a8a] text-sm mt-1.5">{f.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ĐỘI NGŨ CÁN BỘ, GIÁO VIÊN & CƠ SỞ VẬT CHẤT (MẪU SỐ 03, 05, 06, 07) */}
        {activeTab === 'staff_facility' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-8 animate-in fade-in duration-200">
            {/* Staff Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                    Biểu mẫu số 05, 06, 07 • Công khai đội ngũ cán bộ quản lý, nhân viên & giáo viên
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] mt-1">
                    Danh Sách Cán Bộ Quản Lý, Nhân Viên & Giáo Viên Cơ Hữu / Thỉnh Giảng
                  </h3>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-[#1e3a8a] border border-blue-200">
                  100% Giáo viên Việt Nam đạt chuẩn Cử nhân & Chứng chỉ NVSP • 0 GV nước ngoài
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse min-w-[820px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-3 text-center">STT</th>
                      <th className="py-3 px-4">Họ và Tên</th>
                      <th className="py-3 px-3">Năm Sinh</th>
                      <th className="py-3 px-3">Phân Nhóm</th>
                      <th className="py-3 px-4">Chức Vụ / Vị Trí Công Tác</th>
                      <th className="py-3 px-4">Trình Độ Chuyên Môn</th>
                      <th className="py-3 px-4">Chứng Chỉ Sư Phạm / Nghiệp Vụ</th>
                      <th className="py-3 px-3">Loại Hợp Đồng & BHXH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {STAFF_DISCLOSURE_LIST.map(st => (
                      <tr key={st.stt} className="hover:bg-blue-50/40">
                        <td className="py-3 px-3 text-center font-bold text-slate-500">{st.stt}</td>
                        <td className="py-3 px-4 font-bold text-[#1e3a8a]">{st.fullName}</td>
                        <td className="py-3 px-3 text-slate-600">{st.birthYear} ({st.gender})</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              st.roleGroup === 'Quản lý'
                                ? 'bg-orange-100 text-orange-800'
                                : st.roleGroup === 'Giáo viên Việt Nam'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {st.roleGroup}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{st.position}</td>
                        <td className="py-3 px-4 text-slate-700 font-semibold">{st.degree}</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">{st.pedagogyCert}</td>
                        <td className="py-3 px-3 text-slate-600">
                          <div>{st.contractType}</div>
                          <div className="text-[10px] font-bold text-emerald-600">{st.socialInsurance}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Facility Section (Mẫu 03) */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                    Biểu mẫu số 03 • Điều kiện cơ sở vật chất, trang thiết bị & An toàn PCCC
                  </span>
                  <h3 className="text-xl font-black text-[#1e3a8a] mt-1">
                    Cơ Sở Vật Chất ({FACILITY_DISCLOSURE_SUMMARY.totalAreaM2} m² • 3 Tầng) & Trang Thiết Bị Giảng Dạy
                  </h3>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  ✓ Đạt chuẩn PCCC (Biên bản ngày 15/09/2025)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-[#1e3a8a] mb-1">Pháp Lý Mặt Bằng & Thời Hạn Thuê</div>
                  <p className="text-slate-600 leading-relaxed">
                    Tổng diện tích: <strong>{FACILITY_DISCLOSURE_SUMMARY.totalAreaM2} m²</strong> ({FACILITY_DISCLOSURE_SUMMARY.buildingScale}). Thời hạn thuê: <strong>{FACILITY_DISCLOSURE_SUMMARY.leaseDuration}</strong>. {FACILITY_DISCLOSURE_SUMMARY.landCertificate}.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-[#1e3a8a] mb-1">An Toàn Phòng Cháy Chữa Cháy</div>
                  <p className="text-slate-600 leading-relaxed">
                    {FACILITY_DISCLOSURE_SUMMARY.fireSafetyRecord}.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-[#1e3a8a] mb-1">Vệ Sinh Trường Học & Niêm Yết</div>
                  <p className="text-slate-600 leading-relaxed">
                    {FACILITY_DISCLOSURE_SUMMARY.sanitationInfo}. {FACILITY_DISCLOSURE_SUMMARY.publicNoticeLocation}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase">
                        <th className="py-2.5 px-3">Phòng Học / Phòng Chức Năng</th>
                        <th className="py-2.5 px-3">Phân Loại</th>
                        <th className="py-2.5 px-3 text-center">Diện Tích</th>
                        <th className="py-2.5 px-3">Vị Trí</th>
                        <th className="py-2.5 px-3">Trang Thiết Bị</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {FACILITY_DISCLOSURE_SUMMARY.rooms.map(rm => (
                        <tr key={rm.stt}>
                          <td className="py-2.5 px-3 font-bold text-[#1e3a8a]">{rm.roomName}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1e3a8a] font-semibold text-[11px]">
                              {rm.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-black text-orange-600">{rm.areaM2} m²</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-700">{rm.floor}</td>
                          <td className="py-2.5 px-3 text-slate-600">{rm.usageNote}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="lg:col-span-4 bg-blue-50/50 rounded-2xl p-4 border border-blue-200/80 space-y-2.5">
                  <div className="text-xs font-black text-[#1e3a8a] uppercase">
                    Thống Kê Thiết Bị Dạy Học (96 Thiết Bị)
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {FACILITY_DISCLOSURE_SUMMARY.equipmentList.map((eq, i) => (
                      <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200">
                        <span className="font-semibold text-slate-700">{eq.name}</span>
                        <span className="font-black text-[#1e3a8a]">
                          {eq.quantity} {eq.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHƯƠNG TRÌNH ĐÀO TẠO, GIÁO TRÌNH & QUY MÔ LỚP HỌC (MẪU SỐ 04) */}
        {activeTab === 'curriculum' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                  Biểu mẫu số 04 • Chương trình giảng dạy, giáo trình & Tài liệu học tập
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] mt-1">
                  Danh Mục 05 Chương Trình & Giáo Trình Đào Tạo Được Cấp Phép
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Nguồn phát hành chính thống: Công ty CP FAHASA
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-3 text-center">STT</th>
                    <th className="py-3 px-4">Tên Chương Trình Giảng Dạy</th>
                    <th className="py-3 px-4">Tên Giáo Trình Sử Dụng (SB & WB)</th>
                    <th className="py-3 px-4">Tác Giả & Nhà Xuất Bản</th>
                    <th className="py-3 px-3 text-center">Kế Hoạch Dạy</th>
                    <th className="py-3 px-3 text-center">Tổng Số Tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {CURRICULUM_DISCLOSURE_LIST.map(cur => (
                    <tr key={cur.stt} className="hover:bg-blue-50/40">
                      <td className="py-3.5 px-3 text-center font-bold text-slate-500">{cur.stt}</td>
                      <td className="py-3.5 px-4 font-bold text-[#1e3a8a]">{cur.programName}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{cur.textbookName}</td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{cur.authorPublisher} (Năm XB: {cur.publishYear})</div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          Đơn vị cung cấp: {cur.distributor}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 whitespace-nowrap">
                        {cur.sessionsPerWeek} • {cur.periodsPerSession} ({cur.minutesPerPeriod}p/tiết)
                      </td>
                      <td className="py-3.5 px-3 text-center font-black text-orange-600 whitespace-nowrap">
                        {cur.totalPeriods} tiết
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Active Classes & Quality Assurance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="text-xs sm:text-sm font-black text-[#1e3a8a] uppercase">
                  Quy Mô Lớp Học & Kết Quả Cấp Chứng Chỉ Quốc Tế Thực Tế
                </div>
                <p className="text-xs text-slate-600">
                  Tổng quy mô đang đào tạo: <strong>{ACTIVE_OPERATION_STATISTICS.totalClasses} lớp học</strong> với <strong>{ACTIVE_OPERATION_STATISTICS.totalStudents} học viên Việt Nam</strong> (Sĩ số tiêu chuẩn 4–12 học viên/lớp đảm bảo tương tác 1-1).
                </p>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {ACTIVE_OPERATION_STATISTICS.classBreakdown.map((cb, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-semibold text-slate-700">{cb.level}</span>
                      <span className="font-black text-[#1e3a8a]">{cb.classes} lớp ({cb.students} HV)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 space-y-3">
                <div className="text-xs sm:text-sm font-black text-emerald-950 uppercase">
                  Cam Kết Chất Lượng Đào Tạo & Phối Hợp Gia Đình – Nhà Trường
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Kiểm tra định kỳ chuẩn hóa:</strong> Tổ chức 01 bài kiểm tra định kỳ (BKTDK) toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết vào buổi thứ 13 & 14 của mỗi khóa học.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sổ liên lạc & Báo cáo phụ huynh:</strong> Gửi video bài nói và nhận xét chi tiết từng buổi học trực tiếp đến phụ huynh qua Zalo/Email.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Hỗ trợ học tập miễn phí:</strong> Tổ chức dạy kèm, bổ túc miễn phí cho các học sinh chưa theo kịp tiến độ hoặc cần củng cố kiến thức trước kỳ thi.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
