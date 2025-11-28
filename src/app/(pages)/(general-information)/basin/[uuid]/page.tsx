// import { Button } from "@/components/ui/button"
// import Link from "next/link"
type Basin = {
    area_id: string | null
    area_type: string | null
    area_desc_code: string | null
    product_type: string | null
    open_balance: string | null
    open_balance_ouom: string | null
    current_balance: string | null
    current_balance_ouom: string | null
    original_file_name: string | null
    decrypt_key: string | null
    decryption_type: string | null
    digital_size: string | null
    digital_size_uom: string | null
    media_type: string | null
    remark: string | null
    size_type: string | null
    size_type_1: string | null
    gross_size: string | null
    gross_size_1: string | null
    gross_size_2: string | null
    size_ouom: string | null
    fault_type: string | null
    source: string | null
    row_quality: string | null
    checked_by_ba_id: string | null
    dm_row_created_by: string | null
    dm_row_created_date: Date | null
    dm_row_approved_by: string | null
    dm_row_approved_date: Date | null
    dm_row_loaded_by: string | null
    dm_row_loaded_date: Date | null
    dm_row_qc_by: string | null
    dm_row_qc_date: Date | null
    uuid: string
}
import basinsJson from "../basins.json"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import DetailCard from "@/components/common/card/detail-card"

interface BasinPageProps {
    params: Promise<{
        uuid: string
    }>
}

export default async function BasinDetailPage({ params }: BasinPageProps) {
    const { uuid } = await params

    if (!uuid) {
        return <div className="p-6 text-red-600">Invalid route parameter.</div>
    }

    type BasinJson = Omit<Basin, "dm_row_created_date" | "dm_row_approved_date" | "dm_row_loaded_date" | "dm_row_qc_date"> & {
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
        <div className="min-h-dvh py-16 px-8 bg-background">
            <div className="flex flex-col gap-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/basin" className="text-primary">Basin</Link>
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
                    <h1 className="text-muted-foreground">{basin.area_desc_code}</h1>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6">
                <DetailCard
                    title="Basic Information"
                    items={[
                        { label: "Area ID", value: basin.area_id || "-" },
                        { label: "Area Type", value: basin.area_type || "-" },
                        {
                            label: "Area Description Code",
                            value: (() => {
                                const label = basin.area_desc_code || "-"
                                const variant = label.includes("Discovery")
                                    ? "success"
                                    : label.includes("Producing")
                                        ? "destructive"
                                        : label.includes("Unexplored")
                                            ? "warning"
                                            : "default"
                                return <Badge variant={variant}>{label}</Badge>
                            })(),
                        },
                        { label: "Product Type", value: basin.product_type || "-" },
                        { label: "Source", value: basin.source || "-" },
                        { label: "Remark", value: basin.remark || "-" },
                    ]}
                />

                <DetailCard
                    title="Size Information"
                    items={[
                        { label: "Size Type", value: basin.size_type || "-" },
                        { label: "Size Type 1", value: basin.size_type_1 || "-" },
                        { label: "Gross Size", value: basin.gross_size?.toString() || "-" },
                        { label: "Gross Size 1", value: basin.gross_size_1?.toString() || "-" },
                        { label: "Gross Size 2", value: basin.gross_size_2?.toString() || "-" },
                        { label: "Size OUOM", value: basin.size_ouom || "-" },
                    ]}
                />

                <DetailCard
                    title="Balance Information"
                    items={[
                        { label: "Open Balance", value: basin.open_balance?.toString() || "-" },
                        { label: "Open Balance UOM", value: basin.open_balance_ouom || "-" },
                        { label: "Current Balance", value: basin.current_balance?.toString() || "-" },
                        { label: "Current Balance UOM", value: basin.current_balance_ouom || "-" },
                    ]}
                />

                <DetailCard
                    title="File Information"
                    items={[
                        { label: "Original File Name", value: basin.original_file_name || "-" },
                        { label: "Media Type", value: basin.media_type || "-" },
                        { label: "Digital Size", value: basin.digital_size?.toString() || "-" },
                        { label: "Digital Size UOM", value: basin.digital_size_uom || "-" },
                    ]}
                />

                <DetailCard
                    title="Quality & Verification"
                    items={[
                        { label: "Fault Type", value: basin.fault_type || "-" },
                        { label: "Row Quality", value: basin.row_quality || "-" },
                        { label: "Checked BA ID", value: basin.checked_by_ba_id || "-" },
                    ]}
                />

                <DetailCard
                    title="Security Information"
                    items={[
                        { label: "Decrypt Key", value: basin.decrypt_key || "-" },
                        { label: "Decryption Type", value: basin.decryption_type || "-" },
                    ]}
                />
            </div>
        </div>
    )
}
