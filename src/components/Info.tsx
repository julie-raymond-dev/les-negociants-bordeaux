import {useTranslations} from 'next-intl';

export default function Info() {
  const t = useTranslations('Info');

  return (
    <section id="informations" className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-widest border-b-2 border-primary pb-4 inline-block">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl font-light italic mb-4 text-foreground/90">
            {t('subtitle1')}
          </p>
          <p className="text-xl md:text-2xl font-light italic text-foreground/90">
            {t('subtitle2')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-xl font-bold text-primary uppercase mb-4 tracking-wider">
              {t('address_label')}
            </h3>
            <p className="leading-relaxed whitespace-pre-line text-foreground/80">
              {t('address_value')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary uppercase mb-4 tracking-wider">
              {t('contact_label')}
            </h3>
            <div className="leading-relaxed text-foreground/80">
              <a href={`mailto:${t('contact_email')}`} className="hover:text-primary transition-colors block">
                {t('contact_email')}
              </a>
              <a href="https://instagram.com/lesnegociants_bdx" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">
                {t('contact_instagram')}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary uppercase mb-4 tracking-wider">
              {t('hours_label')}
            </h3>
            <p className="leading-relaxed whitespace-pre-line text-sm text-foreground/80">
              {t('hours_value')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
