const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const { browserslist } = require('./package.json');
const { browsers } = require('./webpack/utils');

const isLegacyBrowsers = process.env.BROWSERS_ENV === browsers.LEGACY;

module.exports = {
  plugins: [
    postcssFlexbugsFixes,
    autoprefixer({
      overrideBrowserslist: [
        ...(isLegacyBrowsers
          ? browserslist.legacyBrowsers
          : browserslist.modernBrowsers),
        'not ie < 9', // React не поддерживает IE8
      ],
      flexbox: 'no-2009',
    }),
  ],
};
