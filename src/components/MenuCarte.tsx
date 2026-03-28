import {useTranslations} from 'next-intl';

export default function MenuCarte() {
  const t = useTranslations('MenuCarte');

  const starters = [
    { name: "Asperges vertes des Landes", description: "Mousseline citronnée, noisettes torréfiées", price: "14€" },
    { name: "Oeuf parfait", description: "Crème de champignons, croûtons à l'ail", price: "12€" },
    { name: "Gravlax de truite", description: "Betterave, aneth et crème aigre", price: "15€" },
  ];

  const mains = [
    { name: "Noix de veau rôtie", description: "Millefeuille de butternut, condiment châtaigne", price: "28€" },
    { name: "Espadon snacké", description: "Mousseline de brocolis, noix et sauce chimichurri", price: "26€" },
    { name: "Risotto aux truffes", description: "Champignons sauvages, parmesan 24 mois", price: "24€" },
  ];

  const desserts = [
    { name: "Ganache chocolat noir", description: "Fleur de sel, huile d'olive de Provence", price: "10€" },
    { name: "Pavlova aux fruits exotiques", description: "Meringue française, sorbet mangue", price: "11€" },
    { name: "Assiette de fromages", description: "Sélection de notre crémier bordelais", price: "12€" },
  ];

  return (
    <section id="menu-carte" className="py-20 bg-gray-50 dark:bg-gray-900/50 text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-sm uppercase tracking-widest text-foreground/50 mb-8">{t('subtitle')}</p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed italic text-foreground/70">{t('description')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Starters */}
          <div>
            <h3 className="text-2xl font-bold text-center border-b border-primary/30 pb-4 mb-8 uppercase tracking-wider">
              {t('starters')}
            </h3>
            <div className="space-y-8">
              {starters.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">{item.name}</h4>
                    <span className="text-primary font-bold ml-4">{item.price}</span>
                  </div>
                  <p className="text-sm text-foreground/60 italic">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mains */}
          <div>
            <h3 className="text-2xl font-bold text-center border-b border-primary/30 pb-4 mb-8 uppercase tracking-wider">
              {t('mains')}
            </h3>
            <div className="space-y-8">
              {mains.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">{item.name}</h4>
                    <span className="text-primary font-bold ml-4">{item.price}</span>
                  </div>
                  <p className="text-sm text-foreground/60 italic">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desserts */}
          <div>
            <h3 className="text-2xl font-bold text-center border-b border-primary/30 pb-4 mb-8 uppercase tracking-wider">
              {t('desserts')}
            </h3>
            <div className="space-y-8">
              {desserts.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">{item.name}</h4>
                    <span className="text-primary font-bold ml-4">{item.price}</span>
                  </div>
                  <p className="text-sm text-foreground/60 italic">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
