/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Task, SchedulePeriod, SubjectResult, NotificationItem } from '../types';
import { initialTasks, initialSchedule, initialSubjectResults, initialNotifications } from '../data/initialData';

const TASKS_KEY = 'educlass_tasks_v1';
const SCHEDULE_KEY = 'educlass_schedule_v1';
const RESULTS_KEY = 'educlass_results_v1';
const NOTIFICATIONS_KEY = 'educlass_notifications_v1';
const SOUND_KEY = 'educlass_sound_enabled_v1';
const PROJECTOR_KEY = 'educlass_projector_mode_v1';

export function loadStoredTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) return initialTasks;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialTasks;
  } catch {
    return initialTasks;
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // Graceful fallback when localStorage is restricted
  }
}

export function loadStoredSchedule(): SchedulePeriod[] {
  try {
    const raw = localStorage.getItem(SCHEDULE_KEY);
    if (!raw) return initialSchedule;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialSchedule;
  } catch {
    return initialSchedule;
  }
}

export function saveStoredSchedule(schedule: SchedulePeriod[]): void {
  try {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
  } catch {
    // Fallback
  }
}

export function loadStoredResults(): SubjectResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    if (!raw) return initialSubjectResults;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialSubjectResults;
  } catch {
    return initialSubjectResults;
  }
}

export function saveStoredResults(results: SubjectResult[]): void {
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  } catch {
    // Fallback
  }
}

export function loadStoredNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!raw) return initialNotifications;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialNotifications;
  } catch {
    return initialNotifications;
  }
}

export function saveStoredNotifications(notifications: NotificationItem[]): void {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch {
    // Fallback
  }
}

export function loadSoundSetting(): boolean {
  try {
    const val = localStorage.getItem(SOUND_KEY);
    return val === 'true'; // Default is muted/off for quiet classrooms
  } catch {
    return false;
  }
}

export function saveSoundSetting(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, String(enabled));
  } catch {
    // Fallback
  }
}

export function loadProjectorMode(): boolean {
  try {
    return localStorage.getItem(PROJECTOR_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveProjectorMode(enabled: boolean): void {
  try {
    localStorage.setItem(PROJECTOR_KEY, String(enabled));
  } catch {
    // Fallback
  }
}

export function resetAllToDefaults(): {
  tasks: Task[];
  schedule: SchedulePeriod[];
  results: SubjectResult[];
  notifications: NotificationItem[];
} {
  try {
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(SCHEDULE_KEY);
    localStorage.removeItem(RESULTS_KEY);
    localStorage.removeItem(NOTIFICATIONS_KEY);
  } catch {
    // Fallback
  }
  return {
    tasks: initialTasks,
    schedule: initialSchedule,
    results: initialSubjectResults,
    notifications: initialNotifications,
  };
}
