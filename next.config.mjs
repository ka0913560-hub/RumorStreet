/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development
  reactStrictMode: true,

  // Optimize images
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Production optimizations
  swcMinify: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'RumorStreet',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
};

export default nextConfig;
