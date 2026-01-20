import { createClient } from '@/utils/supabase/server'
import AdminDashboard from '@/components/AdminDashboard'
import { redirect } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: kosts } = await supabase.from('kosts').select('*, kecamatan(nama)').order('created_at', { ascending: false })
    const { data: traffic } = await supabase.from('traffic_stats').select('*').single()
    const { data: articles } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    const { data: kecamatan } = await supabase.from('kecamatan').select('*').order('nama')

    return (
        <div className="min-h-screen bg-gray-50/50">
            <header className="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">A</div>
                    <h1 className="text-xl font-bold tracking-tight">Admin<span className="opacity-50">Panel</span></h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">{user.email}</span>
                    <form action={logout}>
                        <Button variant="destructive" size="sm">Logout</Button>
                    </form>
                </div>
            </header>
            <main className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <AdminDashboard
                    initialKosts={kosts || []}
                    initialTraffic={traffic || { daily_visits_display: 0, monthly_visits_display: 0 }}
                    kecamatanList={kecamatan || []}
                    initialArticles={articles || []}
                />
            </main>
        </div>
    )
}
