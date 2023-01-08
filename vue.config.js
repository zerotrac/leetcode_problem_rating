const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/data.json": {
        target: "https://zerotrac.github.io/leetcode_problem_rating",
        secure: false,
      },
      "/localData.json": {
        target: "/",
        secure: false,
      },
    },
  },
  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          maxSize: 600000,
          maxInitialRequests: 20,
          priority: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    });
  },
});
