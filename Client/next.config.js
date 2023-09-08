/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    WS_SERVER: "http://localhost:3011", // WebSocket server address
  },
};

module.exports = nextConfig;
