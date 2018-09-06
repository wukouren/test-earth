const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const express = require('express');
const router = express.Router();
module.exports = {
  // return{
  entry: {
    'scripts/fix': [path.resolve(__dirname, 'src/scripts/fix.js')],
    'scripts/index': [path.resolve(__dirname, 'src/scripts/index.js')],
    'scripts/router': [path.resolve(__dirname, 'src/scripts/router.js')],
    // 'scripts/constants':[path.resolve(__dirname, 'src/scripts/constants.js')],
  },
  // 查错设置，添加此配置后，开发过程中能定位到错误的具体位置，生产时可关闭
  // devtool: 'source-map',
  //入口文件输出配置
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: "scripts/[name].js?v=[chunkhash:8]",
    // 为生产环境打包代码时，需把publicpath打开
    // publicPath: '/dist/pointsmallmobile/'
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    extensions: ['.web.js', '.jsx', '.js', '.json']
  },
  module: {
    //加载器配置
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      // css和scss的处理交由gulp来处理
      { test: /\.css$/, loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'] },
      { test: /.scss$/, loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'] },
      { test: /.less$/, loaders: ['style-loader', 'css-loader?importLoaders=1', 'less-loader'] },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'file?name=/public/[name].[ext]' },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        query: {
          name: 'static/[name].[hash:8].[ext]'
        }
      },
      // {
      //   loader:"postcss-loader",
      //   options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
      //       plugins: (loader) => [
      //           require('autoprefixer')(), //CSS浏览器兼容
      //       ]
      //   }
      // }

      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      // {test: /\.css$/,loaders: ['style-loader','css-loader?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]','postcss-loader']},
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } })
  ],
  externals: {
    jquery: "window.$"
  },
  devServer: {
    contentBase: "./src",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    // publicPath:'dlmmobile',
    hot: true,
    open: true,
    inline: true,//实时刷新,
    // 本地假数据
    // setup: function(app) {
    //   require('./routers/router')(app,'/api');
    // },
    proxy: {
      '/api/*': {
        target: "https://soaptest.joywok.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        secure: false,
      },
      // '/daditestgroup/*': {
      //   // target: "http://10.1.11.64/",
      //   // target: "https://ework.95590.cn/agent/",
      //   target: "https://test.95590.cn:20043/",
      //   // target: "http://10.1.11.115:8080/",
      //   changeOrigin: true,
      //   secure: false,
      // },
      '/agent/*': {
        // target: "http://10.1.11.64/",
        target: "https://ework.95590.cn/",
        // target: "https://test.95590.cn:20043/",
        // target: "http://10.1.11.115:8080/",
        changeOrigin: true,
        secure: false,
      },
      '/jmis/*': {
        // target: "https://test.95590.cn:20043/",
        target: "https://ework.95590.cn/",
        changeOrigin: true,
        secure: false,
      }
    }
  }
};
