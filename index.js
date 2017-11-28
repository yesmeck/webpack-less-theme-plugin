const { join, resolve } = require('path');
const { readFileSync } = require('fs');
const lessToJs = require('less-vars-to-js');

const defaultOptions = {
  test: /\.less$/,
  cwd: process.cwd(),
};

class LessThemePlugin {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  apply(compiler) {
    compiler.plugin('environment', () => {
      const pkgPath = join(this.options.cwd, 'package.json');
      const pkg = require(pkgPath);
      let theme = {};

      if (pkg.theme && typeof pkg.theme === 'string') {
        let themePath = pkg.theme;
        // relative path
        if (themePath.charAt(0) === '.') {
          themePath = resolve(this.options.cwd, themePath);
        }
        if (/\.less$/.test(themePath)) {
          theme = lessToJs(readFileSync(themePath).toString());
        } else {
          theme = require(themePath);
          if (typeof theme === 'function') {
            theme = theme();
          }
        }
      } else if (pkg.theme && typeof pkg.theme === 'object') {
        theme = pkg.theme;
      }

      compiler.options.module.rules.push({
        test: this.options.test,
        loader: 'less-loader',
        options: {
          modifyVars: theme,
        }
      });
    });
  }
}

module.exports = LessThemePlugin;
