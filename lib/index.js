const { resolve } = require('path');
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

    const addAppendLoader = () => {
      compiler.options.module.rules.push({
        test: this.options.test,
        loader: resolve(__dirname, 'append.js'),
        enforce: 'pre',
        options: {
          append: `@import '${themePath}';`,
        }
      });
    };

    if ('hooks' in compiler) {
      // webpack 4
      compiler.hooks.environment.tap('webpack-less-theme-plugin', addAppendLoader);
    } else {
      compiler.plugin('environment', addAppendLoader);
    }
  }
}

module.exports = LessThemePlugin;
