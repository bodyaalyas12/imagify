module.exports = {
  // webpack(config) {
  //   config.module.rules.push({
  //     issuer: {
  //       // nextjs already handles url() in css/sass/scss files
  //       test: /\.\w+(?<!(s?c|sa)ss)$/i,
  //     },
  //     test: /\.(jpg|gif|png|svg|ico)$/i,
  //     use: [
  //       {
  //         loader: 'url-loader',
  //         options: {
  //           limit: 8192,
  //           name: '[path][name].[hash:8].[ext]',
  //         },
  //       },
  //     ],
  //   });
  //
  //   return config;
  // },
  experimental: {
    serverActions: true,
  },
};
