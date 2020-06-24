const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const sourceDirectory = path.resolve(__dirname, './src');
const buildDirectory = path.resolve(__dirname, './build');
const assetsDirectory = path.resolve(__dirname, './resources');

module.exports = {
  entry: {
    main: path.resolve(sourceDirectory, './MainEntry.tsx'),
    options: path.resolve(sourceDirectory, './OptionsEntry.tsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: buildDirectory,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['awesome-typescript-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      title: 'Homescreen',
      chunks: ["main"],
      template: path.resolve(sourceDirectory, './main.development.html'),
      filename: path.resolve(buildDirectory, './main.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Homescreen Options',
      chunks: ["options"],
      template: path.resolve(sourceDirectory, './options.development.html'),
      filename: path.resolve(buildDirectory, './options.html'),
    }),
    new CopyWebpackPlugin([{
      from: assetsDirectory, to: './resources'
    }])
  ],
  optimization: {
    // minimizer: [new UglifyJSPlugin({ sourceMap: true })],
  }
};
