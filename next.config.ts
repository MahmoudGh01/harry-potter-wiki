import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/fedeperin/potterapi/main/public/images/characters/**',
      },
    ],
  },
};

export default nextConfig;
