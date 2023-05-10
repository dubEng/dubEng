const withTwin = require("./withTwin.js");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: false,
  images: {
    domains: ["i.ytimg.com", "k.kakaocdn.net"]
  },
});

