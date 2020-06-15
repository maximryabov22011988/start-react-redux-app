const production = require('./webpack.production');
const develop = require('./webpack.develop');

module.exports = function getConfig(env) {
  return env === 'develop' ? develop : production;
};
