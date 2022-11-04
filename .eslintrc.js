module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 'plugin:vue/essential',
    // '@vue/standard',
    'plugin:vue/essential',
  ],
  // 全局变量
  globals: {
    __DEV__: true,
    __WECHAT__: true,
    __ALIPAY__: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-new-func': 'off',
    'standard/no-callback-literal': 'off',
    'no-throw-literal': 'off',
    'no-async-promise-executor': 'off',
    'no-misleading-character-class': 'off',
    'no-useless-catch': 'off',
    'no-return-await': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
