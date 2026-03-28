import {useTranslations} from 'next-intl';

export default function MenuWeek() {
  const t = useTranslations('MenuWeek');

  const menu = {
    starter: "Velouté de potimarron, graines de courge et huile de truffe",
    main: "Filet de lieu noir, écrasé de pommes de terre à l'aneth, sauce vierge",
    dessert: "Tartelette aux noix du Périgord, caramel beurre salé"
  };

  return (
    <section id="menu-semaine" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">
            {t('title')}
          </h2>
          <p className="text-xl font-semibold tracking-wider mb-2">{t('date_range')}</p>
          <p className="text-sm uppercase tracking-widest opacity-80 mb-2">{t('subtitle')}</p>
          <p className="text-xs uppercase tracking-widest font-bold">{t('closed_info')}</p>
        </div>

        <div className="max-w-2xl mx-auto bg-background text-foreground p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden text-center transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          
          <div className="space-y-10">
            <div>
              <span className="text-primary font-bold uppercase text-xs tracking-widest mb-2 block">— Entrée —</span>
              <p className="text-xl font-medium">{menu.starter}</p>
            </div>
            
            <div className="w-12 h-px bg-gray-200 dark:bg-gray-800 mx-auto"></div>

            <div>
              <span className="text-primary font-bold uppercase text-xs tracking-widest mb-2 block">— Plat —</span>
              <p className="text-xl font-medium">{menu.main}</p>
            </div>

            <div className="w-12 h-px bg-gray-200 dark:bg-gray-800 mx-auto"></div>

            <div>
              <span className="text-primary font-bold uppercase text-xs tracking-widest mb-2 block">— Dessert —</span>
              <p className="text-xl font-medium">{menu.dessert}</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-2xl font-bold text-primary">24€</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Formule Complète</p>
          </div>
        </div>
      </div>
    </section>
  );
}
