import {useTranslations} from 'next-intl';

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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.312585356814!2d-0.5742220233732016!3d44.83556717516151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527cf37ae29eb%3A0x44b08d72577ffa0f!2sLes%20N%C3%A9gociants%20-%20Restaurant!5e0!3m2!1sfr!2sfr!4v1746724362635!5m2!1sfr!2sfr" 
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
