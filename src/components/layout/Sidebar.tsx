'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Trophy, 
  Ticket, 
  BookOpen, 
  Settings,
  Sparkles
} from 'lucide-react';
import { slideInLeftVariants } from '@/lib/animations/variants';

const navigation = [
  { name: 'dashboard', href: '', icon: LayoutDashboard },
  { name: 'leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'tickets', href: '/tickets', icon: Ticket },
  { name: 'kb', href: '/kb', icon: BookOpen },
];

export default function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full w-64 bg-xianxia-parchment border-r border-xianxia-bronze z-40"
      variants={slideInLeftVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <div className="p-6 border-b border-xianxia-bronze">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-xianxia-gold/10 text-xianxia-gold">
            <Sparkles size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold font-serif text-xianxia-gold">
              ITSM Xianxia
            </h1>
            <p className="text-xs text-xianxia-paper-text-muted">
              Tu Luyện Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === `/vi${item.href}` || pathname === `/en${item.href}` || (pathname === item.href && item.href !== '');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'border border-transparent',
                isActive
                  ? 'bg-xianxia-gold/10 border-xianxia-gold/30 text-xianxia-gold shadow-glow-gold'
                  : 'text-xianxia-paper-text hover:bg-xianxia-bronze/20 hover:text-xianxia-gold'
              )}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span className="font-medium">{t(`navigation.${item.name}`)}</span>
              
              {isActive && (
                <motion.div
                  className="absolute left-0 w-1 h-6 bg-xianxia-gold rounded-r"
                  layoutId="activeNav"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-xianxia-bronze">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xianxia-paper-text hover:bg-xianxia-bronze/20 hover:text-xianxia-gold transition-colors"
          aria-label={t('navigation.settings')}
        >
          <Settings size={20} strokeWidth={1.5} />
          <span className="font-medium">{t('navigation.settings')}</span>
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-xianxia-gold">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </motion.aside>
  );
}
