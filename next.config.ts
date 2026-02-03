import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com", // allow any subdomain of cloudinary.com
        port: "",
        pathname: "/**", // allow any path
      },
    ],
  },
};

export default nextConfig;
