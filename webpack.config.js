const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const BUILD_PATH = path.resolve(__dirname, "build");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: { index: "./index" },
  plugins: [
    new CopyWebpackPlugin([
      { from: "../package.json", to: BUILD_PATH },
      { from: "../LICENSE", to: BUILD_PATH }
    ])
  ],
  output: {
    path: BUILD_PATH,
    library: "scrivito-youtube-video-widget",
    libraryTarget: "umd"
  }
};
