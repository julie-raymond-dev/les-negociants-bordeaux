'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Save, LayoutDashboard, Utensils, 
  Calendar, Euro, ArrowLeft, LogOut, Settings, Image as ImageIcon, FileText, Upload
} from 'lucide-react';

import { supabase } from '@/lib/supabase';

interface GalleryItem {
  url: string;
  title: string;
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('carte');
  const [isUploading, setIsUploading] = useState(false);

  // Simulation d'upload sur Supabase
  const handleFileUpload = async (file: File, bucket: string) => {
    setIsUploading(true);
    try {
      console.log(`Upload du fichier ${file.name} dans le bucket ${bucket}...`);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation
      return `https://supabase-placeholder.com/${bucket}/${file.name}`;
    } catch (err) {
      console.error("Erreur d'upload :", err);
    } finally {
      setIsUploading(false);
    }
  };

  // États pour le Menu à la Carte (Simulés pour la structure)
  const [starters, setStarters] = useState<MenuItem[]>([
    { name: "Asperges vertes des Landes", description: "Mousseline citronnée, noisettes torréfiées", price: "14" },
  ]);
  const [mains, setMains] = useState<MenuItem[]>([
    { name: "Noix de veau rôtie", description: "Millefeuille de butternut, condiment châtaigne", price: "28" },
  ]);
  const [desserts, setDesserts] = useState<MenuItem[]>([
    { name: "Ganache chocolat noir", description: "Fleur de sel, huile d'olive de Provence", price: "10" },
  ]);

  // États pour les prix des formules
  const [prices, setPrices] = useState({
    full: "38",
    starterMain: "32",
    mainDessert: "32"
  });

  // États pour le Menu de la Semaine
  const [weekMenu, setWeekMenu] = useState({
    dateRange: "25 Mars — 29 Mars",
    starter: "Velouté de potimarron, graines de courge et huile de truffe",
    main: "Filet de lieu noir, écrasé de pommes de terre à l'aneth, sauce vierge",
    dessert: "Tartelette aux noix du Périgord, caramel beurre salé",
    price: "24"
  });

  const [media, setMedia] = useState({
    storyImage: "https://lesnegociants.fr/wp-content/uploads/2024/08/IMG_4603.jpg",
    gallery: [
      { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1860.jpg", title: "Asperges des Landes" },
    ] as GalleryItem[],
    menuCartePdf: "/menu-carte.pdf",
    menuWeekPdf: "/menu-semaine.pdf"
  });

  // État pour le nouvel item de la galerie
  const [newGalleryItem, setNewGalleryItem] = useState<GalleryItem>({ url: "", title: "" });

  const addGalleryItem = () => {
    if (newGalleryItem.url && newGalleryItem.title) {
      setMedia({
        ...media,
        gallery: [...media.gallery, newGalleryItem]
      });
      setNewGalleryItem({ url: "", title: "" });
    }
  };

  const removeGalleryItem = (index: number) => {
    const newGallery = media.gallery.filter((_, i) => i !== index);
    setMedia({ ...media, gallery: newGallery });
  };

  const addItem = (type: string) => {
    const newItem = { name: "", description: "", price: "" };
    if (type === 'starter') setStarters([...starters, newItem]);
    if (type === 'main') setMains([...mains, newItem]);
    if (type === 'dessert') setDesserts([...desserts, newItem]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-muted border-r border-border p-8 flex flex-col">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-black tracking-widest text-lg uppercase">Dashboard</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <TabButton 
            active={activeTab === 'carte'} 
            onClick={() => setActiveTab('carte')}
            icon={<Utensils size={18} />}
            label="Menu à la Carte"
          />
          <TabButton 
            active={activeTab === 'prices'} 
            onClick={() => setActiveTab('prices')}
            icon={<Euro size={18} />}
            label="Tarifs Formules"
          />
          <TabButton 
            active={activeTab === 'week'} 
            onClick={() => setActiveTab('week')}
            icon={<Calendar size={18} />}
            label="Menu Semaine"
          />
          <TabButton 
            active={activeTab === 'media'} 
            onClick={() => setActiveTab('media')}
            icon={<ImageIcon size={18} />}
            label="Médias & PDFs"
          />
        </nav>

        <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
          <Link 
            href="/"
            className="flex items-center gap-4 px-4 py-3 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={18} />
            Retour au site
          </Link>
          <Link 
            href="/login"
            className="flex items-center gap-4 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={18} />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-16 max-w-6xl">
        <AnimatePresence mode="wait">
          {activeTab === 'carte' && (
            <motion.section 
              key="carte"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Menu à la Carte</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Gérez vos entrées, plats et desserts</p>
                </div>
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                  <Save size={16} /> Enregistrer les modifs
                </button>
              </header>

              <div className="grid grid-cols-1 gap-12">
                <MenuSection 
                  title="Entrées" 
                  items={starters} 
                  setItems={setStarters} 
                  onAdd={() => addItem('starter')}
                />
                <MenuSection 
                  title="Plats" 
                  items={mains} 
                  setItems={setMains} 
                  onAdd={() => addItem('main')}
                />
                <MenuSection 
                  title="Desserts" 
                  items={desserts} 
                  setItems={setDesserts} 
                  onAdd={() => addItem('dessert')}
                />
              </div>
            </motion.section>
          )}

          {activeTab === 'prices' && (
            <motion.section 
              key="prices"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Tarifs Formules</h1>
                <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Modifiez les prix des combinaisons du soir</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PriceCard 
                  label="Entrée + Plat + Dessert" 
                  value={prices.full} 
                  onChange={(v: string) => setPrices({...prices, full: v})} 
                />
                <PriceCard 
                  label="Entrée + Plat" 
                  value={prices.starterMain} 
                  onChange={(v: string) => setPrices({...prices, starterMain: v})} 
                />
                <PriceCard 
                  label="Plat + Dessert" 
                  value={prices.mainDessert} 
                  onChange={(v: string) => setPrices({...prices, mainDessert: v})} 
                />
              </div>
            </motion.section>
          )}

          {activeTab === 'week' && (
            <motion.section 
              key="week"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Menu de la Semaine</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Mise à jour hebdomadaire du menu du midi</p>
                </div>
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                  <Save size={16} /> Enregistrer
                </button>
              </header>

              <div className="bg-muted p-8 rounded-3xl border border-border space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Dates du menu (ex: 25 Mars — 29 Mars)" value={weekMenu.dateRange} onChange={(v: string) => setWeekMenu({...weekMenu, dateRange: v})} />
                  <InputGroup label="Prix Formule Complète" value={weekMenu.price} onChange={(v: string) => setWeekMenu({...weekMenu, price: v})} suffix="€" />
                </div>
                <div className="space-y-6">
                  <InputGroup label="Entrée de la semaine" value={weekMenu.starter} onChange={(v: string) => setWeekMenu({...weekMenu, starter: v})} />
                  <InputGroup label="Plat de la semaine" value={weekMenu.main} onChange={(v: string) => setWeekMenu({...weekMenu, main: v})} />
                  <InputGroup label="Dessert de la semaine" value={weekMenu.dessert} onChange={(v: string) => setWeekMenu({...weekMenu, dessert: v})} />
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'media' && (
            <motion.section 
              key="media"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Médias & Documents</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Gérez vos images et vos menus PDF</p>
                </div>
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                  <Save size={16} /> Enregistrer
                </button>
              </header>

              {/* Section PDFs */}
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">Menus PDF</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FileUploadCard 
                    label="Carte Complète (PDF)" 
                    fileName="menu-carte.pdf" 
                    icon={<FileText size={24} />} 
                  />
                  <FileUploadCard 
                    label="Menu de la Semaine (PDF)" 
                    fileName="menu-semaine.pdf" 
                    icon={<FileText size={24} />} 
                  />
                </div>
              </div>

              {/* Section Images */}
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">Images du Site</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-muted p-8 rounded-3xl border border-border space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block">Image Histoire</span>
                    <div className="aspect-video bg-background rounded-2xl overflow-hidden mb-4 relative group">
                      <img src={media.storyImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="text-white" size={32} />
                      </button>
                    </div>
                    <input 
                      value={media.storyImage} 
                      onChange={(e) => setMedia({...media, storyImage: e.target.value})}
                      className="w-full bg-background border border-border px-4 py-2 rounded-lg text-xs"
                      placeholder="URL de l'image"
                    />
                  </div>
                </div>
              </div>

              {/* Galerie */}
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">Galerie Photo</h3>
                
                {/* Formulaire d'ajout sécurisé */}
                <div className="bg-muted p-8 rounded-3xl border border-border space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block">Nouvel item de la galerie (Titre + URL requis)</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      placeholder="Titre de l'assiette (ex: Noix de veau)" 
                      value={newGalleryItem.title} 
                      onChange={(e) => setNewGalleryItem({...newGalleryItem, title: e.target.value})}
                      className="w-full bg-background border border-border px-6 py-4 rounded-xl outline-none focus:border-primary font-bold transition-all"
                    />
                    <input 
                      placeholder="URL de l'image" 
                      value={newGalleryItem.url} 
                      onChange={(e) => setNewGalleryItem({...newGalleryItem, url: e.target.value})}
                      className="w-full bg-background border border-border px-6 py-4 rounded-xl outline-none focus:border-primary font-bold transition-all"
                    />
                  </div>
                  <button 
                    disabled={!newGalleryItem.url || !newGalleryItem.title}
                    onClick={addGalleryItem}
                    className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-primary/20"
                  >
                    <Plus size={18} /> Ajouter à la galerie
                  </button>
                </div>

                {/* Liste de la galerie */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {media.gallery.map((img, i) => (
                    <div key={i} className="flex flex-col gap-3 group">
                      <div className="aspect-square bg-muted rounded-2xl border border-border relative overflow-hidden shadow-md">
                        <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <button 
                          onClick={() => removeGalleryItem(i)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="px-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block mb-1 truncate">{img.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function FileUploadCard({ label, fileName, icon }: { label: string, fileName: string, icon: any }) {
  return (
    <div className="bg-muted p-8 rounded-3xl border border-border flex flex-col items-center gap-6">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block mb-1">{label}</span>
        <span className="text-sm font-bold text-foreground">{fileName}</span>
      </div>
      <button className="w-full bg-background border-2 border-border py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all">
        <Upload size={14} /> Remplacer le PDF
      </button>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${active ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'hover:bg-foreground/5 text-foreground opacity-60'}`}
    >
      {icon}
      {label}
    </button>
  );
}

function MenuSection({ title, items, setItems, onAdd }: { title: string, items: MenuItem[], setItems: any, onAdd: () => void }) {
  const updateItem = (index: number, field: keyof MenuItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">{title}</h3>
        <button 
          onClick={onAdd}
          className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-muted p-6 rounded-2xl border border-border flex gap-4 group">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <input 
                  placeholder="Nom du plat" 
                  value={item.name} 
                  onChange={(e) => updateItem(i, 'name', e.target.value)}
                  className="w-full bg-background border border-border px-4 py-2 rounded-lg outline-none focus:border-primary font-bold text-sm"
                />
              </div>
              <div className="md:col-span-6">
                <input 
                  placeholder="Description" 
                  value={item.description} 
                  onChange={(e) => updateItem(i, 'description', e.target.value)}
                  className="w-full bg-background border border-border px-4 py-2 rounded-lg outline-none focus:border-primary text-sm"
                />
              </div>
              <div className="md:col-span-2 relative">
                <input 
                  placeholder="Prix" 
                  value={item.price} 
                  onChange={(e) => updateItem(i, 'price', e.target.value)}
                  className="w-full bg-background border border-border pl-4 pr-8 py-2 rounded-lg outline-none focus:border-primary font-bold text-sm text-right"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground/30">€</span>
              </div>
            </div>
            <button 
              onClick={() => removeItem(i)}
              className="text-foreground/20 hover:text-red-500 transition-colors self-center"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceCard({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="bg-muted p-8 rounded-3xl border border-border flex flex-col items-center gap-4">
      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 text-center">{label}</span>
      <div className="relative w-full max-w-[120px]">
        <input 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border-2 border-border text-3xl font-black text-center py-4 rounded-2xl outline-none focus:border-primary transition-colors"
        />
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-xl font-black text-foreground/20">€</span>
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange, suffix }: { label: string, value: string, onChange: (v: string) => void, suffix?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-1">{label}</label>
      <div className="relative">
        <input 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border border-border px-6 py-4 rounded-xl outline-none focus:border-primary transition-colors font-bold"
        />
        {suffix && <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-foreground/20">{suffix}</span>}
      </div>
    </div>
  );
}
