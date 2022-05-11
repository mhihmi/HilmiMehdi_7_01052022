const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  productionSourceMap: false,
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        sourceMap: true,
        additionalData: `@import "@/styles/utils";`,
      },
    },
  },
});
