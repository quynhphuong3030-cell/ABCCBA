/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  User, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { SchedulePeriod, NavTab } from '../types';
import { THCS_SUBJECTS } from '../data/initialData';

interface ScheduleViewProps {
  schedule: SchedulePeriod[];
  onNavigate: (tab: NavTab) => void;
  onAddPeriod: (newPeriod: Omit<SchedulePeriod, 'id'>) => void;
  onDeletePeriod: (periodId: string) => void;
}

const DAYS_OF_WEEK = [
  { day: 2, label: 'Thứ Hai', short: 'T2', dateStr: '21/09/2026' },
  { day: 3, label: 'Thứ Ba', short: 'T3', dateStr: '22/09/2026' },
  { day: 4, label: 'Thứ Tư', short: 'T4', dateStr: '23/09/2026' },
  { day: 5, label: 'Thứ Năm', short: 'T5', dateStr: '24/09/2026' },
  { day: 6, label: 'Thứ Sáu', short: 'T6', dateStr: '25/09/2026' },
  { day: 7, label: 'Thứ Bảy', short: 'T7', dateStr: '26/09/2026' },
];

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  onNavigate,
  onAddPeriod,
  onDeletePeriod,
}) => {
  // Mode chuyển đổi: 'today' (Hôm nay) hoặc 'week' (Tuần này)
  const [viewMode, setViewMode] = useState<'today' | 'week'>('today');

  // Ngày được chọn khi xem chế độ ngày (mặc định Thứ 3 - hôm nay)
  const [selectedDay, setSelectedDay] = useState<number>(3);

  // Modal thêm tiết học mới dành cho giáo viên
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [formDay, setFormDay] = useState<number>(3);
  const [formPeriod, setFormPeriod] = useState<number>(1);
  const [formTime, setFormTime] = useState<string>('07:15 - 08:00');
  const [formSubject, setFormSubject] = useState<string>('Toán');
  const [formTopic, setFormTopic] = useState<string>('');
  const [formTeacher, setFormTeacher] = useState<string>('Cô Mai Lan');
  const [formRoom, setFormRoom] = useState<string>('Phòng 204');

  const handleNextDay = () => {
    setSelectedDay((prev) => (prev >= 7 ? 2 : prev + 1));
  };

  const handlePrevDay = () => {
    setSelectedDay((prev) => (prev <= 2 ? 7 : prev - 1));
  };

  const currentDayInfo = DAYS_OF_WEEK.find((d) => d.day === selectedDay) || DAYS_OF_WEEK[1];

  // Lấy các tiết học của ngày đang chọn
  const dayPeriods = schedule
    .filter((s) => s.dayOfWeek === selectedDay)
    .sort((a, b) => a.period - b.period);

  const handleCreatePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSubject.trim() || !formTopic.trim()) return;

    onAddPeriod({
      dayOfWeek: Number(formDay),
      period: Number(formPeriod),
      time: formTime,
      subject: formSubject,
      topic: formTopic.trim(),
      teacher: formTeacher.trim(),
      room: formRoom.trim(),
    });
    setIsAddModalOpen(false);
  };

  return (
    <div id="view-schedule" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar & Nút quay lại Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            id="btn-schedule-back-to-dashboard"
            onClick={() => onNavigate('dashboard')}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            title="Quay lại Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Lịch học & Thời khóa biểu
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Theo dõi tiết học, môn học, thời gian và chủ đề bài học chi tiết
            </p>
          </div>
        </div>

        {/* Nút chuyển đổi Hôm nay / Tuần này & Thêm tiết */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Hôm nay / Tuần này */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              id="btn-schedule-mode-today"
              onClick={() => {
                setViewMode('today');
                setSelectedDay(3); // Mặc định hôm nay Thứ 3
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'today'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hôm nay
            </button>
            <button
              id="btn-schedule-mode-week"
              onClick={() => setViewMode('week')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'week'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tuần này
            </button>
          </div>

          <button
            id="btn-open-add-period"
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-indigo-200 transition-colors cursor-pointer"
            title="Thêm tiết học mới"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm tiết học</span>
          </button>
        </div>
      </div>

      {/* CHẾ ĐỘ 1: XEM THEO NGÀY (HÔM NAY HOẶC CHỌN NGÀY) */}
      {viewMode === 'today' && (
        <div className="space-y-5">
          
          {/* Bộ chọn các thứ trong tuần */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0"
              title="Ngày trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
              {DAYS_OF_WEEK.map((item) => {
                const isSelected = selectedDay === item.day;
                const isToday = item.day === 3; // Thứ 3 là ngày hiện tại mẫu
                return (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`flex flex-col items-center justify-center px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-w-[70px] ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                        : isToday
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-600'}`}>
                      {item.dateStr.slice(0, 5)}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNextDay}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0"
              title="Ngày tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Banner thông tin ngày đang chọn */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {currentDayInfo.label} – Ngày {currentDayInfo.dateStr}
              </h2>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">
              Tổng số: {dayPeriods.length} tiết học
            </span>
          </div>

          {/* Danh sách các tiết học trong ngày */}
          {dayPeriods.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Không có tiết học nào trong {currentDayInfo.label}
              </h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Ngày này được xếp lịch nghỉ hoặc hoạt động ngoại khóa tự do.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dayPeriods.map((period) => (
                <div
                  key={period.id}
                  id={`period-card-${period.id}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                        {period.period}
                      </div>
                      <div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                          Tiết {period.period}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">
                          {period.subject}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {period.time}
                      </span>
                      <button
                        onClick={() => onDeletePeriod(period.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-opacity"
                        title="Xóa tiết học này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Nội dung bài học */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-semibold text-slate-600 block mb-0.5">
                      Nội dung / Chủ đề bài học:
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      {period.topic}
                    </p>
                  </div>

                  {/* Giáo viên & Phòng học */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      {period.teacher || 'Chưa cập nhật GV'}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {period.room || 'Phòng học chính'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* CHẾ ĐỘ 2: XEM BẢNG CẢ TUẦN (TUẦN NÀY) */}
      {viewMode === 'week' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-indigo-600" />
              <span>Bảng thời khóa biểu toàn tuần (Thứ Hai – Thứ Bảy)</span>
            </h2>
            <span className="text-xs text-slate-600">
              Chương trình chuẩn THCS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS_OF_WEEK.map((item) => {
              const periods = schedule
                .filter((s) => s.dayOfWeek === item.day)
                .sort((a, b) => a.period - b.period);
              const isToday = item.day === 3;

              return (
                <div
                  key={item.day}
                  className={`bg-white rounded-2xl p-4 border transition-all shadow-xs ${
                    isToday ? 'border-indigo-400 ring-2 ring-indigo-200' : 'border-slate-200'
                  }`}
                >
                  {/* Header ngày */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                        {item.label}
                        {isToday && (
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-indigo-600 text-white">
                            Hôm nay
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-slate-600">{item.dateStr}</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {periods.length} tiết
                    </span>
                  </div>

                  {/* Danh sách tiết học */}
                  {periods.length === 0 ? (
                    <p className="text-xs text-slate-600 text-center py-4">
                      Không có tiết học
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {periods.map((p) => (
                        <div
                          key={p.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/40 transition-colors text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-700">
                              Tiết {p.period}: {p.subject}
                            </span>
                            <span className="text-[11px] text-slate-600 font-medium">
                              {p.time}
                            </span>
                          </div>
                          <p className="text-slate-700 line-clamp-1">
                            {p.topic}
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
                            <span>{p.teacher}</span>
                            <span>{p.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Thêm tiết học dành cho giáo viên */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Thêm tiết học vào lịch
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePeriod} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Thứ:
                  </label>
                  <select
                    value={formDay}
                    onChange={(e) => setFormDay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                  >
                    {DAYS_OF_WEEK.map((d) => (
                      <option key={d.day} value={d.day}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiết học:
                  </label>
                  <select
                    value={formPeriod}
                    onChange={(e) => setFormPeriod(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                  >
                    {[1, 2, 3, 4, 5].map((p) => (
                      <option key={p} value={p}>Tiết {p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Môn học:
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                >
                  {THCS_SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="Chào cờ & Sinh hoạt">Chào cờ & Sinh hoạt</option>
                  <option value="Giáo dục thể chất">Giáo dục thể chất</option>
                  <option value="Nghệ thuật">Nghệ thuật</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Thời gian:
                </label>
                <input
                  type="text"
                  required
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  placeholder="07:15 - 08:00"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung hoặc chủ đề: *
                </label>
                <input
                  type="text"
                  required
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                  placeholder="Ví dụ: Ôn tập chương 1..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Giáo viên:
                  </label>
                  <input
                    type="text"
                    value={formTeacher}
                    onChange={(e) => setFormTeacher(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phòng học:
                  </label>
                  <input
                    type="text"
                    value={formRoom}
                    onChange={(e) => setFormRoom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                >
                  Thêm tiết học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
