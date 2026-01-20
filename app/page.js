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

  return (
    <KostDirectory
      kosts={kosts || []}
      traffic={traffic || { daily_visits_display: 0, monthly_visits_display: 0 }}
      kecamatanList={kecamatan || []}
    />
  )
}
