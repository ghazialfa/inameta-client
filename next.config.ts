import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    // devIndicators: false
    output: "export",
    basePath: "/lite",
    assetPrefix: "/lite",
    distDir: "dist",
    images: {
        unoptimized: true,
    },
}

export default nextConfig
