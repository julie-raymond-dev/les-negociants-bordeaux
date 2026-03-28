'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Mail, Instagram, Clock, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, fadeUp } from './Motion';

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

const InfoItem = ({ icon: Icon, label, children }: InfoItemProps) => (
  <motion.div variants={fadeUp} className="space-y-6">
    <div className="flex items-center gap-4 text-primary">
      <Icon size={20} />
      <span className="text-label-caps">{label}</span>
    </div>
    <div className="text-xl font-bold leading-snug">
      {children}
    </div>
  </motion.div>
);

export default function Info() {
  const t = useTranslations('Info');

  return (
    <section id="informations" className="py-section bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="heading-section mb-6">{t('title')}</h2>
              <p className="heading-title mb-8">{t('subtitle1')}</p>
              <p className="text-lg text-foreground/60 italic max-w-2xl mx-auto font-light">
                "{t('subtitle2')}"
              </p>
            </div>
          </Reveal>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-border pt-16"
          >
            <InfoItem icon={MapPin} label={t('address_label')}>
              <p className="text-foreground/80">{t('address_value')}</p>
            </InfoItem>

            <InfoItem icon={Instagram} label="Digital">
              <div className="flex flex-col gap-2">
                <a href={`mailto:${t('contact_email')}`} className="hover:text-primary transition-colors underline decoration-primary/20 underline-offset-8">
                  {t('contact_email')}
                </a>
                <a href="https://instagram.com/lesnegociants_bdx" target="_blank" rel="noopener noreferrer" className="text-lg text-foreground/60 hover:text-primary transition-colors flex items-center gap-2">
                  <Instagram size={14} /> {t('contact_instagram')}
                </a>
              </div>
            </InfoItem>

            <InfoItem icon={Clock} label={t('hours_label')}>
              <p className="text-sm leading-relaxed text-foreground/70 whitespace-pre-line font-medium uppercase tracking-wider">
                {t('hours_value')}
              </p>
            </InfoItem>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
