'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  const toggleLang = () => {
    setLang(lang === 'vi' ? 'en' : 'vi');
    // Trong thực tế sẽ dùng next-intl để switch language
  };

  return (
    <header className="sticky top-0 z-40 bg-xianxia-ink/80 backdrop-blur-md border-b border-xianxia-bronze">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side - Welcome */}
        <div>
          <h2 className="text-lg font-serif text-xianxia-paper-text">
            Chào mừng, Đạo Hữu
          </h2>
          <p className="text-xs text-xianxia-silver">
            Hôm nay là ngày tốt lành để tu luyện
          </p>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-xianxia-parchment/50 border border-xianxia-bronze text-xianxia-silver hover:text-xianxia-gold transition-colors"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{lang.toUpperCase()}</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg bg-xianxia-parchment/50 border border-xianxia-bronze text-xianxia-silver hover:text-xianxia-gold transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-xianxia-crimson rounded-full animate-pulse" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-xianxia-bronze">
            <div className="text-right">
              <p className="text-sm font-medium text-xianxia-paper-text">Nguyễn Văn A</p>
              <p className="text-xs text-xianxia-silver">Luyện Khí Layer 5</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-xianxia-gold to-xianxia-crimson flex items-center justify-center border-2 border-xianxia-gold shadow-glow-gold">
              <User size={20} className="text-xianxia-ink" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
