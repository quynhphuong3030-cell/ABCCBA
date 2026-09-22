/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, Task, SchedulePeriod, SubjectResult, NotificationItem, StudentProfile } from './types';
import { initialStudentProfile } from './data/initialData';
import { 
  loadStoredTasks, 
  saveStoredTasks, 
  loadStoredSchedule, 
  saveStoredSchedule,
  loadStoredResults,
  saveStoredResults,
  loadStoredNotifications,
  saveStoredNotifications,
  loadSoundSetting,
  saveSoundSetting,
  loadProjectorMode,
  saveProjectorMode,
  resetAllToDefaults
} from './utils/storage';
import { playGentleClick, playSuccessChime } from './utils/audio';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { TasksView } from './components/TasksView';
import { ScheduleView } from './components/ScheduleView';
import { ProgressView } from './components/ProgressView';
import { NotificationsView } from './components/NotificationsView';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // 1. Quản lý trạng thái điều hướng (Tab hiện tại: mặc định 'dashboard')
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');

  // 2. Dữ liệu học sinh
  const [student] = useState<StudentProfile>(initialStudentProfile);

  // 3. Dữ liệu 4 module từ LocalStorage với fallback
  const [tasks, setTasks] = useState<Task[]>(() => loadStoredTasks());
  const [schedule, setSchedule] = useState<SchedulePeriod[]>(() => loadStoredSchedule());
  const [results, setResults] = useState<SubjectResult[]>(() => loadStoredResults());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadStoredNotifications());

  // 4. Tuỳ chọn giao diện: Âm thanh & Chế độ máy chiếu
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => loadSoundSetting());
  const [projectorMode, setProjectorMode] = useState<boolean>(() => loadProjectorMode());

  // 5. Hệ thống Toast phản hồi trực quan nhẹ nhàng
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Tự động lưu trữ khi có thay đổi
  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredSchedule(schedule);
  }, [schedule]);

  useEffect(() => {
    saveStoredResults(results);
  }, [results]);

  useEffect(() => {
    saveStoredNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    saveSoundSetting(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    saveProjectorMode(projectorMode);
  }, [projectorMode]);

  // Hàm thêm thông báo toast
  const addToast = (type: 'success' | 'info', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Tự động tắt sau 3.5 giây
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Điều hướng tab
  const handleSelectTab = (tab: NavTab) => {
    playGentleClick(soundEnabled);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bật/tắt âm thanh
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      playSuccessChime(true);
      addToast('info', 'Âm thanh đã bật', 'Hiệu ứng âm thanh nhẹ nhàng đã sẵn sàng.');
    } else {
      addToast('info', 'Âm thanh đã tắt', 'Ứng dụng đã chuyển sang chế độ im lặng.');
    }
  };

  // Bật/tắt chế độ máy chiếu
  const handleToggleProjectorMode = () => {
    const nextState = !projectorMode;
    setProjectorMode(nextState);
    playGentleClick(soundEnabled);
    if (nextState) {
      addToast('info', 'Chế độ máy chiếu', 'Đã phóng to phông chữ và tối ưu độ tương phản cho lớp học.');
    } else {
      addToast('info', 'Chế độ thường', 'Đã trở về chế độ hiển thị tiêu chuẩn.');
    }
  };

  // Khôi phục dữ liệu gốc
  const handleResetData = () => {
    if (window.confirm('Khôi phục lại toàn bộ dữ liệu mẫu ban đầu của hệ thống EduClass?')) {
      const restored = resetAllToDefaults();
      setTasks(restored.tasks);
      setSchedule(restored.schedule);
      setResults(restored.results);
      setNotifications(restored.notifications);
      playSuccessChime(soundEnabled);
      addToast('info', 'Đã đặt lại dữ liệu', 'Toàn bộ bài tập và thời khóa biểu đã khôi phục về mặc định.');
    }
  };

  // ===== XỬ LÝ NHIỆM VỤ (TASKS) =====
  const handleStartTask = (taskId: string) => {
    playGentleClick(soundEnabled);
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'in_progress' as const } : t))
    );
    const task = tasks.find((t) => t.id === taskId);
    addToast('info', 'Bắt đầu làm bài', `Đã chuyển nhiệm vụ "${task?.title || ''}" sang Đang làm.`);
  };

  const handleCompleteTask = (taskId: string) => {
    playSuccessChime(soundEnabled);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: 'completed' as const, completedAt: new Date().toISOString() }
          : t
      )
    );
    const task = tasks.find((t) => t.id === taskId);
    addToast(
      'success',
      'Làm tốt lắm!',
      `Đã ghi nhận hoàn thành bài tập môn ${task?.subject || ''}. Cố gắng phát huy nhé!`
    );
  };

  const handleReopenTask = (taskId: string) => {
    playGentleClick(soundEnabled);
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'todo' as const, completedAt: undefined } : t))
    );
    addToast('info', 'Đã hoàn tác', 'Nhiệm vụ đã được chuyển lại trạng thái Chưa làm.');
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: 'task-' + Date.now(),
    };
    playGentleClick(soundEnabled);
    setTasks((prev) => [task, ...prev]);
    addToast('success', 'Đã thêm nhiệm vụ', `Nhiệm vụ mới "${task.title}" đã được lưu vào danh sách.`);
  };

  const handleDeleteTask = (taskId: string) => {
    playGentleClick(soundEnabled);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    addToast('info', 'Đã xóa nhiệm vụ', 'Nhiệm vụ đã được xóa khỏi danh sách.');
  };

  const handleEditTask = (updatedTask: Task) => {
    playGentleClick(soundEnabled);
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    addToast('success', 'Đã lưu thay đổi', `Nhiệm vụ "${updatedTask.title}" đã được cập nhật.`);
  };

  // ===== XỬ LÝ LỊCH HỌC (SCHEDULE) =====
  const handleAddPeriod = (newPeriod: Omit<SchedulePeriod, 'id'>) => {
    const period: SchedulePeriod = {
      ...newPeriod,
      id: 'sch-' + Date.now(),
    };
    playGentleClick(soundEnabled);
    setSchedule((prev) => [...prev, period]);
    addToast('success', 'Đã thêm tiết học', `Đã thêm tiết học môn ${period.subject} vào thời khóa biểu.`);
  };

  const handleDeletePeriod = (periodId: string) => {
    playGentleClick(soundEnabled);
    setSchedule((prev) => prev.filter((s) => s.id !== periodId));
    addToast('info', 'Đã xóa tiết học', 'Tiết học đã được xóa khỏi thời khóa biểu.');
  };

  // ===== XỬ LÝ TIẾN ĐỘ & ĐIỂM (RESULTS) =====
  const handleUpdateSubjectResult = (updatedResult: SubjectResult) => {
    playSuccessChime(soundEnabled);
    setResults((prev) => prev.map((r) => (r.id === updatedResult.id ? updatedResult : r)));
    addToast('success', 'Đã cập nhật điểm', `Đã lưu kết quả học tập môn ${updatedResult.subject}.`);
  };

  // ===== XỬ LÝ THÔNG BÁO (NOTIFICATIONS) =====
  const handleMarkAsRead = (id: string) => {
    playGentleClick(soundEnabled);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    playGentleClick(soundEnabled);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('info', 'Đã đọc tất cả', 'Tất cả thông báo đã được đánh dấu là đã đọc.');
  };

  const handleAddNotification = (item: Omit<NotificationItem, 'id' | 'isRead'>) => {
    const newNoti: NotificationItem = {
      ...item,
      id: 'noti-' + Date.now(),
      isRead: false,
    };
    playGentleClick(soundEnabled);
    setNotifications((prev) => [newNoti, ...prev]);
    addToast('success', 'Đã gửi thông báo', `Thông báo mới "${newNoti.title}" đã được đăng.`);
  };

  const handleDeleteNotification = (id: string) => {
    playGentleClick(soundEnabled);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Số lượng đếm cho badge trên thanh điều hướng
  const pendingTasksCount = tasks.filter((t) => t.status !== 'completed').length;
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div 
      id="app-root" 
      className={`min-h-screen flex flex-col bg-slate-50/70 text-slate-800 transition-all duration-200 ${
        projectorMode ? 'text-lg tracking-wide [font-size:110%]' : 'text-base'
      }`}
    >
      {/* 1. Thanh điều hướng chính (Navbar) */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        pendingTasksCount={pendingTasksCount}
        unreadNotificationsCount={unreadNotificationsCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        projectorMode={projectorMode}
        onToggleProjectorMode={handleToggleProjectorMode}
        onResetData={handleResetData}
      />

      {/* 2. Nội dung chính hiển thị đúng 1 trong 5 tính năng */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {currentTab === 'dashboard' && (
          <DashboardView
            student={student}
            tasks={tasks}
            schedule={schedule}
            results={results}
            onNavigate={handleSelectTab}
            onStartTask={handleStartTask}
            onCompleteTask={handleCompleteTask}
          />
        )}

        {currentTab === 'tasks' && (
          <TasksView
            tasks={tasks}
            onNavigate={handleSelectTab}
            onStartTask={handleStartTask}
            onCompleteTask={handleCompleteTask}
            onReopenTask={handleReopenTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        )}

        {currentTab === 'schedule' && (
          <ScheduleView
            schedule={schedule}
            onNavigate={handleSelectTab}
            onAddPeriod={handleAddPeriod}
            onDeletePeriod={handleDeletePeriod}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressView
            tasks={tasks}
            results={results}
            onNavigate={handleSelectTab}
            onUpdateSubjectResult={handleUpdateSubjectResult}
          />
        )}

        {currentTab === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onNavigate={handleSelectTab}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onAddNotification={handleAddNotification}
            onDeleteNotification={handleDeleteNotification}
          />
        )}

      </main>

      {/* 3. Footer tinh gọn, thân thiện giáo dục */}
      <footer className="border-t border-slate-200/80 bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">EduClass – Trợ lý học tập</span>
            <span>•</span>
            <span>Dành cho học sinh & giáo viên THCS</span>
          </div>
          <div>
            <span>Năm học 2026 – 2027 • {student.className}</span>
          </div>
        </div>
      </footer>

      {/* 4. Container thông báo Toast phản hồi trực quan */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
