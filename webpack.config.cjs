// const webpack = require('webpack');
const path = require('path');
const process = require("process");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

const config = {
  mode: process.env.NODE_ENV || 'production',
  devServer: {
    compress: true,
    static: {
      directory: path.join(__dirname, 'client/static/'),
      publicPath: '/',
    },
    host: 'localhost',
    port: 3000,
    proxy: { "/api": "http://localhost:8080" },
  },
  entry: path.resolve(__dirname, "./client/components/App.tsx"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new MiniCssExtractPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.ts(x)?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          }
        },
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: [
      '.jsx',
      '.js',
      '.tsx',
      '.ts'
    ],
  }
};

module.exports = config;