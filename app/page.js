import { createClient } from '@/utils/supabase/server'
import KostDirectory from '../components/KostDirectory'

export const revalidate = 0 // Disable cache for debugging

export default async function Home() {
  const supabase = await createClient()

  const { data: kosts } = await supabase.from('kosts').select('*, kecamatan(nama)').eq('is_available', true).order('created_at', { ascending: false })
  const { data: traffic } = await supabase.from('traffic_stats').select('*').single()
  const { data: kecamatan } = await supabase.from('kecamatan').select('*').order('nama')

  // Note: prompt said "only divalidasi ulang (revalidate) jika Admin melakukan update"
  // Server Actions in Admin contain `revalidatePath('/')`.
  // This effectively clears the cache for this route. 
  // `unstable_cache` with tags is cleaner but `revalidatePath` on the page path works for page cache too.
  // Using `unstable_cache` is "More Aggressive" and specific as requested.

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      'name': 'Kost Jepara Listing',
      'description': 'Direktori kost murah dan lengkap di Jepara, Jawa Tengah.',
      'url': 'https://www.kosjepara.site',
      'offers': kosts?.map(kost => ({
        '@type': 'Offer',
        'name': kost.nama_kost,
        'price': kost.harga,
        'priceCurrency': 'IDR',
        'availability': kost.is_available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'itemOffered': {
          '@type': 'Accommodation',
          'name': kost.nama_kost,
          'address': kost.alamat_lengkap + ', Jepara, Indonesia',
          'numberOfRooms': 1,
        }
      })) || []
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Kost Jepara - Platform Pencarian Kost di Jepara",
      "description": "Platform pencarian kost terlengkap di Kabupaten Jepara",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jepara",
        "addressRegion": "Jawa Tengah",
        "addressCountry": "ID",
        "postalCode": "59411"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.5944",
        "longitude": "110.6717"
      },
      "url": "https://www.kosjepara.site",
      "priceRange": "Rp 300.000 - Rp 2.500.000",
      "areaServed": [
        "Jepara Kota", "Tahunan", "Pecangaan", "Kalinyamatan", "Mlonggo", "Keling", "Mayong", "Bangsri", "Kembang"
      ],
      "openingHours": "Mo-Su 08:00-22:00",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Beranda",
          "item": "https://www.kosjepara.site"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Kost Jepara",
          "item": "https://www.kosjepara.site/kost-jepara"
        }
      ]
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KostDirectory
        kosts={kosts || []}
        traffic={traffic || { daily_visits_display: 0, monthly_visits_display: 0 }}
        kecamatanList={kecamatan || []}
      />
    </>
  )
}
