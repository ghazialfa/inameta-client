"use client"

import dynamic from "next/dynamic"
import { NavMain } from "@/components/common/sidebar/nav-main"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarInset, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarRail } from "@/components/ui/sidebar"
import section from "./section.json"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
// import Image from "next/image"
import logoIcon from "@/assets/img/icons/icon.png"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth"

function toPascalCase(name: string) {
    return name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")
}

function resolveIcon(name?: string): LucideIcon | undefined {
    if (!name) return undefined
    const key = /^[A-Z]/.test(name) ? name : toPascalCase(name)
    const lib = Icons as unknown as Record<string, LucideIcon | undefined>
    return lib[key]
}

type SectionItem = {
    title: string
    url: string
    icon?: string
    isActive?: boolean
    items?: Array<{ href?: string; url?: string; label?: string; title?: string }>
}
type SectionData = { navMain: SectionItem[]; navRepositoryData: SectionItem[] }
const data = section as unknown as SectionData

const navMainItems = data.navMain.map((item) => ({
    title: item.title,
    url: item.url,
    icon: resolveIcon(item.icon),
    isActive: item.isActive,
    items: item.items?.map((sub) => ({
        title: sub.label ?? sub.title ?? "",
        url: sub.href ?? sub.url ?? "",
    })),
}))

const navRepositoryDataItems = data.navRepositoryData.map((item) => ({
    title: item.title,
    url: item.url,
    icon: resolveIcon(item.icon),
    items: item.items?.map((sub) => ({
        title: sub.label ?? sub.title ?? "",
        url: sub.href ?? sub.url ?? "",
    })),
}))

function PagesLayoutImpl({ children }: { children: React.ReactNode; params: Promise<Record<string, unknown>> }) {
    const token = useAuthStore((s) => s.token)
    const hydrated = useAuthStore((s) => s.hydrated)
    const router = useRouter()

    useEffect(() => {
        if (hydrated && !token) router.replace("/login")
    }, [hydrated, token, router])

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader className="flex items-center justify-center">
                    <img src={logoIcon} alt="Inameta Lite" height={32} />
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={navMainItems} />
                    <Separator className="my-4" />
                    <NavMain items={navRepositoryDataItems} />
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
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
