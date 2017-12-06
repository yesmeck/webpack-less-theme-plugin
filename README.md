# webpack-less-theme-plugin

Inject less variables to your less file. Support HMR.

## Installation

```bash
$ npm i webpack-less-theme-plugin --save-dev
```

## Usage

Add to webpack config.

```javascript
// webpack.config.js
const LessThemePlugin = require('webpack-less-theme-plugin');

module.exports = {
  ...,
  plugins: [
    new LessThemePlugin('./theme.less'),
  ],
};
```

```less
// theme.less
@primary-color: blue;
```

## Options

- `test` - webpack's [Condation.rule](https://webpack.js.org/configuration/module/#condition). Default is `/\.less$/`.
- `them` - less them file.
- `cwd`  - Current working dir.

## License

MIT
