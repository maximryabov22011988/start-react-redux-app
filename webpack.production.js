const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const SvgStorePlugin = require('external-svg-sprite-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const {
  alias, extensions, modules, pageTitle, publicPath, isNeedAnalyzeBundles
} = require('./project.settings');
const { browsers, polyfills } = require('./browsers');

const htmlMinify = {
  removeComments: true,
  preserveLineBreaks: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

module.exports = {
  mode: 'production',
  entry: {
    app: [...polyfills, path.resolve('src', 'index.production.js')],
  },
  output: {
    filename: `${process.env.BROWSERS}_js/[name].[chunkhash].js`,
    path: path.resolve('dist'),
    publicPath: publicPath.production,
  },
  resolve: {
    extensions,
    alias: alias.webpack,
    modules: ['node_modules', ...modules],
  },
  devtool: false,
  stats: {
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
    entrypoints: false,
  },
  performance: {
    hints: false,
  },
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [postcssFlexbugsFixes, autoprefixer({
                flexbox: 'no-2009',
                overrideBrowserslist: [
                  ...browsers,
                  'not ie < 9', // React не поддерживает IE8
                ],
              })],
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
          loader: 'url-loader',
          options: {
            limit: 10000,
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
    runtimeChunk: 'single',
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
    new CopyWebpackPlugin([{
      context: path.resolve(__dirname, 'src/assets/favicon'),
      from: '*.*',
      to: 'favicon',
    }]),
    new HtmlWebpackPlugin({
      title: pageTitle,
      filename: `${process.env.BROWSERS}_index.html`,
      template: path.resolve('src/assets', 'index.html'),
      minify: { ...htmlMinify },
    }),
    new SvgStorePlugin({}),
    new MiniCssExtractPlugin({ filename: `${process.env.BROWSERS}_css/[name].[contenthash].css` }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: {
        zindex: false,
        discardComments: { removeAll: true },
      },
    }),
    ...(isNeedAnalyzeBundles
            ? [new BundleAnalyzerPlugin({
              analyzerMode: 'disabled',
              generateStatsFile: true,
              statsOptions: { source: false },
            })]
            : []
    ),
  ],
};
