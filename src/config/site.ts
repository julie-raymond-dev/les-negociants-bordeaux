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
  
  assets: {
    logo: process.env.NEXT_PUBLIC_LOGO_PATH || "/logo-transparent-les-negociants.jpg",
    heroBg: process.env.NEXT_PUBLIC_HERO_IMAGE || "",
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
