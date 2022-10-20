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
    home: {
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      filename: 'home.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'home']
    },
  }
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
