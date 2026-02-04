import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },

  transpilePackages: ["@shared/hooks"],
};

export default nextConfig;
