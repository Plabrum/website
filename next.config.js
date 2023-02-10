/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// module.exports = {
//   assetPrefix: process.env.VERCEL_URL,
//   images: {
//     domains: [process.env.VERCEL_URL],
//     path: `${process.env.VERCEL_URL}/_next/image`,
//   },
// };

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};
