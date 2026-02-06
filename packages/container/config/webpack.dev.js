const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        'marketing': 'marketing@http://localhost:8081/remoteEntry.js'
      },
      shared: dependencies
    }),
  ]
};

module.exports = merge(commonConfig, devConfig);