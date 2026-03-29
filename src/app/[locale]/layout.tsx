import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { ReservationProvider } from '@/context/ReservationContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StructuredData from '@/components/StructuredData';
import { siteConfig } from '@/config/site';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    fr: "Les Négociants | Restaurant Bistronomique Bordeaux Centre - Grosse Cloche",
    en: "Les Négociants | Bistronomic Restaurant Bordeaux City Center",
    es: "Les Négociants | Restaurante Bistronómico en el centro de Burdeos",
  };

  const descriptions: Record<string, string> = {
    fr: "Découvrez Les Négociants, restaurant bistronomique au cœur de Bordeaux face à la Grosse Cloche. Cuisine de saison, produits frais et vins d'exception.",
    en: "Discover Les Négociants, a bistronomic restaurant in the heart of Bordeaux facing the Grosse Cloche. Seasonal cuisine, fresh products and exceptional wines.",
  };

  const title = titles[locale] || titles.fr;
  const description = descriptions[locale] || descriptions.fr;
return {
  metadataBase: new URL(siteConfig.urls.base),
  title,
  description,
  keywords: ["restaurant bordeaux", "bistronomie bordeaux", "grosse cloche bordeaux", "manger bordeaux centre", "vins bordeaux"],
  authors: [{ name: "Les Négociants" }],
  openGraph: {
    title,
    description,
    url: siteConfig.urls.base,
    siteName: 'Les Négociants Bordeaux',
    images: [
      {
        url: '/gallery/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Restaurant Les Négociants Bordeaux',
      },
    ],
    locale: locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/gallery/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
};
}

export default async function LocaleLayout({
children,
params
}: {
children: React.ReactNode;
params: Promise<{locale: string}>;
}) {
const {locale} = await params;
if (!routing.locales.includes(locale as any)) {
  notFound();
}

const messages = await getMessages();

return (
  <html lang={locale} suppressHydrationWarning>
    <head>
      <link rel="canonical" href={`${siteConfig.urls.base}/${locale}`} />
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme={false}>
          <ReservationProvider>              {/* Background Glows */}
              <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20 md:opacity-100">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]"></div>
              </div>
              {children}
              <StructuredData />
            </ReservationProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
