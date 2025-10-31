/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    domains: ['fonts.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: true, // Ensures consistent URLs

  // Configure webpack aliases for path resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },

  // Note: Redirects removed for static export compatibility
  // These should be handled at the web server level (Netlify _redirects file)
};

module.exports = nextConfig;
