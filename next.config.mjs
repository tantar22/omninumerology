/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  reactStrictMode: true,
};

if (isStaticExport) {
  // Firebase Hosting serves a static export. API calls are proxied to the
  // Cloud Function via firebase.json rewrites, so no Next.js rewrites here.
  nextConfig.output = 'export';
  nextConfig.images = { unoptimized: true };
} else {
  // Local development: proxy /api to the Express server.
  nextConfig.rewrites = async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.API_PROXY_TARGET || 'http://localhost:4000'}/api/:path*`,
    },
  ];
}

export default nextConfig;
