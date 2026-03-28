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
      type: "Entrée", 
      name: data?.starter_name || "Velouté de potimarron", 
      description: data?.starter_desc || "Graines de courge et huile de truffe" 
    },
    { 
      type: "Plat", 
      name: data?.main_name || "Filet de lieu noir", 
      description: data?.main_desc || "Écrasé de pommes de terre à l'aneth, sauce vierge" 
    },
    { 
      type: "Dessert", 
      name: data?.dessert_name || "Tartelette aux noix", 
      description: data?.dessert_desc || "Caramel beurre salé" 
    }
  ];

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
            className="space-y-8 mb-16"
          >
            {menu.map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-border pb-8 last:border-0"
              >
                <div className="md:w-32 shrink-0">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                    {item.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-foreground/60 italic">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Prix simples et clairs */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-border">
              <div className="text-center">
                <span className="text-3xl font-black block mb-1">{data?.price_full || '24'}€</span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">{t('formula_full')}</span>
              </div>
              
              <div className="hidden md:block w-px bg-border"></div>
              
              <div className="text-center">
                <span className="text-2xl font-black block mb-1 mt-1">{data?.price_half || '19'}€</span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">{t('formula_starter_main')}</span>
              </div>

              <div className="hidden md:block w-px bg-border"></div>

              <div className="text-center">
                <span className="text-2xl font-black block mb-1 mt-1">{data?.price_half || '19'}€</span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">{t('formula_main_dessert')}</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
