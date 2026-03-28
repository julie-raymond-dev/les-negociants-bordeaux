'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, fadeUp } from './Motion';
import { FileText } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getMenuCarte, getSiteSettings } from '@/lib/supabase';
import { useState, useEffect } from 'react';

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
}

const MenuItem = ({ name, description, price }: MenuItemProps) => (
  <motion.div variants={fadeUp} className="group cursor-default">
    <div className="flex justify-between items-start gap-4 mb-2">
      <h4 className="text-menu-item group-hover:text-primary transition-colors duration-300">
        {name}
      </h4>
      <div className="flex items-center gap-1">
        <span className="text-sm font-black">{price}</span>
        <span className="text-[10px] font-bold text-foreground/30">€</span>
      </div>
    </div>
    <p className="text-menu-desc">
      {description}
    </p>
  </motion.div>
);

export default function MenuCarte() {
  const t = useTranslations('MenuCarte');
  const [items, setItems] = useState<any[]>([]);
  const [pdfUrl, setPdfUrl] = useState(siteConfig.assets.menuCartePdf);

  useEffect(() => {
    async function loadData() {
      const data = await getMenuCarte();
      if (data && data.length > 0) setItems(data);
      
      const settings = await getSiteSettings();
      if (settings.menu_carte_pdf) setPdfUrl(settings.menu_carte_pdf);
    }
    loadData();
  }, []);

  const categories = [
    {
      title: t('starters'),
      items: items.filter(i => i.category === 'starter').length > 0 
        ? items.filter(i => i.category === 'starter')
        : [
            { name: "Asperges vertes des Landes", description: "Mousseline citronnée, noisettes torréfiées", price: "14" },
            { name: "Oeuf parfait", description: "Crème de champignons, croûtons à l'ail", price: "12" },
            { name: "Gravlax de truite", description: "Betterave, aneth et crème aigre", price: "15" },
          ]
    },
    {
      title: t('mains'),
      items: items.filter(i => i.category === 'main').length > 0 
        ? items.filter(i => i.category === 'main')
        : [
            { name: "Noix de veau rôtie", description: "Millefeuille de butternut, condiment châtaigne", price: "28" },
            { name: "Espadon snacké", description: "Mousseline de brocolis, noix et sauce chimichurri", price: "26" },
            { name: "Risotto aux truffes", description: "Champignons sauvages, parmesan 24 mois", price: "24" },
          ]
    },
    {
      title: t('desserts'),
      items: items.filter(i => i.category === 'dessert').length > 0 
        ? items.filter(i => i.category === 'dessert')
        : [
            { name: "Ganache chocolat noir", description: "Fleur de sel, huile d'olive de Provence", price: "10" },
            { name: "Pavlova aux fruits exotiques", description: "Meringue française, sorbet mangue", price: "11" },
            { name: "Assiette de fromages", description: "Sélection de notre crémier bordelais", price: "12" },
          ]
    }
  ];

  return (
    <section id="menu-carte" className="py-section bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-24">
              <div className="text-center md:text-left flex-1">
                <h2 className="heading-section mb-4">{t('title')}</h2>
                <p className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-8">{t('subtitle')}</p>
                <p className="text-lg md:text-xl font-medium leading-relaxed opacity-70">
                  {t('description')}
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
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{t('pdf_label')}</span>
                    <span className="text-lg font-black uppercase tracking-tighter text-foreground">{t('pdf_button')}</span>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            {categories.map((category, idx) => (
              <motion.div 
                key={idx}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-12 border-b border-primary/20 pb-4 text-primary">
                  {category.title}
                </h3>
                <div className="space-y-12">
                  {category.items.map((item, i) => (
                    <MenuItem key={i} {...item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
