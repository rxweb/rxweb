export const WEBPACK_PLUGIN = `const { TranslationWebpackPlugin } = require("@rxweb/i18n");
module.exports = {
  plugins: [
        new TranslationWebpackPlugin()
  ]
};
`
