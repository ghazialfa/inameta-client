import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface LegendItem {
    code: string
    desc: string
}

interface LegendCardProps {
    items: LegendItem[]
    className?: string
}

export default function LegendCard({ items, className }: LegendCardProps) {
    return (
        <div className={cn("p-6 bg-card border border-border rounded-xl", className)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {items.map((item) => (
                    <div key={item.code} className="flex items-center gap-3 text-sm">
                        <Badge variant="outline" className="px-3 py-1 rounded-sm">
                            {item.code}
                        </Badge>
                        <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
