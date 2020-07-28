const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgStorePlugin = require('external-svg-sprite-loader');

const {
  alias, devServer, extensions, isNeedCheckUnusedFiles, modules, pageTitle, publicPath,
} = require('./project.settings');
const { polyfills } = require('./browsers');

const stats = {
  assets: true,
  colors: true,
  errors: true,
  errorDetails: true,
  modules: false,
  performance: true,
  hash: false,
  version: false,
  timings: true,
  warnings: true,
  children: false,
};

module.exports = {
  mode: 'development',
  entry: {
    app: ['react-hot-loader/patch', ...polyfills, path.resolve('src', 'index.develop.js')],
  },
  output: {
    filename: `${process.env.BROWSERS}_js/[name].bundle.js`,
    path: path.resolve('dist'),
    publicPath: publicPath.develop,
  },
  resolve: {
    extensions,
    alias: alias.webpack,
    modules: ['node_modules', ...modules],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('dist'),
    historyApiFallback: true,
    stats,
    port: devServer.port,
    hot: true,
    open: true,
    proxy: devServer.proxyConfig,
    watchOptions: {
      poll: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  stats,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
        exclude: /node_modules\/(?!normalize.css)/,
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/assets/images/icons/sprite'),
        use: [{
          loader: SvgStorePlugin.loader,
          options: {
            name: 'images/sprite.[hash:5].svg',
            iconName: '[name]-[hash:5]',
            svgoOptions: {
              // Обязательное правило для работы SvgStorePlugin.loader
              plugins: [
                { cleanupIDs: false },
                { removeUnknownsAndDefaults: false },
                { removeViewBox: false },
              ],
            },
          },
        }],
      },
      {
        test: /\.inline.svg$/,
        exclude: path.resolve(__dirname, 'src/assets/images/icons/sprite'),
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, 'src/assets/fonts'),
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        }],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        context: path.resolve(__dirname, 'src/assets/favicon'),
        from: '*.*',
        to: 'favicon',
      }],
    }),
    new HtmlWebpackPlugin({
      title: pageTitle,
      filename: 'index.html',
      template: path.resolve('src/assets', 'index.html'),
    }),
    new SvgStorePlugin({}),
    new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    ...(isNeedCheckUnusedFiles
      ? [new UnusedFilesWebpackPlugin({
        failOnUnused: false,
        patterns: ['src/**/*.js', '!src/**/*.test.js', '!src/**/*.stories.js', 'src/**/*.less'],
      })]
      : []
    ),
  ],
};
