const path = require('path');
const webpack = require('webpack');
const webpackCommonConf = require('./webpack.common');
const { smart } = require('webpack-merge');

const resolve = (relatedPath) => path.join(__dirname, relatedPath);

module.exports = smart(webpackCommonConf, {
  mode: 'development',
  devServer: {
    port: 9000,
    host: '0.0.0.0',
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    contentBase: resolve('../src')
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMENT: true,
    }),
  ],
});