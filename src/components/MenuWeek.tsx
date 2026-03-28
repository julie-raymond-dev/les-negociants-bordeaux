'use client';

import {useTranslations} from 'next-intl';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, fadeUp } from './Motion';

export default function MenuWeek() {
  const t = useTranslations('MenuWeek');

  const menu = [
    { type: "Entrée", name: "Velouté de potimarron", description: "Graines de courge et huile de truffe" },
    { type: "Plat", name: "Filet de lieu noir", description: "Écrasé de pommes de terre à l'aneth, sauce vierge" },
    { type: "Dessert", name: "Tartelette aux noix", description: "Caramel beurre salé" }
  ];

  return (
    <section id="menu-semaine" className="py-section bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header simple et centré */}
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="heading-section mb-4">{t('title')}</h2>
              <p className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4">
                {t('date_range')}
              </p>
              <p className="text-sm uppercase tracking-widest text-foreground/50">
                {t('subtitle')} — {t('closed_info')}
              </p>
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
                <span className="text-3xl font-black block mb-1">24€</span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">Formule Complète</span>
              </div>
              
              <div className="hidden md:block w-px bg-border"></div>
              
              <div className="text-center">
                <span className="text-2xl font-black block mb-1 mt-1">19€</span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">Entrée + Plat</span>
              </div>

              <div className="hidden md:block w-px bg-border"></div>

              <div className="text-center">
                <span className="text-2xl font-black block mb-1 mt-1">19€</span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">Plat + Dessert</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
