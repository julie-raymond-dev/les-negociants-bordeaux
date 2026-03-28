'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Save, LayoutDashboard, Utensils, 
  Calendar, Euro, ArrowLeft, LogOut, Settings, Image as ImageIcon, FileText, Upload, Loader2
} from 'lucide-react';

import { supabase, getMenuCarte, getMenuWeek, getGallery, getSiteSettings } from '@/lib/supabase';

interface GalleryItem {
  id?: string;
  url: string;
  title: string;
}

interface MenuItem {
  id?: string;
  category: string;
  name: string;
  description: string;
  price: string;
  display_order?: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('carte');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- États des données ---
  const [starters, setStarters] = useState<MenuItem[]>([]);
  const [mains, setMains] = useState<MenuItem[]>([]);
  const [desserts, setDesserts] = useState<MenuItem[]>([]);
  const [weekMenu, setWeekMenu] = useState<any>({
    date_range: "",
    starter_name: "",
    starter_desc: "",
    main_name: "",
    main_desc: "",
    dessert_name: "",
    dessert_desc: "",
    price_full: "24",
    price_half: "19"
  });
  const [media, setMedia] = useState({
    storyImage: "",
    gallery: [] as GalleryItem[],
    menuCartePdf: "",
    menuWeekPdf: ""
  });
  const [newGalleryItem, setNewGalleryItem] = useState<GalleryItem>({ url: "", title: "" });

  // --- Chargement initial ---
  useEffect(() => {
    async function loadAllData() {
      setIsLoading(true);
      try {
        const [carteData, weekData, galleryData, settings] = await Promise.all([
          getMenuCarte(),
          getMenuWeek(),
          getGallery(),
          getSiteSettings()
        ]);

        setStarters(carteData.filter((i: any) => i.category === 'starter'));
        setMains(carteData.filter((i: any) => i.category === 'main'));
        setDesserts(carteData.filter((i: any) => i.category === 'dessert'));
        if (weekData) setWeekMenu(weekData);
        setMedia({
          storyImage: settings.story_image || "",
          gallery: galleryData,
          menuCartePdf: settings.menu_carte_pdf || "",
          menuWeekPdf: settings.menu_week_pdf || ""
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadAllData();
  }, []);

  // --- Fonctions de Sauvegarde ---

  const saveMenuCarte = async () => {
    setIsSaving(true);
    try {
      // 1. On vide l'ancienne carte pour simplifier (méthode radicale mais sûre)
      await supabase.from('menu_carte').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // 2. On insère les nouveaux items avec un ordre
      const allItems = [
        ...starters.map((item, i) => ({ ...item, category: 'starter', display_order: i })),
        ...mains.map((item, i) => ({ ...item, category: 'main', display_order: i + 100 })),
        ...desserts.map((item, i) => ({ ...item, category: 'dessert', display_order: i + 200 }))
      ].map(({ id, ...rest }) => rest); // On enlève les IDs pour l'insertion

      await supabase.from('menu_carte').insert(allItems);
      alert("Menu à la carte sauvegardé !");
    } finally {
      setIsSaving(false);
    }
  };

  const saveWeekMenu = async () => {
    setIsSaving(true);
    try {
      await supabase.from('menu_week').upsert({ id: 1, ...weekMenu });
      alert("Menu de la semaine sauvegardé !");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, bucket: string, settingKey?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
      
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);

      if (settingKey) {
        // Sauvegarde dans site_settings
        await supabase.from('site_settings').upsert({ key: settingKey, value: publicUrl });
        setMedia(prev => ({ ...prev, [settingKey === 'story_image' ? 'storyImage' : settingKey.includes('carte') ? 'menuCartePdf' : 'menuWeekPdf']: publicUrl }));
      } else {
        // C'est pour la galerie (on pré-remplit l'URL)
        setNewGalleryItem(prev => ({ ...prev, url: publicUrl }));
      }
      alert("Fichier envoyé avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi du fichier.");
    } finally {
      setIsSaving(false);
    }
  };

  const addGalleryItem = async () => {
    if (newGalleryItem.url && newGalleryItem.title) {
      setIsSaving(true);
      try {
        const { data, error } = await supabase.from('gallery').insert([newGalleryItem]).select();
        if (data) {
          setMedia(prev => ({ ...prev, gallery: [data[0], ...prev.gallery] }));
          setNewGalleryItem({ url: "", title: "" });
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  const removeGalleryItem = async (id: string, index: number) => {
    if (!id) return;
    setIsSaving(true);
    try {
      await supabase.from('gallery').delete().eq('id', id);
      setMedia(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

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
          <TabButton active={activeTab === 'carte'} onClick={() => setActiveTab('carte')} icon={<Utensils size={18} />} label="Menu à la Carte" />
          <TabButton active={activeTab === 'week'} onClick={() => setActiveTab('week')} icon={<Calendar size={18} />} label="Menu Semaine" />
          <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={<ImageIcon size={18} />} label="Médias & PDFs" />
        </nav>

        <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-4 px-4 py-3 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity">
            <ArrowLeft size={18} /> Retour au site
          </Link>
          <Link href="/login" className="flex items-center gap-4 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={18} /> Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-16 max-w-6xl">
        <AnimatePresence mode="wait">
          
          {/* MENU A LA CARTE */}
          {activeTab === 'carte' && (
            <motion.section key="carte" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Menu à la Carte</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Gérez vos entrées, plats et desserts</p>
                </div>
                <button onClick={saveMenuCarte} disabled={isSaving} className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
                  {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Enregistrer
                </button>
              </header>

              <div className="grid grid-cols-1 gap-12">
                <MenuSection title="Entrées" items={starters} setItems={setStarters} onAdd={() => setStarters([...starters, { category: 'starter', name: "", description: "", price: "" }])} />
                <MenuSection title="Plats" items={mains} setItems={setMains} onAdd={() => setMains([...mains, { category: 'main', name: "", description: "", price: "" }])} />
                <MenuSection title="Desserts" items={desserts} setItems={setDesserts} onAdd={() => setDesserts([...desserts, { category: 'dessert', name: "", description: "", price: "" }])} />
              </div>
            </motion.section>
          )}

          {/* MENU SEMAINE */}
          {activeTab === 'week' && (
            <motion.section key="week" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Menu de la Semaine</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Mise à jour du midi</p>
                </div>
                <button onClick={saveWeekMenu} disabled={isSaving} className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
                  {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Enregistrer
                </button>
              </header>

              <div className="bg-muted p-8 rounded-3xl border border-border space-y-8">
                <InputGroup label="Dates du menu" value={weekMenu.date_range} onChange={(v: string) => setWeekMenu({...weekMenu, date_range: v})} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <InputGroup label="Entrée Nom" value={weekMenu.starter_name} onChange={(v: string) => setWeekMenu({...weekMenu, starter_name: v})} />
                    <InputGroup label="Entrée Description" value={weekMenu.starter_desc} onChange={(v: string) => setWeekMenu({...weekMenu, starter_desc: v})} />
                  </div>
                  <div className="space-y-4">
                    <InputGroup label="Plat Nom" value={weekMenu.main_name} onChange={(v: string) => setWeekMenu({...weekMenu, main_name: v})} />
                    <InputGroup label="Plat Description" value={weekMenu.main_desc} onChange={(v: string) => setWeekMenu({...weekMenu, main_desc: v})} />
                  </div>
                </div>
                <InputGroup label="Dessert Nom" value={weekMenu.dessert_name} onChange={(v: string) => setWeekMenu({...weekMenu, dessert_name: v})} />
                <div className="grid grid-cols-2 gap-8">
                  <InputGroup label="Prix Complet" value={weekMenu.price_full} onChange={(v: string) => setWeekMenu({...weekMenu, price_full: v})} suffix="€" />
                  <InputGroup label="Prix Demi" value={weekMenu.price_half} onChange={(v: string) => setWeekMenu({...weekMenu, price_half: v})} suffix="€" />
                </div>
              </div>
            </motion.section>
          )}

          {/* MEDIAS */}
          {activeTab === 'media' && (
            <motion.section key="media" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Médias & Documents</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FileUploadCard label="Carte Complète (PDF)" fileName={media.menuCartePdf} onFileSelect={(e: any) => handleFileUpload(e, 'documents', 'menu_carte_pdf')} isUploading={isSaving} />
                <FileUploadCard label="Menu Semaine (PDF)" fileName={media.menuWeekPdf} onFileSelect={(e: any) => handleFileUpload(e, 'documents', 'menu_week_pdf')} isUploading={isSaving} />
              </div>

              <div className="bg-muted p-8 rounded-3xl border border-border">
                <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-primary">Image Histoire</h3>
                <div className="flex gap-8 items-center">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border border-border">
                    <img src={media.storyImage || '/gallery/fallback-story.jpg'} className="w-full h-full object-cover" />
                  </div>
                  <input type="file" onChange={(e) => handleFileUpload(e, 'images', 'story_image')} className="text-xs" accept="image/*" />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">Galerie Photo</h3>
                <div className="bg-muted p-8 rounded-3xl border border-border space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input placeholder="Titre de l'assiette" value={newGalleryItem.title} onChange={(e) => setNewGalleryItem({...newGalleryItem, title: e.target.value})} className="bg-background border border-border px-6 py-4 rounded-xl font-bold" />
                    <input type="file" onChange={(e) => handleFileUpload(e, 'images')} className="bg-background border border-border px-6 py-4 rounded-xl text-xs" accept="image/*" />
                  </div>
                  <button onClick={addGalleryItem} disabled={!newGalleryItem.url || !newGalleryItem.title || isSaving} className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs disabled:opacity-30">
                    Ajouter à la galerie
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {media.gallery.map((img, i) => (
                    <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden shadow-md">
                      <img src={img.url} className="w-full h-full object-cover" />
                      <button onClick={() => removeGalleryItem(img.id!, i)} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
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

// --- Composants Internes ---

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${active ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'hover:bg-foreground/5 text-foreground opacity-60'}`}>
      {icon} {label}
    </button>
  );
}

function MenuSection({ title, items, setItems, onAdd }: any) {
  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };
  const removeItem = (index: number) => setItems(items.filter((_: any, i: number) => i !== index));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">{title}</h3>
        <button onClick={onAdd} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"><Plus size={24} /></button>
      </div>
      <div className="space-y-4">
        {items.map((item: any, i: number) => (
          <div key={i} className="bg-muted p-6 rounded-2xl border border-border flex gap-4 group">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4"><input placeholder="Nom" value={item.name} onChange={(e) => updateItem(i, 'name', e.target.value)} className="w-full bg-background border border-border px-4 py-2 rounded-lg font-bold text-sm" /></div>
              <div className="md:col-span-6"><input placeholder="Description" value={item.description} onChange={(e) => updateItem(i, 'description', e.target.value)} className="w-full bg-background border border-border px-4 py-2 rounded-lg text-sm" /></div>
              <div className="md:col-span-2 relative"><input placeholder="Prix" value={item.price} onChange={(e) => updateItem(i, 'price', e.target.value)} className="w-full bg-background border border-border pl-4 pr-8 py-2 rounded-lg font-bold text-sm text-right" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground/30">€</span></div>
            </div>
            <button onClick={() => removeItem(i)} className="text-foreground/20 hover:text-red-500 transition-colors self-center"><Trash2 size={20} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange, suffix }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-1">{label}</label>
      <div className="relative">
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-background border border-border px-6 py-4 rounded-xl outline-none focus:border-primary transition-colors font-bold" />
        {suffix && <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-foreground/20">{suffix}</span>}
      </div>
    </div>
  );
}

function FileUploadCard({ label, fileName, onFileSelect, isUploading }: any) {
  return (
    <div className="bg-muted p-8 rounded-3xl border border-border flex flex-col items-center gap-6">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
        <FileText size={24} />
      </div>
      <div className="text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block mb-1">{label}</span>
        <span className="text-xs font-bold text-foreground truncate max-w-[200px] block">{fileName || "Aucun fichier"}</span>
      </div>
      <label className="w-full bg-background border-2 border-border py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all cursor-pointer">
        {isUploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
        {fileName ? "Remplacer" : "Sélectionner"}
        <input type="file" className="hidden" accept=".pdf" onChange={onFileSelect} disabled={isUploading} />
      </label>
    </div>
  );
}
