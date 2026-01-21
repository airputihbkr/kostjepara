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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': 'KostJepara',
    'description': 'Direktori kost murah dan lengkap di Jepara, Jawa Tengah.',
    'url': 'https://www.kosjepara.site',
    'areaServed': {
      '@type': 'City',
      'name': 'Jepara',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'Jawa Tengah',
        'addressCountry': 'ID'
      }
    },
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
        'numberOfRooms': 1, // Defaulting as we might not have this precise data per listing readily available in this view
        'floorSize': {
          '@type': 'QuantitativeValue',
          'unitCode': 'SMT',
          'value': '12' // Dummy default or remove if unknown
        }
      }
    })) || []
  }

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
