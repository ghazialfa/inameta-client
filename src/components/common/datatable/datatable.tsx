"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, ChevronLeft, Search, Funnel, Copy, CircleCheckBig } from "lucide-react"
import { toast } from "sonner"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [searchableColumns, setSearchableColumns] = React.useState<string[]>(() =>
        columns
            .filter((c): c is ColumnDef<TData> & { accessorKey: string } => "accessorKey" in c && typeof c.accessorKey === "string")
            .map((c) => c.accessorKey),
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true

            return searchableColumns.some((colKey) => {
                const cellValue = row.getValue(colKey)
                if (cellValue == null) return false
                return String(cellValue).toLowerCase().includes(filterValue.toLowerCase())
            })
        },
        onGlobalFilterChange: setGlobalFilter,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
        },
    })

    function handleCopyRowsAsCSV() {
        const pageRows = table.getPaginationRowModel().rows
        const selectedRows = table.getSelectedRowModel().rows

        const rowsToCopy = selectedRows.length > 0 ? selectedRows : pageRows

        if (!rowsToCopy.length) return

        const exportableColumns = columns
            .filter((c): c is ColumnDef<TData> & { accessorKey: string } => "accessorKey" in c && typeof c.accessorKey === "string")
            .map((c) => c.accessorKey)

        const header = exportableColumns.join(",")

        const csvRows = rowsToCopy.map((row) =>
            exportableColumns
                .map((key) => {
                    const value = row.original[key as keyof TData]

                    if (typeof value === "string") {
                        return `"${value.replace(/"/g, '""')}"`
                    }
                    return value ?? ""
                })
                .join(","),
        )

        const csvString = [header, ...csvRows].join("\n")

        navigator.clipboard.writeText(csvString).then(() => {
            const pageIndex = table.getState().pagination.pageIndex
            const pageSize = table.getState().pagination.pageSize

            const start = pageIndex * pageSize + 1
            const end = start + pageRows.length - 1

            const copiedLabel = rowsToCopy.length === pageRows.length ? `${start}-${end} rows` : `${rowsToCopy.length} row${rowsToCopy.length > 1 ? "s" : ""}`

            toast(
                <div className="flex flex-col gap-1 p-1">
                    <div className="flex gap-3 items-center">
                        <span className="text-success ">
                            <CircleCheckBig size={16} />
                        </span>
                        <span className="text-success font-medium">Copied Successfully!</span>
                    </div>
                    <span className="text-muted-foreground ml-7">Copied {copiedLabel} to clipboard</span>
                </div>,
            )
        })
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 w-full">
                <div className="py-1 px-3 w-full flex items-center border border-border rounded-sm bg-muted ">
                    <span className="text-muted-foreground">
                        <Search />
                    </span>
                    <Input
                        placeholder="Search by name, number, etc..."
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full border-none shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                </div>
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"outline"} className="p-6 w-28 rounded-sm shadow-none cursor-pointer">
                                <Funnel /> All Type
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            {columns
                                .filter(
                                    (col): col is ColumnDef<TData, TValue> & { accessorKey: string } =>
                                        "accessorKey" in col && typeof col.accessorKey === "string",
                                )
                                .map((col) => {
                                    const header = col.header
                                    const label = typeof header === "string" ? header : (col.accessorKey ?? col.id ?? "column")

                                    const key = col.accessorKey

                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={key}
                                            checked={searchableColumns.includes(key)}
                                            onCheckedChange={(checked) => {
                                                setSearchableColumns((prev) => (checked ? [...prev, key] : prev.filter((k) => k !== key)))
                                            }}
                                        >
                                            {label}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant={"outline"} className="p-6 w-28 rounded-sm shadow-none cursor-pointer" onClick={handleCopyRowsAsCSV}>
                        <Copy /> Copy Row
                    </Button>
                </div>
            </div>
            <div className="overflow-hidden rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-muted-foreground">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="cursor-pointer"
                                    onClick={() => row.toggleSelected()}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-2 py-4 text-sm text-muted-foreground">
                <div>
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{" "}
                    {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getRowCount())} of {table.getRowCount()}{" "}
                    rows
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center gap-3 text-black">
                        <span className="flex justify-center px-6 py-1 border-2 border-border rounded-sm">{table.getState().pagination.pageIndex + 1}</span>
                        of {table.getPageCount()} Page
                    </div>

                    <Button
                        variant="default"
                        className="w-28 h-8 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground rounded-sm font-medium cursor-pointer"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft /> Previous
                    </Button>
                    <Button
                        variant="default"
                        className="w-28 h-8 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground rounded-sm font-medium cursor-pointer"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
