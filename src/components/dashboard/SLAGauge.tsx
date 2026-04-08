// === src/components/dashboard/SLAGauge.tsx ===
'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
interface SLAGaugeProps {
  value: number;
  target?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}
const sizeConfig = {
  sm: { width: 120, height: 60, fontSize: 'text-lg' },
  md: { width: 160, height: 80, fontSize: 'text-2xl' },
  lg: { width: 200, height: 100, fontSize: 'text-3xl' },
};
export default function SLAGauge({
  value,
  target = 90,
  label = 'SLA',
  size = 'md',
}: SLAGaugeProps) {
  const config = sizeConfig[size];
  const radius = 40;
  const circumference = radius * Math.PI;
  const progress = Math.min(value / 100, 1);
  const strokeDashoffset = circumference - progress * circumference;
  // Determine color based on value
  let colorClass = 'text-xianxia-crimson';
  let strokeColor = 'var(--xianxia-crimson)';
  
  if (value >= target) {
    colorClass = 'text-xianxia-jade';
    strokeColor = 'var(--xianxia-jade)';
  } else if (value >= target - 10) {
    colorClass = 'text-xianxia-gold';
    strokeColor = 'var(--xianxia-gold)';
  }
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.width, height: config.height }}>
        <svg
          width={config.width}
          height={config.height}
          className="transform rotate-180"
        >
          {/* Background Arc */}
          <path
            d={`M 20 ${config.height - 20} A ${radius} ${radius} 0 0 1 ${config.width - 20} ${config.height - 20}`}
            fill="none"
            stroke="var(--xianxia-parchment-light)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress Arc */}
          <motion.path
            d={`M 20 ${config.height - 20} A ${radius} ${radius} 0 0 1 ${config.width - 20} ${config.height - 20}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        {/* Value Display */}
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <motion.span
            className={cn('font-bold', config.fontSize, colorClass)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      {/* Label */}
      <p className="mt-2 text-sm text-xianxia-silver">{label}</p>
      
      {/* Target Indicator */}
      <div className="mt-1 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-xianxia-gold" />
        <span className="text-xs text-xianxia-silver">Target: {target}%</span>
      </div>
    </div>
  );
}