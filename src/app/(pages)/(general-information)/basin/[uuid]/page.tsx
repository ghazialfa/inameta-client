// import { Button } from "@/components/ui/button"
// import Link from "next/link"
import type { Basin } from "@/components/common/datatable/columns"
import basinsJson from "../basins.json"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

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
        <div className="min-h-dvh py-16 px-8 bg-gray-100">
            <div className="flex flex-col gap-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/basin" className="text-[#0EB0EE]">
                                Basin
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{basin.area_id}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{basin.area_id}</h1>
                    <h1 className="text-[#727272]">{basin.area_desc_code}</h1>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6">
                <div className="flex flex-col gap-4 bg-[#FEFEFE] border-white rounded-md p-6">
                    <h4 className="text-[#0A89CC] font-bold text-xl">Basic Information</h4>
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Area ID</p>
                        <p className="font-medium">{basin.area_id || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Area Type</p>
                        <p className="font-medium">{basin.area_type || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Area Description Code</p>
                        <p className="font-medium">
                            <Badge variant={"outline"}>{basin.area_desc_code || "-"}</Badge>
                        </p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Product Type</p>
                        <p className="font-medium">{basin.product_type || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Source</p>
                        <p className="font-medium">{basin.source || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Remark</p>
                        <p className="font-medium">{basin.remark || "-"}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-[#FEFEFE] border-white rounded-md p-6">
                    <h4 className="text-[#0A89CC] font-bold text-xl">Size Information</h4>
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Size Type</p>
                        <p className="font-medium">{basin.size_type || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Size Type 1</p>
                        <p className="font-medium">{basin.size_type_1 || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Gross Size</p>
                        <p className="font-medium">{basin.gross_size?.toString() || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Gross Size 1</p>
                        <p className="font-medium">{basin.gross_size_1?.toString() || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Gross Size 2</p>
                        <p className="font-medium">{basin.gross_size_2?.toString() || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Size OUOM</p>
                        <p className="font-medium">{basin.size_ouom || "-"}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-[#FEFEFE] border-white rounded-md p-6">
                    <h4 className="text-[#0A89CC] font-bold text-xl">Balance Information</h4>
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Open Balance</p>
                        <p className="font-medium">{basin.open_balance?.toString() || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Open Balance UOM</p>
                        <p className="font-medium">{basin.open_balance_ouom || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Current Balance</p>
                        <p className="font-medium">{basin.current_balance?.toString() || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Current Balance UOM</p>
                        <p className="font-medium">{basin.current_balance_ouom || "-"}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-[#FEFEFE] border-white rounded-md p-6">
                    <h4 className="text-[#0A89CC] font-bold text-xl">File Information</h4>
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Original File Name</p>
                        <p className="font-medium">{basin.original_file_name || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Media Type</p>
                        <p className="font-medium">{basin.media_type || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Digital Size</p>
                        <p className="font-medium">{basin.digital_size?.toString() || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Digital Size UOM</p>
                        <p className="font-medium">{basin.digital_size_uom || "-"}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-[#FEFEFE] border-white rounded-md p-6">
                    <h4 className="text-[#0A89CC] font-bold text-xl">Quality & Verification</h4>
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Fault Type</p>
                        <p className="font-medium">{basin.fault_type || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Row Quality</p>
                        <p className="font-medium">{basin.row_quality || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Checked BA ID</p>
                        <p className="font-medium">{basin.checked_by_ba_id || "-"}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-[#FEFEFE] border-white rounded-md p-6">
                    <h4 className="text-[#0A89CC] font-bold text-xl">Security Information</h4>
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Decrypt Key</p>
                        <p className="font-medium">{basin.decrypt_key || "-"}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p className="text-gray-500 text-sm">Decryption Type</p>
                        <p className="font-medium">{basin.decryption_type || "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
