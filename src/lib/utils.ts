import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return num.toLocaleString('vi-VN');
}

export function calculateProgress(current: number, max: number): number {
  if (max === 0) return 0;
  return Math.min(100, Math.max(0, (current / max) * 100));
}

export function getRealmName(level: number): string {
  if (level <= 5) return 'Luyện Khí';
  if (level <= 10) return 'Trúc Cơ';
  if (level <= 15) return 'Kết Đan';
  if (level <= 20) return 'Nguyên Anh';
  return 'Hóa Thần';
}

export function getXpForLevel(level: number): number {
  const baseXp = 100;
  return Math.floor(baseXp * Math.pow(1.5, level - 1));
}

export function getCurrentLevel(totalXp: number): number {
  let level = 1;
  let xpNeeded = getXpForLevel(level);
  let remainingXp = totalXp;

  while (remainingXp >= xpNeeded) {
    remainingXp -= xpNeeded;
    level++;
    xpNeeded = getXpForLevel(level);
  }

  return level;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
