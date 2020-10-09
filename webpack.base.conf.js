const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const PATHS = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src'),
  assets: 'assets/',
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: `${PATHS.src}/index.tsx`,
  },
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].[chunkhash:8].js`,
    chunkFilename: `${PATHS.assets}js/[name].[chunkhash:8].js`,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@src': `${PATHS.src}/`,
      '@components': `${PATHS.src}/components/`,
      '@constants': `${PATHS.src}/constants/`,
      '@hooks': `${PATHS.src}/hooks/`,
      '@common': `${PATHS.src}/common/`,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module.s(a|c)ss$/,
        loader: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDev,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.s(a|c)ss$/,
        loader: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            context: PATHS.src,
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          {
            loader: 'file-loader',
            options: {
              context: PATHS.src,
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 8,
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash:8].css`,
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/static/`,
        to: `${PATHS.dist}/`,
      },
      {
        from: `${PATHS.src}/${PATHS.assets}img/`,
        to: `${PATHS.dist}/${PATHS.assets}img/`,
      },
      {
        from: `${PATHS.src}/${PATHS.assets}json/`,
        to: `${PATHS.dist}/${PATHS.assets}json/`,
      },
    ]),
  ],
};
