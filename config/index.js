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
      'http://cakeees.top/request': {
        target: 'http://127.0.0.1/request',
        changeOrigin: true
      },
      '/upload': {
        target: 'http://127.0.0.1/upload',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': ''
        }
      }
    },
    cssSourceMap: true
  }
}
