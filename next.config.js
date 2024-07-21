/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    output: 'export',
    distDir: 'out'
  };
  
  module.exports = nextConfig;