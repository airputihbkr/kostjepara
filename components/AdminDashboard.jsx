'use client'
import { useState } from 'react'
import { addKost, updateKost, deleteKost, updateTraffic, addArticle, updateArticle, deleteArticle } from '@/app/admin/actions'
import AdminKostTable from '@/components/AdminKostTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Plus, Users, BarChart3, Home, Activity, FileText, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Simple Label helper
const Label = ({ children, htmlFor, ...props }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>{children}</label>
)

export default function AdminDashboard({ initialKosts, initialTraffic, kecamatanList, initialArticles = [] }) {
    const [activeTab, setActiveTab] = useState('kosts') // 'kosts' or 'articles'

    // Kost State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isTrafficDialogOpen, setIsTrafficDialogOpen] = useState(false)
    const [editingKost, setEditingKost] = useState(null)

    // Article State
    const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false)
    const [editingArticle, setEditingArticle] = useState(null)

    // Handlers
    function handleEditKost(kost) {
        setEditingKost(kost)
        setIsDialogOpen(true)
    }
    function handleAddKost() {
        setEditingKost(null)
        setIsDialogOpen(true)
    }
    async function onDeleteKost(id) {
        if (confirm('Are you sure you want to delete this kost?')) await deleteKost(id)
    }

    function handleEditArticle(article) {
        setEditingArticle(article)
        setIsArticleDialogOpen(true)
    }
    function handleAddArticle() {
        setEditingArticle(null)
        setIsArticleDialogOpen(true)
    }
    async function onDeleteArticle(id) {
        if (confirm('Delete this article?')) await deleteArticle(id)
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Admin</h2>
                    <p className="text-muted-foreground mt-1">Kelola listing kos, artikel SEO, dan pantau performa.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2" onClick={() => setIsTrafficDialogOpen(true)}>
                        <Activity className="w-4 h-4 text-emerald-600" />
                        Atur Traffic
                    </Button>
                    {activeTab === 'kosts' ? (
                        <Button onClick={handleAddKost} className="gap-2 bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4" /> Tambah Kos
                        </Button>
                    ) : (
                        <Button onClick={handleAddArticle} className="gap-2 bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4" /> Tulis Artikel
                        </Button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('kosts')}
                        className={`${activeTab === 'kosts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                        <Home className="w-4 h-4" />
                        Listing Kos
                        <Badge variant="secondary" className="ml-2">{initialKosts.length}</Badge>
                    </button>
                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`${activeTab === 'articles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                        <FileText className="w-4 h-4" />
                        Artikel / Blog SEO
                        <Badge variant="secondary" className="ml-2">{initialArticles.length}</Badge>
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            {activeTab === 'kosts' ? (
                <>
                    {/* Stats Cards Section (Only for Kosts View) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Kunjungan Hari Ini</CardTitle>
                                <Users className="h-4 w-4 text-emerald-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{initialTraffic.daily_visits_display}</div>
                                <p className="text-xs text-muted-foreground mt-1 text-emerald-600 flex items-center">+12% <span className="text-gray-500 ml-1">dari kemarin</span></p>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Kunjungan Bulan Ini</CardTitle>
                                <BarChart3 className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{initialTraffic.monthly_visits_display}</div>
                                <p className="text-xs text-muted-foreground mt-1 text-blue-600 flex items-center">+4.5% <span className="text-gray-500 ml-1">dari bulan lalu</span></p>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Unit Tersedia</CardTitle>
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-emerald-600">{initialKosts.filter(k => k.is_available).length}</div>
                                <p className="text-xs text-muted-foreground mt-1">Siap Huni</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2">
                        <AdminKostTable kosts={initialKosts} onEdit={handleEditKost} onDelete={onDeleteKost} />
                    </div>
                </>
            ) : (
                /* ARTICLES TABLE */
                <div className="space-y-4">
                    {initialArticles.length === 0 ? (
                        <div className="text-center py-10 border rounded-lg bg-gray-50">
                            <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                            <h3 className="text-lg font-medium text-gray-900">Belum ada artikel</h3>
                            <p className="text-gray-500 mb-4">Mulai tulis artikel untuk meningkatkan SEO website.</p>
                            <Button onClick={handleAddArticle}>Buat Artikel Pertama</Button>
                        </div>
                    ) : (
                        <div className="rounded-md border bg-white">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Judul</th>
                                        <th className="px-4 py-3">Slug (URL)</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {initialArticles.map(article => (
                                        <tr key={article.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{article.title}</td>
                                            <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">{article.slug}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant={article.is_published ? "default" : "secondary"}>
                                                    {article.is_published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-800" onClick={() => handleEditArticle(article)}><Pencil className="w-4 h-4" /></Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-800" onClick={() => onDeleteArticle(article.id)}><Trash2 className="w-4 h-4" /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* --- KOST DIALOG --- */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingKost ? 'Edit Kost' : 'Add New Kost'}</DialogTitle>
                        <DialogDescription>Isi detail kos dengan lengkap.</DialogDescription>
                    </DialogHeader>
                    <form action={async (formData) => {
                        const res = editingKost ? await updateKost(editingKost.id, formData) : await addKost(formData);
                        if (!res?.error) setIsDialogOpen(false);
                    }} className="space-y-4" key={editingKost ? editingKost.id : 'new-kost'}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nama Kost</Label>
                                <Input name="nama_kost" defaultValue={editingKost?.nama_kost} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Harga (Rp)</Label>
                                <Input name="harga" type="number" defaultValue={editingKost?.harga} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Kecamatan</Label>
                            <select name="kecamatan_id" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={editingKost?.kecamatan_id} required>
                                <option value="">Select Kecamatan</option>
                                {kecamatanList.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Alamat Lengkap</Label>
                            <Input name="alamat_lengkap" defaultValue={editingKost?.alamat_lengkap} required />
                        </div>
                        <div className="space-y-2">
                            <Label>WhatsApp</Label>
                            <Input name="whatsapp" type="number" defaultValue={editingKost?.whatsapp} />
                        </div>
                        <div className="space-y-2">
                            <Label>Fasilitas</Label>
                            <Input name="fasilitas" defaultValue={editingKost?.fasilitas} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Link Foto 1 (Utama)</Label>
                                <Input name="google_drive_link" defaultValue={editingKost?.google_drive_link} />
                            </div>
                            <div className="space-y-2">
                                <Label>Link Foto 2</Label>
                                <Input name="google_drive_link_2" defaultValue={editingKost?.google_drive_link_2} />
                            </div>
                            <div className="space-y-2">
                                <Label>Link Foto 3</Label>
                                <Input name="google_drive_link_3" defaultValue={editingKost?.google_drive_link_3} />
                            </div>
                            <div className="space-y-2">
                                <Label>Link Google Maps</Label>
                                <Input name="maps_link" defaultValue={editingKost?.maps_link} />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 py-2">
                            <input type="checkbox" name="is_available" id="is_available" value="true" defaultChecked={editingKost ? editingKost.is_available : true} className="h-4 w-4" />
                            <Label htmlFor="is_available">Available (Tersedia)</Label>
                        </div>
                        <DialogFooter>
                            <Button type="submit">{editingKost ? 'Simpan' : 'Tambah'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* --- ARTICLE DIALOG --- */}
            <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingArticle ? 'Edit Artikel' : 'Tulis Artikel Artikel'}</DialogTitle>
                        <DialogDescription>Artikel yang baik membantu SEO dan mendatangkan pengunjung dari Google.</DialogDescription>
                    </DialogHeader>
                    <form action={async (formData) => {
                        const res = editingArticle ? await updateArticle(editingArticle.id, formData) : await addArticle(formData);
                        if (!res?.error) setIsArticleDialogOpen(false);
                    }} className="space-y-4" key={editingArticle ? editingArticle.id : 'new-article'}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Label>Judul Artikel</Label>
                                <Input name="title" defaultValue={editingArticle?.title} required placeholder="Contoh: 5 Tips Memilih Kos di Tahunan Jepara" />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug (URL Custom - Opsional)</Label>
                                <Input name="slug" defaultValue={editingArticle?.slug} placeholder="tips-memilih-kos-jepara" />
                            </div>
                            <div className="space-y-2">
                                <Label>Cover Image URL (Opsional)</Label>
                                <Input name="cover_image" defaultValue={editingArticle?.cover_image} placeholder="https://..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Ringkasan Singkat (Excerpt)</Label>
                            <Input name="excerpt" defaultValue={editingArticle?.excerpt} required placeholder="Ringkasan untuk meta description di Google..." />
                        </div>
                        <div className="space-y-2">
                            <Label>Konten Artikel (Markdown Support)</Label>
                            <textarea
                                name="content"
                                className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue={editingArticle?.content}
                                required
                                placeholder="# Judul Besar&#10;&#10;Paragraf pembuka...&#10;&#10;## Sub Judul&#10;Isi konten..."
                            />
                        </div>
                        <div className="flex items-center space-x-2 py-2 bg-gray-50 p-3 rounded-md">
                            <input type="checkbox" name="is_published" id="article_published" value="true" defaultChecked={editingArticle ? editingArticle.is_published : false} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                            <Label htmlFor="article_published">Publish Artikel Ini (Tampilkan di Website)</Label>
                        </div>

                        <DialogFooter>
                            <Button type="submit">{editingArticle ? 'Simpan Artikel' : 'Publish Artikel'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* --- TRAFFIC DIALOG (Existing) --- */}
            <Dialog open={isTrafficDialogOpen} onOpenChange={setIsTrafficDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Data Pengunjung</DialogTitle>
                    </DialogHeader>
                    <form action={async (formData) => {
                        const res = await updateTraffic(formData);
                        if (!res?.error) setIsTrafficDialogOpen(false);
                    }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Kunjungan Harian</Label>
                                <Input type="number" name="daily_visits_display" defaultValue={initialTraffic.daily_visits_display} />
                            </div>
                            <div className="space-y-2">
                                <Label>Kunjungan Bulanan</Label>
                                <Input type="number" name="monthly_visits_display" defaultValue={initialTraffic.monthly_visits_display} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Update</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
