const developConfig = require('./webpack.develop');
const productionConfig = require('./webpack.production');

module.exports = process.env.NODE_ENV === 'development' ? developConfig : productionConfig;