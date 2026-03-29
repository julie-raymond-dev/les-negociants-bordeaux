import Script from 'next/script';
import { siteConfig } from '@/config/site';

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": siteConfig.name,
    "image": `${siteConfig.urls.base}/gallery/hero-bg.jpg`,
    "description": "Restaurant bistronomique au coeur du quartier historique bordelais face à la Grosse Cloche.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.split(',')[0],
      "addressLocality": "Bordeaux",
      "postalCode": "33000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.8355,
      "longitude": -0.5742
    },
    "url": siteConfig.urls.base,
    "telephone": "+33556000000",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Thursday", "Friday", "Saturday"],
        "opens": "12:00",
        "closes": "13:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "19:30",
        "closes": "21:30"
      }
    ],
    "servesCuisine": "French, Bistronomic",
    "priceRange": "$$$"
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}
