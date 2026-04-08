'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import LevelRing from '@/components/cultivation/LevelRing';
import XPBar from '@/components/cultivation/XPBar';
import KPICard from '@/components/dashboard/KPICard';
import { Ticket, CheckCircle, BookOpen, TrendingUp } from 'lucide-react';
import { staggerContainerVariants, inkRevealVariants } from '@/lib/animations/variants';

// Mock data tạm thời
const mockUser = {
  level: 5,
  xp: 350,
  nextLevelXp: 506,
  realm: 'Luyện Khí' as const,
  totalTickets: 45,
  slaCompliance: 87,
  kbContributions: 8,
};

export default function DashboardPage() {
  // Tạm thời dùng object dịch thô nếu chưa có i18n setup xong
  const t = (key: string) => key; 

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cultivation Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="flex justify-center p-6 xianxia-card" variants={inkRevealVariants}>
          <LevelRing
            level={mockUser.level}
            currentXP={mockUser.xp}
            maxXP={mockUser.nextLevelXp}
            realmName={mockUser.realm}
          />
        </motion.div>

        <motion.div className="lg:col-span-2 p-6 xianxia-card space-y-4" variants={inkRevealVariants}>
          <h3 className="text-lg font-serif text-xianxia-gold">Tiến Độ Tu Luyện</h3>
          <XPBar current={mockUser.xp} max={mockUser.nextLevelXp} />
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-sm text-xianxia-silver">Kinh nghiệm hiện tại</p>
              <p className="text-2xl font-bold text-xianxia-paper-text">{mockUser.xp.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-xianxia-silver">Cấp độ tiếp theo</p>
              <p className="text-2xl font-bold text-xianxia-gold">Level {mockUser.level + 1}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Tổng Tickets"
          value={mockUser.totalTickets}
          trend="up"
          trendValue="+12%"
          icon={Ticket}
          glow="gold"
        />
        <KPICard
          title="SLA Compliance"
          value={`${mockUser.slaCompliance}%`}
          trend="up"
          trendValue="+5%"
          icon={CheckCircle}
          glow="jade"
        />
        <KPICard
          title="Đóng góp KB"
          value={mockUser.kbContributions}
          trend="neutral"
          icon={BookOpen}
          glow="crimson"
        />
        <KPICard
          title="Hiệu suất đội"
          value="A+"
          trend="up"
          trendValue="Top 10%"
          icon={TrendingUp}
          glow="gold"
        />
      </section>
    </motion.div>
  );
}