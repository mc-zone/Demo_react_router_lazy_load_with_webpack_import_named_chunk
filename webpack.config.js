const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
     './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    chunkFilename: '[name].chunk.js',
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["es2015", { "modules": false }],
              "react",
            ],
            plugins: ['syntax-dynamic-import'] 
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'tpl.html'
    })
  ]
};
