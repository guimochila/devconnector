const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: {
    bundle: './src/BrowserEntry.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.join(__dirname, 'public/assets'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('postcss-preset-env')()],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/assets/',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000/api',
    },
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'style.css' })],
};

module.exports = config;
