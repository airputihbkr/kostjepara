'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// --- KOST ACTIONS --- //

export async function addKost(formData) {
    const supabase = await createClient()

    const data = {
        nama_kost: formData.get('nama_kost'),
        harga: Number(formData.get('harga')),
        fasilitas: formData.get('fasilitas'),
        alamat_lengkap: formData.get('alamat_lengkap'),
        kecamatan_id: formData.get('kecamatan_id'),
        google_drive_link: formData.get('google_drive_link'),
        google_drive_link_2: formData.get('google_drive_link_2'),
        google_drive_link_3: formData.get('google_drive_link_3'),
        maps_link: formData.get('maps_link'),
        is_available: formData.get('is_available') === 'true', // Handle boolean from Select or Checkbox (if string "true")
        whatsapp: formData.get('whatsapp') // Add WhatsApp
    }

    // Refined boolean handling if checkbox
    if (formData.get('is_available') === 'on') data.is_available = true;
    // If user passes 'true' string manually.

    const { error } = await supabase.from('kosts').insert(data)

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
}

export async function updateKost(id, formData) {
    const supabase = await createClient()

    const data = {
        nama_kost: formData.get('nama_kost'),
        harga: Number(formData.get('harga')),
        fasilitas: formData.get('fasilitas'),
        alamat_lengkap: formData.get('alamat_lengkap'),
        kecamatan_id: formData.get('kecamatan_id'),
        google_drive_link: formData.get('google_drive_link'),
        google_drive_link_2: formData.get('google_drive_link_2'),
        google_drive_link_3: formData.get('google_drive_link_3'),
        maps_link: formData.get('maps_link'),
        is_available: formData.get('is_available') === 'true',
        whatsapp: formData.get('whatsapp')
    }

    const { error } = await supabase.from('kosts').update(data).eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
}

export async function deleteKost(id) {
    const supabase = await createClient()
    const { error } = await supabase.from('kosts').delete().eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
}

export async function updateTraffic(formData) {
    const supabase = await createClient()

    const data = {
        daily_visits_display: Number(formData.get('daily_visits_display')),
        monthly_visits_display: Number(formData.get('monthly_visits_display'))
    }

    // Assumes row ID 1 exists
    const { error } = await supabase.from('traffic_stats').update(data).eq('id', 1)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
}

// --- ARTICLE / BLOG ACTIONS --- //

function generateSlug(title) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars
        .replace(/\s+/g, '-')     // Space to dash
        .replace(/--+/g, '-')     // Collapse dashes
        .trim();
}

export async function addArticle(formData) {
    const supabase = await createClient()
    const title = formData.get('title')
    const manualSlug = formData.get('slug')

    // Auto generate slug if empty, else clean manual slug
    const slug = manualSlug ? generateSlug(manualSlug) : generateSlug(title)

    const data = {
        title: title,
        slug: slug,
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        cover_image: formData.get('cover_image'),
        is_published: formData.get('is_published') === 'true'
    }

    const { error } = await supabase.from('articles').insert(data)

    if (error) {
        console.error("Add Article Error:", error)
        return { error: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/blog')
    return { success: true }
}

export async function updateArticle(id, formData) {
    const supabase = await createClient()

    const data = {
        title: formData.get('title'),
        slug: formData.get('slug'), // Usually shouldn't change slug often, but allowed
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        cover_image: formData.get('cover_image'),
        is_published: formData.get('is_published') === 'true'
    }

    // Remove undefined/null if user didn't fill (optional safety but better to just update what's sent)

    const { error } = await supabase.from('articles').update(data).eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath('/blog')
    revalidatePath(`/blog/${data.slug}`)
    return { success: true }
}

export async function deleteArticle(id) {
    const supabase = await createClient()
    const { error } = await supabase.from('articles').delete().eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin')
    revalidatePath('/blog')
    return { success: true }
}
