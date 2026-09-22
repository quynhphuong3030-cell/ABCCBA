/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  CalendarDays, 
  TrendingUp, 
  Bell, 
  Volume2, 
  VolumeX, 
  Tv, 
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { NavTab } from '../types';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingTasksCount: number;
  unreadNotificationsCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  projectorMode: boolean;
  onToggleProjectorMode: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  pendingTasksCount,
  unreadNotificationsCount,
  soundEnabled,
  onToggleSound,
  projectorMode,
  onToggleProjectorMode,
  onResetData,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard tổng quan',
      shortLabel: 'Tổng quan',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'tasks' as NavTab,
      label: 'Nhiệm vụ học tập',
      shortLabel: 'Nhiệm vụ',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
    },
    {
      id: 'schedule' as NavTab,
      label: 'Lịch học',
      shortLabel: 'Lịch học',
      icon: CalendarDays,
      badge: null,
    },
    {
      id: 'progress' as NavTab,
      label: 'Tiến độ và kết quả',
      shortLabel: 'Tiến độ & Điểm',
      icon: TrendingUp,
      badge: null,
    },
    {
      id: 'notifications' as NavTab,
      label: 'Thông báo',
      shortLabel: 'Thông báo',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand & Home click */}
          <div className="flex items-center gap-3">
            <button
              id="btn-nav-brand"
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl p-1.5 transition-colors hover:bg-slate-100"
              title="Quay lại Dashboard"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  EduClass
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    THCS
                  </span>
                </span>
                <span className="block text-xs text-slate-600 font-medium -mt-0.5">
                  Trợ lý học tập
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation - 5 Main Features */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Thanh điều hướng chính">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs ring-1 ring-indigo-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-600'}`} />
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white leading-none min-w-5 text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right utilities: Sound toggle, Projector mode, Reset */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Sound toggle button */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title={soundEnabled ? 'Đang bật âm thanh giao diện' : 'Đang tắt âm thanh giao diện (Bấm để bật)'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Âm thanh: Bật</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">Âm thanh: Tắt</span>
                </>
              )}
            </button>

            {/* Projector / Classroom display mode */}
            <button
              id="btn-toggle-projector"
              onClick={onToggleProjectorMode}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
                projectorMode
                  ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Chế độ máy chiếu / Phóng to chữ cho lớp học"
            >
              <Tv className="w-4 h-4" />
              <span className="hidden md:inline">
                {projectorMode ? 'Máy chiếu: Bật' : 'Chế độ máy chiếu'}
              </span>
            </button>

            {/* Reset data */}
            <button
              id="btn-reset-sample-data"
              onClick={onResetData}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Khôi phục dữ liệu mẫu ban đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Horizontal Tab Bar */}
        <div className="lg:hidden flex items-center justify-between gap-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-1 min-w-[70px] ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon className="w-4 h-4 mb-0.5" />
                  {item.badge !== null && (
                    <span className="absolute -top-1.5 -right-2.5 px-1 py-0.2 text-[10px] font-bold rounded-full bg-indigo-600 text-white leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
