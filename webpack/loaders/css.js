const { mode } = require('../utils');
const getScopedName = require('../utils/getScopedName');

module.exports = () => ({
  loader: 'css-loader',
  options: {
    sourceMap: true,
    importLoaders: 2,
    modules: process.env.NODE_ENV === mode.PRODUCTION ? {
      getLocalIdent: (context, localIdentName, localName) => getScopedName(localName, context.resourcePath),
    } : {
      localIdentName: '[local]___[hash:base64:5]',
    },
  },
});
