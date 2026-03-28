export const siteConfig = {
  name: "LES NÉGOCIANTS",
  location: "Bordeaux • France",
  address: "3 rue de Guienne, 33000 Bordeaux",
  email: "restaurant@lesnegociants.fr",
  instagramHandle: "@lesnegociants_bdx",
  
  urls: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    theFork: process.env.NEXT_PUBLIC_THEFORK_URL || "",
    googleMapsEmbed: process.env.NEXT_PUBLIC_MAPS_EMBED_URL || "",
  },
  
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    receiverEmail: process.env.NEXT_PUBLIC_CONTACT_RECEIVER_EMAIL || "restaurant@lesnegociants.fr",
  },
  
  assets: {
    logo: process.env.NEXT_PUBLIC_LOGO_PATH || "/logo-transparent-les-negociants.jpg",
    heroBg: process.env.NEXT_PUBLIC_HERO_IMAGE || "https://lesnegociants.fr/wp-content/uploads/2024/07/IMG_1458-1-e1748335626467-1024x1014.jpeg",
    storyImage: "/fallback-story.jpg",
    menuCartePdf: "/menu-carte.pdf",
    menuWeekPdf: "/menu-semaine.pdf",
    gallery: [
      { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1860.jpg", title: "Asperges des Landes" },
      { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1777.jpg", title: "Oeuf Parfait" },
      { url: "https://lesnegociants.fr/wp-content/uploads/2025/11/DSC1952.jpg", title: "Noix de veau rôtie" },
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
