/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['encoding'],
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:8081/api/auth/:path*',
      },
      {
        source: '/api/example/:path*',
        destination: 'http://localhost:8081/api/example/:path*',
      },
      {
        source: '/api/prison/:path*',
        destination: 'http://localhost:8081/api/prison/:path*',
      },
      {
        source: '/api/upload/:path*',
        destination: 'http://localhost:8081/api/upload/:path*',
      },
      {
        source: '/api/comment/:path*',
        destination: 'http://localhost:8081/api/comment/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/upload/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'POST, GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
}

export default nextConfig
