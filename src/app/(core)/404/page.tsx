import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "404",
    description: "Page not found",
}

export default function NotFoundPage() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center px-6">
            <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full border px-4 py-1 text-sm text-muted-foreground">404</div>
                <h1 className="mt-6 text-3xl font-semibold tracking-tight">Page not found</h1>
                <p className="mt-2 text-muted-foreground">The page you’re looking for doesn’t exist or may have moved.</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>
                    <Link href="/policy">
                        <Button variant="outline">Privacy Policy</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
