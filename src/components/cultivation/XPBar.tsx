'use client';

import { motion } from 'framer-motion';

interface XPBarProps {
  current: number;
  max: number;
  milestones?: number[];
}

export default function XPBar({ current, max, milestones = [25, 50, 75] }: XPBarProps) {
  const progress = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="relative h-3 bg-xianxia-parchment-light rounded-full overflow-hidden border border-xianxia-bronze">
        {/* Gradient Fill with Shimmer */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--xianxia-gold) 0%, var(--xianxia-crimson) 100%)',
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 animate-shimmer opacity-60" />
        </motion.div>

        {/* Milestone Markers */}
        {milestones.map((ms) => (
          <div
            key={ms}
            className="absolute top-0 bottom-0 w-px bg-xianxia-paper-text/30"
            style={{ left: `${ms}%` }}
          >
            <div className="absolute -top-1 -translate-x-1/2 w-0.5 h-3 bg-xianxia-gold/50 rounded-full" />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-xs">
        <span className="text-xianxia-silver">Current: {current.toLocaleString()} XP</span>
        <span className="text-xianxia-gold">{Math.round(progress)}%</span>
        <span className="text-xianxia-silver">Next: {max.toLocaleString()} XP</span>
      </div>
    </div>
  );
}
