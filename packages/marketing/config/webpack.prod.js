const { merge } = require('webpack-merge');
const { dependencies } = require('../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:12].js',
    clean: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap'
      },
      shared: dependencies
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig);