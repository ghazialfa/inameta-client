"use client"
import { DataTable } from "@/components/common/datatable/datatable"
import { createColumns } from "@/components/common/datatable/columns"
import { Button } from "@/components/ui/button"
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
    keys: [
        "well_name",
        "area_id",
        "wdr",
        "wcg",
        "dwl",
        "diwl",
        "pwl",
        "dwr",
        "pwr",
        "wspd",
        "wspm",
        "wsm",
        "wcs",
    ],
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

export default function WellSummaryPage() {
    return (
        <div className="max-w-full min-h-dvh p-6 bg-background flex flex-col gap-8">
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-4xl/tight">Well Summary</h3>
                    <p className="text-muted-foreground">Comprehensive well data summary and reports</p>
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

