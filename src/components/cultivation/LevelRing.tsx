'use client';

import { motion } from 'framer-motion';
import type { LevelRingProps, Realm } from '@/types';
import { cn } from '@/lib/utils';

export default function LevelRing({
  level,
  currentXP,
  maxXP,
  realmName,
  size = 200,
}: LevelRingProps) {
  const radius = 80;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.min(currentXP / maxXP, 1);
  const strokeDashoffset = circumference - progress * circumference;

  // Gradient colors based on progress
  const gradientId = `gradient-${level}`;

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-xianxia"
        style={{
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
        }}
      />

      {/* SVG Ring */}
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-label={`Level ${level} - ${realmName}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#f4cf57" />
            <stop offset="100%" stopColor="#8b0000" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke="var(--xianxia-bronze)"
          strokeWidth={stroke}
          fill="none"
          opacity="0.3"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs text-xianxia-silver uppercase tracking-wider">
          {realmName}
        </span>
        <span className="text-4xl font-bold font-serif text-xianxia-gold mt-1">
          {level}
        </span>
        <span className="text-xs text-xianxia-paper-text-muted mt-1">
          {Math.round(progress * 100)}%
        </span>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-xianxia-gold opacity-60" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-xianxia-gold opacity-60" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-xianxia-gold opacity-60" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-xianxia-gold opacity-60" />
    </motion.div>
  );
}
