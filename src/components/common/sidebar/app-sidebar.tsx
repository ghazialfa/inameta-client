"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarHeader, SidebarContent, SidebarRail } from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { WellIcon } from "@/assets/icon/well-icon"
import logoIcon from "@/assets/img/icons/icon.png"
import section from "@/app/(pages)/section.json"

function toPascalCase(name: string) {
    return name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")
}

const CustomIcons: Record<string, LucideIcon> = {
    WellIcon,
    Well: WellIcon,
    well: WellIcon,
}

function resolveIcon(name?: string): LucideIcon | undefined {
    if (!name) return undefined
    const key = /^[A-Z]/.test(name) ? name : toPascalCase(name)
    const lib = Icons as unknown as Record<string, LucideIcon | undefined>
    return lib[key] ?? CustomIcons[key]
}

type SectionItem = {
    title: string
    url: string
    icon?: string
    isActive?: boolean
    items?: Array<{ href?: string; url?: string; label?: string; title?: string }>
}
type SectionData = { navMain: SectionItem[]; navRepositoryData: SectionItem[]; navRepositoryDataLabel?: string }
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

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex items-center justify-center">
                <Image src={logoIcon} alt="Inameta Lite" height={32} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMainItems} />
                <Separator className="my-4" />
                <NavMain items={navRepositoryDataItems} groupLabel={data.navRepositoryDataLabel} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
