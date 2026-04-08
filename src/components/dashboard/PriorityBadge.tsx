'use client';

import { cn } from '@/lib/utils';
import type { PriorityBadgeProps } from '@/types';

const priorityStyles = {
  P1: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/40',
    text: 'text-red-400',
    label: 'Critical',
    pulse: 'animate-pulse',
  },
  P2: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    label: 'High',
    pulse: '',
  },
  P3: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/40',
    text: 'text-yellow-400',
    label: 'Medium',
    pulse: '',
  },
  P4: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/40',
    text: 'text-green-400',
    label: 'Low',
    pulse: '',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export default function PriorityBadge({
  priority,
  size = 'md',
}: PriorityBadgeProps) {
  const styles = priorityStyles[priority];
  const sizeClass = sizeClasses[size];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        styles.bg,
        styles.border,
        styles.text,
        sizeClass,
        styles.pulse
      )}
    >
      {/* Priority indicator dot */}
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          priority === 'P1' && 'bg-red-400 animate-pulse',
          priority === 'P2' && 'bg-orange-400',
          priority === 'P3' && 'bg-yellow-400',
          priority === 'P4' && 'bg-green-400'
        )}
      />
      {priority}
    </span>
  );
}
