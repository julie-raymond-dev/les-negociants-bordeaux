'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useReservation } from '@/context/ReservationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Instagram, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function FloatingActions() {
  const { openModal } = useReservation();
  const t = useTranslations('Navigation');
  const it = useTranslations('InstagramPopup');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showInstaPopup, setShowInstaPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    
    const timer = setTimeout(() => {
      if (!localStorage.getItem('insta-popup-dismissed')) setShowInstaPopup(true);
    }, 3000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const dismissInsta = () => {
    setShowInstaPopup(false);
    localStorage.setItem('insta-popup-dismissed', 'true');
  };

  return (
    <>
      {/* Bottom Right: Reservation & Scroll Top */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 items-end">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-4 bg-background border border-border text-foreground rounded-full shadow-xl hover:bg-primary hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <button 
          onClick={openModal}
          className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-[0.2em] text-xs"
        >
          <span className="text-xl">🍽️</span> 
          {t('reserve')}
        </button>
      </div>

      {/* Bottom Left: Instagram Popup (Translated) */}
      <AnimatePresence>
        {showInstaPopup && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-8 left-8 z-[100] max-w-xs bg-background border border-border p-6 rounded-2xl shadow-2xl"
          >
            <button onClick={dismissInsta} className="absolute top-2 right-2 p-1 text-foreground/20 hover:text-foreground transition-colors">
              <X size={16} />
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <div className="p-3 bg-primary/10 rounded-xl"><Instagram size={24} /></div>
                <span className="font-black uppercase tracking-widest text-[10px]">Instagram</span>
              </div>
              <p className="text-sm font-bold leading-tight">{it('title')}</p>
              <a href={siteConfig.urls.instagram} target="_blank" rel="noopener noreferrer" className="bg-primary text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-lg text-center hover:bg-primary/90 transition-colors">
                {it('cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
