/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    target: 'serverless',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8000/api/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
