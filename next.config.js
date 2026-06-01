/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**'
      }
    ]
  },
  async redirects() {
    return [
      { source: '/essays', destination: '/writing', permanent: true },
      { source: '/essays/:slug', destination: '/writing/:slug', permanent: true },
      { source: '/projects', destination: '/writing', permanent: true },
      { source: '/projects/:slug', destination: '/writing/:slug', permanent: true }
    ]
  }
}

module.exports = nextConfig
