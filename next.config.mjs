/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/math-dot-product",
        destination: "/blog/math-for-vfx-shaders#part-1-vectors--the-dot-product",
        permanent: true,
      },
      {
        source: "/blog/math-cross-product",
        destination: "/blog/math-for-vfx-shaders#part-2-the-cross-product-generating-perpendicular-vectors",
        permanent: true,
      },
      {
        source: "/blog/math-uv-coordinates",
        destination: "/blog/math-for-vfx-shaders#part-3-uv-mathematics--texture-distortion",
        permanent: true,
      },
      {
        source: "/blog/math-spatial-masks",
        destination: "/blog/math-for-vfx-shaders#part-4-spatial-masks--world-position-math",
        permanent: true,
      },
      {
        source: "/blog/math-essential-functions",
        destination: "/blog/math-for-vfx-shaders#part-5-essential-math-nodes--gpu-optimization",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
