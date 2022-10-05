const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    filename: "main.js",
    path: path.resolve('./dist/'),
    clean: true
  },
  module:{
    rules: [
      {
        test: /(\.?(ts|js)x$)|(\.?(ts|js)$)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
                sourceMap: false
            }
        }
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['html-loader']
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: ['handlebars-loader']
      }
    ]
  },
  plugins: [
    new RemovePlugin({
      watch:{
        include:[
          './dist/'
        ]
      }
    }),
    new HtmlWebpackPlugin({
      title: "Chat",
      description: "Real-time chat app",
      template: 'src/templates/index.hbs',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  devServer: {
    port: 80,
    static: {
      directory: path.resolve(__dirname, './dist/')
    },
    devMiddleware:{
      index: 'index.html',
      writeToDisk: true
    }
  }
}
