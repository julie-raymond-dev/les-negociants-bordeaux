import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function Story() {
  const t = useTranslations('Story');

  return (
    <section id="notre-histoire" className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
            {/* Image placeholder */}
            <img 
              src="https://lesnegociants.fr/wp-content/uploads/2024/08/IMG_4603.jpg" 
              alt="Restaurant Interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-primary mb-8">
              {t('title')}
            </h2>
            <p className="text-lg leading-relaxed text-foreground/80">{t('p1')}</p>
            <p className="text-lg leading-relaxed font-semibold text-foreground">{t('p2')}</p>
            <p className="text-lg leading-relaxed text-foreground/80">{t('p3')}</p>
            <p className="text-lg leading-relaxed text-foreground/80">{t('p4')}</p>
            <p className="text-lg leading-relaxed text-foreground/80">{t('p5')}</p>
            <p className="text-lg leading-relaxed font-italic text-foreground/90">{t('p6')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
