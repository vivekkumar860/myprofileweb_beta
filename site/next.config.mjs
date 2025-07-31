/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/myprofileweb_beta' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/myprofileweb_beta/' : '',
};

export default nextConfig;
