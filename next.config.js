module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config;
  },
  images: {
    domains: [
      "loveanime.s3.ap-northeast-1.amazonaws.com",
      process.env.NEXT_PUBLIC_S3_DOMAIN,
    ],
  },
};
