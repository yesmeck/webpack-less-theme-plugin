const { getOptions } = require('loader-utils');

module.exports = function(source) {
  const options = getOptions(this);

  this.cacheable();

  source = source + '\n' + options.append;

  return source;
};
