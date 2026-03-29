export const siteConfig = {
  name: "LES NÉGOCIANTS",
  location: "Bordeaux • France",
  address: "3 rue de Guienne, 33000 Bordeaux",
  email: "restaurant@lesnegociants.fr",
  instagramHandle: "@lesnegociants_bdx",
  
  urls: {
    base: process.env.NEXT_PUBLIC_BASE_URL || "https://les-negociants-bordeaux.vercel.app",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/lesnegociants_bdx",
    theFork: process.env.NEXT_PUBLIC_THEFORK_URL || "https://widget.thefork.com/096aa36a-702a-4adb-af6b-2ca004cf5a52",
    googleMapsEmbed: process.env.NEXT_PUBLIC_MAPS_EMBED_URL || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.312585356814!2d-0.5742220233732016!3d44.83556717516151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527cf37ae29eb%3A0x44b08d72577ffa0f!2sLes%20N%C3%A9gociants%20-%20Restaurant!5e0!3m2!1sfr!2sfr!4v1746724362635!5m2!1sfr!2sfr",
  },
  
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    receiverEmail: process.env.NEXT_PUBLIC_CONTACT_RECEIVER_EMAIL || "restaurant@lesnegociants.fr",
  },
  
  assets: {
    logo: process.env.NEXT_PUBLIC_LOGO_PATH || "/logo-transparent-les-negociants.jpg",
    heroBg: process.env.NEXT_PUBLIC_HERO_IMAGE || "/gallery/hero-bg.jpg",
    storyImage: "/gallery/fallback-story.jpg",
    menuCartePdf: "/menu-carte.pdf",
    menuWeekPdf: "/menu-semaine.pdf",
    gallery: [
      { url: "/gallery/1.jpg", title: "Asperges des Landes" },
      { url: "/gallery/2.jpg", title: "Oeuf Parfait" },
      { url: "/gallery/3.jpg", title: "Noix de veau rôtie" },
      { url: "/gallery/4.jpg", title: "Assiette de fromages" },
      { url: "/gallery/5.jpg", title: "Espadon snacké" },
      { url: "/gallery/6.jpg", title: "Notre Salon Privatisable" },
    ]
  },

  languages: [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ] as const,
};

export type Locale = (typeof siteConfig.languages)[number]['code'];
