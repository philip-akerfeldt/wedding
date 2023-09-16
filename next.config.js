/** @type {import('next').NextConfig} */

module.exports = {
  output: "export",
  basePath: '/wedding',
  images: {loader: "akamai", path: ""},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
    }
    return config;
  },
  env: {
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY:
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  }
};
