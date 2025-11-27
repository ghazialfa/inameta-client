"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EyeIcon, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { text } from "stream/consumers"

export type Basin = {
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

export const columns: ColumnDef<Basin>[] = [
    {
        id: "rowNumber",
        header: "#",
        enableGlobalFilter: false,
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "area_id",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Area_ID
                    <ChevronsUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const basin = row.original

            return <p className="font-medium">{basin.area_id}</p>
        },
    },
    {
        accessorKey: "area_type",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Type
                    <ChevronsUpDown className="" />
                </Button>
            )
        },
    },
    {
        accessorKey: "area_desc_code",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Area_Desc_Code
                    <ChevronsUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const basin = row.original

            return <Badge variant={"outline"}>{basin.area_desc_code}</Badge>
        },
    },
    {
        accessorKey: "gross_size",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Gross_Size
                    <ChevronsUpDown />
                </Button>
            )
        },
    },
    {
        accessorKey: "size_ouom",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Size_OUOM
                    <ChevronsUpDown />
                </Button>
            )
        },
    },
    {
        id: "actions",
        enableGlobalFilter: false,
        cell: ({ row }) => {
            const basin = row.original

            return (
                <Link href={"basin/" + basin.uuid}>
                    <Button size="icon-sm" variant={"outline"} className="shadow-none rounded-sm border-[#CFCFCF] text-[#727272]">
                        <EyeIcon />
                    </Button>
                </Link>
            )
        },
    },
]
