const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /three\/examples\/js/,
        use: 'imports-loader?THREE=three'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)/,
        loader: 'url-loader',
        query: {
          limit: 20000,
          name: 'image/[name]-[hash:4].[ext]'
        }
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      }
    ]
  }
}
