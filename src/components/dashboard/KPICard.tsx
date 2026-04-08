'use client';

import { motion } from 'framer-motion';
import type { KPICardProps } from '@/types';
import { cn } from '@/lib/utils';
import { inkRevealVariants, cardHoverVariants } from '@/lib/animations/variants';

const glowStyles = {
  gold: 'hover:shadow-glow-gold',
  crimson: 'hover:shadow-glow-crimson',
  jade: 'hover:shadow-glow-jade',
};

const trendColors = {
  up: 'text-xianxia-jade',
  down: 'text-xianxia-crimson',
  neutral: 'text-xianxia-silver',
};

const trendIcons = {
  up: '↑',
  down: '↓',
  neutral: '→',
};

export default function KPICard({
  title,
  value,
  trend,
  trendValue,
  icon: Icon,
  glow = 'gold',
}: KPICardProps) {
  return (
    <motion.div
      className={cn(
        'relative p-5 bg-xianxia-parchment border border-xianxia-bronze rounded-lg',
        'shadow-inset-ink transition-all duration-300 hover:-translate-y-1',
        glowStyles[glow]
      )}
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-xianxia-gold opacity-40 rounded-tl-sm" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-xianxia-gold opacity-40 rounded-tr-sm" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-xianxia-gold opacity-40 rounded-bl-sm" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-xianxia-gold opacity-40 rounded-br-sm" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon and title */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="p-2 rounded-md bg-xianxia-gold/10 text-xianxia-gold">
                <Icon size={18} strokeWidth={1.5} />
              </div>
            )}
            <span className="text-xs uppercase tracking-wider text-xianxia-silver font-medium">
              {title}
            </span>
          </div>
        </div>

        {/* Value */}
        <motion.div
          className="text-3xl font-bold font-serif text-xianxia-paper-text mb-2"
          variants={inkRevealVariants}
          initial="hidden"
          animate="visible"
        >
          {value}
        </motion.div>

        {/* Trend indicator */}
        {trend && (
          <div className="flex items-center gap-1 text-sm">
            <span className={cn('font-medium', trendColors[trend])}>
              {trendIcons[trend]}
            </span>
            {trendValue && (
              <span className="text-xianxia-paper-text-muted">{trendValue}</span>
            )}
          </div>
        )}
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)',
        }}
      />
    </motion.div>
  );
}
