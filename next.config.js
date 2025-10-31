/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export', // Static HTML export - API routes moved to Netlify Functions
  images: {
    unoptimized: true, // Required for static export
    domains: ['fonts.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: true,

  // Configure webpack aliases for path resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
