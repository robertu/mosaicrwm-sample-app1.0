const {
  override,
  addLessLoader,
  disableEsLint,
} = require("customize-cra");

module.exports = override(
	disableEsLint(),
  addLessLoader({
    strictMath: false,
    noIeCompat: true,
    localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
  })
);
