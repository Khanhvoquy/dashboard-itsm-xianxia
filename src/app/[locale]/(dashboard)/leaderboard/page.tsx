// === src/app/[locale]/(dashboard)/leaderboard/page.tsx ===
'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { inkRevealVariants, staggerContainerVariants } from '@/lib/animations/variants';
const mockUsers = [
  { rank: 1, name: 'Nguyễn Văn An', role: 'Senior Dev', level: 8, xp: 2450, sla: 95, realm: 'Trúc Cơ' },
  { rank: 2, name: 'Trần Thị Bình', role: 'Senior Dev', level: 7, xp: 2100, sla: 92, realm: 'Trúc Cơ' },
  { rank: 3, name: 'Lê Hoàng Cường', role: 'Senior Dev', level: 6, xp: 1850, sla: 89, realm: 'Trúc Cơ' },
  { rank: 4, name: 'Phạm Minh Đức', role: 'Junior Dev', level: 5, xp: 480, sla: 87, realm: 'Luyện Khí' },
  { rank: 5, name: 'Đỗ Thị Eve', role: 'Junior Dev', level: 4, xp: 320, sla: 85, realm: 'Luyện Khí' },
  { rank: 6, name: 'Vũ Văn Fab', role: 'QA', level: 5, xp: 450, sla: 90, realm: 'Luyện Khí' },
  { rank: 7, name: 'Bùi Thị Grace', role: 'QA', level: 4, xp: 380, sla: 88, realm: 'Luyện Khí' },
  { rank: 8, name: 'Hoàng Văn Hugo', role: 'DevOps', level: 6, xp: 1200, sla: 93, realm: 'Trúc Cơ' },
  { rank: 9, name: 'Lý Thị Ivy', role: 'PM', level: 7, xp: 1800, sla: 91, realm: 'Trúc Cơ' },
];
export default function LeaderboardPage() {
  const t = useTranslations('leaderboard');
  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-xianxia-gold w-8 h-8" />
        <div>
          <h1 className="text-2xl font-serif font-bold text-xianxia-gold xianxia-text-glow">
            {t('title')}
          </h1>
          <p className="text-sm text-xianxia-silver">Bảng xếp hạng 9 đạo hữu</p>
        </div>
      </div>
      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 0, 2].map((idx) => {
          const user = mockUsers[idx];
          const height = idx === 1 ? 'h-32' : idx === 0 ? 'h-24' : 'h-20';
          const medalColor = idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-400' : 'text-orange-400';
          
          return (
            <motion.div
              key={user.rank}
              className={`flex flex-col items-center justify-end ${height} xianxia-card`}
              variants={inkRevealVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Medal className={`w-12 h-12 mb-2 ${medalColor}`} />
              <span className="text-lg font-bold text-xianxia-gold">{user.name}</span>
              <span className="text-xs text-xianxia-silver">{user.realm}</span>
              <span className="text-sm text-xianxia-paper-text">{user.xp.toLocaleString()} XP</span>
            </motion.div>
          );
        })}
      </div>
      {/* Full Table */}
      <div className="xianxia-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-xianxia-parchment-light border-b border-xianxia-bronze">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('rank')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('member')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('role')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('level')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('xp')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('sla')}</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, index) => (
              <motion.tr
                key={user.rank}
                className="border-b border-xianxia-bronze/30 hover:bg-xianxia-gold/5 transition-colors"
                variants={inkRevealVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-4 py-4">
                  {user.rank <= 3 ? (
                    <Medal className={`w-6 h-6 ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-400' : 'text-orange-400'}`} />
                  ) : (
                    <span className="text-xianxia-paper-text font-mono">#{user.rank}</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-xianxia-gold" />
                    <span className="font-medium text-xianxia-paper-text">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xianxia-silver text-sm">{user.role}</td>
                <td className="px-4 py-4">
                  <span className="text-xianxia-gold font-semibold">{user.level}</span>
                  <span className="text-xs text-xianxia-silver ml-1">({user.realm})</span>
                </td>
                <td className="px-4 py-4 text-xianxia-paper-text font-mono">{user.xp.toLocaleString()}</td>
                <td className="px-4 py-4">
                  <span className={user.sla >= 90 ? 'text-xianxia-jade font-bold' : 'text-xianxia-crimson'}>
                    {user.sla}%
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )