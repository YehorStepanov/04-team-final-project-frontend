import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zero4-team-final-project-backend.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
      },
    ],
  },
};

export default nextConfig;
