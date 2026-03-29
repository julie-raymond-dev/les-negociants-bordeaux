import {useTranslations} from 'next-intl';
import { siteConfig } from '@/config/site';

export default function FindUs() {
  const t = useTranslations('FindUs');

  return (
    <section id="nous-trouver" className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-8">
            {t('title')}
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/80 leading-relaxed italic">
            {t('description')}
          </p>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl border border-border">
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
        </div>
      </div>
    </section>
  );
}
