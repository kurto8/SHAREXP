// const webpack = require('webpack');
const path = require('path');
const process = require("process");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  entry: path.resolve(__dirname, "./client/static/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new MiniCssExtractPlugin(),
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
    ],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js|jsx)$/,
  //       use: 'babel-loader',
  //       exclude: /node_modules/
  //     },
  //     {
  //       test: /\.png$/,
  //       use: [
  //         {
  //           loader: 'url-loader',
  //           options: {
  //             mimetype: 'image/png'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       test: /\.scss$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         'css-loader',
  //         'sass-loader'
  //       ]
  //     },
  //     {
  //       test: /\.svg$/,
  //       use: 'file-loader'
  //     },
  //     {
  //       test: /\.ts(x)?$/,
  //       loader: 'ts-loader',
  //       exclude: /node_modules/
  //     },
  //     {
  //       test: /\.css$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         'css-loader'
  //       ]
  //     }
  //   ]
  // },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js'
    ],
  }
};

module.exports = config;