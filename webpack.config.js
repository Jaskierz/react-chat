const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './build/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: {
    app: './build/js/app.js'
  },
  output: {
    filename: 'app.js',
    path: path.resolve('public/'),
  },
  devtool: 'source-map',
  module: {
    loaders: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve('./node_modules/susy/sass')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
};
