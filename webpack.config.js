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

const HtmlPlugin = require('./webpack/plugins/HtmlWebpackPlugin');
const MiniCssExtractPlugin = require('./webpack/plugins/MiniCssExtractPlugin');
const SvgStorePlugin = require('./webpack/plugins/SvgStorePlugin');
const CriticalCSSPlugin = require('./webpack/plugins/CriticalCSSPlugin');

const MinifyCSSPlugin = require('./webpack/plugins/MinifyCSSPlugin');
const MinifyJSPlugin = require('./webpack/plugins/MinifyJSPlugin');
const ImageminPlugin = require('./webpack/plugins/ImageminPlugin');
const ImageminWebpPlugin = require('./webpack/plugins/ImageminWebpPlugin');

const babelPreset = require('./webpack/presets/babel');
const lessPreset = require('./webpack/presets/less');
const cssPreset = require('./webpack/presets/css');
const inlineSvgPreset = require('./webpack/presets/inlineSvg.js');
const svgSpritePreset = require('./webpack/presets/svgSprite');
const base64Preset = require('./webpack/presets/base64');
const fontsPreset = require('./webpack/presets/fonts');

const { browserslist } = require('./package.json');
const settings = require('./webpack.settings');
const devServer = require('./webpack/devServer');
const {
  mode,
  browsers,
  cssSupported,
  supportedImages,
  getPlugins,
  transformFilename,
} = require('./webpack/utils');

const isProduction = process.env.NODE_ENV === mode.PRODUCTION;
const isLegacyBrowsers = process.env.BROWSERS_ENV === browsers.LEGACY;
const isOnlyModernBrowsers = process.env.BROWSERS_ENV === browsers.ONLY_MODERN;

const commonConfig = (env) => {
  const filenameWithTargetBrowsersPostfix = transformFilename(
    '[name]',
    isLegacyBrowsers ? browsers.LEGACY : browsers.MODERN
  );

  return merge([
    {
      entry: settings.entries,
      output: {
        path: path.resolve(__dirname, settings.paths.DIST),
        publicPath: mode.isProduction(env)
          ? settings.urls.serverPath()
          : settings.urls.publicPath(),
        filename: mode.isProduction(env)
          ? `${filenameWithTargetBrowsersPostfix}.[hash].js`
          : `${filenameWithTargetBrowsersPostfix}.js`,
      },
      mode: mode.isProduction(env) ? mode.PRODUCTION : mode.DEVELOPMENT,
      devtool: mode.isProduction(env)
        ? 'source-map'
        : 'cheap-module-eval-source-map',
      resolve: {
        ...settings.resolve,
        modules: [settings.paths.SRC, 'node_modules'],
      },
    },
    babelPreset(
      isLegacyBrowsers
        ? browserslist.legacyBrowsers
        : browserslist.modernBrowsers,
      env
    ),
    cssSupported.less(settings.css) && lessPreset(env),
    cssSupported.CSSModule(settings.css) && [cssPreset(env)],
    svgSpritePreset(),
    base64Preset(env),
    inlineSvgPreset(env),
    fontsPreset(env),
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
      HtmlPlugin(),
      AutoDllPlugin({
        inject: true,
        debug: true,
        filename: '[name]_[hash].js',
        path: './dll',
        entry: {
          vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'reselect',
            'redux-thunk',
            'axios',
            'lazysizes',
          ],
        },
      }),
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
                      other: ['axios', 'lazysizes'],
                    },
                  }),
                ]
              : []),
            ...(isOnlyModern ? [] : [LegacyScriptPlugin()]),
          ]),
      MiniCssExtractPlugin(mode.PRODUCTION),
      ...(typeof settings.criticalCSS === 'object' ? [CriticalCSSPlugin()] : [])
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
    commonConfig(mode.PRODUCTION),
    productionConfig({ isOnlyModernBrowsers }),
  ]);
} else {
  module.exports = merge([commonConfig(mode.DEVELOPMENT), developmentConfig()]);
}
