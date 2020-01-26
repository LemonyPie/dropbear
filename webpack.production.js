const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.ts",
    repl: "./src/repl.ts"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
      template: "index.html"
    }),
  ],
};
