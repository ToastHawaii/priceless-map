const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglify-es-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/script.ts",
  output: {
    filename: "script.js",
    path: __dirname + "/.."
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Load a custom template
      template: "src/index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      // Load a custom template
      template: "src/de/index.html",
      filename: "de/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new UglifyJSPlugin({
      compress: {
        drop_console: true
      }
    }),
    new CopyWebpackPlugin([
      { from: "src/www" },
      {
        from: "*.css*",
        to: "lib/",
        context: "node_modules/leaflet/dist/"
      },
      {
        from: "**/*.png",
        to: "lib/",
        context: "node_modules/leaflet/dist/"
      },
      {
        from: "*.css*",
        to: "lib/",
        context: "node_modules/leaflet-overpass-layer/dist/"
      }
    ])
  ],
  mode: "production",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      // When using TypeScript, Babel is not required, but React Hot Loader will not work (properly) without it.
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: true
            }
          },
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: "src/tsconfig.json"
            }
          }
        ]
      },

      // Load CSS files, embed small PNG/JPG/GIF/SVG images as well as fonts as Data URLs and copy larger files to the output directory
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
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
