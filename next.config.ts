import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    // devIndicators: false
    basePath: "/lite",
    assetPrefix: "/lite",
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://172.30.22.183/endpoints/api/:path*",
            },
        ]
    },
}

export default nextConfig
