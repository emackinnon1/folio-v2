const path = require('path');

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [path.resolve(__dirname, 'src', 'contents')],
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: [
      'res.cloudinary.com',

      // Spotify Album
      'i.scdn.co',
    ],
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // basePath: process.env.VERCEL_DEPLOYMENT === 'true' ? '' : '/folio-v2',
  baePath: '/folio-v2',
  async redirects() {
    return [
      {
        source: '/library/absolute-import',
        destination: '/shorts/react/absolute-import',
        permanent: true,
      },
      {
        source: '/library',
        destination: '/shorts',
        permanent: true,
      },
      {
        source: '/library/:slug',
        destination: '/shorts/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = withRemoteRefresh(nextConfig);
