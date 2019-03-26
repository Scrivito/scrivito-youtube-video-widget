const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV || "production";
const BUILD_PATH = path.resolve(__dirname, "build");

module.exports = {
  mode: NODE_ENV,
  context: path.join(__dirname, "src"),
  entry: { index: "./index" },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(NODE_ENV) },
    }),
    new CopyWebpackPlugin([
      { from: "../package.json", to: BUILD_PATH },
      { from: "../LICENSE", to: BUILD_PATH },
    ]),
  ],
  output: {
    path: BUILD_PATH,
    library: "scrivito-youtube-video-widget",
    libraryTarget: "umd",
  },
};
