/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    WS_SERVER: "http://localhost:3011", // WebSocket server address
    I18N_SERVER: "http://localhost:3012", // i18n server address
  },
};

module.exports = nextConfig;
