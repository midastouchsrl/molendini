import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://molendinialborgo.it'),
  title: {
    default: "Molendini al Borgo | Ristorante & Pizzeria nel Centro Storico di Cerveteri",
    template: "%s | Molendini al Borgo"
  },
  description: "Cucina d'autore nel centro storico di Cerveteri. Dove la tradizione incontra la creativit\u00e0: pizza, primi della tradizione romana e piatti di pesce. Prenota il tuo tavolo.",
  keywords: [
    "ristorante cerveteri",
    "pizzeria cerveteri",
    "cucina italiana cerveteri",
    "ristorante centro storico cerveteri",
    "pizza cerveteri",
    "carbonara cerveteri",
    "ristorante pesce cerveteri",
    "ristorante romantico cerveteri",
    "pranzo domenica cerveteri",
    "cena cerveteri",
    "molendini al borgo",
  ],
  authors: [{ name: "Molendini al Borgo" }],
  creator: "Molendini al Borgo",
  publisher: "Molendini al Borgo",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Molendini al Borgo | Dove la Tradizione Diventa Arte",
    description: "Cucina d'autore nel centro storico di Cerveteri. Pizza & cucina italiana di qualit\u00e0.",
    type: "website",
    locale: "it_IT",
    url: "https://molendinialborgo.it",
    siteName: "Molendini al Borgo",
    images: [{
      url: "/images/hero-new.jpg",
      width: 1080,
      height: 720,
      alt: "Molendini al Borgo - Piatto gourmet con calice di vino"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Molendini al Borgo | Ristorante & Pizzeria a Cerveteri",
    description: "Cucina d'autore nel centro storico di Cerveteri",
    images: ["/images/hero-new.jpg"]
  },
  alternates: { canonical: "https://molendinialborgo.it" },
  category: "restaurant",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

// JSON-LD Structured Data for Restaurant
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Molendini al Borgo",
  "image": "https://molendinialborgo.it/images/hero-new.jpg",
  "url": "https://molendinialborgo.it",
  "telephone": "+390639729048",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Antonio Ricci, 9",
    "addressLocality": "Cerveteri",
    "addressRegion": "RM",
    "postalCode": "00052",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.0008,
    "longitude": 12.0967
  },
  "servesCuisine": ["Italiana", "Pizza", "Pesce"],
  "priceRange": "\u20ac\u20ac",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "19:30",
      "closes": "22:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "12:30",
      "closes": "15:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "19:30",
      "closes": "23:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "150"
  },
  "sameAs": [
    "https://www.facebook.com/molendinialborgo2",
    "https://www.instagram.com/molendinialborgo"
  ],
  "acceptsReservations": "True",
  "menu": "https://www.thefork.it/ristorante/molendini-al-borgo-r672985"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#F8F4EF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
