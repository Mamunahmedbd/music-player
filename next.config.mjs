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
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
