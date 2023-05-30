const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  devtool: 'inline-source-map',
  entry: './index.ts',
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: [
        /node_modules/,
        /dist/,
      ],
    }]
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
};