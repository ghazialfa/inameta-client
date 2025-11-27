import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Basin } from "@/components/common/datatable/columns"
import basinsJson from "../basins.json"

interface BasinPageProps {
    params: Promise<{
        uuid: string
    }>
}

export default async function Page({params}: BasinPageProps) {
    const { uuid } = await params
    
    if (!uuid) {
        return <div className="p-6 text-red-600">Invalid route parameter.</div>
    }

    type BasinJson = Omit<
        Basin,
        "dm_row_created_date" | "dm_row_approved_date" | "dm_row_loaded_date" | "dm_row_qc_date"
    > & {
        dm_row_created_date: string | null
        dm_row_approved_date: string | null
        dm_row_loaded_date: string | null
        dm_row_qc_date: string | null
    }

    const basinsRaw = basinsJson as BasinJson[]
    const basins: Basin[] = basinsRaw.map((b) => ({
        ...b,
        dm_row_created_date: b.dm_row_created_date ? new Date(b.dm_row_created_date) : null,
        dm_row_approved_date: b.dm_row_approved_date ? new Date(b.dm_row_approved_date) : null,
        dm_row_loaded_date: b.dm_row_loaded_date ? new Date(b.dm_row_loaded_date) : null,
        dm_row_qc_date: b.dm_row_qc_date ? new Date(b.dm_row_qc_date) : null,
    }))

    const basin = basins.find((b) => b.uuid === uuid) || null

    if (!basin) {
        return <div className="p-6 text-red-600">Record not found.</div>
    }

    return (
        <div className="px-8 py-5">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Detail</h1>

                <Link href={"/"}>
                    <Button variant="outline" size="sm">
                        Back
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
                <div>
                    <p className="text-gray-500 text-sm">Area ID</p>
                    <p className="font-medium">{basin.area_id || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Area Type</p>
                    <p className="font-medium">{basin.area_type || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Area Desc Code</p>
                    <p className="font-medium">{basin.area_desc_code || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Product Type</p>
                    <p className="font-medium">{basin.product_type || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Open Balance</p>
                    <p className="font-medium">{basin.open_balance?.toString() || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Open Balance OUOM</p>
                    <p className="font-medium">{basin.open_balance_ouom || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Current Balance</p>
                    <p className="font-medium">{basin.current_balance?.toString() || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Current Balance OUOM</p>
                    <p className="font-medium">{basin.current_balance_ouom || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Original File Name</p>
                    <p className="font-medium break-all">{basin.original_file_name || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Decrypt Key</p>
                    <p className="font-medium break-all">{basin.decrypt_key || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Decryption Type</p>
                    <p className="font-medium">{basin.decryption_type || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Digital Size</p>
                    <p className="font-medium">{basin.digital_size?.toString() || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Digital Size UOM</p>
                    <p className="font-medium">{basin.digital_size_uom || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Media Type</p>
                    <p className="font-medium">{basin.media_type || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Remark</p>
                    <p className="font-medium break-all">{basin.remark || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Size Type</p>
                    <p className="font-medium">{basin.size_type || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Size Type 1</p>
                    <p className="font-medium">{basin.size_type_1 || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Gross Size</p>
                    <p className="font-medium">{basin.gross_size?.toString() || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Gross Size 1</p>
                    <p className="font-medium">{basin.gross_size_1?.toString() || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Gross Size 2</p>
                    <p className="font-medium">{basin.gross_size_2?.toString() || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Size OUOM</p>
                    <p className="font-medium">{basin.size_ouom || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Fault Type</p>
                    <p className="font-medium">{basin.fault_type || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Source</p>
                    <p className="font-medium">{basin.source || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Row Quality</p>
                    <p className="font-medium">{basin.row_quality || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Checked By BA ID</p>
                    <p className="font-medium">{basin.checked_by_ba_id || "-"}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">UUID</p>
                    <p className="font-medium break-all">{basin.uuid}</p>
                </div>
            </div>
        </div>
    )
}