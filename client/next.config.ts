import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["renti-s3-bucket.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
