import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Info from '@/components/Info';
import Story from '@/components/Story';
import MenuCarte from '@/components/MenuCarte';
import MenuWeek from '@/components/MenuWeek';
import Gallery from '@/components/Gallery';
import FindUs from '@/components/FindUs';
import Contact from '@/components/Contact';
import TheForkReservation from '@/components/TheForkReservation';
import FloatingActions from '@/components/FloatingActions';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Info />
      <Story />
      <MenuCarte />
      <MenuWeek />
      <Gallery />
      <FindUs />
      <Contact />
      <TheForkReservation />
      <FloatingActions />
      
      <footer className="py-10 bg-dark text-white text-center border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            © {new Date().getFullYear()} LES NÉGOCIANTS - Restaurant Bordeaux
          </p>
        </div>
      </footer>
    </main>
  );
}
