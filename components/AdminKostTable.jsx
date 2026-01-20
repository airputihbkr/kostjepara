'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { formatCurrency } from "@/utils/formatters"

export default function AdminKostTable({ kosts, onEdit, onDelete }) {
    return (
        <div className="rounded-md border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama Kost</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Kecamatan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {kosts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                No kosts found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        kosts.map((kost) => (
                            <TableRow key={kost.id}>
                                <TableCell className="font-medium">{kost.nama_kost}</TableCell>
                                <TableCell>{formatCurrency(kost.harga)}</TableCell>
                                <TableCell>{kost.kecamatan?.nama || '-'}</TableCell>
                                <TableCell>
                                    <Badge variant={kost.is_available ? "default" : "destructive"} className={kost.is_available ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                                        {kost.is_available ? "Available" : "Full"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => onEdit(kost)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={() => onDelete(kost.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
