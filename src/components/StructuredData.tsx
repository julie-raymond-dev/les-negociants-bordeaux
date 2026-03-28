export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Les Négociants",
    "image": "https://les-negociants-bordeaux.vercel.app/gallery/hero-bg.jpg",
    "description": "Restaurant bistronomique au coeur du quartier historique bordelais face à la Grosse Cloche.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 rue de Guienne",
      "addressLocality": "Bordeaux",
      "postalCode": "33000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.8355,
      "longitude": -0.5742
    },
    "url": "https://les-negociants-bordeaux.vercel.app",
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
