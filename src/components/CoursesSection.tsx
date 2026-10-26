import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Gift,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Table,
  Award,
  Coins,
} from 'lucide-react';
import { CourseItem, PROMOTIONS_DATA } from '../data/coursesData';
import { useAdmin } from '../context/AdminContext';

interface CoursesSectionProps {
  onSelectCourse: (course: CourseItem) => void;
}

export default function CoursesSection({ onSelectCourse }: CoursesSectionProps) {
  const { courses, siteMedia } = useAdmin();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [showFullTuitionTable, setShowFullTuitionTable] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Tất Cả Khóa Học (7 Trình Độ • 58 Khóa)' },
    { id: 'kidsbox', label: "Tiếng Anh Thiếu Nhi - Kid's Box (5-10T)" },
    { id: 'ket', label: 'Luyện Thi KET A2 (9-12T)' },
    { id: 'pet', label: 'Luyện Thi PET B1 (11-14T)' },
    { id: 'ielts', label: 'Luyện Thi IELTS (15+)' },
    { id: 'adults', label: 'Tiếng Anh Giao Tiếp - Adults (18+)' },
  ];

  const filteredCourses = (courses || []).filter(course => {
    if (!course) return false;
    const courseName = course.name || (course as any).title || '';
    const programName = course.programName || '';
    const courseLevel = course.level || '';
    const courseBadge = course.badge || (course as any).ageGroup || '';
    const courseCat = course.category || 'all';

    let matchesCategory = activeCategory === 'all' || courseCat === activeCategory;
    if (!matchesCategory && activeCategory === 'kidsbox') {
      matchesCategory =
        courseCat === 'cambridge' ||
        ['starters', 'movers', 'flyers'].includes(course.id);
    }
    if (!matchesCategory && (activeCategory === 'ket' || activeCategory === 'pet')) {
      matchesCategory = course.id === activeCategory;
    }

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      courseName.toLowerCase().includes(q) ||
      programName.toLowerCase().includes(q) ||
      courseLevel.toLowerCase().includes(q) ||
      courseBadge.toLowerCase().includes(q) ||
      (course.textbook || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const formatVND = (amount: number) =>
    new Intl.NumberFormat('vi-VN').format(amount) + ' đ';

  return (
    <section id="khoa-hoc" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1e3a8a] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Bảng Tư Vấn Học Phí & Lộ Trình Chuẩn BELIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e3a8a] tracking-tight">
            Khóa Học, Lộ Trình & Ưu Đãi Học Bổng
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Hệ thống 5 chương trình • 7 trình độ • 58 khóa học chuẩn hóa quốc tế từ{' '}
            <strong className="text-[#1e3a8a]">Tiếng Anh Thiếu Nhi (Kid&apos;s Box: Starters, Movers, Flyers)</strong>,{' '}
            <strong className="text-[#1e3a8a]">KET (A2)</strong>, <strong className="text-[#1e3a8a]">PET (B1)</strong>,{' '}
            <strong className="text-[#1e3a8a]">IELTS (15+)</strong> đến{' '}
            <strong className="text-[#1e3a8a]">Tiếng Anh Giao Tiếp (Adults 18+)</strong>.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {(categories || []).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-900/25 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Highlight Banner: Official Tuition & Scholarship Summary */}
        <div className="mb-10 bg-gradient-to-r from-amber-50 via-orange-50/70 to-blue-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between flex-col lg:flex-row gap-4 shadow-xs">
          <div className="flex items-start sm:items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-[#1e3a8a]">
                Chính Sách Học Phí Minh Bạch & Ưu Đãi Học Bổng Lên Đến 50%
              </h4>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                Học phí tiêu chuẩn: <strong>80,000 đ/giờ (2,560,000 đ / khóa 16 buổi - 2 tháng)</strong> cho các hệ Thiếu nhi, KET, PET, IELTS •{' '}
                <strong>60,000 đ/giờ (2,880,000 đ / khóa 24 buổi)</strong> cho hệ Giao tiếp Adults.{' '}
                Ưu đãi <strong>Giảm 50% khóa đầu tiên (Mã MOI / GT)</strong>, cộng dồn ưu đãi <strong>5% (4KH, 6KH, CV2C, OLD)</strong> & <strong>Tặng SGK (BOOK)</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-stretch lg:self-auto justify-end">
            <a
              href="#bang-uu-dai-hoc-bong"
              className="text-xs font-extrabold text-orange-800 bg-white hover:bg-orange-50 px-3.5 py-2.5 rounded-xl border border-orange-200 shadow-2xs transition-colors whitespace-nowrap"
            >
              Xem 7 Mã Ưu Đãi
            </a>
            <button
              type="button"
              onClick={() => setShowFullTuitionTable(!showFullTuitionTable)}
              className="text-xs font-extrabold text-white bg-[#1e3a8a] hover:bg-blue-900 px-3.5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Table className="w-3.5 h-3.5" />
              <span>{showFullTuitionTable ? 'Thu Gọn Bảng 58 Khóa' : 'Xem Bảng 58 Khóa Chi Tiết'}</span>
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(filteredCourses || []).map((course, cIdx) => {
            if (!course) return null;
            const courseId = course?.id || `course-${cIdx}`;
            const programName = course?.programName || 'CHƯƠNG TRÌNH ĐÀO TẠO BELIS';
            const courseName = course?.name || (course as any)?.title || 'Khóa Học Ngoại ngữ Niềm Tin Đông Tăng Long';
            const courseBadge = course?.badge || (course as any)?.ageGroup || 'Chuẩn Quốc Tế';
            const courseLevel = course?.level || 'Đạt Chuẩn Đầu Ra';
            const courseRoadmap = course?.roadmap || 'Lộ trình chuẩn hóa';
            const courseDuration = course?.duration || 'Theo lộ trình';
            const courseSchedule = course?.schedule || '16 buổi / khóa • 2 giờ / buổi • 1 kiểm tra';
            const courseTextbook = course?.textbook || 'Cambridge Official';
            const coursePromotion =
              course?.promotion ||
              'Mã MOI/GT: Giảm 50% khóa đầu; Mã 4KH/6KH/CV2C/OLD: Giảm thêm 5%; Mã BOOK: Tặng SGK.';
            const tuitionPerHour =
              course?.tuitionPerHour || (course.id === 'adults' ? '60,000 đ' : '80,000 đ');
            const tuitionPerCourse =
              course?.tuitionPerCourse ||
              (course.id === 'adults'
                ? '2,880,000 đ / khóa (24 buổi)'
                : '2,560,000 đ / khóa 16 buổi (2 tháng)');
            const bookBreakdown = Array.isArray(course?.bookBreakdown)
              ? course.bookBreakdown
              : [];
            const subCourses = Array.isArray(course?.subCourses) ? course.subCourses : [];
            const courseHighlights: string[] = Array.isArray(course?.highlights)
              ? course.highlights
              : Array.isArray((course as any)?.features)
              ? (course as any).features
              : [];

            const customImg =
              siteMedia?.categoryImages?.[courseId] ||
              siteMedia?.categoryImages?.[course?.category];
            const isExpanded = expandedCourseId === courseId;

            return (
              <div
                key={courseId}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Uploaded Course / Category Image (if exists) */}
                  {customImg && (
                    <div className="w-full h-36 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-2">
                      <img
                        src={customImg}
                        alt={courseName}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Header Tag & Badge */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#1e3a8a] border border-blue-100">
                      {courseBadge}
                    </span>
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-100">
                      {programName}
                    </span>
                  </div>

                  {/* Course Name */}
                  <h3 className="text-xl font-black text-[#1e3a8a] group-hover:text-blue-800 transition-colors leading-snug">
                    {courseName}
                  </h3>

                  {/* Level & Tuition Highlight Box */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2">
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                        Trình Độ & Mã Khóa (LEVEL / COURSE)
                      </div>
                      <div className="font-extrabold text-slate-800 mt-0.5">{courseLevel}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">
                          Học phí / giờ
                        </span>
                        <span className="text-sm font-black text-[#1e3a8a]">
                          {tuitionPerHour}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">
                          {course.id === 'adults' ? 'Học phí 24 buổi' : 'Học phí 16 buổi (2 tháng)'}
                        </span>
                        <span className="text-sm font-black text-orange-600">
                          {tuitionPerCourse.replace(/ \/ khóa.*$/, '')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Course Specifications */}
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Lộ trình:</strong> {courseRoadmap} ({courseDuration})
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#1e3a8a] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Thời lượng & Kiểm tra:</strong> {courseSchedule}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <strong className="text-slate-900">Giáo trình (Sách 1 SB & Sách 2 WB):</strong>
                        {bookBreakdown.length > 0 ? (
                          <div className="mt-1.5 space-y-1.5">
                            {bookBreakdown.map((b, bIdx) => (
                              <div
                                key={bIdx}
                                className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px]"
                              >
                                <div className="font-extrabold text-emerald-900">
                                  • {b.courses}:
                                </div>
                                <div className="text-slate-700 pl-2">
                                  <span className="font-semibold">SB:</span> {b.studentBook}
                                </div>
                                <div className="text-slate-600 pl-2">
                                  <span className="font-semibold">WB:</span> {b.workbook}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span> {courseTextbook}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Sub-Courses Table per Card */}
                  {subCourses.length > 0 && (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCourseId(isExpanded ? null : courseId)
                        }
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-[#1e3a8a] font-bold text-xs flex items-center justify-between transition-colors cursor-pointer border border-slate-200/80"
                      >
                        <span>
                          {isExpanded
                            ? `Ẩn danh sách ${subCourses.length} khóa chi tiết`
                            : `Xem chi tiết từng khóa (${subCourses[0]?.courseCode} → ${
                                subCourses[subCourses.length - 1]?.courseCode
                              })`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 rounded-xl border border-slate-200 overflow-hidden bg-white">
                          <div className="max-h-60 overflow-y-auto">
                            <table className="w-full text-left border-collapse text-[11px]">
                              <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0">
                                <tr>
                                  <th className="py-1.5 px-2">Khóa</th>
                                  <th className="py-1.5 px-2 text-center">Buổi</th>
                                  <th className="py-1.5 px-2 text-center">Giờ/B</th>
                                  <th className="py-1.5 px-2 text-right">Học phí</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {subCourses.map(sc => (
                                  <tr key={sc.courseCode} className="hover:bg-blue-50/40">
                                    <td className="py-1.5 px-2 font-extrabold text-[#1e3a8a]">
                                      {sc.courseCode}
                                    </td>
                                    <td className="py-1.5 px-2 text-center">{sc.sessions}</td>
                                    <td className="py-1.5 px-2 text-center">{sc.hoursPerSession}h</td>
                                    <td className="py-1.5 px-2 text-right font-bold text-orange-600">
                                      {formatVND(sc.tuitionPerCourse)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Highlights List */}
                  {courseHighlights.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Điểm Nổi Bật:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {(courseHighlights || []).map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Promotion & Gift Box */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3.5 rounded-2xl border border-orange-100 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-orange-800 font-extrabold text-[11px] uppercase tracking-wide">
                      <Gift className="w-3.5 h-3.5 text-orange-500" />
                      <span>Ưu Đãi & Học Bổng Áp Dụng:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {coursePromotion}
                    </p>
                  </div>
                </div>

                {/* Action Zone */}
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Kiểm tra định kỳ: 1 bài / khóa
                    </span>
                    <span className="text-orange-600 font-bold">
                      Giảm 50% khóa đầu (MOI/GT)
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#1e3a8a] hover:bg-orange-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Nhận Báo Giá & Ưu Đãi Học Bổng</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FULL 58-COURSE TUITION & TEXTBOOK TABLE (Collapsible or Toggled) */}
        {showFullTuitionTable && (
          <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                  Dữ Liệu Nguyên Bản • BẢNG TƯ VẤN HỌC PHÍ
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] mt-0.5">
                  Bảng Chi Tiết Toàn Bộ 58 Khóa Học, Học Phí & Giáo Trình (Sách 1 & Sách 2)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullTuitionTable(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold self-start sm:self-auto cursor-pointer"
              >
                Thu Gọn Bảng
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[960px] text-xs">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white font-bold uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-3 rounded-tl-xl">Chương Trình</th>
                    <th className="py-3 px-3">Trình Độ (Level)</th>
                    <th className="py-3 px-2 text-center">Mã Số</th>
                    <th className="py-3 px-3">Khóa Học</th>
                    <th className="py-3 px-2 text-center">Số Buổi</th>
                    <th className="py-3 px-2 text-center">Giờ/Buổi</th>
                    <th className="py-3 px-2 text-center">Kiểm Tra</th>
                    <th className="py-3 px-3 text-right">Học Phí/Giờ</th>
                    <th className="py-3 px-3 text-right">Học Phí Khóa</th>
                    <th className="py-3 px-3">Sách 1 (Student&apos;s Book)</th>
                    <th className="py-3 px-3 rounded-tr-xl">Sách 2 (Workbook)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {(courses || []).map(course =>
                    (course.subCourses || []).map((sc, sIdx) => (
                      <tr key={`${course.id}-${sc.courseCode}`} className="hover:bg-blue-50/40">
                        <td className="py-2.5 px-3 font-bold text-slate-700">
                          {sIdx === 0 ? course.programName || course.name : ''}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-[#1e3a8a]">
                          {sIdx === 0 ? course.level : ''}
                        </td>
                        <td className="py-2.5 px-2 text-center font-semibold text-slate-500">
                          {sc.codeNumber}
                        </td>
                        <td className="py-2.5 px-3 font-extrabold text-[#1e3a8a]">
                          {sc.courseCode}
                        </td>
                        <td className="py-2.5 px-2 text-center font-semibold">{sc.sessions}</td>
                        <td className="py-2.5 px-2 text-center">{sc.hoursPerSession}</td>
                        <td className="py-2.5 px-2 text-center">{sc.tests}</td>
                        <td className="py-2.5 px-3 text-right font-semibold text-slate-700">
                          {formatVND(sc.tuitionPerHour)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-black text-orange-600">
                          {formatVND(sc.tuitionPerCourse)}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-medium">{sc.studentBook}</td>
                        <td className="py-2.5 px-3 text-slate-600">{sc.workbook}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* OFFICIAL SCHOLARSHIP & PROMOTION TABLE (A108:L115 - BẢNG TƯ VẤN HỌC PHÍ) */}
        <div
          id="bang-uu-dai-hoc-bong"
          className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-600 mb-1">
                <Award className="w-4 h-4 text-orange-500" />
                <span>Chính Sách Ưu Đãi & Học Bổng Chính Thức</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a]">
                Bảng Mã Ưu Đãi Học Phí & Quà Tặng Giáo Trình (BẢNG TƯ VẤN HỌC PHÍ)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Áp dụng chính thức cho học viên đăng ký lộ trình tại Trung tâm Ngoại ngữ Niềm Tin Đông Tăng Long
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-orange-100 text-orange-800 border border-orange-200">
                7 Mã Ưu Đãi Chính Thức
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-36">Nhóm</th>
                  <th className="py-3.5 px-4 w-28 text-center">Mã Code</th>
                  <th className="py-3.5 px-4">Điều Kiện Ưu Đãi</th>
                  <th className="py-3.5 px-4 w-80">Chương Trình Ưu Đãi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-xs sm:text-sm">
                {PROMOTIONS_DATA.map((promo, idx) => (
                  <tr key={promo.code} className="hover:bg-orange-50/40 transition-colors">
                    <td className="py-4 px-4 font-black text-slate-800 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                          promo.group === 'GIẢM GIÁ'
                            ? 'bg-blue-50 text-[#1e3a8a] border border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        {promo.group}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-xl font-mono font-black text-xs sm:text-sm bg-orange-500 text-white shadow-2xs">
                        {promo.code}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium leading-relaxed">
                      {promo.condition}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-[#1e3a8a] leading-snug">
                        {promo.benefit}
                      </div>
                      {promo.note && (
                        <div className="text-[11px] text-orange-700 font-semibold mt-1">
                          ({promo.note})
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
