/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    SOCKET_SERVER_URL: "http://localhost:3011",
  },
};

module.exports = nextConfig;
