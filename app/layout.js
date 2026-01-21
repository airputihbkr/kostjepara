import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "KostJepara - Info Kost Murah & Lengkap di Jepara",
    template: "%s | KostJepara"
  },
  description: "Cari kost murah di Jepara? Temukan info kost putri, putra, pasutri, dan campur di area Jepara, Tahunan, Pecangaan, dan sekitarnya. Fasilitas lengkap, harga terjangkau, update harian.",
  keywords: ["kost jepara", "info kost jepara", "kost murah jepara", "kost putri jepara", "kost putra jepara", "kost pasutri jepara", "kontrakan jepara", "sewa kamar jepara", "kost tahunan jepara", "kost jepara kota"],
  authors: [{ name: "KostJepara Team" }],
  creator: "KostJepara",
  publisher: "KostJepara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.kosjepara.site'), // Ganti dengan domain asli nanti
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "KostJepara - Info Kost Murah & Lengkap",
    description: "Pusat informasi kost-kostan di Jepara. Cari kost sesuai budget dan lokasi yang kamu inginkan.",
    url: 'https://www.kosjepara.site',
    siteName: 'KostJepara',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Pastikan membuat image og-image.jpg nanti atau ganti url
        width: 1200,
        height: 630,
        alt: 'KostJepara Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KostJepara - Info Kost Murah di Jepara',
    description: 'Cari kost di Jepara jadi lebih mudah. Ribuan pilihan kost untuk mahasiswa dan karyawan.',
    images: ['/og-image.jpg'],
  },
  other: {
    "geo.region": "ID-JT", // Jawa Tengah
    "geo.placename": "Jepara",
    "geo.position": "-6.5888;110.6684", // Koordinat Jepara
    "ICBM": "-6.5888, 110.6684",
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
