const path = require('path');
const CriticalCSSPlugin = require('html-critical-webpack-plugin');

const { paths, criticalCSS = {} } = require('../../webpack.settings');
const createPlugin = require('./createPlugin');

module.exports = () =>
  createPlugin(CriticalCSSPlugin, {
    inline: criticalCSS.inline,
    minify: criticalCSS.minify,
    extract: criticalCSS.extract,
    width: criticalCSS.viewport.width,
    height: criticalCSS.viewport.height,
    base: path.join(path.resolve(paths.ROOT), 'dist/'),
    src: criticalCSS.HTMLFile,
    dest: criticalCSS.HTMLFile,
    penthouse: {
      blockJSRequests: false,
    },
  });
