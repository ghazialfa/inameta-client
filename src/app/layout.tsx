import localFont from "next/font/local"
import "./globals.css"
import Providers from "./providers"

const roboto = localFont({
    variable: "--font-roboto",
    display: "swap",
    src: [
        { path: "../../public/font/Roboto-Thin.ttf", weight: "100", style: "normal" },
        { path: "../../public/font/Roboto-Light.ttf", weight: "300", style: "normal" },
        { path: "../../public/font/Roboto-Regular.ttf", weight: "400", style: "normal" },
        { path: "../../public/font/Roboto-Medium.ttf", weight: "500", style: "normal" },
        { path: "../../public/font/Roboto-Bold.ttf", weight: "700", style: "normal" },
        { path: "../../public/font/Roboto-Black.ttf", weight: "900", style: "normal" },
    ],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${roboto.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
