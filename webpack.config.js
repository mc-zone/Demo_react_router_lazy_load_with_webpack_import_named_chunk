const path = require("path");
const webpack = require("webpack");

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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ]
};
