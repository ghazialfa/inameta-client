"use client"
import { createColumns } from "@/components/common/datatable/columns"
import { DataTable } from "@/components/common/datatable/datatable"
import { Button } from "@/components/ui/button"
import { FolderInput } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useBasinsQuery } from "@/action/basin"
import { BasinItem } from "@/types/basin"

export default function BasinPage() {
    const { data, isLoading, isError } = useBasinsQuery({ offset: 0, limit: 10 })
    const basins: BasinItem[] = data?.items ?? []

    const columns = createColumns<BasinItem>({
        includeRowNumber: true,
        keys: ["area_id", "area_type", "area_desc_code", "product_type"],
        headerLabels: {
            area_id: "Area_ID",
            area_type: "Type",
            area_desc_code: "Area_Desc_Code",
            product_type: "Product_Type",
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
    })

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <div className="flex flex-col gap-2">
                    <h3 className="page-title">Basin</h3>
                    <p className="page-subtitle">Browse and manage basin information across Indonesia</p>
                </div>

                <div>
                    <Button variant="default" className="btn-export">
                        <FolderInput /> Export
                    </Button>
                </div>
            </div>

            <div className="section-card">
                {isLoading && <div>Loading...</div>}
                {isError && <div className="text-red-600">Failed to load data.</div>}
                {!isLoading && !isError && <DataTable columns={columns} data={basins} />}
            </div>
        </div>
    )
}
