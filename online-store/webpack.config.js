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
    assetModuleFilename: 'images/assets/[name]-[hash][ext]',
    clean: true,
  },
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
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
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
        },
        {
          from: path.resolve(__dirname, 'src', 'data'),
          to: path.resolve(__dirname, 'dist', 'data'),
        }
      ]
    }),
    new EslintWebpackPlugin({ extensions: '.ts', fix: true }),
  ],
}
