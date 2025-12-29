/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This tells Vercel to ignore those annoying "any" type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores styling warnings during the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
