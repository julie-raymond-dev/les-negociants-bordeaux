'use client';

import {useTranslations} from 'next-intl';
import { motion } from 'framer-motion';

export default function MenuWeek() {
  const t = useTranslations('MenuWeek');

  const menu = [
    { type: "Entrée", name: "Velouté de potimarron, graines de courge et huile de truffe" },
    { type: "Plat", name: "Filet de lieu noir, écrasé de pommes de terre à l'aneth, sauce vierge" },
    { type: "Dessert", name: "Tartelette aux noix du Périgord, caramel beurre salé" }
  ];

  return (
    <section id="menu-semaine" className="py-32 bg-primary text-white overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.03] skew-x-12 translate-x-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="text-left">
              <h2 className="heading-section text-white/80 !mb-6">
                {t('title')}
              </h2>
              <p className="text-2xl md:text-4xl font-black tracking-tighter leading-none uppercase">
                {t('date_range')}
              </p>
            </div>
            <div className="text-right flex flex-col items-end">
              <p className="text-[10px] font-black uppercase tracking-widest bg-white text-primary px-4 py-2 rounded-full mb-4">
                {t('subtitle')}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                {t('closed_info')}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {menu.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-10 border-b border-white/10 last:border-0"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 w-24">
                  {item.type}
                </span>
                <p className="text-2xl md:text-4xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex items-center gap-8"
          >
            <div className="flex flex-col">
              <span className="text-5xl font-black tracking-tighter">24€</span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Formule Complète</span>
            </div>
            <div className="h-px flex-1 bg-white/10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
