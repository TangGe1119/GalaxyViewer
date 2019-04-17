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
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
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
  },
  resolve: {
    alias: {
      three$: 'three/build/three.min.js',
      'three/.*$': 'three'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three'
    })
  ]
}
