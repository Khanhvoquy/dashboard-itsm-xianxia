import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number with locale (Vietnamese)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Format date to Vietnamese locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('vi-VN', options).format(d);
}

/**
 * Format duration in seconds to human readable string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ''): string {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp number between min and max
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

/**
 * Get priority color class
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'P1': return 'text-red-500 bg-red-500/10 border-red-500/30';
    case 'P2': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
    case 'P3': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
    case 'P4': return 'text-green-500 bg-green-500/10 border-green-500/30';
    default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
  }
}

/**
 * Get realm color class
 */
export function getRealmColor(realm: string): string {
  switch (realm) {
    case 'Luyện Khí': return 'text-xianxia-silver';
    case 'Trúc Cơ': return 'text-xianxia-bronze';
    case 'Kết Đan': return 'text-xianxia-gold';
    case 'Nguyên Anh': return 'text-xianxia-crimson';
    case 'Hóa Thần': return 'text-xianxia-jade';
    default: return 'text-xianxia-paper-text';
  }
}

/**
 * Seed random number generator (simple LCG)
 */
export function seededRandom(seed: number): () => number {
  let state = seed;
  return function() {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/**
 * Create a seeded random with string seed
 */
export function createSeededRandom(seedString: string): () => number {
  // Convert string to number hash
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return seededRandom(Math.abs(hash));
}
