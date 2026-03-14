import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Molendini al Borgo | Ristorante & Pizzeria a Cerveteri",
  description: "Nel cuore del Centro Storico di Cerveteri, dove la tradizione incontra la novità. Pizza & Cucina italiana di qualità. Prenota il tuo tavolo.",
  keywords: "ristorante cerveteri, pizzeria cerveteri, cucina italiana, pizza tradizionale, ristorante centro storico cerveteri",
  openGraph: {
    title: "Molendini al Borgo | Ristorante & Pizzeria",
    description: "Gli antichi che abitavano la nostra terra erano maestri del gusto. Pizza & Cucina nel cuore di Cerveteri.",
    type: "website",
    locale: "it_IT",
  },
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
