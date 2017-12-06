const { join, resolve } = require('path');
const { readFileSync } = require('fs');
const assert = require('assert');

const defaultOptions = {
  test: /\.less$/,
  theme: null,
  cwd: process.cwd(),
};

class LessThemePlugin {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);

    assert(this.options.theme, 'Must specify a theme.');
  }

  apply(compiler) {
    let themePath = this.options.theme;
    // relative path
    if (themePath.charAt(0) === '.') {
      themePath = resolve(this.options.cwd, themePath);
    }

    compiler.plugin('environment', () => {
      compiler.options.module.rules.push({
        test: this.options.test,
        loader: resolve(__dirname, 'append.js'),
        enforce: 'pre',
        options: {
          append: `@import '${themePath}';`,
        }
      });
    });
  }
}

module.exports = LessThemePlugin;
