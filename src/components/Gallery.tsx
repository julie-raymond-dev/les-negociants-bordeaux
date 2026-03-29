'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Reveal } from './Motion';
import { siteConfig } from '@/config/site';
import { getGallery } from '@/lib/supabase';

export default function Gallery() {
  const t = useTranslations('Gallery');
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [images, setImages] = useState<any[]>(siteConfig.assets.gallery);

  useEffect(() => {
    async function loadData() {
      const data = await getGallery();
      if (data && data.length > 0) setImages(data);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const offsetWidth = containerRef.current.offsetWidth;
      setConstraints({ left: -(scrollWidth - offsetWidth + 40), right: 40 });
    }
  }, [images]);

  const x = useMotionValue(0);
  
  return (
    <section id="galerie" className="py-section bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <Reveal>
          <div className="text-center">
            <h2 className="heading-section mb-4">{t('title')}</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
              {t('swipe_instruction')}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative cursor-grab active:cursor-grabbing px-6 md:px-20">
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          style={{ x }}
          className="flex gap-8 md:gap-12"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative min-w-[300px] md:min-w-[500px] aspect-[4/5] md:aspect-[16/10] rounded-[40px] overflow-hidden group shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img 
                src={img.url} 
                alt={`${img.title} - Plat fait maison au restaurant Les Négociants Bordeaux`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end">
                <motion.h4 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter"
                >
                  {img.title}
                </motion.h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 mt-16">
        <div className="max-w-xs mx-auto h-1 bg-border rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ 
              width: "100%",
              scaleX: useTransform(x, [constraints.left, constraints.right], [1, 0]),
              originX: 0
            }}
          />
        </div>
        <div className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">
          {t('terrace_info')}
        </div>
      </div>
    </section>
  );
}
