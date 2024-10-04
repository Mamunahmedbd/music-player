/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cancerfocusni.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
