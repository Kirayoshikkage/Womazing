const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
  pages: {
    index: {
      entry: "./src/pages/index/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Womazing",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    catalog: {
      entry: "./src/pages/catalog/main.js",
      template: "public/index.html",
      filename: "catalog.html",
      title: "Womazing",
      chunks: ["chunk-vendors", "chunk-common", "catalog"],
    },
    "about-brand": {
      entry: "./src/pages/about-brand/main.js",
      template: "public/index.html",
      filename: "about-brand.html",
      title: "Womazing",
      chunks: ["chunk-vendors", "chunk-common", "about-brand"],
    },
  },
});

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/styles/common/_mixins.scss"),
      ],
    });
}
