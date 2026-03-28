'use client';

import {useTranslations} from 'next-intl';
import { useReservation } from '@/context/ReservationContext';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with subtle zoom */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://lesnegociants.fr/wp-content/uploads/2024/07/IMG_1458-1-e1748335626467-1024x1014.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </motion.div>

      {/* Added pt-24 to move content down */}
      <div className="relative z-10 text-center px-4 pt-32">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-6 block">
            Bordeaux • France
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-12 drop-shadow-2xl">
            {t('title')}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="#informations"
              className="text-white hover:text-primary text-[10px] font-black uppercase tracking-[0.3em] px-12 py-5 border-2 border-white hover:border-primary rounded-full backdrop-blur-sm transition-all duration-300"
            >
              Découvrir
            </a>
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
