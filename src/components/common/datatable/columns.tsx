"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

type DynamicColumnOptions<RowData, ColumnKey extends keyof RowData = keyof RowData> = {
    keys: ColumnKey[]
    headerLabels?: Partial<Record<ColumnKey, string>>
    cells?: Partial<Record<ColumnKey, (row: RowData) => React.ReactNode>>
    sortable?: Partial<Record<ColumnKey, boolean>>
    includeRowNumber?: boolean
    actions?: (row: RowData) => React.ReactNode
}

export function createColumns<RowData, ColumnKey extends keyof RowData = keyof RowData>(
    options: DynamicColumnOptions<RowData, ColumnKey>,
): ColumnDef<RowData>[] {
    const { keys, headerLabels, cells, sortable, includeRowNumber = true, actions } = options

    const cols: ColumnDef<RowData>[] = []

    if (includeRowNumber) {
        cols.push({
            id: "rowNumber",
            header: "#",
            enableGlobalFilter: false,
            cell: ({ row }) => row.index + 1,
        })
    }

    keys.forEach((key) => {
        const label = (headerLabels?.[key] as string | undefined) ?? String(key)
        const isSortable = (sortable?.[key] as boolean | undefined) ?? true

        cols.push({
            accessorKey: String(key),
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    {label}
                    <ChevronsUpDown />
                </Button>
            ),
            cell: ({ row }) => {
                const original = row.original as RowData
                const custom = cells?.[key]
                if (custom) return custom(original)
                const value = original[key]
                return <span>{value == null ? "" : String(value)}</span>
            },
            enableSorting: isSortable,
        })
    })

    if (actions) {
        cols.push({
            id: "actions",
            enableGlobalFilter: false,
            cell: ({ row }) => actions(row.original as RowData),
        })
    }

    return cols
}
