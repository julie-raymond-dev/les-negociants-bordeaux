'use client';

import { motion } from 'framer-motion';

export default function SectionSeparator() {
  return (
    <div className="relative h-32 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Ligne de sol minimaliste */}
      <div className="absolute w-full h-px bg-border/30 bottom-1/2"></div>
      
      {/* Le Serveur Animé */}
      <motion.div
        initial={{ x: '-150%' }}
        whileInView={{ x: '150%' }}
        viewport={{ once: false }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="relative z-10"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary opacity-60"
          >
            {/* Tête */}
            <circle cx="32" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            {/* Corps & Jambes */}
            <path d="M32 16V40L24 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M32 40L40 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            {/* Bras qui porte le plateau */}
            <path d="M32 22L44 28V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Le Plateau */}
            <path d="M40 28H54" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            {/* La Cloche sur le plateau */}
            <path d="M43 28C43 28 44 22 47 22C50 22 51 28 51 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
