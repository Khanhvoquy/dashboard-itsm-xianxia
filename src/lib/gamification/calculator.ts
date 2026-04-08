import { GAMIFICATION_CONFIG, getXPForNextLevel, getRealmForLevel } from './config';
import type { Worklog, SLA_Result, Cultivation_Stats, Role, Priority } from '@/types';

/**
 * Calculate SLA Bonus with Exponential Decay
 * P_SLA = P_base + P_bonus × (T_remaining / T_goal)^α
 */
export const calculateSLABonus = (
  timeRemaining: number,
  slaGoal: number
): number => {
  const { basePoints, maxBonus, decayExponent } = GAMIFICATION_CONFIG.sla;
  
  if (timeRemaining <= 0) {
    return basePoints; // Only base points if breached
  }

  const ratio = Math.min(timeRemaining / slaGoal, 1);
  const bonus = maxBonus * Math.pow(ratio, decayExponent);
  
  return basePoints + bonus;
};

/**
 * Calculate SLA Penalty with Logarithmic Function
 * P_penalty = -k × ln(1 + T_breach)
 */
export const calculateSLAPenalty = (timeBreached: number): number => {
  const { penaltyCoefficient } = GAMIFICATION_CONFIG.sla;
  
  if (timeBreached <= 0) return 0;
  
  return -penaltyCoefficient * Math.log(1 + timeBreached);
};

/**
 * Get SLA time goal in minutes based on priority
 */
export const getSLATimeGoal = (priority: Priority): number => {
  const goals: Record<Priority, number> = { P1: 240, P2: 480, P3: 1440, P4: 4320 };
  return goals[priority];
};

/**
 * Calculate contribution for multi-assignee tickets
 * Contribution_k = W_k / ΣW_j
 */
export const calculateContribution = (
  userWorklog: number,
  allWorklogs: Worklog[]
): number => {
  const totalTime = allWorklogs.reduce((sum, w) => sum + w.timeSpent, 0);
  
  if (totalTime === 0) return 0;
  
  return userWorklog / totalTime;
};

/**
 * Calculate final points for a user on a ticket with multi-assignee support
 * P_k = Contribution_k × P_SLA × M_role
 */
export const calculateMultiAssigneePoints = (
  worklogs: Worklog[],
  userId: string,
  role: Role,
  slaResult: { isBreached: boolean; points: number }
): number => {
  const userWorklog = worklogs.find(w => w.userId === userId)?.timeSpent || 0;
  const contribution = calculateContribution(userWorklog, worklogs);
  const multiplier = GAMIFICATION_CONFIG.roleMultipliers[role] || 1.0;
  
  return contribution * slaResult.points * multiplier;
};

/**
 * Calculate KB passive income
 * P_kb = (views × 0.5) + (likes × 2) + (comments × 3)
 */
export const calculateKBPoints = (
  views: number,
  likes: number,
  comments: number
): number => {
  const { viewPoints, likePoints, commentPoints } = GAMIFICATION_CONFIG.kb;
  return (views * viewPoints) + (likes * likePoints) + (comments * commentPoints);
};

/**
 * Get level info from total XP
 */
export const getLevelFromXP = (totalXP: number) => {
  let level = 1;
  let remainingXP = totalXP;
  let levelXP = getXPForNextLevel(level);
  
  while (remainingXP >= levelXP) {
    remainingXP -= levelXP;
    level++;
    levelXP = getXPForNextLevel(level);
  }
  
  return {
    level,
    levelProgress: remainingXP,
    nextLevelXp: levelXP,
  };
};

/**
 * Get realm name from level
 */
export const getRealmFromLevel = (level: number): string => {
  return getRealmForLevel(level);
};

/**
 * Check Tâm Ma status based on SLA compliance
 */
export const getTamMaStatus = (slaCompliance: number): 'Thanh Tịnh' | 'Tâm Ma' | 'Tẩu Hỏa Nhập Ma' => {
  if (slaCompliance >= 90) return 'Thanh Tịnh';
  if (slaCompliance >= 70) return 'Tâm Ma';
  return 'Tẩu Hỏa Nhập Ma';
};

/**
 * Calculate total XP and level for a user
 */
export const calculateCultivationStats = (
  ticketPoints: number,
  kbPoints: number,
  slaBonus: number
): Omit<Cultivation_Stats, 'userId'> => {
  const totalXP = Math.floor(ticketPoints + kbPoints + slaBonus);
  
  let currentLevel = 1;
  let remainingXP = totalXP;
  let levelXP = getXPForNextLevel(currentLevel);
  
  while (remainingXP >= levelXP) {
    remainingXP -= levelXP;
    currentLevel++;
    levelXP = getXPForNextLevel(currentLevel);
  }
  
  const realm = getRealmForLevel(currentLevel);
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const levelProgress = remainingXP;
  
  return {
    totalXP,
    currentLevel,
    levelProgress,
    nextLevelXP,
    realm,
    slaBonus: Math.floor(slaBonus),
    kbScore: Math.floor(kbPoints),
    ticketPoints: Math.floor(ticketPoints),
  };
};

/**
 * Check if user has Tâm Ma status (low SLA + high stress)
 */
export const checkTamMaStatus = (
  slaCompliance: number,
  activeTickets: number
): boolean => {
  return slaCompliance < 70 && activeTickets > 5;
};
