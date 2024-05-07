
const API_URL = process.env.API_URL 

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${API_URL}/:path*`,
            },
        ]
    },
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['source.unsplash.com'],
    },
}

module.exports = nextConfig