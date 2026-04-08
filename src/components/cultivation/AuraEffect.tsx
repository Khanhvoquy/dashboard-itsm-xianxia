'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuraEffectProps {
  color?: 'gold' | 'crimson' | 'jade';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const glowColors = {
  gold: 'rgba(212, 175, 55, 0.4)',
  crimson: 'rgba(139, 0, 0, 0.3)',
  jade: 'rgba(0, 168, 107, 0.3)',
};

const intensities = {
  low: '0 0 15px',
  medium: '0 0 30px',
  high: '0 0 50px',
};

export default function AuraEffect({
  color = 'gold',
  intensity = 'medium',
  className,
}: AuraEffectProps) {
  const glowColor = glowColors[color];
  const glowIntensity = intensities[intensity];

  return (
    <motion.div
      className={cn('absolute inset-0 rounded-full pointer-events-none', className)}
      animate={{
        boxShadow: [
          `${glowIntensity} ${glowColor}`,
          `${glowIntensity.replace('0 0', '0 0 40px')} ${glowColor.replace('0.4', '0.6').replace('0.3', '0.5')}`,
          `${glowIntensity} ${glowColor}`,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );
}
