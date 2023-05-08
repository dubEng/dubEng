/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com"],
  },
  basePath: "/front",
};

module.exports = nextConfig;
