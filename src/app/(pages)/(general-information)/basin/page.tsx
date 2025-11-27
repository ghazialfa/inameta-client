import { columns } from "@/components/common/datatable/columns"
import type { Basin } from "@/components/common/datatable/columns"
import basinsJson from "./basins.json"
import { DataTable } from "@/components/common/datatable/datatable"
import { Button } from "@/components/ui/button"
import { FolderInput } from "lucide-react"

export default async function Home() {
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

    return (
        <div className="max-w-full min-h-dvh p-6 bg-gray-100 flex flex-col gap-8">
            <div className="w-full flex justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-4xl/tight">Basin</h3>
                    <p className="text-[#727272]">Browse and manage basin information across Indonesia</p>
                </div>

                <div>
                    <Button variant="default" className="w-36 h-10 bg-[#0EB0EE] hover:bg-[#0A89CC] rounded-md">
                        <FolderInput /> Export
                    </Button>
                </div>
            </div>

            <div className="p-6 bg-white border border-white rounded-xl">
                <DataTable columns={columns} data={basins} />
            </div>
        </div>
    )
}
