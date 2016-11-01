var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/request': {
        target: 'http://127.0.0.1:8888/request',
        changeOrigin: true,
        pathRewrite: {
          '^/request': ''
        }
      },
      '/upload': {
        target: 'http://127.0.0.1:8888/upload',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': ''
        }
      }
    },
    cssSourceMap: true
  }
}
