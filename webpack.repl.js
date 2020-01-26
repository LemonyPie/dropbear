const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "node",
  entry: {
    dropbear: "./src/dropbear.ts",
  },
  devtool: "eval-source-map",
  plugins: [
    new webpack.BannerPlugin({banner: "#!/usr/bin/env node", raw: true}),
  ],
  output: {
    filename: "dropbear",
    path: path.resolve(__dirname, "bin"),
  },
};
