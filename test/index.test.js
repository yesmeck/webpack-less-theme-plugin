const { resolve, join } = require('path');
const { readFileSync } = require('fs');
const webpack = require('webpack');
const getConfig = require('./fixtures/webpack.config');

['pkg', 'js-object', 'js-function', 'less-file'].forEach((kase) => {
  test(kase, (done) => {
    const outputPath = resolve(__dirname, `./expect`);
    const cwd = resolve(__dirname, `./fixtures/${kase}`);
    const webpackConfig = getConfig({
      cwd,
    });
    webpack(webpackConfig, () => {
      const bundle = readFileSync(join(outputPath, 'bundle.js')).toString();
      expect(bundle).toContain('exports.push([module.i, "body {\\n  color: green;\\n}\\n", ""]);')
      done();
    });
  });
});
