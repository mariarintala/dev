/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com"],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
