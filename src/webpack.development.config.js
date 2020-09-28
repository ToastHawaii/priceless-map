const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
  mode: "development",
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",

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

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
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
