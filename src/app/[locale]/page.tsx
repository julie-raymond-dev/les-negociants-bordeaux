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
import SectionSeparator from '@/components/SectionSeparator';
import { Github, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SectionSeparator />
      <Info />
      <SectionSeparator />
      <Story />
      <SectionSeparator />
      <MenuCarte />
      <SectionSeparator />
      <MenuWeek />
      <SectionSeparator />
      <Gallery />
      <SectionSeparator />
      <FindUs />
      <SectionSeparator />
      <Contact />
      <TheForkReservation />
      <FloatingActions />
      
      <footer className="py-12 bg-background text-foreground text-center border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            © {new Date().getFullYear()} LES NÉGOCIANTS — Restaurant Bordeaux
          </p>
          
          <div className="flex items-center gap-8">
            <a 
              href={process.env.NEXT_PUBLIC_GITHUB_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-primary transition-all group"
            >
              <Github size={14} className="group-hover:scale-110 transition-transform" />
              <span>julie-raymond-dev</span>
            </a>
            <a 
              href={process.env.NEXT_PUBLIC_PORTFOLIO_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-primary transition-all group"
            >
              <Globe size={14} className="group-hover:scale-110 transition-transform" />
              <span>Pichaud Studio</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
