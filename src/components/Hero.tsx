'use client';

import {useTranslations} from 'next-intl';
import { useReservation } from '@/context/ReservationContext';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

export default function Hero() {
  const t = useTranslations('Hero');
  const heroBg = siteConfig.assets.heroBg;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with subtle zoom & blur */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0, filter: 'blur(20px)' }}
        animate={{ scale: 1, opacity: 0.6, filter: 'blur(0px)' }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroBg}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90"></div>
      </motion.div>

      {/* Content with Blur Entrance */}
      <div className="relative z-10 text-center px-6 pt-32">
        <motion.div
          initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.8em] mb-8 block drop-shadow-[0_0_15px_rgba(183,132,55,0.5)]">
            Bordeaux • France
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-16 drop-shadow-2xl bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <motion.a 
              whileHover={{ scale: 1.05, borderColor: '#b78437' }}
              whileTap={{ scale: 0.95 }}
              href="#informations"
              className="group relative overflow-hidden text-white text-[10px] font-black uppercase tracking-[0.4em] px-16 py-6 border border-white/20 rounded-full backdrop-blur-md transition-all duration-500"
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 group-hover:text-primary transition-colors">{t('discover')}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[8px] text-white/40 uppercase tracking-[0.4em] rotate-90 origin-left translate-x-1">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}
