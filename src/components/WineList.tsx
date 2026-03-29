'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Wine, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useEffect, useState } from 'react';
import { getSiteSettings } from '@/lib/supabase';

export default function WineList() {
  const t = useTranslations('WineList');
  const [pdfUrl, setPdfUrl] = useState(siteConfig.assets.wineListPdf);

  useEffect(() => {
    async function loadWineList() {
      try {
        const settings = await getSiteSettings();
        if (settings.wine_list_pdf) {
          setPdfUrl(settings.wine_list_pdf);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de la carte des vins :", err);
      }
    }
    loadWineList();
  }, []);

  return (
    <section id="carte-des-vins" className="relative py-32 overflow-hidden">
      {/* Background Image with Parallax-like scale effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('/gallery/hero-bg.jpg')] bg-cover bg-center bg-fixed scale-110"
          style={{ filter: 'brightness(0.3)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-16 rounded-[40px] text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-8 text-primary">
              <Wine size={40} />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
              {t('title')}
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto italic">
              {t('description')}
            </p>

            <a 
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <span>{t('cta')}</span>
              <ExternalLink size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
