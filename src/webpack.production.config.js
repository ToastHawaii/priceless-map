const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.join(__dirname, "./"),
  entry: {
    en: "./en/local.ts",
    de: "./de/local.ts",
    app: "./script.ts"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/.."
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Load a custom template
      template: "./en/index.html",
      filename: "./index.html",
      chunks: ["app", "en"]
    }),
    new HtmlWebpackPlugin({
      // Load a custom template
      template: "./de/index.html",
      filename: "./de/index.html",
      chunks: ["app", "de"]
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./www" },
        {
          from: "*.css*",
          to: __dirname + "/../lib/",
          context: __dirname + "/../node_modules/leaflet/dist/"
        },
        {
          from: "**/*.png",
          to: __dirname + "/../lib/",
          context: __dirname + "/../node_modules/leaflet/dist/"
        },
        {
          from: "*.css*",
          to: __dirname + "/../lib/",
          context: __dirname + "/../node_modules/leaflet-overpass-layer/dist/"
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
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
          MiniCssExtractPlugin.loader,
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
