<<<<<<< HEAD
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
=======
const withTwin = require("./withTwin.js");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: false,
  images: {
    domains: ["i.ytimg.com", "k.kakaocdn.net", "dubingdubing.s3.ap-northeast-2.amazonaws.com"]
  },
});
>>>>>>> develop-front

