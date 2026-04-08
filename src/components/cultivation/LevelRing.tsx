'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface LevelRingProps {
  level: number;
  currentXP: number;
  maxXP: number;
  realmName: string;
}

export default function LevelRing({ level, currentXP, maxXP, realmName }: LevelRingProps) {
  const radius = 80;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.min(currentXP / maxXP, 1);
  const strokeDashoffset = circumference - progress * circumference;

  const gradientId = `gradient-${level}`;

  return (
    <div className="relative flex items-center justify-center">
      {/* Aura Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            '0 0 15px var(--xianxia-gold-glow)',
            '0 0 35px var(--xianxia-gold-glow), 0 0 20px var(--xianxia-crimson-glow)',
            '0 0 15px var(--xianxia-gold-glow)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg
        height={radius * 2}
        width={radius * 2}
        className="relative z-10 transform -rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--xianxia-gold)" />
            <stop offset="100%" stopColor="var(--xianxia-crimson)" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          stroke="var(--xianxia-bronze)"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
        <span className="text-xs text-xianxia-silver uppercase tracking-wider">{realmName}</span>
        <span className="text-3xl font-bold text-xianxia-gold xianxia-text-glow">{level}</span>
        <span className="text-xs text-xianxia-paper-text-muted mt-1">
          {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
        </span>
      </div>
    </div>
  );
}
