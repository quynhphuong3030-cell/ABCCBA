/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NavTab = 'dashboard' | 'tasks' | 'schedule' | 'progress' | 'notifications';

export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  status: TaskStatus;
  priority: TaskPriority;
  completedAt?: string;
}

export interface SchedulePeriod {
  id: string;
  dayOfWeek: number; // 2: Thứ Hai, 3: Thứ Ba, ..., 7: Thứ Bảy
  period: number; // Tiết 1, 2, 3, 4, 5
  time: string; // "07:15 - 08:00"
  subject: string;
  topic: string;
  teacher?: string;
  room?: string;
}

export interface SubjectResult {
  id: string;
  subject: string;
  color: string;
  badgeBg: string;
  textColor: string;
  oralScore: number; // Điểm kiểm tra miệng
  quizScore: number; // Điểm 15 phút
  midtermScore: number; // Điểm giữa kì
  finalScore: number; // Điểm học kì
  averageScore: number; // Điểm trung bình
  note: string; // Lời nhận xét khích lệ
}

export type NotificationCategory = 
  | 'deadline'       // Nhắc hạn nộp bài
  | 'task'           // Thông báo nhiệm vụ mới
  | 'schedule'       // Thông báo lịch học
  | 'class_activity' // Thông báo hoạt động lớp
  | 'teacher';       // Thông báo từ giáo viên

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
  category: NotificationCategory;
  isRead: boolean;
}

export interface StudentProfile {
  name: string;
  className: string;
  schoolYear: string;
}
