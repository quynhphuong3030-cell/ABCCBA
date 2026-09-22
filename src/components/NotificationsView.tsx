/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  ArrowLeft, 
  Clock, 
  FileText, 
  Calendar, 
  Users, 
  MessageSquare, 
  Check, 
  Plus, 
  Trash2, 
  X,
  Filter
} from 'lucide-react';
import { NotificationItem, NotificationCategory, NavTab } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onNavigate: (tab: NavTab) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onAddNotification: (item: Omit<NotificationItem, 'id' | 'isRead'>) => void;
  onDeleteNotification: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onNavigate,
  onMarkAsRead,
  onMarkAllAsRead,
  onAddNotification,
  onDeleteNotification,
}) => {
  // Bộ lọc danh mục thông báo
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedReadFilter, setSelectedReadFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Modal tạo thông báo mới
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState<NotificationCategory>('teacher');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleCreateNoti = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    onAddNotification({
      title: formTitle.trim(),
      content: formContent.trim(),
      time: 'Vừa xong - Hôm nay',
      category: formCategory,
    });
    setFormTitle('');
    setFormContent('');
    setIsAddModalOpen(false);
  };

  const getCategoryBadge = (category: NotificationCategory) => {
    switch (category) {
      case 'deadline':
        return {
          label: 'Nhắc hạn nộp bài',
          icon: Clock,
          color: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      case 'task':
        return {
          label: 'Nhiệm vụ mới',
          icon: FileText,
          color: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'schedule':
        return {
          label: 'Lịch học',
          icon: Calendar,
          color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        };
      case 'class_activity':
        return {
          label: 'Hoạt động lớp',
          icon: Users,
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 'teacher':
      default:
        return {
          label: 'Từ giáo viên',
          icon: MessageSquare,
          color: 'bg-amber-50 text-amber-700 border-amber-200',
        };
    }
  };

  // Lọc thông báo
  const filteredNotifications = notifications.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedReadFilter === 'unread' && item.isRead) {
      return false;
    }
    if (selectedReadFilter === 'read' && !item.isRead) {
      return false;
    }
    return true;
  });

  return (
    <div id="view-notifications" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar & Nút quay lại Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            id="btn-noti-back-to-dashboard"
            onClick={() => onNavigate('dashboard')}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            title="Quay lại Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Thông báo học tập
              {unreadCount > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                  {unreadCount} chưa đọc
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Tin nhắn từ thầy cô, nhắc nhở hạn nộp bài và hoạt động của lớp
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              id="btn-mark-all-read"
              onClick={onMarkAllAsRead}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-indigo-600" />
              <span>Đọc tất cả</span>
            </button>
          )}

          <button
            id="btn-open-create-notification"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo thông báo</span>
          </button>
        </div>
      </div>

      {/* Thanh bộ lọc danh mục và trạng thái đọc */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-600">Loại thông báo:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tất cả loại thông báo</option>
            <option value="deadline">Nhắc hạn nộp bài</option>
            <option value="task">Thông báo nhiệm vụ mới</option>
            <option value="schedule">Thông báo lịch học</option>
            <option value="class_activity">Hoạt động lớp</option>
            <option value="teacher">Từ giáo viên</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedReadFilter('all')}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              selectedReadFilter === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({notifications.length})
          </button>
          <button
            onClick={() => setSelectedReadFilter('unread')}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              selectedReadFilter === 'unread'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Chưa đọc ({unreadCount})
          </button>
          <button
            onClick={() => setSelectedReadFilter('read')}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              selectedReadFilter === 'read'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Đã đọc ({notifications.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Danh sách thông báo */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Không có thông báo nào trong mục này
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Tất cả thông báo đã được đọc hoặc không có thông báo mới thuộc danh mục đã chọn.
            </p>
          </div>
        ) : (
          filteredNotifications.map((noti) => {
            const badge = getCategoryBadge(noti.category);
            const Icon = badge.icon;
            const isUnread = !noti.isRead;

            return (
              <div
                key={noti.id}
                id={`notification-card-${noti.id}`}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 shadow-xs hover:shadow-sm ${
                  isUnread
                    ? 'border-indigo-300 ring-1 ring-indigo-200/60 bg-indigo-50/15'
                    : 'border-slate-200 opacity-90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Icon danh mục */}
                    <div className={`p-2.5 rounded-xl border shrink-0 ${badge.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>

                        {isUnread && (
                          <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            Chưa đọc
                          </span>
                        )}

                        <span className="text-xs text-slate-400">
                          {noti.time}
                        </span>
                      </div>

                      <h3 className={`text-base font-bold leading-snug ${isUnread ? 'text-slate-900' : 'text-slate-700'}`}>
                        {noti.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {noti.content}
                      </p>
                    </div>
                  </div>

                  {/* Hành động: Đánh dấu đã đọc & Xóa */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                    {isUnread ? (
                      <button
                        id={`btn-mark-read-${noti.id}`}
                        onClick={() => onMarkAsRead(noti.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-1 transition-colors cursor-pointer"
                        title="Đánh dấu thông báo là đã đọc"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Đánh dấu đã đọc</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 px-2 py-1">
                        Đã xem
                      </span>
                    )}

                    <button
                      onClick={() => onDeleteNotification(noti.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Xóa thông báo này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Thêm thông báo mới dành cho giáo viên */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Tạo thông báo mới cho lớp
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNoti} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Loại thông báo:
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as NotificationCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                >
                  <option value="deadline">Nhắc hạn nộp bài</option>
                  <option value="task">Thông báo nhiệm vụ mới</option>
                  <option value="schedule">Thông báo lịch học</option>
                  <option value="class_activity">Hoạt động lớp</option>
                  <option value="teacher">Từ giáo viên</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề thông báo: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nhắc mang dụng cụ thí nghiệm ngày mai..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung chi tiết: *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ghi rõ nội dung thông báo cho học sinh..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium"
                />
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
                  Gửi thông báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
