const config = {
  modern: {
    browsers: [
      'last 2 chrome version',
      'last 2 safari version',
      'last 2 firefox version',
      'last 2 opera version',
      'last 2 edge version',
      'last 2 ios_saf version',
      'last 2 and_chr version',
      'last 2 and_ff version',
      'last 2 and_uc version',
    ],
    polyfills: [],
  },
  old: {
    browsers: ['> 1%'],
    polyfills: ['whatwg-fetch'],
  },
};

module.exports = config[process.env.BROWSERS];
