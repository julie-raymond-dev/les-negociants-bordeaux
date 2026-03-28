'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname, useRouter, routing} from '@/i18n/routing';
import {useState, useEffect} from 'react';
import { useTheme } from 'next-themes';
import { Lightbulb, Menu, X, ChevronDown } from 'lucide-react';
import ReservationButton from './ReservationButton';

const languageNames: Record<string, { name: string, flag: string }> = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  pt: { name: 'Português', flag: '🇵🇹' },
  es: { name: 'Español', flag: '🇪🇸' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  zh: { name: '中文', flag: '🇨🇳' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ru: { name: 'Русский', flag: '🇷🇺' },
};

export default function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Éviter les erreurs d'hydratation pour les icônes de thème
  useEffect(() => setMounted(true), []);

  const onLanguageChange = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale});
  };

  const navLinks = [
    { name: t('info'), href: '#informations' },
    { name: t('story'), href: '#notre-histoire' },
    { name: t('menu_carte'), href: '#menu-carte' },
    { name: t('menu_week'), href: '#menu-semaine' },
    { name: t('find_us'), href: '#nous-trouver' },
    { name: t('contact'), href: '#contact' },
  ];

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md shadow-sm z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-widest text-primary">
          LES NÉGOCIANTS
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 border-l pl-6 border-gray-200 dark:border-gray-800">
            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-primary"
              aria-label="Toggle theme"
            >
              <Lightbulb size={20} fill={theme === 'dark' ? 'currentColor' : 'none'} />
            </button>

            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-bold uppercase py-2">
                <span>{languageNames[locale].flag}</span>
                <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 mt-0 w-48 bg-background border border-border rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {routing.locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => onLanguageChange(l)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-primary hover:text-white transition-colors ${locale === l ? 'bg-gray-100 dark:bg-gray-800 font-bold' : ''}`}
                    >
                      <span className="text-lg">{languageNames[l].flag}</span>
                      <span>{languageNames[l].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ReservationButton />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-primary"
          >
            <Lightbulb size={20} fill={theme === 'dark' ? 'currentColor' : 'none'} />
          </button>
          
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-background border-t border-border p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest border-b border-border pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => {
                  onLanguageChange(l);
                  setIsMenuOpen(false);
                }}
                className={`text-xs p-2 border rounded flex flex-col items-center gap-1 ${locale === l ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-border'}`}
              >
                <span className="text-xl">{languageNames[l].flag}</span>
                <span className="uppercase">{l}</span>
              </button>
            ))}
          </div>

          <ReservationButton className="w-full" />
        </nav>
      )}
    </header>
  );
}
