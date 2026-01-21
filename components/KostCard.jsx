import { getDriveImage, getMapsEmbed, formatCurrency } from "@/utils/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

export default function KostCard({ kost }) {
    const imageUrl = getDriveImage(kost.google_drive_link);
    const mapsEmbed = getMapsEmbed(kost.maps_link);

    // Format WA link
    const waLink = kost.whatsapp ? `https://wa.me/${kost.whatsapp}` : null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer">
                    <Card className="overflow-hidden bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-gray-200 h-full flex flex-col">
                        <div className="relative h-56 w-full bg-gray-200 overflow-hidden group">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={kost.nama_kost}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                            )}
                            <Badge className={`absolute top-4 right-4 shadow-sm ${kost.is_available ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}`}>
                                {kost.is_available ? 'Tersedia' : 'Penuh'}
                            </Badge>
                        </div>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="space-y-1 w-full sm:w-auto">
                                    <CardTitle className="text-xl font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                        {kost.nama_kost}
                                    </CardTitle>
                                    <div className="flex items-start text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-1 mt-0.5 shrink-0 text-primary" />
                                        <span className="text-sm line-clamp-1">{kost.alamat_lengkap}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:shrink-0">
                                    <div className="text-left sm:text-right">
                                        <p className="text-lg font-bold text-primary whitespace-nowrap">{formatCurrency(kost.harga)}</p>
                                        <p className="text-xs text-muted-foreground hidden sm:block">/ bulan</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground sm:hidden">/ bulan</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Fasilitas</h4>
                                <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">{kost.fasilitas}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button className="w-full" variant="outline">Lihat Detail</Button>
                        </CardFooter>
                    </Card>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">{kost.nama_kost}</DialogTitle>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge className={`${kost.is_available ? 'bg-emerald-500' : 'bg-red-500'}`}>
                            {kost.is_available ? 'Tersedia' : 'Penuh'}
                        </Badge>
                        <span className="text-2xl font-bold text-primary ml-auto">{formatCurrency(kost.harga)} <span className="text-sm text-muted-foreground font-normal">/ bulan</span></span>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Image */}
                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            getDriveImage(kost.google_drive_link),
                            getDriveImage(kost.google_drive_link_2),
                            getDriveImage(kost.google_drive_link_3)
                        ].filter(Boolean).map((img, idx) => (
                            <div key={idx} className={`rounded-xl overflow-hidden shadow-sm bg-gray-100 relative ${idx === 0 ? 'md:col-span-2 aspect-video' : 'aspect-video'}`}>
                                <img src={img} alt={`${kost.nama_kost} - ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-gray-900">Alamat Lengkap</h4>
                            <p className="text-gray-600 leading-relaxed">{kost.alamat_lengkap}</p>
                            <p className="text-sm text-gray-500 mt-1">Kecamatan: {kost.kecamatan?.nama || 'Unknown'}</p>
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Fasilitas</h4>
                        <p className="text-gray-700 leading-relaxed">{kost.fasilitas || '-'}</p>
                    </div>

                    {/* Maps */}
                    {mapsEmbed && (
                        <div className="w-full h-64 rounded-xl overflow-hidden border shadow-sm">
                            <iframe
                                src={mapsEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="grid gap-3">
                        {waLink ? (
                            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold" onClick={() => window.open(waLink, '_blank')}>
                                <Phone className="w-5 h-5 mr-2" />
                                Hubungi Pemilik (WhatsApp)
                            </Button>
                        ) : (
                            <Button size="lg" variant="secondary" disabled className="w-full">
                                Nomor WhatsApp Tidak Tersedia
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
