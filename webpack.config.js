const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = (env) => {
  const envConfig = require(`./webpack.${env.conf}`);
  console.log(env);
  return webpackMerge({mode: env.mode}, commonConfig, envConfig);
};
