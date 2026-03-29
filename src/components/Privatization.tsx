'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, Wine, Utensils, Star, Info, CheckCircle2, MessageSquare, Calendar } from 'lucide-react';
import { Reveal, fadeUp, staggerContainer } from './Motion';

export default function Privatization() {
  const t = useTranslations('Privatization');

  const menus = [
    { name: t('menu1_name'), price: t('menu1_price'), desc: t('menu1_desc'), color: 'bg-primary/5' },
    { name: t('menu2_name'), price: t('menu2_price'), desc: t('menu2_desc'), color: 'bg-primary/10' },
    { name: t('menu3_name'), price: t('menu3_price'), desc: t('menu3_desc'), color: 'bg-primary/20' },
  ];

  const drinks = [
    { price: t('drink1_price'), desc: t('drink1_desc') },
    { price: t('drink2_price'), desc: t('drink2_desc') },
    { price: t('drink3_price'), desc: t('drink3_desc') },
  ];

  const testimonials = [
    {
      text: "Quel bonheur de venir profiter d’un moment de détente chez Les Négociants ! En cuisine et en salle, toute l’équipe est aux petits soins pour le plus grand plaisir de nos papilles, ceci accompagné d’une merveilleuse carte des vins ! Du très haut niveau en toute convivialité : chapeau et merci !",
      author: "Marion Rouchaud",
      role: "Agence Freelance Communication"
    },
    {
      text: "Un délice pour les papilles !! Un repas comblé de surprises du début à la fin. Tout d’abord, le lieu est décoré avec beaucoup de goût, la carte est plutôt succincte laissant place à la surprise lorsque les assiettes sont servies. Sans oublier la carte des vins soigneusement sélectionnée.",
      author: "Sophie Mignet",
      role: "Responsable influence et coordination RP"
    }
  ];

  return (
    <section id="privatisation" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">

        {/* En-tête de section */}
        <Reveal>
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="heading-section mb-6">{t('title')}</h2>
            <p className="heading-title mb-8">{t('description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left border-t border-border pt-12">
              <div>
                <h3 className="text-primary font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <Star size={14} /> {t('situation_title')}
                </h3>
                <p className="text-foreground/70 leading-relaxed italic">{t('situation_desc')}</p>
              </div>
              <div>
                <h3 className="text-primary font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <Wine size={14} /> {t('ambiances_title')}
                </h3>
                <p className="text-foreground/70 leading-relaxed italic">{t('ambiances_desc')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Dualité : Restaurant vs Cave */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {/* Bloc Restaurant */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative bg-muted rounded-[50px] overflow-hidden border border-border"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src="/gallery/hero-bg.jpg" alt="Restaurant" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-10 md:p-16">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{t('restaurant_title')}</h3>
                  <p className="text-primary font-bold uppercase tracking-widest text-[10px]">{t('restaurant_subtitle')}</p>
                </div>
                <div className="bg-background px-6 py-3 rounded-full border border-border font-black text-[10px] uppercase tracking-widest">
                  {t('restaurant_capacity')}
                </div>
              </div>
              <p className="text-foreground/60 leading-relaxed mb-8">{t('restaurant_desc')}</p>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                <span className="text-primary">Business Lunch</span>
                <span className="w-1 h-1 bg-border rounded-full"></span>
                <span>27€</span>
              </div>
            </div>
          </motion.div>

          {/* Bloc Cave */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative bg-foreground text-background rounded-[50px] overflow-hidden shadow-2xl"
          >
            <div className="aspect-[16/10] overflow-hidden grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
              <img src="/gallery/privatisation.jpg" alt="La Cave" className="w-full h-full object-cover" />
            </div>
            <div className="p-10 md:p-16">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-white">{t('cave_title')}</h3>
                  <p className="text-primary font-bold uppercase tracking-widest text-[10px]">{t('cave_subtitle')}</p>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-full border border-white/10 font-black text-[10px] uppercase tracking-widest text-white">
                  {t('cave_capacity')}
                </div>
              </div>
              <p className="text-white/60 leading-relaxed mb-8">{t('cave_desc')}</p>
              <ul className="space-y-4">
                {[t('cave_ambiance_1'), t('cave_ambiance_2'), t('cave_ambiance_3')].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/80">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Témoignages */}
        <Reveal>
          <div className="mb-32 bg-muted/50 p-12 md:p-20 rounded-[60px] border border-border relative">
            <MessageSquare className="absolute top-10 right-10 text-primary opacity-10" size={80} />
            <h3 className="heading-section mb-16 text-center">{t('testimonials_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {testimonials.map((item, i) => (
                <div key={i} className="space-y-6">
                  <p className="text-lg italic leading-relaxed text-foreground/80">"{item.text}"</p>
                  <div>
                    <p className="font-black uppercase tracking-widest text-xs">{item.author}</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Menus et Forfaits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{t('menus_title')}</h3>
              <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest max-w-xl">{t('menus_help')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {menus.map((menu, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className={`${menu.color} p-10 rounded-[40px] border border-primary/10 flex flex-col justify-between aspect-square`}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Option 0{i + 1}</span>
                  <div>
                    <p className="text-4xl font-black mb-2">{menu.price}</p>
                    <p className="font-black uppercase tracking-widest text-[10px] text-primary">{menu.name}</p>
                  </div>
                  <p className="text-xs font-bold leading-relaxed opacity-60 uppercase tracking-widest">{menu.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-muted p-12 rounded-[50px] border border-border flex flex-col justify-between">
            <div className="mb-12">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{t('drinks_title')}</h3>
              <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest leading-relaxed">{t('drinks_help')}</p>
            </div>
            <div className="space-y-8">
              {drinks.map((drink, i) => (
                <div key={i} className="flex items-center gap-6">
                  <span className="text-xl font-black text-primary">{drink.price}</span>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed opacity-60">{drink.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conditions de réservation */}
        <Reveal>
          <div className="bg-foreground text-background p-12 md:p-20 rounded-[60px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-primary/10 rounded-full blur-[120px]"></div>
            <div className="relative z-10">
              <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-16 text-center">{t('conditions_title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-primary">
                    <Calendar size={24} />
                    <h4 className="font-black uppercase tracking-widest text-sm">{t('conditions_res_title')}</h4>
                  </div>
                  <p className="text-white/60 leading-relaxed italic">{t('conditions_res_desc')}</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-primary">
                    <Info size={24} />
                    <h4 className="font-black uppercase tracking-widest text-sm">{t('conditions_ann_title')}</h4>
                  </div>
                  <p className="text-white/60 leading-relaxed italic">{t('conditions_ann_desc')}</p>
                </div>
              </div>
              <div className="mt-20 text-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-white font-black uppercase tracking-[0.3em] text-xs rounded-full shadow-2xl hover:scale-105 transition-all"
                >
                  {t('cta')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
