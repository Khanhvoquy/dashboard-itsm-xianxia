import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import TuTienBackground from '@/components/cultivation/TuTienBackground';
import '../../styles/globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="min-h-screen bg-xianxia-ink text-xianxia-paper-text antialiased">
        <NextIntlClientProvider messages={messages}>
          <TuTienBackground density={40} />
          <div className="relative z-10">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}