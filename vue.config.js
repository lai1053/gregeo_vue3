// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

let urlTarget = ''
if (isProduction) {
  urlTarget = 'https://api.grewalleco.com/'
} else {
  // urlTarget = 'http://192.168.1.61:8000/'
  urlTarget = 'https://marketing-api-test.grewalleco.com/'
}
// 线上打包路径，请根据项目实际线上情况
//const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
// 线上打包路径生产环境下为CDN 切换CDN地址引用
let BASE_URL = '/'
const result = require('dotenv').config()
const NODE_ENV_DIR = process.env.NODE_ENV_DIR
console.log(result, NODE_ENV_DIR)
if (isProduction) {
  BASE_URL = result.parsed.DB_BASE_URL + NODE_ENV_DIR
}

module.exports = {
  // 镜像文件
  productionSourceMap: false,
  // configureWebpack: config => {
  //   // 生产环境相关配置
  //   if (isProduction) {
  //     //gzip压缩
  //     const productionGzipExtensions = ['html', 'js', 'css']
  //     config.plugins.push(
  //       new CompressionWebpackPlugin({
  //         filename: '[path].gz[query]',
  //         algorithm: 'gzip',
  //         test: new RegExp(
  //           '\\.(' + productionGzipExtensions.join('|') + ')$'
  //         ),
  //         threshold: 10240, // 只有大小大于该值的资源会被处理 10240
  //         minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
  //         deleteOriginalAssets: false // 删除原文件
  //       })
  //     )
  //   }
  // },
  // 基本路径
  publicPath: BASE_URL,
  // 输出路径
  outputDir: 'dist',
  // 静态资源
  assetsDir: '.',
  // eslint-loader是否在保存时候检查
  lintOnSave: false,
  // 服务项配置

  devServer: {
    host: '0.0.0.0',
    port: 8081,
    https: false,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true, // 禁用主机检查
    //设置代理proxy
    /*proxy: {
      '/api': {
       target: 'http://192.168.0.104:80/',
        ws: false, //websocket支持
        changeOrigin: false,    //表示是否跨域，
        pathRewrite: {           //表示需要rewrite重写的
          '^/api': '/api'
        }
      }
    }*/
    proxy: {
      '/api': {
        target: urlTarget,
        secure: false, //接受运行在https上，默认不接受
        ws: false, //websocket支持
        changeOrigin: false, //表示是否跨域，
        pathRewrite: {
          //表示需要rewrite重写的
          '^/api': '/api',
        },
      },
    },
  },

  /*  // webpack配置别名
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },*/
}
