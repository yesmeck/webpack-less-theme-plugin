const { resolve } = require('path');
const LessThemePlugin = require('../../lib');

module.exports = ({ cwd }) => ({
  entry: resolve(__dirname, './index.js'),
  output: {
    path: resolve(__dirname, `../expect`),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: ['css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new LessThemePlugin({ cwd, theme: './theme.less' }),
  ],
});
