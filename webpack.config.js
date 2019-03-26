const path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: { index: "./index" },
  output: {
    path: path.resolve(__dirname, "build"),
    library: "scrivito-youtube-video-widget",
    libraryTarget: "umd"
  }
};
