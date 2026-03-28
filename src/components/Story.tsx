'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from './Motion';

import { siteConfig } from '@/config/site';

export default function Story() {
  const t = useTranslations('Story');
  const storyImage = siteConfig.assets.storyImage;

  return (
    <section id="notre-histoire" className="py-section bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl group">
              <motion.img 
                initial={{ scale: 1.2, filter: 'blur(20px)' }}
                whileInView={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src={storyImage} 
                alt="Restaurant Interior"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Reveal>
          
          <div className="space-y-8">
            <Reveal>
              <h2 className="heading-section !mb-12">
                {t('title')}
              </h2>
            </Reveal>
            <div className="space-y-6">
              <Reveal delay={0.2}><p className="text-lg leading-relaxed text-foreground/80">{t('p1')}</p></Reveal>
              <Reveal delay={0.3}><p className="text-xl leading-relaxed font-bold text-foreground italic">{t('p2')}</p></Reveal>
              <Reveal delay={0.4}><p className="text-lg leading-relaxed text-foreground/80">{t('p3')}</p></Reveal>
              <Reveal delay={0.5}><p className="text-lg leading-relaxed text-foreground/80">{t('p4')}</p></Reveal>
              <Reveal delay={0.6}><p className="text-lg leading-relaxed text-foreground/80">{t('p5')}</p></Reveal>
              <Reveal delay={0.7}><p className="text-lg leading-relaxed font-black uppercase tracking-widest text-primary pt-6">{t('p6')}</p></Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
