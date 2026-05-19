import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone", // minimal self-contained build for VPS deployment
};

export default nextConfig;
