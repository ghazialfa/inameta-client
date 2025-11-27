"use client"
import { DataTable } from "@/components/common/datatable/datatable"
import { createColumns } from "@/components/common/datatable/columns"
import { Button } from "@/components/ui/button"
import { FolderInput, EyeIcon, Download } from "lucide-react"
import Link from "next/link"

type DigitalMapsRow = {
    uuid: string
    ba_long_name: string
    ba_type: string
    area_id: string
    area_type: string
    title: string
}

const dummyData: DigitalMapsRow[] = Array.from({ length: 129 }).map((_, i) => ({
    uuid: `digital-map-${i + 1}`,
    ba_long_name: "PERTAMINA",
    ba_type: "Badan Usaha",
    area_id: "PERTAMINA UNIT II",
    area_type: "Wilayah Kerja",
    title: "S. SUMATRA E - W SEISMIC SECTION RAMOK - TANJUNG LONTAR ENCL. 2.12",
}))

const columns = createColumns<DigitalMapsRow>({
    includeRowNumber: true,
    keys: ["ba_long_name", "ba_type", "area_id", "area_type", "title"],
    headerLabels: {
        ba_long_name: "BA_Long_Name",
        ba_type: "BA_Type",
        area_id: "Area_ID",
        area_type: "Area_Type",
        title: "Title",
    },
    actions: (row) => (
        <>
            <Link href={"/maps/digital/" + row.uuid}>
                <Button
                    size="icon-sm"
                    variant={"outline"}
                    className="shadow-none rounded-sm border-border text-muted-foreground"
                >
                    <EyeIcon />
                </Button>
            </Link>
            <Button
                size="icon-sm"
                variant={"outline"}
                className="shadow-none rounded-sm border-border text-muted-foreground"
            >
                <Download />
            </Button>
        </>
    ),
})

export default function DigitalMapsPage() {
    return (
        <div className="max-w-full min-h-dvh p-6 bg-background flex flex-col gap-8">
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-4xl/tight">Digital Maps and Technical Drawing</h3>
                    <p className="text-muted-foreground">Browse and download digital maps and technical drawings</p>
                </div>

                <div>
                    <Button variant="default" className="w-36 h-10 bg-primary hover:bg-primary/90 rounded-md">
                        <FolderInput /> Export
                    </Button>
                </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl">
                <DataTable columns={columns} data={dummyData} />
            </div>
        </div>
    )
}
