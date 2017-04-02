import {NoEmitOnErrorsPlugin} from 'webpack'
import {distPath} from './config'

const config = {
  devtool: 'source-map',
  entry: {
    index: './server.js'
  },
  output: {
    path: distPath,
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
