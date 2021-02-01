const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 2358,
    historyApiFallback: true,
    hot: true,
  },
})
