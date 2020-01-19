const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
      template: "src/map.html",
      filename: "map.html"
    }),
    new HtmlWebpackPlugin({
      // Load a custom template
      template: "src/de/map.html",
      filename: "de/map.html"
    }),
    new webpack.NamedModulesPlugin(),
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
  mode: "development",
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",

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

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

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
