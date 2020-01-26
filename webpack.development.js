module.exports = {
  entry: {
    main: "./src/index.ts",
    repl: "./src/repl.ts"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
};
