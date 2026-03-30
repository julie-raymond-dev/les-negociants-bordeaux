'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Mail, Instagram, Clock, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';
import { Reveal, fadeUp } from './Motion';

export default function FindUs() {
  const t = useTranslations('FindUs');
  const tInfo = useTranslations('Info');

  return (
    <section id="nous-trouver" className="py-24 bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-6">
        
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="heading-section mb-6">{t('title')}</h2>
            <p className="max-w-2xl mx-auto text-foreground/60 leading-relaxed italic">
              {t('description')}
            </p>
          </div>
        </Reveal>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <MapPin size={24} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{tInfo('address_label')}</h3>
            <p className="text-sm font-bold leading-relaxed">{tInfo('address_value')}</p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <Instagram size={24} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Digital</h3>
            <div className="flex flex-col items-center gap-2">
              <a href={`mailto:${tInfo('contact_email')}`} className="text-sm font-bold hover:text-primary transition-colors">{tInfo('contact_email')}</a>
              <a href={siteConfig.urls.instagram} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2">
                {tInfo('contact_instagram')} <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <Clock size={24} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{tInfo('hours_label')}</h3>
            <p className="text-sm font-bold leading-relaxed whitespace-pre-line opacity-70 italic uppercase tracking-wider">
              {tInfo('hours_value')}
            </p>
          </motion.div>
        </div>

        {/* Carte Google Maps */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-border"
        >
          <iframe 
            src={siteConfig.urls.googleMapsEmbed} 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="dark:invert dark:hue-rotate-180"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
