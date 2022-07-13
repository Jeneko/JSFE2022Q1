const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'images'),
          to: path.resolve(__dirname, 'dist', 'images'),
        }
      ]
    }),
    new EslintWebpackPlugin({ extensions: '.ts', fix: true }),
  ],
}
