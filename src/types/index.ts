export type Locale = 'vi' | 'en';

export type Role = 'L1' | 'L2' | 'QA' | 'DevOps' | 'PM' | 'Mentor';

export type Priority = 'P1' | 'P2' | 'P3' | 'P4';

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export type Realm = 'Luyện Khí' | 'Trúc Cơ' | 'Kết Đan' | 'Nguyên Anh' | 'Hóa Thần';

export interface User {
  id: string;
  name_vi: string;
  name_en: string;
  role: Role;
  level: number;
  xp: number;
  nextLevelXp: number;
  realm: Realm;
  slaCompliance: number;
  kbContributions: number;
  totalTickets: number;
  tâmMaStatus?: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TicketStatus;
  assignees: string[];
  createdAt: string;
  resolvedAt?: string;
  slaGoal: number; // minutes
  worklogs: Worklog[];
}

export interface Worklog {
  userId: string;
  timeSpent: number; // seconds
  comment?: string;
  loggedAt: string;
}

export interface KB_Article {
  id: string;
  title: string;
  authorId: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface SLA_Result {
  ticketId: string;
  isCompliant: boolean;
  timeRemaining?: number; // minutes
  timeBreached?: number; // minutes
  basePoints: number;
  bonusPoints: number;
  penaltyPoints: number;
  finalPoints: number;
}

export interface Cultivation_Stats {
  userId: string;
  totalXP: number;
  currentLevel: number;
  levelProgress: number;
  nextLevelXP: number;
  realm: Realm;
  slaBonus: number;
  kbScore: number;
  ticketPoints: number;
}

export interface DashboardState {
  selectedUser: string | null;
  dateRange: { start: string; end: string };
  theme: string;
  lang: 'vi' | 'en';
}
