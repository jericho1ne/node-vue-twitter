const path = require("path");

// console.log(`[vue.config.js] building to path:`)
// console.log( path )

module.exports = {
  // https://stackoverflow.com/questions/48851677/how-to-direct-vue-cli-to-put-built-project-files-in-different-directories
  outputDir: path.resolve(__dirname, "../node-firebase/public/"),
  // https://github.com/vuejs/vue-cli/issues/1616#issuecomment-398657605
  devServer: {
    // port: 3000,
    host: '127.0.0.1',
    hot: true,
    disableHostCheck: true,
  },
  // https://github.com/vuejs/vue-cli/issues/1875#issuecomment-408739414
  runtimeCompiler: true
}
