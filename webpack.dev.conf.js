const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    historyApiFallback: true,
    overlay: true,
    port: 3000,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});

module.exports = new Promise(resolve => {
  resolve(devWebpackConfig);
});
