/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    domains: ['fonts.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: true, // Ensures consistent URLs
  
  // Note: Redirects removed for static export compatibility
  // These should be handled at the web server level (Netlify _redirects file)
};

module.exports = nextConfig;
