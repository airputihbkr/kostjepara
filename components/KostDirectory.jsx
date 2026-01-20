'use client'
import { useState, useMemo } from 'react'
import KostCard from '@/components/KostCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Home, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import Logo from '@/components/Logo'

export default function KostDirectory({ kosts, kecamatanList, traffic }) {
    const [searchName, setSearchName] = useState('')
    const [selectedKecamatan, setSelectedKecamatan] = useState('all')

    // Filter Logic
    const filteredKosts = useMemo(() => {
        return kosts.filter(kost => {
            const matchKecamatan = selectedKecamatan === 'all' || kost.kecamatan_id?.toString() === selectedKecamatan
            const matchName = kost.nama_kost.toLowerCase().includes(searchName.toLowerCase()) ||
                kost.alamat_lengkap.toLowerCase().includes(searchName.toLowerCase())
            return matchKecamatan && matchName
        })
    }, [kosts, selectedKecamatan, searchName])

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navbar (Airbnb Style) */}
            <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100 h-20 flex items-center shadow-sm">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    {/* Logo */}
                    <div className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.location.reload()}>
                        <Logo className="w-9 h-9" />
                    </div>

                    {/* Compact Search Bar (Desktop) */}
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2.5 shadow-sm border border-transparent hover:border-gray-300 hover:shadow-md transition-all w-96">
                        <input
                            type="text"
                            placeholder="Cari nama kos atau lokasi..."
                            className="bg-transparent border-none outline-none text-sm w-full font-medium text-gray-700 placeholder:text-gray-500"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white ml-2">
                            <Search className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <a href="/blog" className="hidden sm:block text-sm font-medium text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer transition-colors">
                            Blog & Berita
                        </a>
                        <div className="hidden sm:block text-sm font-medium text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer transition-colors">
                            Jadikan Rumah Anda Kos
                        </div>
                        <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:shadow-md cursor-pointer transition-all">
                            <Home className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Bar (Sticky below Header on Mobile) */}
            <div className="md:hidden fixed top-20 w-full bg-white z-40 px-4 py-3 border-b border-gray-100 shadow-sm">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                    <Search className="w-5 h-5 text-gray-500 mr-3" />
                    <input
                        type="text"
                        placeholder="Mau ngekos dimana?"
                        className="bg-transparent border-none outline-none text-base w-full text-gray-800"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pt-32 sm:pt-28 pb-20">

                {/* Horizontal Category Filters (Like Airbnb Icons) */}
                <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
                    <div className="flex gap-4 sm:gap-8 min-w-max border-b border-gray-100 pb-2">
                        {/* 'All' Tab */}
                        <div
                            onClick={() => setSelectedKecamatan('all')}
                            className={`flex flex-col items-center gap-2 cursor-pointer group min-w-[60px] ${selectedKecamatan === 'all' ? 'text-black border-b-2 border-black pb-2' : 'text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-300 pb-2 border-b-2 border-transparent transition-all'}`}
                        >
                            <Home className={`w-6 h-6 ${selectedKecamatan === 'all' ? 'text-black' : 'text-gray-400 group-hover:text-gray-800'}`} />
                            <span className="text-xs font-semibold">Semua</span>
                        </div>

                        {/* Valid Kecamatan Tabs */}
                        {kecamatanList.map(kec => (
                            <div
                                key={kec.id}
                                onClick={() => setSelectedKecamatan(kec.id.toString())}
                                className={`flex flex-col items-center gap-2 cursor-pointer group min-w-[60px] ${selectedKecamatan === kec.id.toString() ? 'text-black border-b-2 border-black pb-2' : 'text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-300 pb-2 border-b-2 border-transparent transition-all'}`}
                            >
                                <MapPin className={`w-6 h-6 ${selectedKecamatan === kec.id.toString() ? 'text-black' : 'text-gray-400 group-hover:text-gray-800'}`} />
                                <span className="text-xs font-semibold whitespace-nowrap">{kec.nama}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Counter & Sort (Optional Row) */}
                {filteredKosts.length > 0 && (
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {filteredKosts.length} tempat ditemukan
                            {selectedKecamatan !== 'all' && <span className="text-gray-500 font-normal ml-1">di {kecamatanList.find(k => k.id.toString() === selectedKecamatan)?.nama}</span>}
                        </h2>
                        {/* Add simple sort if needed here */}
                    </div>
                )}

                {/* Grid Listings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {filteredKosts.map(kost => (
                        <div key={kost.id} className="animate-in fade-in zoom-in-50 duration-500">
                            <KostCard kost={kost} />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredKosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada yang pas?</h3>
                        <p className="text-gray-500 max-w-sm">
                            Coba ubah kata kunci pencarian atau ganti filter kecamatan untuk hasil yang lebih banyak.
                        </p>
                        <Button
                            className="mt-6"
                            variant="outline"
                            onClick={() => {
                                setSearchName('')
                                setSelectedKecamatan('all')
                            }}
                        >
                            Hapus Filter
                        </Button>
                    </div>
                )}
            </main>

            {/* Simple Footer similar to Airbnb */}
            <footer className="border-t border-gray-200 bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} KostJepara, Inc.</p>
                    <div className="flex gap-6 font-medium">
                        <span className="hover:underline cursor-pointer">Privasi</span>
                        <span className="hover:underline cursor-pointer">Syarat & Ketentuan</span>
                        <span className="hover:underline cursor-pointer">Hubungi Admin</span>
                    </div>
                </div>
            </footer>
            {/* Structured Data for Local SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'LocalBusiness',
                        name: 'KostJepara',
                        description: 'Direktori kos-kosan terbaik, aman, dan strategis di seluruh wilayah Jepara.',
                        url: 'https://kostjepara.com', // Replace with actual domain later
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'Jepara',
                            addressRegion: 'Jawa Tengah',
                            addressCountry: 'ID'
                        },
                        priceRange: 'Rp 300.000 - Rp 2.000.000',
                        image: 'https://kostjepara.com/og-image.jpg' // Placeholder
                    })
                }}
            />
        </div>
    )
}
