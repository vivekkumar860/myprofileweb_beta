/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for GitHub Pages deployment
  ...(process.env.GITHUB_PAGES && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    },
    basePath: '/myprofileweb_beta',
    assetPrefix: '/myprofileweb_beta/',
  }),
  
  // For development and other deployments, use default settings
  ...(!process.env.GITHUB_PAGES && {
    images: {
      unoptimized: true
    },
  }),
};

export default nextConfig;
