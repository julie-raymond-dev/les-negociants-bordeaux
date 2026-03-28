import {useTranslations} from 'next-intl';

export default function Gallery() {
  const t = useTranslations('Gallery');

  const images = [
    { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1860.jpg", caption: "" },
    { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1777.jpg", caption: "" },
    { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1952.jpg", caption: "Noix de veau rôtie" },
    { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC2015.jpg", caption: "" },
    { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1889.jpg", caption: "Espadon snacké" },
    { url: "https://lesnegociants.fr/wp-content/uploads/2025/08/IMG_2618.jpg", caption: t('privatization_info') },
  ];

  return (
    <section className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="heading-section mb-16">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
              <img 
                src={img.url} 
                alt={`Gallery image ${i}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm italic">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center italic text-foreground/60">
          <p>{t('terrace_info')}</p>
        </div>
      </div>
    </section>
  );
}
