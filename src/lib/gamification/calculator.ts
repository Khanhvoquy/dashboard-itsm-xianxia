import { SLA_CONFIG, SLA_TIME_GOALS, ROLE_MULTIPLIERS, LEVEL_CONFIG, KB_CONFIG, TAM_MA_THRESHOLDS } from './config';
import type { Worklog, Role, Priority, SLA_Result, Realm } from '@/types';

/**
 * Calculate SLA bonus using exponential decay formula:
 * P_SLA = P_base + P_bonus × (T_remaining / T_goal)^α
 */
export function calculateSLABonus(
  timeRemaining: number, // minutes
  timeGoal: number, // minutes
  priority: Priority
): SLA_Result {
  const { P_base, P_bonus, alpha, k } = SLA_CONFIG;
  
  const isBreached = timeRemaining < 0;
  const actualRemaining = Math.max(0, timeRemaining);
  
  let bonusPoints = 0;
  let penaltyPoints = 0;
  
  if (isBreached) {
    // Logarithmic penalty: P_penalty = -k × ln(1 + T_breach)
    const breachTime = Math.abs(timeRemaining);
    penaltyPoints = -k * Math.log(1 + breachTime);
  } else {
    // Exponential decay bonus
    const ratio = actualRemaining / timeGoal;
    bonusPoints = P_bonus * Math.pow(ratio, alpha);
  }
  
  const totalPoints = P_base + bonusPoints + penaltyPoints;
  
  return {
    basePoints: P_base,
    bonusPoints: Math.round(bonusPoints * 100) / 100,
    penaltyPoints: Math.round(penaltyPoints * 100) / 100,
    totalPoints: Math.round(totalPoints * 100) / 100,
    isBreached,
    timeRemaining: actualRemaining,
    timeGoal,
  };
}

/**
 * Calculate contribution for multi-assignee tickets:
 * Contribution_k = W_k / ΣW_j
 * P_k = Contribution_k × P_SLA × M_role
 */
export function calculateMultiAssigneePoints(
  worklogs: Worklog[],
  userId: string,
  role: Role,
  slaResult: SLA_Result
): number {
  const totalWorklogSeconds = worklogs.reduce((sum, w) => sum + w.seconds, 0);
  const userWorklogSeconds = worklogs
    .filter(w => w.userId === userId)
    .reduce((sum, w) => sum + w.seconds, 0);
  
  if (totalWorklogSeconds === 0) return 0;
  
  const contribution = userWorklogSeconds / totalWorklogSeconds;
  const roleMultiplier = ROLE_MULTIPLIERS[role];
  
  return contribution * slaResult.totalPoints * roleMultiplier;
}

/**
 * Calculate KB passive income:
 * P_kb = (views × 0.5) + (likes × 2) + (comments × 3)
 */
export function calculateKBPoints(
  views: number,
  likes: number,
  comments: number
): number {
  const { viewMultiplier, likeMultiplier, commentMultiplier } = KB_CONFIG;
  
  return (
    views * viewMultiplier +
    likes * likeMultiplier +
    comments * commentMultiplier
  );
}

/**
 * Calculate XP needed for a specific level:
 * XP_needed = base_XP × (1.5 ^ (level - 1))
 */
export function getXPForLevel(level: number): number {
  const { baseXP, growthFactor } = LEVEL_CONFIG;
  return Math.round(baseXP * Math.pow(growthFactor, level - 1));
}

/**
 * Get total XP needed to reach a level (cumulative)
 */
export function getCumulativeXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += getXPForLevel(i);
  }
  return total;
}

/**
 * Determine current level and progress from total XP
 */
export function getLevelFromXP(totalXP: number): {
  level: number;
  levelProgress: number;
  nextLevelXp: number;
} {
  let cumulativeXP = 0;
  let level = 1;
  
  while (true) {
    const xpNeeded = getXPForLevel(level);
    if (cumulativeXP + xpNeeded > totalXP) {
      break;
    }
    cumulativeXP += xpNeeded;
    level++;
    
    if (level > 99) break; // Cap at level 99
  }
  
  const nextLevelXp = getXPForLevel(level);
  const levelProgress = totalXP - cumulativeXP;
  
  return {
    level,
    levelProgress,
    nextLevelXp,
  };
}

/**
 * Get realm name from level
 */
export function getRealmFromLevel(level: number): Realm {
  const { realms } = LEVEL_CONFIG;
  
  for (const realm of realms) {
    if (level >= realm.minLevel && level <= realm.maxLevel) {
      return realm.name;
    }
  }
  
  return 'Hóa Thần'; // Default to highest realm
}

/**
 * Get Tâm Ma status from SLA compliance percentage
 */
export function getTamMaStatus(slaCompliance: number): string {
  const { thanhTinh, tamMa, taoHoaNhapMa } = TAM_MA_THRESHOLDS;
  
  if (slaCompliance >= thanhTinh.min) {
    return thanhTinh.label;
  } else if (slaCompliance >= tamMa.min) {
    return tamMa.label;
  } else {
    return taoHoaNhapMa.label;
  }
}

/**
 * Get SLA time goal for a priority
 */
export function getSLATimeGoal(priority: Priority): number {
  return SLA_TIME_GOALS[priority];
}

/**
 * Calculate SLA compliance percentage
 */
export function calculateSLACompliance(resolvedTickets: number, metSLA: number): number {
  if (resolvedTickets === 0) return 100;
  return Math.round((metSLA / resolvedTickets) * 100);
}
