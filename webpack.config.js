const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: './dist',
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      { // JS
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      { // SASS
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // extract CSS in prod
          'css-loader',
          'postcss-loader', // autoprefixer
          'sass-loader'
        ],
      },
      { // images
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' })
  ]
};