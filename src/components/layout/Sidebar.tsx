'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Trophy, Ticket, BookOpen, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/vi', icon: Home, label: 'Dashboard' },
  { href: '/vi/leaderboard', icon: Trophy, label: 'Bảng Xếp Hạng' },
  { href: '/vi/tickets', icon: Ticket, label: 'Tickets' },
  { href: '/vi/kb', icon: BookOpen, label: 'Tri Thức' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-xianxia-parchment/95 border-r border-xianxia-bronze backdrop-blur-sm z-50">
      {/* Logo Area */}
      <div className="p-6 border-b border-xianxia-bronze">
        <h1 className="text-xl font-serif font-bold text-xianxia-gold xianxia-text-glow">
          ITSM Tu Tiên
        </h1>
        <p className="text-xs text-xianxia-silver mt-1">Đạo Lữ Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                  isActive
                    ? 'bg-xianxia-gold/20 text-xianxia-gold border border-xianxia-gold/30'
                    : 'text-xianxia-paper-text-muted hover:bg-xianxia-bronze/30 hover:text-xianxia-paper-text'
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-xianxia-bronze">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-xianxia-silver hover:bg-xianxia-bronze/30 transition-colors">
          <Settings size={20} />
          <span className="font-medium">Cài Đặt</span>
        </button>
      </div>
    </aside>
  );
}
