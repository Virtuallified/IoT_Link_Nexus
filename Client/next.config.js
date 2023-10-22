/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    BASE_URL: "http://localhost:3000",
    WS_SERVER: "ws://localhost:3011", // WebSocket server address
    I18N_SERVER: "http://localhost:3012", // i18n server address
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // To mitigate error on local - "Module not found: Can't resolve 'dns'"
      config.resolve.fallback.tls = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
    }

    return config;
  },
};

module.exports = nextConfig;
