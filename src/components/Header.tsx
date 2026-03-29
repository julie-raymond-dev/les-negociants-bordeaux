'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname, useRouter, routing} from '@/i18n/routing';
import {useState, useEffect} from 'react';
import { useTheme } from 'next-themes';
import { Lightbulb, Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReservation } from '@/context/ReservationContext';
import Image from 'next/image';

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
  const { openModal } = useReservation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: t('info'), href: '#informations' },
    { name: t('story'), href: '#notre-histoire' },
    { name: t('menu_carte'), href: '#menu-carte' },
    { name: t('menu_week'), href: '#menu-semaine' },
    { name: t('wine_list'), href: '#carte-des-vins' },
    { name: t('contact'), href: '#contact' },
  ];

  const isLight = theme === 'light';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 py-2 transition-all duration-300 ${
          isLight 
            ? 'bg-white shadow-md text-black' 
            : 'bg-black/40 backdrop-blur-xl border-b border-white/5 text-white'
        }`}
      >
        <div className="container mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-6 group">
            <div className={`relative w-16 h-16 md:w-24 md:h-24 ${isLight ? 'invert' : ''}`}>
              <Image 
                src="/logo-transparent-les-negociants.jpg" 
                alt="Logo Les Négociants" 
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 64px, 96px"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-10">
            <div className="flex items-center gap-8 text-current">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link text-sm tracking-[0.25em]">{link.name}</a>
              ))}
            </div>
            <div className={`h-6 w-px mx-2 ${isLight ? 'bg-black/10' : 'bg-white/20'}`}></div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="p-3 rounded-full hover:bg-foreground/5 transition-colors group">
                <ShieldCheck size={24} className="text-primary transition-transform group-hover:scale-110" />
              </Link>
              <button onClick={() => setTheme(isLight ? 'dark' : 'light')} className="p-3 rounded-full hover:bg-foreground/5 transition-colors group">
                <Lightbulb size={24} className="text-primary transition-transform group-hover:scale-110" fill={!isLight ? 'currentColor' : 'none'} />
              </button>
              <div className="relative group text-current">
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest py-2">
                  <span className="text-2xl">{languageNames[locale].flag}</span>
                  <span className="text-xs">{locale}</span>
                  <ChevronDown size={16} className="opacity-50 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden py-2">
                  {routing.locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => router.replace(pathname, {locale: l})}
                      className={`w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-4 hover:bg-primary hover:text-white transition-colors ${locale === l ? 'bg-foreground/5 text-primary' : 'text-foreground'}`}
                    >
                      <span className="text-2xl">{languageNames[l].flag}</span>
                      <span>{languageNames[l].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Drapeau TOUJOURS dehors */}
            <div className="relative group">
              <button className="p-2">
                <span className="text-2xl">{languageNames[locale].flag}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden py-2 z-50 text-black">
                {routing.locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => router.replace(pathname, {locale: l})}
                    className={`w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-4 active:bg-primary active:text-white ${locale === l ? 'bg-gray-100 text-primary' : 'text-black'}`}
                  >
                    <span className="text-xl">{languageNames[l].flag}</span>
                    <span>{l}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setTheme(isLight ? 'dark' : 'light')} className="p-2 text-primary">
              <Lightbulb size={24} fill={!isLight ? 'currentColor' : 'none'} />
            </button>
            
            <button className="p-2 text-current ml-2" onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - OUTSIDE HEADER, FORCED WHITE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col p-10"
            style={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black tracking-[0.2em] text-[#b78437]">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors text-black">
                <X size={40} />
              </button>
            </div>

            <div className="flex flex-col gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  key={link.href}
                  href={link.href}
                  className="text-3xl font-black uppercase tracking-tighter hover:text-[#b78437] transition-colors flex items-center gap-4 text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-[#b78437] text-sm tracking-widest">0{i+1}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
