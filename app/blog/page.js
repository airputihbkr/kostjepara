import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ArrowLeft, Calendar } from 'lucide-react'

export const revalidate = 3600

export const metadata = {
    title: 'Blog & Berita - KostJepara',
    description: 'Tips, panduan, dan informasi seputar kos-kosan di Jepara.',
}

export default async function BlogPage() {
    const supabase = await createClient()
    const { data: articles } = await supabase.from('articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navbar */}
            <nav className="border-b border-gray-100 h-20 flex items-center shadow-sm sticky top-0 bg-white z-50">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <Link href="/">
                        <Logo className="w-9 h-9" />
                    </Link>
                    <div className="flex gap-4">
                        <Link href="/">
                            <Button variant="ghost">Kembali ke Beranda</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-slate-900">
                        Blog & Artikel
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tips mencari kos, panduan hidup anak kos, dan informasi seputar Jepara.
                    </p>
                </div>

                {(!articles || articles.length === 0) ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed">
                        <p className="text-muted-foreground">Belum ada artikel yang dipublish saat ini.</p>
                        <Link href="/">
                            <Button variant="link" className="mt-2">Cari Kos Saja</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link href={`/blog/${article.slug}`} key={article.id} className="group">
                                <article className="flex flex-col h-full border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {article.cover_image ? (
                                        <div className="h-48 overflow-hidden bg-gray-100">
                                            <img
                                                src={article.cover_image}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                            <span className="text-blue-200">No Image</span>
                                        </div>
                                    )}
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                            {article.excerpt}
                                        </p>
                                        <span className="text-blue-600 font-medium text-sm inline-flex items-center group-hover:underline">
                                            Baca Selengkapnya &rarr;
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <footer className="border-t border-gray-200 bg-gray-50 py-8 mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} KostJepara, Inc.</p>
                </div>
            </footer>
        </div>
    )
}
