"use client"

import dynamic from "next/dynamic"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/sidebar/app-sidebar"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth"

function PagesLayoutImpl({ children }: { children: React.ReactNode; params: Promise<Record<string, unknown>> }) {
    const token = useAuthStore((s) => s.token)
    const hydrated = useAuthStore((s) => s.hydrated)
    const router = useRouter()

    useEffect(() => {
        if (hydrated && !token) router.replace("/login")
    }, [hydrated, token, router])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-card px-4 py-2">
                    <SidebarTrigger />
                </div>
                <div className="p-4 bg-background min-h-dvh">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}

const PagesLayout = dynamic(() => Promise.resolve(PagesLayoutImpl), { ssr: false })

export default PagesLayout
