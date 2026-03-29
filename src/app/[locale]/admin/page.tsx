'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Save, LayoutDashboard, Utensils, 
  Calendar, Euro, ArrowLeft, LogOut, Settings, Image as ImageIcon, FileText, Upload, Loader2, GripVertical, X, Wine, CheckCircle2
} from 'lucide-react';

import { supabase, getMenuCarte, getMenuWeek, getGallery, getSiteSettings } from '@/lib/supabase';
import { siteConfig } from '@/config/site';

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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Prévenir la fermeture si modifs non enregistrées
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // --- États des données ---
  const [starters, setStarters] = useState<MenuItem[]>([]);
  const [mains, setMains] = useState<MenuItem[]>([]);
  const [desserts, setDesserts] = useState<MenuItem[]>([]);
  const [weekMenu, setWeekMenu] = useState<any>({});
  const [media, setMedia] = useState({
    storyImage: "",
    gallery: [] as GalleryItem[],
    menuCartePdf: "",
    menuWeekPdf: "",
    wineListPdf: ""
  });

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

        if (carteData && carteData.length > 0) {
          setStarters(carteData.filter((i: any) => i.category === 'starter'));
          setMains(carteData.filter((i: any) => i.category === 'main'));
          setDesserts(carteData.filter((i: any) => i.category === 'dessert'));
        } else {
          setStarters([{ category: 'starter', name: "Asperges vertes des Landes", description: "Mousseline citronnée, noisettes torréfiées", price: "14" }]);
          setMains([{ category: 'main', name: "Noix de veau rôtie", description: "Millefeuille de butternut, condiment châtaigne", price: "28" }]);
          setDesserts([{ category: 'dessert', name: "Ganache chocolat noir", description: "Fleur de sel, huile d'olive de Provence", price: "10" }]);
        }

        if (weekData && weekData.starter_name) {
          setWeekMenu(weekData);
        } else {
          setWeekMenu({
            date_range: "24 AU 28 MARS 2026",
            starter_name: "Velouté de potimarron",
            starter_desc: "Graines de courge et huile de truffe",
            starter_name_2: "",
            starter_desc_2: "",
            main_name: "Filet de lieu noir",
            main_desc: "Écrasé de pommes de terre à l'aneth, sauce vierge",
            main_name_2: "",
            main_desc_2: "",
            dessert_name: "Tartelette aux noix",
            dessert_desc: "Caramel beurre salé",
            dessert_name_2: "",
            dessert_desc_2: "",
            price_full: "24",
            price_half: "19",
            price_single: "15"
          });
        }

        setMedia({
          storyImage: settings.story_image || "/gallery/fallback-story.jpg",
          gallery: galleryData.length > 0 ? galleryData : siteConfig.assets.gallery,
          menuCartePdf: settings.menu_carte_pdf || siteConfig.assets.menuCartePdf,
          menuWeekPdf: settings.menu_week_pdf || siteConfig.assets.menuWeekPdf,
          wineListPdf: settings.wine_list_pdf || siteConfig.assets.wineListPdf
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadAllData();
  }, []);

  // --- Fonctions utilitaires ---
  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Fonctions de Sauvegarde ---

  const saveMenuCarte = async () => {
    setIsSaving(true);
    try {
      await supabase.from('menu_carte').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      const allItems = [
        ...starters.map((item, i) => ({ ...item, category: 'starter', display_order: i })),
        ...mains.map((item, i) => ({ ...item, category: 'main', display_order: i + 100 })),
        ...desserts.map((item, i) => ({ ...item, category: 'dessert', display_order: i + 200 }))
      ].map(({ id, ...rest }) => rest);
      await supabase.from('menu_carte').insert(allItems);
      setHasUnsavedChanges(false);
      showNotification("Le Menu à la Carte (soir) a été mis à jour avec succès.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveWeekMenu = async () => {
    setIsSaving(true);
    try {
      await supabase.from('menu_week').upsert({ id: 1, ...weekMenu });
      setHasUnsavedChanges(false);
      showNotification(`Menu de la semaine (${weekMenu.date_range}) enregistré.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (file: File, bucket: string) => {
    // Utiliser un nom de fichier fixe selon le type pour écraser l'ancien proprement
    let fileName = `${Date.now()}-${file.name}`;
    
    // Si c'est un PDF, on utilise un nom plus propre pour l'URL
    if (file.type === 'application/pdf') {
      if (file.name.toLowerCase().includes('vin')) fileName = 'carte_vin_2026.pdf';
      else if (file.name.toLowerCase().includes('week') || file.name.toLowerCase().includes('semaine')) fileName = 'menu_semaine_2026.pdf';
      else fileName = 'menu_carte_2026.pdf';
    }

    const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
      upsert: true
    });
    
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
  };

  const saveSingleSiteSetting = async (key: string, value: string, successMessage: string) => {
    setIsSaving(true);
    try {
      await updateSiteSetting(key, value);
      setHasUnsavedChanges(false);
      showNotification(successMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const saveGallery = async () => {
    setIsSaving(true);
    try {
      await supabase.from('gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      const itemsToInsert = media.gallery.map(({ id, ...rest }) => rest);
      await supabase.from('gallery').insert(itemsToInsert);
      setHasUnsavedChanges(false);
      showNotification("La galerie photo a été mise à jour.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveGalleryItem = async (index: number) => {
    setIsSaving(true);
    try {
      // Pour une granularité totale sur la galerie, on sauvegarde tout l'état actuel 
      // car la structure simplifiée de la DB (delete/insert) l'impose
      await saveGallery();
      showNotification(`Image "${media.gallery[index].title || index + 1}" enregistrée.`);
    } finally {
      setIsSaving(false);
    }
  };

  const addEmptyGalleryItem = () => {
    setMedia({
      ...media,
      gallery: [...media.gallery, { url: "/gallery/1.jpg", title: "Nouveau Plat" }]
    });
    setHasUnsavedChanges(true);
  };

  const removeGalleryItem = (index: number) => {
    setMedia({ ...media, gallery: media.gallery.filter((_, i) => i !== index) });
    setHasUnsavedChanges(true);
  };

  const updateSiteSetting = async (key: string, value: string) => {
    await supabase.from('site_settings').upsert({ key, value });
  };

  const handleMediaChange = (field: string, value: any) => {
    setMedia({ ...media, [field]: value });
    setHasUnsavedChanges(true);
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
          <div className="w-12 h-12 relative rounded-xl overflow-hidden border border-border bg-white shadow-sm">
            <img 
              src="/logo-transparent-les-negociants.jpg" 
              alt="Logo Les Négociants" 
              className="w-full h-full object-contain p-1 invert"
            />
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
      <main className="flex-1 p-8 md:p-16 max-w-6xl pb-32">
        <AnimatePresence mode="wait">
          
          {/* MENU A LA CARTE */}
          {activeTab === 'carte' && (
            <motion.section key="carte" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <header className="flex justify-between items-end border-b border-border pb-8">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Menu à la Carte</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs text-primary">Le soir uniquement</p>
                </div>
                <button onClick={saveMenuCarte} disabled={isSaving} className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
                  {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Enregistrer la carte
                </button>
              </header>
              <div className="grid grid-cols-1 gap-12">
                <MenuSection 
                  title="Entrées" 
                  items={starters} 
                  setItems={(items: any) => { setStarters(items); setHasUnsavedChanges(true); }} 
                  onAdd={() => { setStarters([...starters, { category: 'starter', name: "", description: "", price: "" }]); setHasUnsavedChanges(true); }} 
                />
                <MenuSection 
                  title="Plats" 
                  items={mains} 
                  setItems={(items: any) => { setMains(items); setHasUnsavedChanges(true); }} 
                  onAdd={() => { setMains([...mains, { category: 'main', name: "", description: "", price: "" }]); setHasUnsavedChanges(true); }} 
                />
                <MenuSection 
                  title="Desserts" 
                  items={desserts} 
                  setItems={(items: any) => { setDesserts(items); setHasUnsavedChanges(true); }} 
                  onAdd={() => { setDesserts([...desserts, { category: 'dessert', name: "", description: "", price: "" }]); setHasUnsavedChanges(true); }} 
                />
              </div>
            </motion.section>
          )}

          {/* MENU SEMAINE */}
          {activeTab === 'week' && (
            <motion.section key="week" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <header className="flex justify-between items-end border-b border-border pb-8">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Menu de la Semaine</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs text-primary">Le midi uniquement</p>
                </div>
                <button onClick={saveWeekMenu} disabled={isSaving} className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
                  {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Enregistrer le menu
                </button>
              </header>
              <div className="bg-muted p-10 rounded-[40px] border border-border space-y-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-4">Dates du menu (ex: 24 AU 28 MARS 2026)</label>
                  <input 
                    value={weekMenu.date_range} 
                    onChange={(e) => { setWeekMenu({...weekMenu, date_range: e.target.value}); setHasUnsavedChanges(true); }} 
                    className="w-full bg-background border-2 border-border px-8 py-5 rounded-full font-black text-xl outline-none focus:border-primary transition-all" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block border-b border-border pb-2">01 ENTRÉES</span>
                    <div className="p-6 bg-background/50 rounded-3xl border border-border space-y-4">
                      <InputGroup label="Option 1 - Nom" value={weekMenu.starter_name} onChange={(v: string) => { setWeekMenu({...weekMenu, starter_name: v}); setHasUnsavedChanges(true); }} />
                      <InputGroup label="Option 1 - Description" value={weekMenu.starter_desc} onChange={(v: string) => { setWeekMenu({...weekMenu, starter_desc: v}); setHasUnsavedChanges(true); }} />
                    </div>
                    <div className="p-6 bg-background/50 rounded-3xl border border-border space-y-4">
                      <InputGroup label="Option 2 - Nom" value={weekMenu.starter_name_2} onChange={(v: string) => { setWeekMenu({...weekMenu, starter_name_2: v}); setHasUnsavedChanges(true); }} />
                      <InputGroup label="Option 2 - Description" value={weekMenu.starter_desc_2} onChange={(v: string) => { setWeekMenu({...weekMenu, starter_desc_2: v}); setHasUnsavedChanges(true); }} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block border-b border-border pb-2">02 PLATS</span>
                    <div className="p-6 bg-background/50 rounded-3xl border border-border space-y-4">
                      <InputGroup label="Option 1 - Nom" value={weekMenu.main_name} onChange={(v: string) => { setWeekMenu({...weekMenu, main_name: v}); setHasUnsavedChanges(true); }} />
                      <InputGroup label="Option 1 - Description" value={weekMenu.main_desc} onChange={(v: string) => { setWeekMenu({...weekMenu, main_desc: v}); setHasUnsavedChanges(true); }} />
                    </div>
                    <div className="p-6 bg-background/50 rounded-3xl border border-border space-y-4">
                      <InputGroup label="Option 2 - Nom" value={weekMenu.main_name_2} onChange={(v: string) => { setWeekMenu({...weekMenu, main_name_2: v}); setHasUnsavedChanges(true); }} />
                      <InputGroup label="Option 2 - Description" value={weekMenu.main_desc_2} onChange={(v: string) => { setWeekMenu({...weekMenu, main_desc_2: v}); setHasUnsavedChanges(true); }} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block border-b border-border pb-2">03 DESSERTS</span>
                    <div className="p-6 bg-background/50 rounded-3xl border border-border space-y-4">
                      <InputGroup label="Option 1 - Nom" value={weekMenu.dessert_name} onChange={(v: string) => { setWeekMenu({...weekMenu, dessert_name: v}); setHasUnsavedChanges(true); }} />
                      <InputGroup label="Option 1 - Description" value={weekMenu.dessert_desc} onChange={(v: string) => { setWeekMenu({...weekMenu, dessert_desc: v}); setHasUnsavedChanges(true); }} />
                    </div>
                    <div className="p-6 bg-background/50 rounded-3xl border border-border space-y-4">
                      <InputGroup label="Option 2 - Nom" value={weekMenu.dessert_name_2} onChange={(v: string) => { setWeekMenu({...weekMenu, dessert_name_2: v}); setHasUnsavedChanges(true); }} />
                      <InputGroup label="Option 2 - Description" value={weekMenu.dessert_desc_2} onChange={(v: string) => { setWeekMenu({...weekMenu, dessert_desc_2: v}); setHasUnsavedChanges(true); }} />
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-border flex flex-wrap gap-10 justify-center">
                  <PriceCard label="Formule Complète" value={weekMenu.price_full} onChange={(v: string) => { setWeekMenu({...weekMenu, price_full: v}); setHasUnsavedChanges(true); }} />
                  <PriceCard label="Entrée + Plat / Plat + Dessert" value={weekMenu.price_half} onChange={(v: string) => { setWeekMenu({...weekMenu, price_half: v}); setHasUnsavedChanges(true); }} />
                  <PriceCard label="Plat Seul" value={weekMenu.price_single} onChange={(v: string) => { setWeekMenu({...weekMenu, price_single: v}); setHasUnsavedChanges(true); }} />
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'media' && (
            <motion.section key="media" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-16">
              <header className="flex justify-between items-end border-b border-border pb-8">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Médias & Documents</h1>
                  <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs text-primary">Gestion visuelle</p>
                </div>
              </header>

              {/* Section PDFs */}
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">Documents PDF</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FileUploadCard 
                    label="Carte Complète" 
                    fileName={media.menuCartePdf} 
                    onFileSelect={async (e: any) => {
                      const url = await handleFileUpload(e.target.files[0], 'documents');
                      handleMediaChange('menuCartePdf', url);
                    }} 
                    onSave={() => saveSingleSiteSetting('menu_carte_pdf', media.menuCartePdf, "Menu à la carte (PDF) enregistré.")}
                    isUploading={isSaving} 
                    icon={<FileText size={32} />} 
                  />
                  <FileUploadCard 
                    label="Menu de la Semaine" 
                    fileName={media.menuWeekPdf} 
                    onFileSelect={async (e: any) => {
                      const url = await handleFileUpload(e.target.files[0], 'documents');
                      handleMediaChange('menuWeekPdf', url);
                    }} 
                    onSave={() => saveSingleSiteSetting('menu_week_pdf', media.menuWeekPdf, "Menu de la semaine (PDF) enregistré.")}
                    isUploading={isSaving} 
                    icon={<Calendar size={32} />} 
                  />
                  <FileUploadCard 
                    label="Carte des Vins" 
                    fileName={media.wineListPdf} 
                    onFileSelect={async (e: any) => {
                      const url = await handleFileUpload(e.target.files[0], 'documents');
                      handleMediaChange('wineListPdf', url);
                    }} 
                    onSave={() => saveSingleSiteSetting('wine_list_pdf', media.wineListPdf, "Carte des vins (PDF) enregistrée.")}
                    isUploading={isSaving} 
                    icon={<Wine size={32} />} 
                  />
                </div>
              </div>

              {/* Section Histoire */}
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">Image Histoire</h3>
                <div className="bg-muted p-10 rounded-[40px] border border-border flex flex-col md:flex-row items-center gap-12">
                  <div className="w-full md:w-64 aspect-[4/5] rounded-[30px] overflow-hidden border-2 border-primary/20 shadow-2xl relative group">
                    <img src={media.storyImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon className="text-white" size={48} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <p className="text-xs font-bold text-foreground opacity-40 italic">L'image sera affichée dans la section "Notre Histoire".</p>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-4 px-10 py-5 bg-background border-2 border-border text-foreground rounded-full font-black uppercase tracking-widest text-[10px] cursor-pointer hover:border-primary hover:text-primary transition-all shadow-lg">
                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                        Remplacer l'image
                        <input type="file" className="hidden" accept="image/*" onChange={async (e: any) => {
                          const url = await handleFileUpload(e.target.files[0], 'images');
                          handleMediaChange('storyImage', url);
                        }} />
                      </label>
                      <button 
                        onClick={() => saveSingleSiteSetting('story_image', media.storyImage, "L'image de l'histoire a été mise à jour.")}
                        disabled={isSaving}
                        className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/20"
                      >
                        <Save size={16} /> Sauvegarder l'image
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Galerie interactive */}
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">Carrousel de la Galerie</h3>
                <div className="flex gap-8 overflow-x-auto pb-12 pt-4 snap-x scrollbar-hide px-2">
                  {media.gallery.map((img, i) => (
                    <div key={i} className="min-w-[300px] md:min-w-[400px] snap-center flex flex-col gap-6 group">
                      <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl border-2 border-border group-hover:border-border transition-all duration-500">
                        <img src={img.url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                          <input 
                            value={img.title} 
                            onChange={(e) => { updateGalleryItemTitle(i, e.target.value); setHasUnsavedChanges(true); }}
                            className="bg-transparent border-b border-white/20 text-white font-black uppercase tracking-tighter text-xl md:text-2xl focus:border-primary outline-none py-2"
                            placeholder="Titre de l'image"
                          />
                        </div>
                        
                        <div className="absolute top-6 left-6 flex gap-2">
                          <label className="p-3 bg-white text-black rounded-2xl cursor-pointer hover:bg-primary hover:text-white transition-all shadow-xl">
                            <Upload size={18} />
                            <input type="file" className="hidden" accept="image/*" onChange={async (e: any) => {
                              const url = await handleFileUpload(e.target.files[0], 'images');
                              const newGallery = [...media.gallery];
                              newGallery[i].url = url;
                              setMedia({...media, gallery: newGallery});
                              setHasUnsavedChanges(true);
                            }} />
                          </label>
                          <button 
                            onClick={() => saveGalleryItem(i)}
                            className="p-3 bg-primary text-white rounded-2xl hover:scale-110 transition-all shadow-xl"
                            title="Sauvegarder cette carte"
                          >
                            <Save size={18} />
                          </button>
                          <button onClick={() => removeGalleryItem(i)} className="p-3 bg-red-500 text-white rounded-2xl hover:scale-110 transition-all shadow-xl">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 opacity-40">
                        <GripVertical size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Position {i + 1}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Bouton Ajouter (Limité à 6) */}
                  {media.gallery.length < 6 && (
                    <button onClick={addEmptyGalleryItem} className="min-w-[300px] md:min-w-[400px] aspect-[4/5] md:aspect-[16/10] rounded-[40px] border-4 border-dashed border-border flex flex-col items-center justify-center gap-6 text-foreground/20 hover:text-primary hover:border-primary transition-all group">
                      <div className="p-8 bg-muted rounded-full group-hover:scale-110 transition-transform">
                        <Plus size={48} />
                      </div>
                      <span className="font-black uppercase tracking-widest text-xs">Ajouter une assiette</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Notifications Toasts */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[200] min-w-[300px]"
          >
            <div className={`flex items-center gap-4 p-6 rounded-[30px] shadow-2xl border ${
              notification.type === 'success' 
                ? 'bg-primary text-white border-white/20' 
                : 'bg-muted text-foreground border-border'
            }`}>
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <p className="font-black uppercase tracking-widest text-[10px] flex-1">{notification.message}</p>
              <button onClick={() => setNotification(null)} className="opacity-50 hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barre de modifications non enregistrées */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[150] bg-foreground text-background p-6 flex flex-col md:flex-row items-center justify-center gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center text-primary animate-pulse">
                <Settings size={16} />
              </div>
              <p className="font-black uppercase tracking-[0.2em] text-[10px]">
                Vous avez des modifications non enregistrées
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  if (activeTab === 'carte') saveMenuCarte();
                  else if (activeTab === 'week') saveWeekMenu();
                  else if (activeTab === 'media') {
                    saveGallery();
                    saveSingleSiteSetting('story_image', media.storyImage, "Image Histoire enregistrée");
                    saveSingleSiteSetting('menu_carte_pdf', media.menuCartePdf, "Menu Carte enregistré");
                    saveSingleSiteSetting('menu_week_pdf', media.menuWeekPdf, "Menu Semaine enregistré");
                    saveSingleSiteSetting('wine_list_pdf', media.wineListPdf, "Carte des vins enregistrée");
                  }
                }}
                disabled={isSaving}
                className="bg-primary text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                Enregistrer maintenant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <div className="flex justify-between items-center px-2 border-b border-border pb-4">
        <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary">{title}</h3>
        <button onClick={onAdd} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"><Plus size={24} /></button>
      </div>
      <div className="space-y-4">
        {items.map((item: any, i: number) => (
          <div key={i} className="bg-muted p-6 rounded-2xl border border-border flex gap-4 group hover:border-primary/30 transition-all">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4"><input placeholder="Nom" value={item.name} onChange={(e) => updateItem(i, 'name', e.target.value)} className="w-full bg-background border-2 border-border px-4 py-2 rounded-lg font-bold text-sm outline-none focus:border-primary" /></div>
              <div className="md:col-span-6"><input placeholder="Description" value={item.description} onChange={(e) => updateItem(i, 'description', e.target.value)} className="w-full bg-background border-2 border-border px-4 py-2 rounded-lg text-sm outline-none focus:border-primary" /></div>
              <div className="md:col-span-2 relative"><input placeholder="Prix" value={item.price} onChange={(e) => updateItem(i, 'price', e.target.value)} className="w-full bg-background border-2 border-border pl-4 pr-8 py-2 rounded-lg font-bold text-sm text-right outline-none focus:border-primary" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground/30">€</span></div>
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
    <div className="space-y-2 flex-1">
      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-4">{label}</label>
      <div className="relative">
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-background border-2 border-border px-6 py-4 rounded-full outline-none focus:border-primary transition-colors font-bold" />
        {suffix && <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-foreground/20">{suffix}</span>}
      </div>
    </div>
  );
}

function PriceCard({ label, value, onChange }: any) {
  return (
    <div className="bg-background p-8 rounded-[30px] border-2 border-border flex flex-col items-center gap-4 flex-1 max-w-[250px]">
      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 text-center">{label}</span>
      <div className="relative w-full max-w-[120px]">
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-muted border-2 border-border text-3xl font-black text-center py-4 rounded-2xl outline-none focus:border-primary transition-colors" />
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-xl font-black text-foreground/20">€</span>
      </div>
    </div>
  );
}

function FileUploadCard({ label, fileName, onFileSelect, onSave, isUploading, icon }: any) {
  return (
    <div className="bg-muted p-10 rounded-[40px] border border-border flex flex-col items-center gap-8 group hover:border-primary/30 transition-all relative">
      <div className="w-20 h-20 bg-primary/10 rounded-[25px] flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 block mb-2">{label}</span>
        <span className="text-xs font-bold text-foreground truncate max-w-[200px] block opacity-60 italic">{fileName || "Aucun fichier"}</span>
      </div>
      <div className="w-full flex flex-col gap-3">
        <label className="w-full bg-background border-2 border-border py-5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-all cursor-pointer shadow-lg hover:shadow-primary/5">
          {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
          {fileName ? "Remplacer le PDF" : "Envoyer le PDF"}
          <input type="file" className="hidden" accept=".pdf" onChange={onFileSelect} disabled={isUploading} />
        </label>
        
        {fileName && (
          <button 
            onClick={onSave}
            disabled={isUploading}
            className="w-full bg-primary text-white py-5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Enregistrer ce PDF
          </button>
        )}
      </div>
    </div>
  );
}
