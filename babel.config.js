module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env'
    ]
  ],
  plugins: [
    'add-module-exports',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining'
  ],
  ignore: ['src/**/*.ctx.js']
};
