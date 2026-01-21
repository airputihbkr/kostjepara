import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: '#1a56db',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata = {
  title: {
    default: "Kost Jepara - Info Kost Murah, Putri, Putra & Pasutri Terupdate",
    template: "%s | Kost Jepara"
  },
  description: "Temukan kost murah di Jepara dengan fasilitas lengkap. Info kost putri, putra, pasutri, dan campur di Jepara, Tahunan, Pecangaan, Kalinyamatan, Mlonggo, dan seluruh kecamatan. Harga terjangkau, update harian 2026.",
  keywords: [
    "kost jepara",
    "kos jepara",
    "info kost jepara",
    "kost murah jepara",
    "kost putri jepara",
    "kost putra jepara",
    "kost pasutri jepara",
    "kost campur jepara",
    "kontrakan jepara",
    "sewa kamar jepara",
    "kost tahunan jepara",
    "kost jepara kota",
    "kost area kudus",
    "kost dekat bandara jepara",
    "kost dekat pantai kartini",
    "kost dekat unisnu",
    "kost dekat rsu mayong",
    "kost harian jepara",
    "kost bulanan jepara",
    "cari kost jepara",
    "info kost jepara terbaru",
    "alamat kost jepara"
  ],
  authors: [{
    name: "KostJepara Team",
    url: "https://www.kosjepara.site" // Changed domain
  }],
  creator: "KostJepara",
  publisher: "KostJepara",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://www.kosjepara.site'),
  alternates: {
    canonical: '/',
    languages: {
      id: "https://www.kosjepara.site",
    }
  },
  openGraph: {
    title: "Kost Jepara - Temukan Kost Ideal di Jepara",
    description: "Pencarian kost terlengkap di Jepara. Kost putri, putra, pasutri dengan fasilitas lengkap dan harga terjangkau.",
    url: 'https://www.kosjepara.site',
    siteName: 'Kost Jepara',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kost Jepara - Platform Pencarian Kost Terbaik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kost Jepara - Info Kost Murah di Jepara',
    description: 'Temukan kost murah di Jepara dengan fasilitas lengkap. Update harian 2025.',
    images: ['/og-image.jpg'],
    creator: "@kostjepara"
  },
  other: {
    "geo.region": "ID-JT",
    "geo.placename": "Jepara, Jawa Tengah",
    "geo.position": "-6.5944;110.6717",
    "ICBM": "-6.5944, 110.6717",

    // Business Metadata
    "business:contact_data:locality": "Jepara",
    "business:contact_data:region": "Jawa Tengah",
    "business:contact_data:postal_code": "59411",
    "business:contact_data:country_name": "Indonesia"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'SU3Wt0cwcbka82oSauPptYHakQa2veDY3Y8p4-9CKhQ',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}
