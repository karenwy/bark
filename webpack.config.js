const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './public/src/index.js',   // entry file
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',                // dev server
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      // JS with Babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // transpile modern JS
          },
        },
        type: 'javascript/auto' // fixes "sourceType" errors
      },
      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader', // inject in dev, extract in prod
          'css-loader',        // turns CSS into JS modules
          'postcss-loader',    // autoprefixer
          'sass-loader',       // compiles Sass to CSS
        ],
      },
      //HTML (<img src="...">)
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...', // keep the defaults
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'srcset',
                type: 'srcset',
              }
            ],
          },
        },
      },
      // Images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // handle images
        generator: {
          filename: 'assets/images/[name][hash][ext][query]', // copies into dist/assets/images
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource', // handle fonts
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
  ],
  optimization: {
    minimize: isProd,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};