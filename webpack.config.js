const merge = require('webpack-merge');
const path = require('path');

const CopyPlugin = require('./webpack/plugins/CopyWebpackPlugin');
const CleanPlugin = require('./webpack/plugins/CleanWebpackPlugin');
const UnusedFilesPlugin = require('./webpack/plugins/UnusedFilesWebpackPlugin');
const NotifierPlugin = require('./webpack/plugins/WebpackNotifierPlugin');
const HotModulePlugin = require('./webpack/plugins/HotModuleReplacementPlugin');
const ManifestPlugin = require('./webpack/plugins/WebpackManifestPlugin');
const LegacyScriptPlugin = require('./webpack/plugins/LegacyScriptPlugin');
const AutoDllPlugin = require('./webpack/plugins/AutoDllPlugin');
const BundleAnalyzerPlugin = require('./webpack/plugins/BundleAnalyzerPlugin');
const ErrorOverlay = require('./webpack/plugins/ErrorOverlayPlugin');
const WebpackErrorsPlugin = require('./webpack/plugins/FriendlyErrorsWebpackPlugin');
const HtmlPlugin = require('./webpack/plugins/HtmlWebpackPlugin');
const MiniCssExtractPlugin = require('./webpack/plugins/MiniCssExtractPlugin');
const SvgStorePlugin = require('./webpack/plugins/SvgStorePlugin');
const MinifyCSSPlugin = require('./webpack/plugins/MinifyCSSPlugin');
const MinifyJSPlugin = require('./webpack/plugins/MinifyJSPlugin');
const ImageminPlugin = require('./webpack/plugins/ImageminPlugin');
const ImageminWebpPlugin = require('./webpack/plugins/ImageminWebpPlugin');

const babelRules = require('./webpack/rules/babel');
const lessRules = require('./webpack/rules/less');
const inlineSvgRules = require('./webpack/rules/inlineSvg.js');
const svgSpriteRules = require('./webpack/rules/svgSprite');
const base64Rules = require('./webpack/rules/base64');
const fontsRules = require('./webpack/rules/fonts');

const settings = require('./webpack.settings');
const devServer = require('./webpack/devServer');
const {
  mode,
  browsers,
  supportedImages,
  getPlugins,
  transformFilename,
} = require('./webpack/utils');
const { browserslist } = require('./package.json');

const isProduction = process.env.NODE_ENV === mode.PRODUCTION;
const isLegacyBrowsers = process.env.BROWSERS_ENV === browsers.LEGACY;
const isOnlyModernBrowsers = process.env.BROWSERS_ENV === browsers.ONLY_MODERN;

const commonConfig = () => {
  const filenameWithTargetBrowsersPostfix = transformFilename(
    '[name]',
    isLegacyBrowsers ? browsers.LEGACY : browsers.MODERN
  );

  return merge([
    {
      entry: settings.entries,
      output: {
        path: path.resolve(__dirname, settings.paths.DIST),
        publicPath: isProduction
          ? settings.urls.serverPath()
          : settings.urls.publicPath(),
        filename: isProduction
          ? `${filenameWithTargetBrowsersPostfix}.[hash].js`
          : `${filenameWithTargetBrowsersPostfix}.js`,
      },
      mode: isProduction ? mode.PRODUCTION : mode.DEVELOPMENT,
      devtool: isProduction
        ? 'source-map'
        : 'cheap-module-source-map',
      resolve: {
        ...settings.resolve,
        modules: [settings.paths.SRC, 'node_modules'],
      },
    },
    babelRules(
      isLegacyBrowsers
        ? browserslist.legacyBrowsers
        : browserslist.modernBrowsers,
    ),
    lessRules(),
    svgSpriteRules(),
    base64Rules(),
    inlineSvgRules(),
    fontsRules(),
    getPlugins(
      ...(supportedImages.WEBP ? [ImageminWebpPlugin()] : []),
      CopyPlugin([{ from: `${settings.paths.FAVICON}/`, to: 'favicon' }]),
      SvgStorePlugin(),
      NotifierPlugin()
    ),
  ]);
};

const developmentConfig = () =>
  merge([
    getPlugins(
      ErrorOverlay(),
      WebpackErrorsPlugin(),
      HtmlPlugin(),
      HotModulePlugin(),
      ...(settings.checkUnusedFiles ? [UnusedFilesPlugin()] : []),
      ...(settings.analyzeBundles ? [BundleAnalyzerPlugin()] : [])
    ),
    devServer(),
  ]);

const productionConfig = ({ isOnlyModernBrowsers: isOnlyModern } = {}) =>
  merge([
    getPlugins(
      ...(isLegacyBrowsers
        ? [CleanPlugin(), ManifestPlugin()]
        : [
            ...(isOnlyModern ? [CleanPlugin()] : []),
            HtmlPlugin(mode.PRODUCTION),
            ...(isOnlyModern
              ? [
                  AutoDllPlugin({
                    inject: true,
                    debug: true,
                    filename: '[name].[hash].js',
                    path: '/vendors/',
                    entry: {
                      react: ['react', 'react-dom'],
                      redux: [
                        'redux',
                        'react-redux',
                        'reselect',
                        'redux-thunk',
                      ],
                      other: ['axios'],
                    },
                  }),
                ]
              : []),
            ...(isOnlyModern ? [] : [LegacyScriptPlugin()]),
          ]),
      MiniCssExtractPlugin(mode.PRODUCTION),
    ),
    {
      optimization: {
        minimize: true,
        minimizer: [MinifyCSSPlugin(), MinifyJSPlugin(), ImageminPlugin()],
      },
    },
  ]);

if (isProduction) {
  module.exports = merge([
    commonConfig(),
    productionConfig({ isOnlyModernBrowsers }),
  ]);
} else {
  module.exports = merge([commonConfig(), developmentConfig()]);
}
