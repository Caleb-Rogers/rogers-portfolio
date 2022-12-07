var path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',  
  entry: './src/index.js',
  output: {
    filename: 'bundle.[fullhash].js',
    publicPath: "/build/",
    path: path.join(__dirname, 'build')
  },
  resolve: {
    alias: {
        "react-dom": "@hot-loader/react-dom",
    },
  },
  target: 'web', 
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
                modules: true,
                modules : {
                localIdentName: '[name]__[local]__[fullhash:base64:5]',
                },
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/devil-icon.png'
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
};