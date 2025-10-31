/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Removed output: 'export' to support API routes and serverless functions
  images: {
    unoptimized: true,
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
