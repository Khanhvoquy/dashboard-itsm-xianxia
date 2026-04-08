import { Role } from '@/types';

export const GAMIFICATION_CONFIG = {
  // SLA Bonus Configuration
  sla: {
    basePoints: 10,
    maxBonus: 40,
    decayExponent: 1.8,
    penaltyCoefficient: 5,
  },

  // Role Multipliers
  roleMultipliers: {
    L1: 0.9,
    L2: 1.2,
    QA: 0.8,
    DevOps: 1.0,
    PM: 1.1,
    Mentor: 1.3,
  } as Record<Role, number>,

  // Level System Configuration
  levels: {
    realms: [
      { name: 'Luyện Khí', minLevel: 1, maxLevel: 5 },
      { name: 'Trúc Cơ', minLevel: 6, maxLevel: 10 },
      { name: 'Kết Đan', minLevel: 11, maxLevel: 15 },
      { name: 'Nguyên Anh', minLevel: 16, maxLevel: 20 },
      { name: 'Hóa Thần', minLevel: 21, maxLevel: 999 },
    ],
    baseXP: 100,
    growthFactor: 1.5,
  },

  // KB Passive Income
  kb: {
    viewPoints: 0.5,
    likePoints: 2,
    commentPoints: 3,
  },

  // Priority Weights
  priorityWeights: {
    P1: 4,
    P2: 3,
    P3: 2,
    P4: 1,
  },
};

export const getRealmForLevel = (level: number): string => {
  const { realms } = GAMIFICATION_CONFIG.levels;
  const realm = realms.find(r => level >= r.minLevel && level <= r.maxLevel);
  return realm?.name || 'Luyện Khí';
};

export const getXPForNextLevel = (currentLevel: number): number => {
  const { baseXP, growthFactor } = GAMIFICATION_CONFIG.levels;
  return Math.floor(baseXP * Math.pow(growthFactor, currentLevel - 1));
};
