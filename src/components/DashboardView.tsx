/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Award, 
  ArrowRight, 
  Sparkles,
  Play,
  Check,
  CalendarCheck
} from 'lucide-react';
import { Task, SchedulePeriod, SubjectResult, StudentProfile, NavTab } from '../types';

interface DashboardViewProps {
  student: StudentProfile;
  tasks: Task[];
  schedule: SchedulePeriod[];
  results: SubjectResult[];
  onNavigate: (tab: NavTab) => void;
  onStartTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  tasks,
  schedule,
  results,
  onNavigate,
  onStartTask,
  onCompleteTask,
}) => {
  // Tính toán số liệu tự động
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Tính điểm trung bình chung mẫu từ danh sách môn học
  const overallAverage = results.length > 0
    ? (results.reduce((acc, curr) => acc + curr.averageScore, 0) / results.length).toFixed(1)
    : '0.0';

  // Lấy lời chào theo buổi
  const currentHour = new Date().getHours();
  let greetingTime = 'Chào buổi sáng';
  if (currentHour >= 12 && currentHour < 18) {
    greetingTime = 'Chào buổi chiều';
  } else if (currentHour >= 18) {
    greetingTime = 'Chào buổi tối';
  }

  // Ngày hiện tại định dạng tiếng Việt
  const todayFormatted = 'Thứ Ba, ngày 22 tháng 9 năm 2026';

  // Lọc nhiệm vụ cần làm hôm nay hoặc gần hạn
  // Ưu tiên: chưa xong, sắp xếp theo hạn
  const todayTasks = tasks
    .filter((t) => t.status !== 'completed')
    .slice(0, 4);

  // Lọc các nhiệm vụ gần đến hạn (bao gồm cả việc quan trọng)
  const upcomingDeadlines = tasks
    .filter((t) => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // Tiết học hôm nay (Thứ 3 tương ứng dayOfWeek: 3)
  const todaySchedule = schedule.filter((s) => s.dayOfWeek === 3);

  return (
    <div id="view-dashboard" className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Lời chào & Ngày hiện tại */}
      <section 
        id="dashboard-greeting-banner"
        className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-indigo-500/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-indigo-100 text-xs sm:text-sm font-medium">
              <Calendar className="w-3.5 h-3.5 text-indigo-200" />
              <span>{todayFormatted}</span>
              <span className="opacity-60">•</span>
              <span>{student.className}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {greetingTime}, {student.name}!
            </h1>
            
            <p className="text-indigo-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Chúc em một ngày học tập hứng khởi và hiệu quả! Hôm nay có{' '}
              <strong className="text-white font-bold">{pendingTasks} nhiệm vụ</strong> đang chờ em hoàn thành.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-goto-tasks"
              onClick={() => onNavigate('tasks')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow-sm hover:bg-indigo-50 active:scale-95 transition-all cursor-pointer"
            >
              <span>Xem nhiệm vụ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="btn-goto-schedule"
              onClick={() => onNavigate('schedule')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/40 hover:bg-indigo-500/60 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Xem lịch học</span>
            </button>
          </div>
        </div>

        {/* Trang trí background nhẹ nhàng, không gây rối mắt */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-32 -top-16 w-48 h-48 rounded-full bg-indigo-400/10 pointer-events-none" />
      </section>

      {/* 2. Thẻ số liệu thống kê tự động (Stat Cards) */}
      <section id="dashboard-metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        
        {/* Tổng số nhiệm vụ */}
        <div 
          id="stat-card-total-tasks"
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Tổng nhiệm vụ</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {totalTasks}
            </span>
            <span className="text-xs text-slate-500 font-medium">bài tập</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {pendingTasks} bài cần làm ({inProgressTasks} đang làm)
          </p>
        </div>

        {/* Số nhiệm vụ đã hoàn thành */}
        <div 
          id="stat-card-completed-tasks"
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Đã hoàn thành</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
              {completedTasks}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ {totalTasks} bài</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            Đạt {progressPercent}% chỉ tiêu
          </p>
        </div>

        {/* Phần trăm tiến độ học tập */}
        <div 
          id="stat-card-progress-percent"
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Tiến độ tuần</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 tracking-tight">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-500 font-medium">hoàn tất</span>
          </div>
          {/* Progress bar nhỏ gọn */}
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Kết quả & Điểm học tập mẫu */}
        <div 
          id="stat-card-academic-score"
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-amber-200 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Điểm TB mẫu</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight">
              {overallAverage}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ 10</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            6 môn học • Đánh giá tích cực
          </p>
        </div>

      </section>

      {/* 3. Khu vực chính: Việc cần làm hôm nay & Các nhiệm vụ gần đến hạn */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Khu vực Việc cần làm hôm nay (Chiếm 2 cột) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Việc cần làm hôm nay
              </h2>
            </div>
            <button
              id="btn-view-all-tasks-link"
              onClick={() => onNavigate('tasks')}
              className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả ({totalTasks})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {todayTasks.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Tuyệt vời! Không còn việc tồn đọng
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Em đã hoàn thành mọi bài tập được giao cho hôm nay. Hãy nghỉ ngơi hoặc chuẩn bị bài cho ngày mai nhé!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayTasks.map((task) => {
                const isUrgent = task.priority === 'high';
                return (
                  <div
                    key={task.id}
                    id={`dashboard-task-card-${task.id}`}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {task.subject}
                        </span>
                        {isUrgent && (
                          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                            Ưu tiên cao
                          </span>
                        )}
                        <span className="text-xs text-slate-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Hạn: {task.dueDate}
                        </span>
                      </div>
                      
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {task.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">
                        {task.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {task.status === 'todo' && (
                        <button
                          id={`btn-start-task-dash-${task.id}`}
                          onClick={() => onStartTask(task.id)}
                          className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Bắt đầu</span>
                        </button>
                      )}
                      
                      {task.status === 'in_progress' && (
                        <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Đang làm
                        </span>
                      )}

                      <button
                        id={`btn-complete-task-dash-${task.id}`}
                        onClick={() => onCompleteTask(task.id)}
                        className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                        title="Đánh dấu hoàn thành bài tập"
                      >
                        <Check className="w-4 h-4" />
                        <span>Hoàn thành</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cột phải: Nhiệm vụ gần đến hạn & Tiết học tiếp theo */}
        <div className="space-y-6">
          
          {/* Các nhiệm vụ gần đến hạn */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Gần đến hạn</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {upcomingDeadlines.length} bài
              </span>
            </div>

            {upcomingDeadlines.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                Không có bài tập nào gần đến hạn.
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((task) => (
                  <div 
                    key={task.id}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700">
                        {task.subject}
                      </span>
                      <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                        {task.dueDate}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
                      {task.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lịch học hôm nay tóm lược */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-indigo-600" />
                <span>Tiết học Thứ Ba</span>
              </h3>
              <button
                id="btn-dash-view-full-schedule"
                onClick={() => onNavigate('schedule')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Cả tuần →
              </button>
            </div>

            {todaySchedule.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                Hôm nay không có tiết học.
              </p>
            ) : (
              <div className="space-y-2.5">
                {todaySchedule.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {item.period}
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                          {item.subject}
                        </p>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                          {item.topic}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">
                      {item.time.split('-')[0].trim()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
