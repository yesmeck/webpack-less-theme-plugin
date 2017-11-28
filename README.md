# webpack-less-theme-plugin

Inject less variables to your less file.

## Installation

```bash
$ npm i webpack-less-theme-plugin --save-dev
```

## Usage

Add to webpack config.

```javscript
// webpack.config.js
const LessThemePlugin = require('webpack-less-theme-plugin');

module.exports = {
  ...,
  plugins: [
    new LessThemePlugin,
  ],
};
```

#### Config theme via `package.json`:

```json
// package.json
{
  ...,
  "theme": {
    "primary-color": "blue"
  }
}
```

#### Config theme via js file:

```json
// package.json
{
  ...,
  "theme": "./theme.js"
}
```

```javscript
// theme.js
module.exports = {
  'primary-color': 'blue',
};
```

Or export a function

```javscript
// theme.js
module.exports = () => ({
  'primary-color': 'blue',
});
```

#### Config theme via less file

```json
// package.json
{
  ...,
  "theme": "./theme.less"
}
```

```less
@primary-color: blue;
```

## Options

- `test` - webpack's [Condation.rule](https://webpack.js.org/configuration/module/#condition). Default is `/\.less$/`.
- `cwd`  - Current working dir.

## License

MIT
