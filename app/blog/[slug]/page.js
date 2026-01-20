import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'

// Revalidate every hour
export const revalidate = 3600

export async function generateMetadata({ params }) {
    const supabase = await createClient()
    const { slug } = await params
    const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).single()

    if (!article) return { title: 'Artikel Tidak Ditemukan' }

    return {
        title: `${article.title} - KostJepara`,
        description: article.excerpt || `Baca artikel ${article.title} di KostJepara.`,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: article.cover_image ? [{ url: article.cover_image }] : [],
            type: 'article',
        }
    }
}

export default async function ArticlePage({ params }) {
    const supabase = await createClient()
    const { slug } = await params
    const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).single()

    if (!article || !article.is_published) {
        notFound()
    }

    // JSON-LD for Article SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.cover_image ? [article.cover_image] : [],
        datePublished: article.created_at,
        dateModified: article.updated_at || article.created_at,
        author: {
            '@type': 'Organization',
            name: 'KostJepara'
        }
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Navbar */}
            <nav className="border-b border-gray-100 h-20 flex items-center shadow-sm sticky top-0 bg-white z-50">
                <div className="max-w-4xl mx-auto px-6 w-full flex justify-between items-center">
                    <Link href="/blog">
                        <div className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Kembali ke Blog</span>
                        </div>
                    </Link>
                    <Link href="/">
                        <Logo className="w-8 h-8" textClassName="hidden" />
                    </Link>
                </div>
            </nav>

            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={article.created_at}>
                            {new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                        </time>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
                        {article.title}
                    </h1>
                    {article.excerpt && (
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}
                </header>

                {/* Cover Image */}
                {article.cover_image && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg bg-gray-100">
                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg prose-blue mx-auto max-w-3xl whitespace-pre-wrap">
                    {/* 
                        If using Markdown, use a library. 
                        For now, assuming plain text/simple HTML or just safe text rendering.
                        We display it as pre-wrap text for paragraphs, or you could use dangerouslySetInnerHTML if you trust the admin.
                    */}
                    {article.content}
                </div>
            </article>

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <footer className="border-t border-gray-200 bg-gray-50 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-lg font-semibold mb-4 text-slate-900">Temukan Kos Idamanmu di Jepara</h3>
                    <div className="flex justify-center gap-4">
                        <Link href="/">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Cari Kos Sekarang</Button>
                        </Link>
                    </div>
                    <p className="mt-8 text-sm text-slate-500">© {new Date().getFullYear()} KostJepara, Inc.</p>
                </div>
            </footer>
        </div>
    )
}
