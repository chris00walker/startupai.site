/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/chriswalker.consulting',
  assetPrefix: '/chriswalker.consulting/',
  images: {
    unoptimized: true, // Required for static export
    domains: ['fonts.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: true, // Ensures consistent URLs
  async redirects() {
    return [
      // Redirect old HTML files to new routes
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/services.html',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/portfolio.html',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/blog.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/process.html',
        destination: '/process',
        permanent: true,
      },
      {
        source: '/preview.html',
        destination: '/preview',
        permanent: true,
      },
      {
        source: '/services/discovery.html',
        destination: '/services/discovery',
        permanent: true,
      },
      {
        source: '/services/validation.html',
        destination: '/services/validation',
        permanent: true,
      },
      {
        source: '/services/scaling.html',
        destination: '/services/scaling',
        permanent: true,
      },
      {
        source: '/services/advisory.html',
        destination: '/services/advisory',
        permanent: true,
      },
      {
        source: '/services/optimization.html',
        destination: '/services/optimization',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
