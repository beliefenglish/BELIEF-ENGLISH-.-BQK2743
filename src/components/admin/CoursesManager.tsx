import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  CheckCircle,
  Clock,
  Calendar,
  Gift,
  X,
  Save,
  Loader2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { CourseItem } from '../../data/coursesData';

export default function CoursesManager() {
  const { courses, updateCourse, addCourse, deleteCourse, resetCourses, saveAllToCloud, isSyncing } = useAdmin();
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form state for editing or creating
  const [formData, setFormData] = useState<Partial<CourseItem>>({});

  const handleStartEdit = (course: CourseItem) => {
    setEditingCourse(course);
    setFormData({ ...course });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !formData.name) return;
    updateCourse(editingCourse.id, formData);
    setEditingCourse(null);
    await saveAllToCloud();
    setToastMsg('Đã cập nhật và lưu khóa học thành công!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleStartAdd = () => {
    setFormData({
      id: `course-${Date.now()}`,
      programName: "TIẾNG ANH THIẾU NHI (KID'S BOX)",
      name: '',
      badge: 'Mới',
      category: 'kidsbox',
      targetAudience: '',
      level: '',
      roadmap: '10 Khóa học • 160 buổi học (16 buổi / khóa)',
      duration: '20 tháng (2 tháng / khóa 16 buổi)',
      schedule: '16 buổi / khóa • 2 giờ dạy / buổi • 1 bài kiểm tra / khóa',
      tuitionPerHour: '80,000 đ',
      tuitionPerCourse: '2,560,000 đ / khóa 16 buổi (2 tháng)',
      textbook: '',
      highlights: ['Chương trình chuẩn hóa quốc tế', 'Giáo viên giàu kinh nghiệm', 'Cam kết chuẩn đầu ra'],
      promotion:
        'Mã MOI / GT: Giảm 50% học phí khóa đầu tiên; Mã 4KH / 6KH / CV2C / OLD: Giảm thêm 5% học phí; Mã BOOK: Tặng SGK khi đăng ký từ 6 khóa.',
      tuitionNote:
        'Học phí: 80,000 đ/giờ • 2,560,000 đ / khóa 16 buổi (2 tháng). Áp dụng ưu đãi học bổng theo Bảng Tư Vấn Học Phí.',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.id) return;
    addCourse(formData as CourseItem);
    setIsAddModalOpen(false);
    await saveAllToCloud();
    setToastMsg('Đã thêm và lưu khóa học mới vào hệ thống!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleManualSave = async () => {
    const res = await saveAllToCloud();
    setToastMsg(res.message || 'Đã lưu danh sách khóa học thành công!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#1e3a8a]">
            Quản Lý Danh Mục Khóa Học ({courses.length} Trình Độ • Bảng Tư Vấn Học Phí)
          </h3>
          <p className="text-xs text-slate-500">
            Cập nhật tên, lộ trình, giáo trình, học phí và chính sách ưu đãi học bổng hiển thị trên trang web.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (window.confirm('Khôi phục danh sách khóa học về dữ liệu chuẩn Bảng Tư Vấn Học Phí?')) {
                resetCourses();
              }
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi Phục Gốc</span>
          </button>

          <button
            onClick={handleManualSave}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
            title="Lưu danh sách khóa học lên Vercel Storage (BLOB_STORE_ID)"
          >
            {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSyncing ? 'Đang Lưu...' : 'Lưu Khóa Học'}</span>
          </button>

          <button
            onClick={handleStartAdd}
            className="px-4 py-2 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Khóa Học Mới</span>
          </button>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(courses || []).map(course => {
          if (!course) return null;
          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#1e3a8a] border border-blue-100">
                    {course.badge}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Mã: {course.id}
                  </span>
                </div>

                <h4 className="text-base font-black text-[#1e3a8a] leading-snug">
                  {course.name}
                </h4>

                <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-500 font-semibold">Trình độ & Học phí:</div>
                  <div className="font-bold text-slate-800">{course.level}</div>
                  <div className="font-bold text-orange-600">
                    {course.tuitionPerHour || '80,000 đ'}/giờ • {course.tuitionPerCourse || '2,560,000 đ / khóa'}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong>Lộ trình:</strong> {course.roadmap}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#1e3a8a] shrink-0 mt-0.5" />
                    <span><strong>Lịch:</strong> {course.schedule}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Sách:</strong> {course.textbook}</span>
                  </div>
                </div>

                <div className="text-xs bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 text-amber-900">
                  <div className="flex items-center gap-1 font-bold text-[11px] uppercase text-orange-700 mb-0.5">
                    <Gift className="w-3 h-3" />
                    <span>Ưu đãi:</span>
                  </div>
                  <p className="text-[11px] line-clamp-2">{course.promotion}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700">
                  Chuẩn Bảng Tư Vấn Học Phí
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(course)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1e3a8a] hover:bg-blue-100 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Sửa</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Xóa khóa học "${course.name}"?`)) {
                        deleteCourse(course.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                    title="Xóa khóa học"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Course Modal */}
      {(editingCourse || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => {
                setEditingCourse(null);
                setIsAddModalOpen(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-xl font-black text-[#1e3a8a]">
                {editingCourse ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới'}
              </h3>
              <p className="text-xs text-slate-500">
                Thông tin được cập nhật tức thì trên toàn bộ giao diện khách hàng
              </p>
            </div>

            <form
              onSubmit={editingCourse ? handleSaveEdit : handleSaveAdd}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên khóa học *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Huy hiệu lứa tuổi & số khóa</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    placeholder="VD: 5 - 8 Tuổi • 10 Khóa"
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phân loại chương trình</label>
                  <select
                    value={formData.category || 'kidsbox'}
                    onChange={e => setFormData({ ...formData, category: e.target.value as CourseItem['category'] })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  >
                    <option value="kidsbox">Tiếng Anh Thiếu Nhi (Kid&apos;s Box: Starters, Movers, Flyers)</option>
                    <option value="ket">Luyện Thi Chứng Chỉ KET (A2)</option>
                    <option value="pet">Luyện Thi Chứng Chỉ PET (B1)</option>
                    <option value="ielts">Luyện Thi IELTS (15+)</option>
                    <option value="adults">Tiếng Anh Giao Tiếp (Adults 18+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Trình độ chuẩn (LEVEL)</label>
                  <input
                    type="text"
                    value={formData.level || ''}
                    placeholder="VD: STARTERS (5-8 tuổi) • 10 khóa"
                    onChange={e => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quy mô lộ trình</label>
                  <input
                    type="text"
                    value={formData.roadmap || ''}
                    placeholder="VD: 10 Khóa học (STA 1 - STA 10) • 160 buổi"
                    onChange={e => setFormData({ ...formData, roadmap: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Thời gian hoàn thành</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    placeholder="VD: 20 tháng (2 tháng / khóa 16 buổi)"
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Học phí / giờ</label>
                  <input
                    type="text"
                    value={formData.tuitionPerHour || ''}
                    placeholder="VD: 80,000 đ"
                    onChange={e => setFormData({ ...formData, tuitionPerHour: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Học phí khóa (16 hoặc 24 buổi)</label>
                  <input
                    type="text"
                    value={formData.tuitionPerCourse || ''}
                    placeholder="VD: 2,560,000 đ / khóa 16 buổi (2 tháng)"
                    onChange={e => setFormData({ ...formData, tuitionPerCourse: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thời gian học (Số buổi/khóa, số giờ/buổi, kiểm tra)</label>
                <input
                  type="text"
                  value={formData.schedule || ''}
                  placeholder="VD: 16 buổi / khóa • 2 giờ dạy / buổi • 1 bài kiểm tra / khóa"
                  onChange={e => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sách theo chương trình (SB & WB)</label>
                <input
                  type="text"
                  value={formData.textbook || ''}
                  placeholder="VD: KID'S BOX STARTERS, 1 & 2 NEW GENERATION (SB/WB)"
                  onChange={e => setFormData({ ...formData, textbook: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chính sách ưu đãi & Học bổng</label>
                <textarea
                  rows={2}
                  value={formData.promotion || ''}
                  placeholder="Mã MOI / GT: Giảm 50% học phí khóa đầu tiên..."
                  onChange={e => setFormData({ ...formData, promotion: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú học phí</label>
                <input
                  type="text"
                  value={formData.tuitionNote || ''}
                  placeholder="Học phí: 80,000 đ/giờ • 2,560,000 đ / khóa 16 buổi..."
                  onChange={e => setFormData({ ...formData, tuitionNote: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCourse(null);
                    setIsAddModalOpen(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold bg-[#1e3a8a] text-white rounded-lg hover:bg-blue-900 shadow-sm cursor-pointer"
                >
                  {editingCourse ? 'Lưu Thay Đổi' : 'Tạo Khóa Học'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
