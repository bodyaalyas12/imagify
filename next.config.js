/**
 * https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
 */
const clientRuntimeConstants = Object.entries(process.env).reduce((acc, [key, value]) => {
  if (/^CLIENT_/.test(key)) {
    acc[key] = value;
  }

  return acc;
}, {});

module.exports = {
  webpack(config) {
    config.module.rules.push({
      issuer: {
        // nextjs already handles url() in css/sass/scss files
        test: /\.\w+(?<!(s?c|sa)ss)$/i,
      },
      test: /\.(jpg|gif|png|svg|ico)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[path][name].[hash:8].[ext]',
          },
        },
      ],
    });

    return config;
  },
  publicRuntimeConfig: {
    fix: 1, // Docker build fails if delete it (getConfig().publicRuntimeConfig is undefined if empty object there)
    ...clientRuntimeConstants
  }
};
