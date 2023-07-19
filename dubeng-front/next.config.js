const withPlugins = require('next-compose-plugins');

const withTwin = require("./withTwin.js");
const withPWA = require('next-pwa')({
  dest: 'public'
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withTwin({
  reactStrictMode: false,
  images: {
    domains: ["i.ytimg.com", "k.kakaocdn.net", "dubingdubing.s3.ap-northeast-2.amazonaws.com"]
  },
});

module.exports = withPlugins([withTwin, withPWA], nextConfig);

