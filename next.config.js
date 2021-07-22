module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config;
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_DOMAIN],
  },
};
