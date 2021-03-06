
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const { name } = require('../package.json');

module.exports = {
  mode: 'production',
  entry: resolve(__dirname, '../src/index.ts'),
  output: {
    path: resolve(__dirname, '../dist'),
    filename: `${name}.js`,
    library: name,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', 'less'],
  },
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
};
