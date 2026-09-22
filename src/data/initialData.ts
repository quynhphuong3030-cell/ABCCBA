/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Task, SchedulePeriod, SubjectResult, NotificationItem, StudentProfile } from '../types';

/**
 * ====================================================================
 * DỮ LIỆU MẪU DÀNH CHO GIÁO VIÊN VÀ HỌC SINH THCS
 * ====================================================================
 * Giáo viên có thể trực tiếp thêm, sửa, xoá các phần tử trong các mảng dưới đây.
 * Mọi thay đổi sẽ được nạp tự động vào hệ thống EduClass.
 */

// 1. THÔNG TIN HỌC SINH MẪU
export const initialStudentProfile: StudentProfile = {
  name: 'Nguyễn Minh Quân',
  className: 'Lớp 8A2',
  schoolYear: 'Năm học 2026 - 2027',
};

// 2. DANH SÁCH NHIỆM VỤ HỌC TẬP (TASKS)
// Trạng thái: 'todo' (Chưa làm), 'in_progress' (Đang làm), 'completed' (Đã hoàn thành)
// Mức độ ưu tiên: 'high' (Cao), 'medium' (Trung bình), 'low' (Thấp)
export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Giải bài tập Phương trình bậc nhất (bài 12 đến 16)',
    subject: 'Toán',
    description: 'Làm bài tập trang 24 SGK Toán 8 tập 1 và chuẩn bị câu hỏi thảo luận nhóm.',
    dueDate: '2026-09-23',
    status: 'in_progress',
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Viết đoạn văn cảm nhận bài thơ "Đồng chí"',
    subject: 'Ngữ văn',
    description: 'Viết từ 10 - 12 câu nêu cảm nhận về tình đồng chí keo sơn của những người lính.',
    dueDate: '2026-09-24',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 'task-3',
    title: 'Học từ vựng Unit 2: Life in the countryside',
    subject: 'Tiếng Anh',
    description: 'Ôn 15 từ mới vựng về cuộc sống nông thôn và làm bài tập trên phiếu học tập.',
    dueDate: '2026-09-22',
    status: 'completed',
    priority: 'medium',
    completedAt: '2026-09-21T16:30:00Z',
  },
  {
    id: 'task-4',
    title: 'Báo cáo thí nghiệm: Sự biến đổi hóa học của chất',
    subject: 'Khoa học tự nhiên',
    description: 'Hoàn thiện bảng ghi kết quả thí nghiệm đốt cháy magie và nhỏ giấm vào bột vỏ trứng.',
    dueDate: '2026-09-25',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: 'task-5',
    title: 'Vẽ sơ đồ tư duy: Cuộc kháng chiến chống quân Nguyên',
    subject: 'Lịch sử và Địa lí',
    description: 'Tóm tắt 3 lần chiến thắng vang dội trên sông Bạch Đằng và hội nghị Diên Hồng.',
    dueDate: '2026-09-26',
    status: 'todo',
    priority: 'low',
  },
  {
    id: 'task-6',
    title: 'Thực hành lập trình khối thuật toán tuần tự',
    subject: 'Tin học',
    description: 'Viết chương trình tính diện tích tam giác và chia sẻ link dự án vào nhóm học tập.',
    dueDate: '2026-09-22',
    status: 'completed',
    priority: 'medium',
    completedAt: '2026-09-22T08:15:00Z',
  },
  {
    id: 'task-7',
    title: 'Chuẩn bị bài thuyết trình nhóm: Năng lượng tái tạo',
    subject: 'Khoa học tự nhiên',
    description: 'Tìm hiểu 3 nguồn năng lượng sạch phổ biến tại Việt Nam và chuẩn bị slide nhóm.',
    dueDate: '2026-09-27',
    status: 'todo',
    priority: 'medium',
  }
];

// 3. THỜI KHÓA BIỂU / LỊCH HỌC TUẦN
// dayOfWeek: 2 (Thứ Hai), 3 (Thứ Ba), 4 (Thứ Tư), 5 (Thứ Năm), 6 (Thứ Sáu), 7 (Thứ Bảy)
export const initialSchedule: SchedulePeriod[] = [
  // --- THỨ HAI (dayOfWeek: 2) ---
  {
    id: 'sch-2-1',
    dayOfWeek: 2,
    period: 1,
    time: '07:15 - 08:00',
    subject: 'Chào cờ & Sinh hoạt đầu tuần',
    topic: 'Chủ đề: Xây dựng tình bạn đẹp - Nói không với bạo lực học đường',
    teacher: 'Thầy Tổng phụ trách & GVCN',
    room: 'Sân trường',
  },
  {
    id: 'sch-2-2',
    dayOfWeek: 2,
    period: 2,
    time: '08:05 - 08:50',
    subject: 'Toán',
    topic: 'Đại số: Khái niệm đơn thức nhiều biến và đa thức',
    teacher: 'Cô Mai Lan',
    room: 'Phòng 204',
  },
  {
    id: 'sch-2-3',
    dayOfWeek: 2,
    period: 3,
    time: '09:05 - 09:50',
    subject: 'Ngữ văn',
    topic: 'Đọc hiểu văn bản: Vẻ đẹp bài thơ Quê hương (Tế Hanh)',
    teacher: 'Thầy Văn Thành',
    room: 'Phòng 204',
  },
  {
    id: 'sch-2-4',
    dayOfWeek: 2,
    period: 4,
    time: '09:55 - 10:40',
    subject: 'Tiếng Anh',
    topic: 'Unit 2: Getting Started - Life in the Countryside',
    teacher: 'Cô Quỳnh Chi',
    room: 'Phòng Ngoại ngữ',
  },

  // --- THỨ BA (dayOfWeek: 3) ---
  {
    id: 'sch-3-1',
    dayOfWeek: 3,
    period: 1,
    time: '07:15 - 08:00',
    subject: 'Khoa học tự nhiên',
    topic: 'Vật lí: Đo tốc độ chuyển động trong phòng thực hành',
    teacher: 'Thầy Quốc Huy',
    room: 'Phòng Lab KHTN',
  },
  {
    id: 'sch-3-2',
    dayOfWeek: 3,
    period: 2,
    time: '08:05 - 08:50',
    subject: 'Khoa học tự nhiên',
    topic: 'Hóa học: Phản ứng hóa học và năng lượng tỏa ra',
    teacher: 'Thầy Quốc Huy',
    room: 'Phòng Lab KHTN',
  },
  {
    id: 'sch-3-3',
    dayOfWeek: 3,
    period: 3,
    time: '09:05 - 09:50',
    subject: 'Toán',
    topic: 'Hình học: Các góc ở vị trí đặc biệt, tia phân giác',
    teacher: 'Cô Mai Lan',
    room: 'Phòng 204',
  },
  {
    id: 'sch-3-4',
    dayOfWeek: 3,
    period: 4,
    time: '09:55 - 10:40',
    subject: 'Tin học',
    topic: 'Chủ đề: Thuật toán sắp xếp và tìm kiếm tuần tự',
    teacher: 'Cô Hương Giang',
    room: 'Phòng máy tính 1',
  },

  // --- THỨ TƯ (dayOfWeek: 4) ---
  {
    id: 'sch-4-1',
    dayOfWeek: 4,
    period: 1,
    time: '07:15 - 08:00',
    subject: 'Ngữ văn',
    topic: 'Thực hành tiếng Việt: Biện pháp tu từ ẩn dụ và hoán dụ',
    teacher: 'Thầy Văn Thành',
    room: 'Phòng 204',
  },
  {
    id: 'sch-4-2',
    dayOfWeek: 4,
    period: 2,
    time: '08:05 - 08:50',
    subject: 'Lịch sử và Địa lí',
    topic: 'Lịch sử: Nước Đại Việt thời Trần (Thế kỉ XIII)',
    teacher: 'Cô Thu Trang',
    room: 'Phòng 204',
  },
  {
    id: 'sch-4-3',
    dayOfWeek: 4,
    period: 3,
    time: '09:05 - 09:50',
    subject: 'Tiếng Anh',
    topic: 'Unit 2: A closer look 1 - Comparative adverbs',
    teacher: 'Cô Quỳnh Chi',
    room: 'Phòng Ngoại ngữ',
  },
  {
    id: 'sch-4-4',
    dayOfWeek: 4,
    period: 4,
    time: '09:55 - 10:40',
    subject: 'Giáo dục thể chất',
    topic: 'Chạy cự li ngắn 60m và phối hợp tiếp sức',
    teacher: 'Thầy Hoàng Nam',
    room: 'Sân vận động',
  },

  // --- THỨ NĂM (dayOfWeek: 5) ---
  {
    id: 'sch-5-1',
    dayOfWeek: 5,
    period: 1,
    time: '07:15 - 08:00',
    subject: 'Toán',
    topic: 'Luyện tập chung: Các phép tính với đa thức nhiều biến',
    teacher: 'Cô Mai Lan',
    room: 'Phòng 204',
  },
  {
    id: 'sch-5-2',
    dayOfWeek: 5,
    period: 2,
    time: '08:05 - 08:50',
    subject: 'Khoa học tự nhiên',
    topic: 'Sinh học: Cấu tạo và chức năng của tế bào nhân thực',
    teacher: 'Thầy Quốc Huy',
    room: 'Phòng Lab KHTN',
  },
  {
    id: 'sch-5-3',
    dayOfWeek: 5,
    period: 3,
    time: '09:05 - 09:50',
    subject: 'Lịch sử và Địa lí',
    topic: 'Địa lí: Đặc điểm địa hình và khoáng sản Việt Nam',
    teacher: 'Cô Thu Trang',
    room: 'Phòng 204',
  },
  {
    id: 'sch-5-4',
    dayOfWeek: 5,
    period: 4,
    time: '09:55 - 10:40',
    subject: 'Nghệ thuật (Âm nhạc / Mỹ thuật)',
    topic: 'Hòa ca học đường: Bài hát "Niềm vui tới trường"',
    teacher: 'Cô Minh Thư',
    room: 'Phòng Âm nhạc',
  },

  // --- THỨ SÁU (dayOfWeek: 6) ---
  {
    id: 'sch-6-1',
    dayOfWeek: 6,
    period: 1,
    time: '07:15 - 08:00',
    subject: 'Ngữ văn',
    topic: 'Viết bài văn phân tích một tác phẩm thơ lục bát',
    teacher: 'Thầy Văn Thành',
    room: 'Phòng 204',
  },
  {
    id: 'sch-6-2',
    dayOfWeek: 6,
    period: 2,
    time: '08:05 - 08:50',
    subject: 'Tiếng Anh',
    topic: 'Unit 2: Skills 1 - Reading & Speaking practice',
    teacher: 'Cô Quỳnh Chi',
    room: 'Phòng Ngoại ngữ',
  },
  {
    id: 'sch-6-3',
    dayOfWeek: 6,
    period: 3,
    time: '09:05 - 09:50',
    subject: 'Tin học',
    topic: 'Thực hành: Trình bày bài giảng bằng sơ đồ khối',
    teacher: 'Cô Hương Giang',
    room: 'Phòng máy tính 1',
  },
  {
    id: 'sch-6-4',
    dayOfWeek: 6,
    period: 4,
    time: '09:55 - 10:40',
    subject: 'Hoạt động trải nghiệm & Sinh hoạt lớp',
    topic: 'Tổng kết thi đua tuần, lập kế hoạch học tập tuần mới',
    teacher: 'Cô Mai Lan (GVCN)',
    room: 'Phòng 204',
  },

  // --- THỨ BẢY (dayOfWeek: 7) ---
  {
    id: 'sch-7-1',
    dayOfWeek: 7,
    period: 1,
    time: '07:30 - 09:00',
    subject: 'Câu lạc bộ STEM & Sáng tạo khoa học',
    topic: 'Chế tạo mô hình cánh tay robot thuỷ lực đơn giản',
    teacher: 'Thầy Quốc Huy',
    room: 'Phòng STEM',
  },
  {
    id: 'sch-7-2',
    dayOfWeek: 7,
    period: 2,
    time: '09:15 - 10:45',
    subject: 'Câu lạc bộ Đọc sách & Kĩ năng mềm',
    topic: 'Tọa đàm: Phương pháp tự học và quản lí thời gian',
    teacher: 'Thầy Văn Thành',
    room: 'Thư viện trường',
  },
];

// 4. KẾT QUẢ VÀ ĐIỂM SỐ MẪU THEO TỪNG MÔN
// Tinh thần: Khích lệ, tiến bộ bản thân, không xếp hạng so sánh
export const initialSubjectResults: SubjectResult[] = [
  {
    id: 'sub-1',
    subject: 'Toán',
    color: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    textColor: 'text-blue-600',
    oralScore: 8.5,
    quizScore: 9.0,
    midtermScore: 8.8,
    finalScore: 8.5,
    averageScore: 8.7,
    note: 'Tư duy logic nhạy bén, tích cực phát biểu xây dựng bài trong các tiết học hình học.',
  },
  {
    id: 'sub-2',
    subject: 'Ngữ văn',
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    textColor: 'text-amber-600',
    oralScore: 8.0,
    quizScore: 8.5,
    midtermScore: 8.0,
    finalScore: 8.5,
    averageScore: 8.3,
    note: 'Diễn đạt lưu loát, bài văn giàu cảm xúc. Cần rèn thêm kỹ năng lập dàn ý chi tiết.',
  },
  {
    id: 'sub-3',
    subject: 'Tiếng Anh',
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    textColor: 'text-emerald-600',
    oralScore: 9.0,
    quizScore: 9.5,
    midtermScore: 9.0,
    finalScore: 9.2,
    averageScore: 9.2,
    note: 'Phát âm chuẩn, vốn từ vựng phong phú và rất tự tin trong các hoạt động thuyết trình nhóm.',
  },
  {
    id: 'sub-4',
    subject: 'Khoa học tự nhiên',
    color: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    textColor: 'text-cyan-600',
    oralScore: 8.5,
    quizScore: 8.0,
    midtermScore: 8.5,
    finalScore: 8.8,
    averageScore: 8.5,
    note: 'Yêu thích làm thí nghiệm, ghi chép hiện tượng tỉ mỉ và đặt nhiều câu hỏi khoa học thú vị.',
  },
  {
    id: 'sub-5',
    subject: 'Lịch sử và Địa lí',
    color: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    textColor: 'text-rose-600',
    oralScore: 8.0,
    quizScore: 8.5,
    midtermScore: 8.5,
    finalScore: 8.0,
    averageScore: 8.2,
    note: 'Ghi nhớ tốt các mốc sự kiện lịch sử hào hùng và đọc hiểu bản đồ địa hình thành thạo.',
  },
  {
    id: 'sub-6',
    subject: 'Tin học',
    color: 'from-violet-500 to-purple-600',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    textColor: 'text-violet-600',
    oralScore: 9.5,
    quizScore: 9.0,
    midtermScore: 9.5,
    finalScore: 9.5,
    averageScore: 9.4,
    note: 'Nắm vững tư duy thuật toán, thao tác máy tính nhanh nhẹn và hỗ trợ bạn bè rất nhiệt tình.',
  },
];

// 5. DANH SÁCH THÔNG BÁO HỌC TẬP (NOTIFICATIONS)
// Thể loại: 'deadline' (Hạn nộp), 'task' (Nhiệm vụ mới), 'schedule' (Lịch học), 'class_activity' (Hoạt động lớp), 'teacher' (Từ giáo viên)
export const initialNotifications: NotificationItem[] = [
  {
    id: 'noti-1',
    title: 'Nhắc nhở: Hạn nộp bài tập Toán 8 vào ngày mai',
    content: 'Các em nhớ hoàn thiện các bài toán trang 24 SGK Toán và nộp vở đầu giờ tiết 2 ngày mai.',
    time: '14:20 - Hôm nay',
    category: 'deadline',
    isRead: false,
  },
  {
    id: 'noti-2',
    title: 'Thông báo nhiệm vụ mới môn Ngữ văn',
    content: 'Thầy đã giao bài viết đoạn cảm nhận bài thơ "Đồng chí". Hạn nộp ngày 24/09.',
    time: '10:05 - Hôm nay',
    category: 'task',
    isRead: false,
  },
  {
    id: 'noti-3',
    title: 'Điều chỉnh phòng học tiết Tin học Thứ Ba',
    content: 'Tiết 4 ngày mai (Thứ Ba), lớp sẽ học tại Phòng máy tính số 1 (Tầng 3 nhà A) thay vì phòng thường.',
    time: '08:30 - Hôm qua',
    category: 'schedule',
    isRead: false,
  },
  {
    id: 'noti-4',
    title: 'Phát động phong trào Đôi bạn cùng tiến học kì 1',
    content: 'Chi đội 8A2 bắt đầu đăng ký các nhóm học tập hỗ trợ nhau ôn thi giữa kì. Hạn đăng ký đến thứ Sáu.',
    time: '16:00 - 20/09/2026',
    category: 'class_activity',
    isRead: true,
  },
  {
    id: 'noti-5',
    title: 'Lời nhắn từ Cô Mai Lan (GVCN)',
    content: 'Tuần này các em thực hiện nề nếp rất tốt, đặc biệt là tinh thần chuẩn bị bài chu đáo trước khi đến lớp. Cố gắng phát huy nhé!',
    time: '09:00 - 19/09/2026',
    category: 'teacher',
    isRead: true,
  },
];

// Danh sách tất cả các môn học THCS chính
export const THCS_SUBJECTS = [
  'Toán',
  'Ngữ văn',
  'Tiếng Anh',
  'Khoa học tự nhiên',
  'Lịch sử và Địa lí',
  'Tin học',
];
