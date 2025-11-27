"use client"
import { createColumns } from "@/components/common/datatable/columns"
import basinsJson from "./basins.json"
import { DataTable } from "@/components/common/datatable/datatable"
import { Button } from "@/components/ui/button"
import { FolderInput } from "lucide-react"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function BasinPage() {
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

    const columns = createColumns<Basin>({
        includeRowNumber: true,
        keys: ["area_id", "area_type", "area_desc_code", "gross_size", "size_ouom"],
        headerLabels: {
            area_id: "Area_ID",
            area_type: "Type",
            area_desc_code: "Area_Desc_Code",
            gross_size: "Gross_Size",
            size_ouom: "Size_OUOM",
        },
        cells: {
            area_id: (b) => <p className="font-medium">{b.area_id}</p>,
            area_desc_code: (b) => {
                const label = b.area_desc_code || ""
                let variant: "success" | "destructive" | "warning" | "default" = "default"
                if (label.includes("Discovery")) variant = "success"
                else if (label.includes("Producing")) variant = "destructive"
                else if (label.includes("Unexplored")) variant = "warning"
                return <Badge variant={variant}>{label}</Badge>
            },
        },
        actions: (b) => (
            <Link href={"basin/" + b.uuid}>
                <Button size="icon-sm" variant={"outline"} className="shadow-none rounded-sm border-border text-muted-foreground">
                    <EyeIcon />
                </Button>
            </Link>
        ),
    })

    return (
        <div className="max-w-full min-h-dvh p-6 bg-background flex flex-col gap-8">
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-4xl/tight">Basin</h3>
                    <p className="text-muted-foreground">Browse and manage basin information across Indonesia</p>
                </div>

                <div>
                    <Button variant="default" className="w-36 h-10 bg-primary hover:bg-primary/90 rounded-md">
                        <FolderInput /> Export
                    </Button>
                </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl">
                <DataTable columns={columns} data={basins} />
            </div>
        </div>
    )
}
