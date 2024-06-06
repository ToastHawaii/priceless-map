const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.join(__dirname, "./"),
  entry: {
    en: "./en/main.ts",
    de: "./de/main.ts",
  },
  output: {
    filename: "[name]/main.js",
    path: __dirname + "/../../docs",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "../_temp/en/index.html",
      filename: "./index.html",
      chunks: ["en"],
    }),
    new HtmlWebpackPlugin({
      template: "../_temp/de/index.html",
      filename: "./de/index.html",
      chunks: ["de"],
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./www" },
        { from: "./www/LICENSE", to: "[path]/../../[name][ext]" },
        { from: "./www/docs/README.md", to: "[path]/../../[name][ext]" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/main.css",
    }),
  ],
  mode: "production",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env", "@babel/typescript"],
              plugins: [
                ["@babel/transform-runtime"],
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
              ],
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                plugins: [new CleanCSSPlugin({ advanced: true })],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
    ],
  },
};
