'use client';

import { motion } from 'framer-motion';
import type { XPBarProps } from '@/types';
import { cn } from '@/lib/utils';

export default function XPBar({
  current,
  max,
  milestones = [25, 50, 75],
  showLabels = true,
}: XPBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full" aria-label={`Experience: ${current}/${max}`}>
      {showLabels && (
        <div className="flex justify-between text-xs text-xianxia-paper-text-muted mb-1">
          <span>EXP</span>
          <span>{current.toLocaleString()} / {max.toLocaleString()}</span>
        </div>
      )}
      
      {/* Progress bar container */}
      <div className="relative h-3 bg-xianxia-parchment-light rounded-full overflow-hidden border border-xianxia-bronze shadow-inset-ink">
        {/* Gradient fill with shimmer effect */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-xianxia-horizontal animate-shimmer"
          style={{ 
            width: `${percentage}%`,
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
        
        {/* Milestone markers */}
        {milestones.map((ms) => (
          <div
            key={ms}
            className={cn(
              "absolute top-0 bottom-0 w-px",
              ms <= percentage ? "bg-xianxia-gold" : "bg-xianxia-bronze"
            )}
            style={{ left: `${ms}%` }}
          >
            {/* Small talisman decoration at milestone */}
            <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-xianxia-gold opacity-60" />
          </div>
        ))}
      </div>
      
      {/* Percentage text */}
      {showLabels && (
        <div className="text-right text-xs text-xianxia-gold mt-1 font-medium">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
