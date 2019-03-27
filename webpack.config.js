const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const SRC_PATH = path.join(__dirname, "src");
const BUILD_PATH = path.resolve(__dirname, "build");

const DEPENDENCIES = require("./package.json").dependencies || {};
const PEER_DEPENDENCIES = require("./package.json").peerDependencies;

module.exports = (env, argv) => {
  const plugins = [
    new CopyWebpackPlugin([
      { from: "../LICENSE", to: BUILD_PATH },
      { from: "../package.json", to: BUILD_PATH },
      { from: "../readme.mdown", to: BUILD_PATH },
      { from: "**/*.css", to: BUILD_PATH },
    ]),
  ];
  if (argv.mode === "production") {
    plugins.unshift(new CleanWebpackPlugin());
  }

  return {
    context: SRC_PATH,
    entry: { index: "./index" },
    output: {
      path: BUILD_PATH,
      library: "scrivito-youtube-video-widget",
      libraryTarget: "umd",
    },
    externals: [
      ...Object.keys(DEPENDENCIES),
      ...Object.keys(PEER_DEPENDENCIES),
    ],
    plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [SRC_PATH],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-react",
                  [
                    "@babel/preset-env",
                    {
                      debug: false,
                      modules: false,
                      shippedProposals: false,
                      useBuiltIns: false,
                      targets: {
                        browsers: ["Chrome >= 41", "last 2 versions"],
                      },
                    },
                  ],
                ],
                cacheDirectory: "tmp/babel-cache",
              },
            },
          ],
        },
        {
          test: /\.(svg|gif)$/,
          use: ["url-loader"],
        },
      ],
    },
  };
};
