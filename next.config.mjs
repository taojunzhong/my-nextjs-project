/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:8080/api/auth/:path*',
      },
      {
        source: '/api/example/:path*',
        destination: 'http://localhost:8080/api/example/:path*',
      },
      {
        source: '/api/prison/:path*',
        destination: 'http://localhost:8080/api/prison/:path*',
      },
      {
        source: '/api/upload/:path*',
        destination: 'http://localhost:8080/api/upload/:path*',
      },
    ]
  },
}

export default nextConfig
