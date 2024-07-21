/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const { '/api/create': removed, ...pathMapWithoutApiCreate } = defaultPathMap;
    return pathMapWithoutApiCreate;
  },
};

module.exports = nextConfig;