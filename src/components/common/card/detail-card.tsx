import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface DetailItem {
    label: string
    value: React.ReactNode
}

interface DetailCardProps {
    title: React.ReactNode
    items: DetailItem[]
    className?: string
}

export default function DetailCard({ title, items, className }: DetailCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-primary font-bold text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    {items.map((item, idx) => (
                        <div key={idx} className="space-y-3">
                            <div className="flex justify-between">
                                <p className="text-gray-500 text-sm">{item.label}</p>
                                <p className="font-medium">{item.value}</p>
                            </div>
                            {idx < items.length - 1 ? <hr className="my-0" /> : null}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
