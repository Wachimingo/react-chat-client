const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  target: ['web', 'es6'],
  entry: './src/index.tsx',
  output: {
    filename: "main.[hash].js",
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
    new HtmlWebpackPlugin({
      title: "Chat",
      description: "Real-time chat app",
      template: 'src/templates/index.hbs',
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks:{
        chunks: 'all',
        minSize: 10000,
        automaticNameDelimiter: '_'
    }
},
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
