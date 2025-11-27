import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for the Inameta application",
}

export default function PolicyPage() {
    return (
        <main className="px-6 py-10">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-semibold">Privacy Policy</h1>
                <p className="mt-3 text-muted-foreground">This policy explains how we collect, use, and protect your personal data when using our services.</p>

                <div className="mt-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-medium">Information We Collect</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Identity information such as name and email address.</li>
                            <li>Usage information like activities and interactions in the app.</li>
                            <li>Device information such as device type, OS, and IP address.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">How We Use Information</h2>
                        <p className="mt-3 text-muted-foreground">
                            We use data to provide services, improve user experience, conduct analytics, and ensure security and compliance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Data Retention & Security</h2>
                        <p className="mt-3 text-muted-foreground">
                            We retain data as needed for operations and apply appropriate security measures to protect it from unauthorized access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Your Rights</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Request access, correction, or deletion of your data.</li>
                            <li>Withdraw consent or object to certain processing where applicable.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Contact</h2>
                        <p className="mt-3 text-muted-foreground">
                            For questions about this policy, please contact{" "}
                            <Link href="/contact" className="text-primary underline underline-offset-4">
                                our team
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}
