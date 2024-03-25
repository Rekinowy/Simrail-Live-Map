/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "api1.aws.simrail.eu",
      },
      {
        hostname: "avatars.steamstatic.com",
      },
    ],
  },
};
