const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const path = require("path");

module.exports = {
  context: path.join(__dirname, "./"),
  entry: "./script.ts",
  output: {
    filename: "script.js",
    path: __dirname + "/.."
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Load a custom template
      template: "./index.html",
      filename: "./index.html"
    }),
    new HtmlWebpackPlugin({
      // Load a custom template
      template: "./de/index.html",
      filename: "./de/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./www" },
        {
          from: "*.css*",
          to: "../lib/",
          context: "../node_modules/leaflet/dist/"
        },
        {
          from: "**/*.png",
          to: "../lib/",
          context: "../node_modules/leaflet/dist/"
        },
        {
          from: "*.css*",
          to: "../lib/",
          context: "../node_modules/leaflet-overpass-layer/dist/"
        }
      ]
    })
  ],
  mode: "production",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
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
                "@babel/proposal-object-rest-spread"
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                plugins: [new CleanCSSPlugin({ advanced: true })]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  }
};
