// vue.config.js
const fs = require("fs")




module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // outputDir: './dist',
  indexPath: process.env.VUE_APP_INDEX_PATH,
  // indexPath: '../../server/dist/home.html',
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },
    plugins: [
    ],
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '-'
      }
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } }, // importLoaders解决由于css-loader处理文件导入的方式导致postcss-loader不能正常使用的问题
          { loader: 'postcss-loader' }// 指定postcss加载器
        ],
        exclude: /node_modules/
      }]
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('html');
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end();
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.wegame.com.cn/api',
        ws: true,
        changeOrigin: true,
        headers:{
          "trpc-caller": "wegame.pallas.web.LolBattle",
          "cookie": fs.accessSync("./cookies") ? fs.readFileSync("./cookies", "utf-8") : ""
        }
      },
    }
  }
};
