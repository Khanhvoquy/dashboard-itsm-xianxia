'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales } from '@/i18n/request';

export default function Header() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'vi';

  const handleLangSwitch = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <header className="sticky top-0 z-30 bg-xianxia-parchment/95 backdrop-blur-sm border-b border-xianxia-bronze">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Page title placeholder */}
        <div>
          <h2 className="text-xl font-serif text-xianxia-gold">
            {t('dashboard.title')}
          </h2>
          <p className="text-sm text-xianxia-paper-text-muted">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Right side - User info and lang switch */}
        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-xianxia-silver" />
            <div className="flex rounded-lg overflow-hidden border border-xianxia-bronze">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLangSwitch(locale)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium transition-colors',
                    currentLocale === locale
                      ? 'bg-xianxia-gold text-xianxia-ink'
                      : 'bg-xianxia-parchment text-xianxia-paper-text hover:bg-xianxia-bronze/30'
                  )}
                  aria-label={`Switch to ${locale}`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* User avatar placeholder */}
          <motion.div
            className="flex items-center gap-3 pl-4 border-l border-xianxia-bronze"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-xianxia-paper-text">
                Đạo Hữu
              </p>
              <p className="text-xs text-xianxia-paper-text-muted">
                Luyện Khí Sư
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-xianxia-gold/20 border-2 border-xianxia-gold flex items-center justify-center">
              <User size={20} className="text-xianxia-gold" />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
