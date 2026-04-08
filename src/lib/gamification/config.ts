import { Role, Priority } from '@/types';

// SLA Configuration
export const SLA_CONFIG = {
  P_base: 10, // Base points for resolving ticket
  P_bonus: 40, // Maximum bonus points
  alpha: 1.8, // Exponential decay coefficient
  k: 5, // Penalty coefficient for logarithmic function
};

// SLA time goals by priority (in minutes)
export const SLA_TIME_GOALS: Record<Priority, number> = {
  P1: 240,   // 4 hours
  P2: 480,   // 8 hours
  P3: 1440,  // 24 hours
  P4: 4320,  // 72 hours
};

// Role multipliers for contribution calculation
export const ROLE_MULTIPLIERS: Record<Role, number> = {
  L1: 0.9,
  L2: 1.2,
  QA: 0.8,
  DevOps: 1.0,
  PM: 1.1,
  Mentor: 1.3,
};

// Level system configuration
export const LEVEL_CONFIG = {
  baseXP: 100,
  growthFactor: 1.5,
  realms: [
    { name: 'Luyện Khí', minLevel: 1, maxLevel: 5 },
    { name: 'Trúc Cơ', minLevel: 6, maxLevel: 10 },
    { name: 'Kết Đan', minLevel: 11, maxLevel: 15 },
    { name: 'Nguyên Anh', minLevel: 16, maxLevel: 20 },
    { name: 'Hóa Thần', minLevel: 21, maxLevel: 99 },
  ] as const,
};

// KB passive income formula coefficients
export const KB_CONFIG = {
  viewMultiplier: 0.5,
  likeMultiplier: 2,
  commentMultiplier: 3,
};

// Tâm Ma status thresholds
export const TAM_MA_THRESHOLDS = {
  thanhTinh: { min: 80, label: 'Thanh Tịnh' }, // Good SLA compliance
  tamMa: { min: 50, max: 79, label: 'Tâm Ma' }, // Moderate
  taoHoaNhapMa: { max: 49, label: 'Tẩu Hỏa Nhập Ma' }, // Poor
};
