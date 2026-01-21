import { createClient } from '@/utils/supabase/server'

export default async function sitemap() {
    const supabase = await createClient()
    const baseUrl = 'https://www.kosjepara.site'

    // Get all articles
    const { data: articles } = await supabase
        .from('articles')
        .select('slug, updated_at')

    const blogPosts = articles?.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly',
        priority: 0.8,
    })) || []

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...blogPosts,
    ]
}
