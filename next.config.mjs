/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow profile images from local API server
    domains: ["localhost"],
    // If using a specific port, you can alternatively use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '9000',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
