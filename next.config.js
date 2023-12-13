/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com',
      },
      {
        protocol: 'http',
        hostname: 'asdicmeic.com',
      },
    ],
  },
};

module.exports = nextConfig;
