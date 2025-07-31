/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only add basePath when specifically building for GitHub Pages
  ...(process.env.GITHUB_PAGES && {
    basePath: '/myprofileweb_beta',
    assetPrefix: '/myprofileweb_beta/',
  }),
};

export default nextConfig;
