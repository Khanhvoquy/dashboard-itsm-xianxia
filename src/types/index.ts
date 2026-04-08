// Realm cultivation stages
export type Realm = 'Luyện Khí' | 'Trúc Cơ' | 'Kết Đan' | 'Nguyên Anh' | 'Hóa Thần';

// User roles in IT team
export type Role = 'L1' | 'L2' | 'QA' | 'DevOps' | 'PM' | 'Mentor';

// Ticket priority levels
export type Priority = 'P1' | 'P2' | 'P3' | 'P4';

// Ticket status
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

// Worklog entry
export interface Worklog {
  id: string;
  userId: string;
  ticketId: string;
  seconds: number;
  createdAt: string;
  comment?: string;
}

// User profile
export interface User {
  id: string;
  name_vi: string;
  name_en: string;
  role: Role;
  avatar?: string;
}

// Ticket item
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  assignees: string[]; // user IDs
  createdAt: string;
  resolvedAt?: string;
  slaDeadline: string;
  worklogs: Worklog[];
}

// Knowledge Base article
export interface KB_Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// SLA calculation result
export interface SLA_Result {
  basePoints: number;
  bonusPoints: number;
  penaltyPoints: number;
  totalPoints: number;
  isBreached: boolean;
  timeRemaining: number; // minutes
  timeGoal: number; // minutes
}

// Cultivation stats for gamification
export interface Cultivation_Stats {
  totalXP: number;
  currentLevel: number;
  levelProgress: number; // XP within current level
  nextLevelXp: number; // XP needed for next level
  realm: Realm;
  slaCompliance: number; // percentage
  kbScore: number;
  tamMaStatus: 'Thanh Tịnh' | 'Tâm Ma' | 'Tẩu Hỏa Nhập Ma';
}

// Enhanced user with cultivation data
export interface UserWithStats extends User, Cultivation_Stats {}

// Global dashboard statistics
export interface GlobalStats {
  totalTickets: number;
  avgSLA: number;
  topPerformer: string;
  teamLevel: number;
  totalKB: number;
}

// Snapshot data structure
export interface SnapshotData {
  users: UserWithStats[];
  tickets: Ticket[];
  kb: KB_Article[];
  globalStats: GlobalStats;
  generatedAt: string;
}

// Dashboard store state
export interface DashboardState {
  selectedUser: string | null;
  dateRange: { start: string; end: string };
  theme: 'xianxia';
  lang: 'vi' | 'en';
}

// KPICard props
export interface KPICardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ElementType;
  glow?: 'gold' | 'crimson' | 'jade';
}

// LevelRing props
export interface LevelRingProps {
  level: number;
  currentXP: number;
  maxXP: number;
  realmName: Realm;
  size?: number;
}

// XPBar props
export interface XPBarProps {
  current: number;
  max: number;
  milestones?: number[];
  showLabels?: boolean;
}

// PriorityBadge props
export interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md' | 'lg';
}
