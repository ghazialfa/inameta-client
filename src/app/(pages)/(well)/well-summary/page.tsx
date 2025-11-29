"use client"
import { DataTable } from "@/components/common/datatable/datatable"
import { createColumns } from "@/components/common/datatable/columns"
import { Button } from "@/components/ui/button"
import LegendCard from "@/components/common/card/legend-card"
import { FolderInput, EyeIcon, MapPin } from "lucide-react"
import Link from "next/link"

type WellSummaryRow = {
    uuid: string
    well_name: string
    area_id: string
    wdr: number
    wcg: number
    dwl: number
    diwl: number
    pwl: number
    dwr: number
    pwr: number
    wspd: number
    wspm: number
    wsm: number
    wcs: number
}

const dummyData: WellSummaryRow[] = Array.from({ length: 150 }).map((_, i) => ({
    uuid: `well-${i + 1}`,
    well_name: "ARYANI-2",
    area_id: "Southeast Sumatra",
    wdr: 1,
    wcg: 1,
    dwl: 1,
    diwl: 1,
    pwl: 1,
    dwr: 1,
    pwr: 1,
    wspd: 1,
    wspm: 1,
    wsm: 1,
    wcs: 1,
}))

const columns = createColumns<WellSummaryRow>({
    includeRowNumber: true,
    keys: ["well_name", "area_id", "wdr", "wcg", "dwl", "diwl", "pwl", "dwr", "pwr", "wspd", "wspm", "wsm", "wcs"],
    headerLabels: {
        well_name: "Well Name",
        area_id: "Area_ID",
        wdr: "WDR",
        wcg: "WCG",
        dwl: "DWL",
        diwl: "DIWL",
        pwl: "PWL",
        dwr: "DWR",
        pwr: "PWR",
        wspd: "WSPD",
        wspm: "WSPM",
        wsm: "WSM",
        wcs: "WCS",
    },
    actions: (row) => (
        <>
            <Link href={"/well/" + row.uuid}>
                <Button size="icon-sm" variant={"outline"} className="shadow-none rounded-sm border-border text-muted-foreground">
                    <EyeIcon />
                </Button>
            </Link>
            <Button size="icon-sm" variant={"outline"} className="shadow-none rounded-sm border-border text-muted-foreground">
                <MapPin />
            </Button>
        </>
    ),
})

const legendItems = [
    { code: "WDR", desc: "Well Drilling" },
    { code: "WCG", desc: "Well Casing" },
    { code: "DWL", desc: "Digital Well Logs" },
    { code: "DIWL", desc: "Digital Well Image Logs" },
    { code: "PWL", desc: "Printed Well Logs" },
    { code: "DWR", desc: "Digital Well Report" },
    { code: "PWR", desc: "Printed Well Report" },
    { code: "WSPD", desc: "Well Seismic Profile Digital" },
    { code: "WSPM", desc: "Well Seismic Profile Data Store in Media" },
    { code: "WSM", desc: "Well Sample" },
    { code: "WCS", desc: "Well Core Sample" },
]

export default function WellSummaryPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <div className="flex flex-col gap-2">
                    <h3 className="page-title">Well Summary</h3>
                    <p className="page-subtitle">Comprehensive well data summary and reports</p>
                </div>

                <div>
                    <Button variant="default" className="btn-export">
                        <FolderInput /> Export
                    </Button>
                </div>
            </div>

            <div className="section-card">
                <DataTable columns={columns} data={dummyData} />
            </div>
            <LegendCard items={legendItems} />
        </div>
    )
}
