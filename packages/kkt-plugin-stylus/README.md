@kkt/plugin-stylus
---

This package contains a plugin for using [stylus](https://github.com/stylus/stylus/) with [@kkt/ssr](https://github.com/jaywcjlove/kkt-ssr).


## Usage in @kkt/ssr Projects

```bash
npm add @kkt/plugin-stylus --dev
```

### With the default options

```js
// .kktrc.js
module.exports = {
  plugins: [
    require.resolve('@kkt/plugin-stylus'),
  ],
};
```
