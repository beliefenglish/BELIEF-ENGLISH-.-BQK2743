import React, { useState, useRef } from 'react';
import {
  Database,
  Cloud,
  HardDrive,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Save,
  Key,
  FileJson,
  FileSpreadsheet,
  BookOpen,
  Users,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Loader2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function VercelStorageManager() {
  const {
    courses,
    leads,
    libraryBooks,
    storageStatus,
    refreshStorageStatus,
    updateStorageConfig,
    saveAllToCloud,
    exportFullSiteJSON,
    exportCoursesCSV,
    exportLibraryCSV,
    exportLeadsCSV,
    importFullSiteJSON,
    isSyncing,
    lastSyncedAt,
  } = useAdmin();

  const [blobTokenInput, setBlobTokenInput] = useState('');
  const [blobStoreIdInput, setBlobStoreIdInput] = useState(
    storageStatus?.storeId || 'store_yqfQ1QZXHcRAnBK9'
  );
  const [isUpdatingConfig, setIsUpdatingConfig] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
    blobUrl?: string;
  } | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [copiedStoreId, setCopiedStoreId] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyStoreId = () => {
    navigator.clipboard.writeText(storageStatus?.storeId || 'store_yqfQ1QZXHcRAnBK9');
    setCopiedStoreId(true);
    setTimeout(() => setCopiedStoreId(false), 2000);
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingConfig(true);
    setActionFeedback(null);

    const res = await updateStorageConfig({
      blobStoreId: blobStoreIdInput.trim(),
      blobToken: blobTokenInput.trim() || undefined,
    });

    setIsUpdatingConfig(false);
    setActionFeedback({
      type: res.success ? 'success' : 'error',
      message: res.message,
    });

    if (res.success) {
      setBlobTokenInput('');
    }
  };

  const handleTriggerSave = async () => {
    setActionFeedback(null);
    const res = await saveAllToCloud();
    setActionFeedback({
      type: res.success ? 'success' : 'error',
      message: res.message,
      blobUrl: res.blobUrl,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setActionFeedback(null);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const res = await importFullSiteJSON(parsed);
      setActionFeedback({
        type: res.success ? 'success' : 'error',
        message: res.message,
      });
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        message: `Lỗi đọc file JSON: ${err.message || 'Tệp không hợp lệ'}`,
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-[#1e3a8a] flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5" />
              <span>Vercel Storage & Backup Center</span>
            </span>
            <span className="text-xs text-slate-400">• Độc quyền Belief English</span>
          </div>
          <h3 className="text-xl font-black text-[#1e3a8a]">
            Trung Tâm Lưu Trữ Vercel & Xuất/Nhập Dữ Liệu
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Quản lý đồng bộ máy chủ Vercel Storage (duy nhất BLOB_STORE_ID), tải file sao lưu toàn bộ website hoặc xuất các báo cáo học viên, khóa học ra file Excel/CSV.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={refreshStorageStatus}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Làm mới trạng thái kết nối"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Kiểm Tra Trạng Thái</span>
          </button>

          <button
            onClick={handleTriggerSave}
            disabled={isSyncing}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-orange-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSyncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSyncing ? 'Đang Lưu...' : 'Lưu Vào Storage Ngay'}</span>
          </button>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div
          className={`p-4 rounded-2xl flex items-start justify-between gap-3 shadow-sm border ${
            actionFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          <div className="flex items-start gap-3">
            {actionFeedback.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-xs sm:text-sm font-bold">{actionFeedback.message}</p>
              {actionFeedback.blobUrl && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-emerald-700 font-medium">Link lưu trữ Vercel Blob:</span>
                  <a
                    href={actionFeedback.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#1e3a8a] font-bold underline flex items-center gap-1 hover:text-orange-600 truncate max-w-md"
                  >
                    <span>{actionFeedback.blobUrl}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setActionFeedback(null)}
            className="text-xs font-bold px-2 py-1 rounded hover:bg-black/5 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* 3 Storage Health Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Vercel Blob Storage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center font-bold">
                <Cloud className="w-5 h-5" />
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  storageStatus?.hasBlobToken
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {storageStatus?.hasBlobToken ? 'Đã Cấu Hình Token' : 'Sẵn Sàng Store ID'}
              </span>
            </div>

            <h4 className="text-sm font-black text-slate-800 mb-1">
              1. Vercel Blob Storage
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Lưu trữ tập tin hình ảnh và tài liệu tĩnh JSON trên mạng lưới CDN toàn cầu của Vercel.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">BLOB_STORE_ID:</span>
                <span className="font-mono font-bold text-slate-800 text-[11px]">
                  {storageStatus?.storeId || 'store_yqfQ1QZXHcRAnBK9'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Vị trí file:</span>
                <span className="font-mono text-slate-600 text-[11px]">articles/site-content.json</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Quyền đọc/ghi:</span>
                <span className={`font-bold text-[11px] ${storageStatus?.hasBlobToken ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {storageStatus?.hasBlobToken ? 'Hoạt động (Token OK)' : 'Cần BLOB_READ_WRITE_TOKEN'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={handleCopyStoreId}
              className="text-[#1e3a8a] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedStoreId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedStoreId ? 'Đã sao chép' : 'Sao chép Store ID'}</span>
            </button>
            <span className="text-slate-400 font-mono text-[10px]">.env.local</span>
          </div>
        </div>

        {/* Card 2: Local Server Storage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <HardDrive className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Hoạt Động 100%
              </span>
            </div>

            <h4 className="text-sm font-black text-slate-800 mb-1">
              2. Máy Chủ Cục Bộ (Local Storage)
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Lưu trữ trực tiếp và bền vững trên ổ đĩa máy chủ (Disk File Persistence).
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Tệp dữ liệu:</span>
                <span className="font-mono text-slate-800 font-bold text-[11px]">/data/site-content.json</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Thư mục tải ảnh:</span>
                <span className="font-mono text-slate-600 text-[11px]">/uploads/</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Lần lưu cuối:</span>
                <span className="font-mono text-slate-800 text-[11px]">
                  {lastSyncedAt || 'Đã sẵn sàng'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dữ liệu luôn được bảo vệ</span>
            </span>
            <span className="text-slate-400 text-[10px]">An toàn tuyệt đối</span>
          </div>
        </div>

        {/* Card 3: Vercel Storage Exclusive Identity */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
                Độc Quyền Blob
              </span>
            </div>

            <h4 className="text-sm font-black text-slate-800 mb-1">
              3. Định Danh Kho Độc Quyền
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Chỉ sử dụng duy nhất Vercel Storage (BLOB_STORE_ID), mọi dữ liệu website và tệp tin đều được đồng bộ hóa đồng nhất.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Kho áp dụng:</span>
                <span className="font-mono font-bold text-purple-900 text-[11px]">BLOB_STORE_ID</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Trạng thái:</span>
                <span className="text-emerald-700 font-bold text-[11px]">
                  Kích hoạt duy nhất
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Lưu trữ khác:</span>
                <span className="text-slate-400 text-[11px]">Đã lược bỏ hoàn toàn</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Tiêu chuẩn hệ thống</span>
            <span className="font-mono text-[10px]">Vercel Blob Storage</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: XUẤT FILE & SAO LƯU (EXPORT DATA FILES) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-orange-500" />
              <h3 className="text-base font-black text-[#1e3a8a]">
                Xuất File Dữ Liệu Website Ra Máy Tính (Export Center)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tải toàn bộ cơ sở dữ liệu về máy tính của bạn dưới dạng tệp JSON hoặc bảng tính CSV/Excel để lưu trữ ngoại tuyến.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
            Hỗ trợ JSON, CSV (UTF-8 Excel)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Export Full Site JSON */}
          <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-4 rounded-2xl border border-blue-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center font-bold mb-2 shadow-xs">
                <FileJson className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-[#1e3a8a]">
                Toàn Bộ Dữ Liệu (.JSON)
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Bao gồm tất cả khóa học, học viên đăng ký, sách, thư mục, hotline, hình ảnh logo. Dùng để backup & restore.
              </p>
            </div>
            <button
              onClick={exportFullSiteJSON}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất File Backup JSON</span>
            </button>
          </div>

          {/* Export Leads CSV */}
          <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 p-4 rounded-2xl border border-amber-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold mb-2 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-slate-800">
                Danh Sách Học Viên ({(leads || []).length})
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                File CSV tương thích 100% Microsoft Excel tiếng Việt. Chứa họ tên phụ huynh, SĐT, bé, lịch hẹn test, ghi chú.
              </p>
            </div>
            <button
              onClick={exportLeadsCSV}
              className="w-full py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Xuất Excel Học Viên</span>
            </button>
          </div>

          {/* Export Courses CSV */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 p-4 rounded-2xl border border-emerald-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-2 shadow-xs">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-slate-800">
                Danh Mục Khóa Học ({(courses || []).length})
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Xuất danh sách tất cả các khóa Cambridge, Kindy, Ready, IELTS, lộ trình đào tạo và học phí ưu đãi.
              </p>
            </div>
            <button
              onClick={exportCoursesCSV}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất File Khóa Học (CSV)</span>
            </button>
          </div>

          {/* Export Library CSV */}
          <div className="bg-gradient-to-br from-purple-50/70 to-fuchsia-50/50 p-4 rounded-2xl border border-purple-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold mb-2 shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-slate-800">
                Thư Viện Sách & Link ({(libraryBooks || []).length})
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Xuất danh mục toàn bộ sách số, giáo trình Cambridge, Oxford kèm các đường link Drive/PDF liên kết.
              </p>
            </div>
            <button
              onClick={exportLibraryCSV}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Thư Viện Sách (CSV)</span>
            </button>
          </div>
        </div>

        {/* Direct Download Link Option */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-slate-600">
            Tải trực tiếp qua API endpoint: <strong className="font-mono text-[#1e3a8a]">/api/export</strong>
          </span>
          <a
            href="/api/export"
            download
            className="text-xs font-bold text-[#1e3a8a] hover:text-orange-500 underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Tải ngay qua trình duyệt</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* SECTION 2: PHỤC HỒI TỪ FILE BACKUP (IMPORT / RESTORE) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Upload className="w-5 h-5 text-[#1e3a8a]" />
          <div>
            <h3 className="text-base font-black text-[#1e3a8a]">
              Nhập & Phục Hồi Dữ Liệu Từ File Backup (.JSON)
            </h3>
            <p className="text-xs text-slate-500">
              Nếu bạn muốn di chuyển trang web, hoặc khôi phục dữ liệu đã lưu trước đó, hãy chọn file .json đã xuất.
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 rounded-2xl p-6 text-center transition-colors">
          <FileJson className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-slate-700 mb-1">
            Chọn tệp sao lưu JSON của Belief English để nạp lại
          </p>
          <p className="text-[11px] text-slate-400 mb-4">
            Định dạng tệp: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">.json</code>
          </p>

          <input
            type="file"
            ref={fileInputRef}
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
            id="backup-json-input"
          />

          <label
            htmlFor="backup-json-input"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95"
          >
            {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{isImporting ? 'Đang Nạp File...' : 'Chọn File JSON Để Phục Hồi'}</span>
          </label>
        </div>
      </div>

      {/* SECTION 3: HƯỚNG DẪN & CẤU HÌNH VERCEL BLOB STORAGE */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Key className="w-5 h-5 text-orange-500" />
          <div>
            <h3 className="text-base font-black text-[#1e3a8a]">
              Cách Kết Nối & Lưu Trữ Vào Vercel Storage
            </h3>
            <p className="text-xs text-slate-500">
              Hướng dẫn chi tiết để lấy mã xác thực kết nối vào Store ID <strong>store_yqfQ1QZXHcRAnBK9</strong> của bạn.
            </p>
          </div>
        </div>

        {/* 4 Steps Tutorial */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white font-bold flex items-center justify-center text-xs">
              1
            </span>
            <h5 className="font-bold text-slate-800">Truy Cập Vercel Dashboard</h5>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Mở <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] underline font-bold">vercel.com</a>, vào dự án web của trung tâm.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white font-bold flex items-center justify-center text-xs">
              2
            </span>
            <h5 className="font-bold text-slate-800">Vào Tab Storage</h5>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Bấm vào tab <strong>Storage</strong> và chọn Blob Store có ID <strong>store_yqfQ1QZXHcRAnBK9</strong>.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white font-bold flex items-center justify-center text-xs">
              3
            </span>
            <h5 className="font-bold text-slate-800">Copy Mã Token</h5>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Vào mục <strong>.env.local</strong>, sao chép giá trị bí mật dòng <code className="bg-slate-200 px-1 py-0.5 rounded">BLOB_READ_WRITE_TOKEN="..."</code>.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white font-bold flex items-center justify-center text-xs">
              4
            </span>
            <h5 className="font-bold text-slate-800">Dán & Lưu Cấu Hình</h5>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Dán vào form bên dưới và ấn <strong>Lưu Cấu Hình</strong>. Hệ thống sẽ kết nối ngay lập tức!
            </p>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSaveConfig} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                BLOB_STORE_ID (Đã cài đặt theo yêu cầu) *
              </label>
              <input
                type="text"
                required
                value={blobStoreIdInput}
                onChange={e => setBlobStoreIdInput(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white"
              />
              <span className="text-[10px] text-slate-400">
                Mặc định: store_yqfQ1QZXHcRAnBK9
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                BLOB_READ_WRITE_TOKEN (Từ Vercel Dashboard)
              </label>
              <input
                type="password"
                placeholder={storageStatus?.hasBlobToken ? '•••••••••••••••••••• (Đã cấu hình)' : 'vercel_blob_rw_...'}
                value={blobTokenInput}
                onChange={e => setBlobTokenInput(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white"
              />
              <span className="text-[10px] text-slate-400">
                {storageStatus?.hasBlobToken
                  ? 'Token đã tồn tại. Để nguyên nếu không thay đổi.'
                  : 'Dán token vào đây để lưu trữ trực tiếp lên CDN Vercel Blob.'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Dữ liệu luôn được lưu trữ an toàn trên máy chủ kể cả khi chưa có token Vercel.</span>
            </div>

            <button
              type="submit"
              disabled={isUpdatingConfig}
              className="px-6 py-2 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isUpdatingConfig ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Lưu Cấu Hình Vercel Storage</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
