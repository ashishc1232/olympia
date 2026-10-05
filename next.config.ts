import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "en.whchem.com",
        pathname: "/repository/image/**",
      },
    ],
  },
};

export default nextConfig;
