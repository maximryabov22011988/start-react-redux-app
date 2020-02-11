const { css } = require('../../webpack.settings');
const { mode, cssSupported } = require('../utils');
const getScopedName = require('../utils/getScopedName');

module.exports = (env) => ({
  loader: 'css-loader',
  options: {
    sourceMap: cssSupported.less(css) ? !mode.isProduction(env) : false,
    // количество лоадеров до css-loader
    importLoaders: cssSupported.less(css) ? 2 : 1,
    ...(cssSupported.CSSModule(css)
      ? {
          modules: mode.isProduction(env)
            ? {
                getLocalIdent: (context, localIdentName, localName) =>
                  getScopedName(localName, context.resourcePath),
              }
            : {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
        }
      : {}),
  },
});
