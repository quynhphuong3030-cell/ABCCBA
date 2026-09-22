/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Filter, 
  Plus, 
  Check, 
  Play, 
  ArrowLeft, 
  Trash2, 
  Edit3, 
  X,
  RotateCcw
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus, NavTab } from '../types';
import { THCS_SUBJECTS } from '../data/initialData';

interface TasksViewProps {
  tasks: Task[];
  onNavigate: (tab: NavTab) => void;
  onStartTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onReopenTask: (taskId: string) => void;
  onAddTask: (newTask: Omit<Task, 'id'>) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (updatedTask: Task) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onNavigate,
  onStartTask,
  onCompleteTask,
  onReopenTask,
  onAddTask,
  onDeleteTask,
  onEditTask,
}) => {
  // Bộ lọc
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDueDateFilter, setSelectedDueDateFilter] = useState<string>('all');

  // Modal Thêm / Sửa nhiệm vụ
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState('Toán');
  const [formDescription, setFormDescription] = useState('');
  const [formDueDate, setFormDueDate] = useState('2026-09-25');
  const [formPriority, setFormPriority] = useState<TaskPriority>('medium');
  const [formStatus, setFormStatus] = useState<TaskStatus>('todo');

  const openCreateModal = () => {
    setEditingTask(null);
    setFormTitle('');
    setFormSubject('Toán');
    setFormDescription('');
    setFormDueDate('2026-09-25');
    setFormPriority('medium');
    setFormStatus('todo');
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormSubject(task.subject);
    setFormDescription(task.description);
    setFormDueDate(task.dueDate);
    setFormPriority(task.priority);
    setFormStatus(task.status);
    setIsModalOpen(true);
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingTask) {
      onEditTask({
        ...editingTask,
        title: formTitle.trim(),
        subject: formSubject,
        description: formDescription.trim(),
        dueDate: formDueDate,
        priority: formPriority,
        status: formStatus,
      });
    } else {
      onAddTask({
        title: formTitle.trim(),
        subject: formSubject,
        description: formDescription.trim(),
        dueDate: formDueDate,
        priority: formPriority,
        status: formStatus,
      });
    }
    setIsModalOpen(false);
  };

  // Logic lọc nhiệm vụ
  const filteredTasks = tasks.filter((task) => {
    // Lọc môn
    if (selectedSubject !== 'all' && task.subject !== selectedSubject) {
      return false;
    }
    // Lọc trạng thái
    if (selectedStatus !== 'all' && task.status !== selectedStatus) {
      return false;
    }
    // Lọc hạn hoàn thành
    if (selectedDueDateFilter === 'today') {
      return task.dueDate === '2026-09-22';
    }
    if (selectedDueDateFilter === 'overdue') {
      return task.dueDate < '2026-09-22' && task.status !== 'completed';
    }
    if (selectedDueDateFilter === 'upcoming') {
      return task.dueDate >= '2026-09-22';
    }
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;

  return (
    <div id="view-tasks" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar & Nút quay lại Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            id="btn-tasks-back-to-dashboard"
            onClick={() => onNavigate('dashboard')}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            title="Quay lại Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Nhiệm vụ học tập
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Quản lý bài tập về nhà, chuẩn bị bài và các hoạt động học tập
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-open-create-task-modal"
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm nhiệm vụ</span>
          </button>
        </div>
      </div>

      {/* Tóm tắt nhanh số lượng trạng thái */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
        <span className="font-semibold text-slate-600">Thống kê:</span>
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            selectedStatus === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Tất cả ({tasks.length})
        </button>
        <button
          onClick={() => setSelectedStatus('todo')}
          className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            selectedStatus === 'todo'
              ? 'bg-amber-600 text-white'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          }`}
        >
          Chưa làm ({todoCount})
        </button>
        <button
          onClick={() => setSelectedStatus('in_progress')}
          className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            selectedStatus === 'in_progress'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
        >
          Đang làm ({inProgressCount})
        </button>
        <button
          onClick={() => setSelectedStatus('completed')}
          className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            selectedStatus === 'completed'
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          Đã hoàn thành ({completedCount})
        </button>
      </div>

      {/* Thanh bộ lọc (Môn học, Trạng thái, Hạn nộp) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5" />
          <span>Bộ lọc tìm kiếm</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Lọc theo môn học */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Môn học:
            </label>
            <select
              id="filter-select-subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              <option value="all">Tất cả môn học</option>
              {THCS_SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Lọc theo trạng thái */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Trạng thái:
            </label>
            <select
              id="filter-select-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="todo">Chưa làm</option>
              <option value="in_progress">Đang làm</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>

          {/* Lọc theo hạn hoàn thành */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hạn hoàn thành:
            </label>
            <select
              id="filter-select-due"
              value={selectedDueDateFilter}
              onChange={(e) => setSelectedDueDateFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              <option value="all">Tất cả thời gian</option>
              <option value="today">Hôm nay (22/09)</option>
              <option value="upcoming">Sắp đến hạn</option>
              <option value="overdue">Đã quá hạn</option>
            </select>
          </div>

        </div>
      </div>

      {/* Danh sách nhiệm vụ học tập */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Không có nhiệm vụ nào phù hợp
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Thử đặt lại bộ lọc môn học hoặc trạng thái để xem các nhiệm vụ khác nhé!
            </p>
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedStatus('all');
                setSelectedDueDateFilter('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const isInProgress = task.status === 'in_progress';
            const isHighPriority = task.priority === 'high';

            return (
              <div
                key={task.id}
                id={`task-card-${task.id}`}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 shadow-xs hover:shadow-sm ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Nội dung nhiệm vụ */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Môn học */}
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {task.subject}
                      </span>

                      {/* Trạng thái */}
                      {isCompleted ? (
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Đã hoàn thành
                        </span>
                      ) : isInProgress ? (
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          Đang làm
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Chưa làm
                        </span>
                      )}

                      {/* Mức độ ưu tiên */}
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                        isHighPriority
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : task.priority === 'medium'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-slate-50 text-slate-500'
                      }`}>
                        Ưu tiên: {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                      </span>

                      {/* Hạn hoàn thành */}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Hạn: <strong>{task.dueDate}</strong>
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold leading-snug ${
                      isCompleted ? 'text-slate-600 line-through decoration-slate-400' : 'text-slate-900'
                    }`}>
                      {task.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {task.description}
                    </p>
                  </div>

                  {/* Nút hành động */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    
                    {/* Nút Bắt đầu */}
                    {!isCompleted && !isInProgress && (
                      <button
                        id={`btn-start-task-${task.id}`}
                        onClick={() => onStartTask(task.id)}
                        className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Đánh dấu chuyển sang Đang làm"
                      >
                        <Play className="w-4 h-4" />
                        <span>Bắt đầu</span>
                      </button>
                    )}

                    {/* Nút Đánh dấu hoàn thành */}
                    {!isCompleted ? (
                      <button
                        id={`btn-complete-task-${task.id}`}
                        onClick={() => onCompleteTask(task.id)}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                        title="Đánh dấu hoàn thành bài tập"
                      >
                        <Check className="w-4 h-4" />
                        <span>Đánh dấu hoàn thành</span>
                      </button>
                    ) : (
                      /* Đã hoàn thành: Hiển thị nhãn rõ ràng và nút làm lại nhẹ nhàng */
                      <div className="flex items-center gap-2">
                        <div className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-100/80 text-emerald-800 flex items-center gap-1.5 cursor-default">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Đã xong ✓</span>
                        </div>
                        <button
                          id={`btn-reopen-task-${task.id}`}
                          onClick={() => onReopenTask(task.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Làm lại nhiệm vụ này (Hoàn tác)"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Nút Sửa */}
                    <button
                      id={`btn-edit-task-${task.id}`}
                      onClick={() => openEditModal(task)}
                      className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                      title="Chỉnh sửa nhiệm vụ"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Nút Xóa */}
                    <button
                      id={`btn-delete-task-${task.id}`}
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Xóa nhiệm vụ"
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

      {/* Modal Thêm / Chỉnh sửa nhiệm vụ dành cho giáo viên và học sinh */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {editingTask ? 'Chỉnh sửa nhiệm vụ' : 'Thêm nhiệm vụ học tập mới'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitModal} className="space-y-4">
              {/* Tên nhiệm vụ */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên nhiệm vụ / Bài tập: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Làm bài tập 1, 2 trang 35 SGK..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              {/* Môn học & Hạn nộp */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Môn học:
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {THCS_SUBJECTS.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hạn hoàn thành:
                  </label>
                  <input
                    type="date"
                    required
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Mức độ ưu tiên & Trạng thái */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mức độ ưu tiên:
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trạng thái:
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as TaskStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="todo">Chưa làm</option>
                    <option value="in_progress">Đang làm</option>
                    <option value="completed">Đã hoàn thành</option>
                  </select>
                </div>
              </div>

              {/* Nội dung ngắn */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung chi tiết / Hướng dẫn:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ghi chú thêm về yêu cầu hoặc lưu ý của thầy cô..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                >
                  {editingTask ? 'Lưu thay đổi' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
