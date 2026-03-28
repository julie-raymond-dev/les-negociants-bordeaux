'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, fadeUp } from './Motion';

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

  const categories = [
    {
      title: t('starters'),
      items: [
        { name: "Asperges vertes des Landes", description: "Mousseline citronnée, noisettes torréfiées", price: "14" },
        { name: "Oeuf parfait", description: "Crème de champignons, croûtons à l'ail", price: "12" },
        { name: "Gravlax de truite", description: "Betterave, aneth et crème aigre", price: "15" },
      ]
    },
    {
      title: t('mains'),
      items: [
        { name: "Noix de veau rôtie", description: "Millefeuille de butternut, condiment châtaigne", price: "28" },
        { name: "Espadon snacké", description: "Mousseline de brocolis, noix et sauce chimichurri", price: "26" },
        { name: "Risotto aux truffes", description: "Champignons sauvages, parmesan 24 mois", price: "24" },
      ]
    },
    {
      title: t('desserts'),
      items: [
        { name: "Ganache chocolat noir", description: "Fleur de sel, huile d'olive de Provence", price: "10" },
        { name: "Pavlova aux fruits exotiques", description: "Meringue française, sorbet mangue", price: "11" },
        { name: "Assiette de fromages", description: "Sélection de notre crémier bordelais", price: "12" },
      ]
    }
  ];

  return (
    <section id="menu-carte" className="py-section bg-muted transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="heading-section mb-4">{t('title')}</h2>
              <p className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-12">{t('subtitle')}</p>
              <p className="text-2xl md:text-3xl font-medium max-w-3xl mx-auto leading-relaxed">
                {t('description')}
              </p>
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
