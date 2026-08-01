import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit directory-style routes (career-vault/index.html) so URLs work
  // with and without a trailing slash on GitHub Pages.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
