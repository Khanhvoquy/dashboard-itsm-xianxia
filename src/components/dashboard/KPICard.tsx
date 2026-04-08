'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: LucideIcon;
  glow?: 'gold' | 'crimson' | 'jade';
}

const glowColors = {
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
  neutral: '=',
};

export default function KPICard({
  title,
  value,
  trend = 'neutral',
  trendValue,
  icon: Icon,
  glow = 'gold',
}: KPICardProps) {
  return (
    <motion.div
      className={cn(
        'xianxia-card p-5 cursor-pointer',
        glowColors[glow]
      )}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className="text-xianxia-gold" size={24} />
        {trendValue && (
          <span className={cn('text-xs font-medium', trendColors[trend])}>
            {trendIcons[trend]} {trendValue}
          </span>
        )}
      </div>

      <h3 className="text-xs uppercase tracking-wider text-xianxia-silver mb-1">
        {title}
      </h3>

      <p className="text-2xl font-bold text-xianxia-paper-text xianxia-text-glow">
        {value}
      </p>
    </motion.div>
  );
}
