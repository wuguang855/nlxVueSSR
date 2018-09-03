module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  loaders: {
            css:"vue-style-loader!css-loader",
            less:"vue-style-loader!css-loader!less-loader",
            postcss:"vue-style-loader!css-loader",
            sass:"vue-style-loader!css-loader!sass-loader?indentedSyntax",
            scss:"vue-style-loader!css-loader!sass-loader",
            styl:"vue-style-loader!css-loader!stylus-loader",
            stylus:"vue-style-loader!css-loader!stylus-loader"
        },
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'Chrome 20', 'Chrome 21']
    })
  ]
}