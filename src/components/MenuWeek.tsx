'use client';

import {useTranslations} from 'next-intl';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, fadeUp } from './Motion';
import { FileText } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getMenuWeek, getSiteSettings } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function MenuWeek() {
  const t = useTranslations('MenuWeek');
  const [data, setData] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState(siteConfig.assets.menuWeekPdf);

  useEffect(() => {
    async function loadData() {
      const weekData = await getMenuWeek();
      if (weekData) setData(weekData);
      
      const settings = await getSiteSettings();
      if (settings.menu_week_pdf) setPdfUrl(settings.menu_week_pdf);
    }
    loadData();
  }, []);

  const menu = [
    { 
      type: "Entrées", 
      options: [
        { name: data?.starter_name, description: data?.starter_desc },
        { name: data?.starter_name_2, description: data?.starter_desc_2 }
      ].filter(o => o.name)
    },
    { 
      type: "Plats", 
      options: [
        { name: data?.main_name, description: data?.main_desc },
        { name: data?.main_name_2, description: data?.main_desc_2 }
      ].filter(o => o.name)
    },
    { 
      type: "Desserts", 
      options: [
        { name: data?.dessert_name, description: data?.dessert_desc },
        { name: data?.dessert_name_2, description: data?.dessert_desc_2 }
      ].filter(o => o.name)
    }
  ];

  // Si pas de données encore chargées, on affiche rien ou un loader pour éviter le flash de mauvaises données
  if (!data) return null;

  return (
    <section id="menu-semaine" className="py-section bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header avec bouton PDF à droite */}
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-24">
              <div className="text-center md:text-left flex-1">
                <h2 className="heading-section mb-4">{t('title')}</h2>
                <p className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4">
                  {(!data?.date_range || data?.date_range === 'À VENIR') ? t('coming_soon') : data.date_range}
                </p>
                <p className="text-sm uppercase tracking-widest text-foreground/50">
                  {t('subtitle')} — {t('closed_info')}
                </p>
              </div>

              <div className="shrink-0">
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 px-10 py-6 bg-background border-2 border-primary/20 hover:border-primary rounded-[30px] transition-all duration-500 shadow-xl hover:shadow-primary/10"
                >
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <FileText size={28} />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 text-foreground">{t('pdf_label')}</span>
                    <span className="text-lg font-black uppercase tracking-tighter text-foreground">{t('pdf_button')}</span>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Liste des plats épurée */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 mb-16"
          >
            {menu.map((category, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-border pb-12 last:border-0"
              >
                <div className="md:w-32 shrink-0">
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                    {category.type}
                  </span>
                </div>
                <div className="flex-1 space-y-8">
                  {category.options.map((option, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                        {option.name}
                      </h3>
                      <p className="text-foreground/60 italic leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Prix simples et clairs */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-border">
              <div className="text-center">
                <span className="text-3xl font-black block mb-1">{data?.price_full}€</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{t('formula_full')}</span>
              </div>
              
              <div className="hidden md:block w-px bg-border"></div>
              
              <div className="text-center">
                <span className="text-2xl font-black block mb-1 mt-1">{data?.price_half}€</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{t('formula_starter_main')}</span>
              </div>

              <div className="hidden md:block w-px bg-border"></div>

              <div className="text-center">
                <span className="text-2xl font-black block mb-1 mt-1">{data?.price_single}€</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Plat Seul</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
