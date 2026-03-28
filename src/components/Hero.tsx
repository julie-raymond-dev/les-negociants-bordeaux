import {useTranslations} from 'next-intl';
import ReservationButton from './ReservationButton';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder - To be replaced with actual optimized image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('https://lesnegociants.fr/wp-content/uploads/2024/07/IMG_1458-1-e1748335626467-1024x1014.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-[0.2em] drop-shadow-2xl mb-12">
          {t('title')}
        </h1>
        <ReservationButton className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-dark px-10 py-4 text-lg" />
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
