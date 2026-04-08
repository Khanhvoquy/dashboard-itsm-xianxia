import { notFound } from 'next/navigation';

export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];

export const routing = {
  locales: locales as unknown as readonly string[],
  defaultLocale: 'vi' as Locale,
  localePrefix: 'as-needed' as const,
};

export function getTranslations(locale: Locale) {
  return async (namespace: string) => {
    try {
      const messages = await import(`./messages/${locale}.json`);
      const keys = namespace.split('.');
      let result: any = messages.default;
      for (const key of keys) {
        result = result?.[key];
      }
      return result || {};
    } catch {
      return {};
    }
  };
}
