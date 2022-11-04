// vue.config.js
const fs = require("fs")


const cookie = fs.existsSync("./cookies") ? fs.readFileSync("./cookies", "utf-8") : ""


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
        target: 'https://www.wegame.com.cn/',
        ws: true,
        changeOrigin: true,
        onProxyReq:function (proxyReq, req, res) {
          proxyReq.setHeader('trpc-caller', "wegame.pallas.web.LolBattle");
          proxyReq.setHeader('cookie', cookie);
          proxyReq.setHeader('referer', 'https://www.wegame.com.cn/ioi');
          proxyReq.setHeader('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26');
        }
      },
    }
  }
};
