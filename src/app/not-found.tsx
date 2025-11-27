"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth"

export default function NotFound() {
    const token = useAuthStore((s) => s.token)
    const hydrated = useAuthStore((s) => s.hydrated)
    const router = useRouter()

    useEffect(() => {
        if (!hydrated) return
        router.replace(token ? "/404" : "/login")
    }, [hydrated, token, router])

    return null
}
