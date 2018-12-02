const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const cleanWebpackPlugin = new CleanWebpackPlugin(
  ['dist'],
  { root: __dirname, verbose: true, dry: false, exclude: [] }
)

const copyWebpackPlugin = new CopyWebpackPlugin([
  { from: 'public/assets' },
  { from: 'manifest.yml' }
])

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html'
})

module.exports = {
  plugins: [htmlWebpackPlugin, copyWebpackPlugin, cleanWebpackPlugin],
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]_[local]_[hash:base64]',
          sourceMap: true,
          minimize: true
        }
      }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    }
    ]
  },
  devServer: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:9000'
      }
    }
  }
}
