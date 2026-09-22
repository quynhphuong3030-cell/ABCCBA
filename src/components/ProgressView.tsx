/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Award, 
  Sparkles, 
  HeartHandshake,
  Edit2,
  X
} from 'lucide-react';
import { Task, SubjectResult, NavTab } from '../types';

interface ProgressViewProps {
  tasks: Task[];
  results: SubjectResult[];
  onNavigate: (tab: NavTab) => void;
  onUpdateSubjectResult: (updatedResult: SubjectResult) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  tasks,
  results,
  onNavigate,
  onUpdateSubjectResult,
}) => {
  // Thống kê tiến độ nhiệm vụ
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Tính điểm trung bình tất cả các môn
  const overallAvg = results.length > 0
    ? (results.reduce((acc, curr) => acc + curr.averageScore, 0) / results.length).toFixed(1)
    : '0.0';

  // Modal chỉnh sửa điểm môn học dành cho giáo viên/học sinh
  const [editingResult, setEditingResult] = useState<SubjectResult | null>(null);
  const [formOral, setFormOral] = useState<number>(8.0);
  const [formQuiz, setFormQuiz] = useState<number>(8.0);
  const [formMidterm, setFormMidterm] = useState<number>(8.0);
  const [formFinal, setFormFinal] = useState<number>(8.0);
  const [formNote, setFormNote] = useState<string>('');

  const openEditModal = (item: SubjectResult) => {
    setEditingResult(item);
    setFormOral(item.oralScore);
    setFormQuiz(item.quizScore);
    setFormMidterm(item.midtermScore);
    setFormFinal(item.finalScore);
    setFormNote(item.note);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult) return;
    
    // Công thức tính điểm trung bình môn học THCS thông dụng:
    // ĐTBm = (Kiểm tra thường xuyên + 15p + Giữa kì*2 + Cuối kì*3) / 7
    const calcAvg = Number(((formOral + formQuiz + formMidterm * 2 + formFinal * 3) / 7).toFixed(1));

    onUpdateSubjectResult({
      ...editingResult,
      oralScore: Number(formOral),
      quizScore: Number(formQuiz),
      midtermScore: Number(formMidterm),
      finalScore: Number(formFinal),
      averageScore: calcAvg,
      note: formNote.trim(),
    });
    setEditingResult(null);
  };

  return (
    <div id="view-progress" className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header bar & Nút quay lại Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            id="btn-progress-back-to-dashboard"
            onClick={() => onNavigate('dashboard')}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            title="Quay lại Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tiến độ và kết quả học tập
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Theo dõi sự tiến bộ của bản thân qua từng bài tập và môn học
            </p>
          </div>
        </div>

        {/* Khung điểm trung bình chung */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-600 font-semibold block">
              Điểm TB chung mẫu
            </span>
            <span className="text-lg font-extrabold text-slate-900 leading-none">
              {overallAvg} / 10
            </span>
          </div>
        </div>
      </div>

      {/* Thông điệp khích lệ - Tinh thần giáo dục tích cực */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
        <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
            Mục tiêu học tập: Tiến bộ mỗi ngày cùng bản thân
            <Sparkles className="w-4 h-4 text-amber-500 inline" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Học tập là hành trình kiên trì và bền bỉ. Mỗi bài tập hoàn thành hôm nay là một bước tiến vững chắc hướng đến tri thức. Không so sánh với người khác, hãy tự hào vì hôm nay mình đã hiểu bài hơn ngày hôm qua!
          </p>
        </div>
      </div>

      {/* 1. KHU VỰC TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ (BIỂU ĐỒ TRỰC QUAN CHO MÁY CHIẾU) */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Tiến độ hoàn thành nhiệm vụ
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Biểu đồ trực quan tỉ lệ hoàn thành bài tập toàn khóa
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-indigo-600">
              {completionRate}%
            </span>
            <span className="text-xs text-slate-600 font-semibold">
              ({completedTasks}/{totalTasks} bài hoàn thành)
            </span>
          </div>
        </div>

        {/* Biểu đồ phân bổ trạng thái trực quan */}
        <div className="space-y-2">
          {/* Thanh phân chia phần trăm (Stacked Bar Chart) */}
          <div className="w-full h-8 sm:h-10 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner p-1 gap-1">
            {completedTasks > 0 && (
              <div 
                className="bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-500 shadow-xs"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                title={`Đã hoàn thành: ${completedTasks} bài`}
              >
                {Math.round((completedTasks / totalTasks) * 100)}%
              </div>
            )}
            {inProgressTasks > 0 && (
              <div 
                className="bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-500 shadow-xs"
                style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }}
                title={`Đang làm: ${inProgressTasks} bài`}
              >
                {Math.round((inProgressTasks / totalTasks) * 100)}%
              </div>
            )}
            {todoTasks > 0 && (
              <div 
                className="bg-amber-400 rounded-lg flex items-center justify-center text-slate-900 text-xs font-bold transition-all duration-500 shadow-xs"
                style={{ width: `${(todoTasks / totalTasks) * 100}%` }}
                title={`Chưa làm: ${todoTasks} bài`}
              >
                {Math.round((todoTasks / totalTasks) * 100)}%
              </div>
            )}
          </div>

          {/* Chú giải màu sắc biểu đồ (Legend) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
              <span className="text-slate-700">Đã hoàn thành: <strong>{completedTasks} bài</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-blue-500" />
              <span className="text-slate-700">Đang làm: <strong>{inProgressTasks} bài</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-400" />
              <span className="text-slate-700">Chưa làm: <strong>{todoTasks} bài</strong></span>
            </div>
          </div>
        </div>

        {/* 3 Thẻ thống kê chi tiết */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500 text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-emerald-800 font-bold block">Đã hoàn thành</span>
              <span className="text-xl font-extrabold text-emerald-900">{completedTasks} bài</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500 text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-blue-800 font-bold block">Đang làm dở</span>
              <span className="text-xl font-extrabold text-blue-900">{inProgressTasks} bài</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-amber-800 font-bold block">Chưa hoàn thành</span>
              <span className="text-xl font-extrabold text-amber-900">{todoTasks} bài</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KHU VỰC KẾT QUẢ ĐIỂM SỐ MẪU THEO TỪNG MÔN HỌC */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Kết quả học tập mẫu theo từng môn
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Bao gồm điểm kiểm tra thường xuyên, giữa kì, học kì và nhận xét giáo viên
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 w-fit">
            6 Môn học THCS
          </span>
        </div>

        {/* Danh sách thẻ môn học */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((item) => (
            <div
              key={item.id}
              id={`subject-card-${item.id}`}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header Môn học & Điểm trung bình */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {item.subject}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      ĐTB: {item.averageScore.toFixed(1)}
                    </span>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                      title="Sửa điểm mẫu môn này"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bảng điểm chi tiết 4 cột */}
                <div className="grid grid-cols-4 gap-2 text-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-600 block">Miệng</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{item.oralScore}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-600 block">15 phút</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{item.quizScore}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-600 block">Giữa kì</span>
                    <span className="text-xs sm:text-sm font-bold text-indigo-600">{item.midtermScore}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-600 block">Học kì</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-600">{item.finalScore}</span>
                  </div>
                </div>

                {/* Thanh tiến độ trực quan của điểm trung bình so với thang điểm 10 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                    <span>Mức độ đạt chuẩn</span>
                    <span className="font-bold text-slate-700">{(item.averageScore * 10).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${item.averageScore * 10}%` }}
                    />
                  </div>
                </div>

                {/* Nhận xét giáo viên mang tính khích lệ */}
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100/70 text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block text-amber-800 mb-0.5">
                    Lời nhận xét:
                  </span>
                  {item.note}
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Chỉnh sửa điểm số mẫu môn học dành cho giáo viên */}
      {editingResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Cập nhật điểm môn {editingResult.subject}
              </h3>
              <button
                onClick={() => setEditingResult(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm miệng:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formOral}
                    onChange={(e) => setFormOral(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm 15 phút:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formQuiz}
                    onChange={(e) => setFormQuiz(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm giữa kì:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formMidterm}
                    onChange={(e) => setFormMidterm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm học kì:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formFinal}
                    onChange={(e) => setFormFinal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lời nhận xét khích lệ:
                </label>
                <textarea
                  rows={3}
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                >
                  Lưu điểm số
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
