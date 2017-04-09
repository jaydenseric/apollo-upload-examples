import path from 'path'
import {NoEmitOnErrorsPlugin} from 'webpack'

const config = {
  devtool: 'source-map',
  entry: {
    index: './server.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: /^(?!\.|\/).+/i,
  target: 'node',
  node: {
    __dirname: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: process.env.NODE_ENV === 'development'
        }
      }
    }, {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    }]
  }
}

if (process.env.NODE_ENV === 'development') {
  config.plugins = [
    new NoEmitOnErrorsPlugin()
  ]
}

export default config
