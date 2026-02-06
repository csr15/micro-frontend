const { merge } = require('webpack-merge');
const { dependencies } = require('../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');
const DOMAIN_NAME = process.env.DOMAIN_NAME;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:12].js',
    clean: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        'marketing': `marketing@${DOMAIN_NAME}/marketing/remoteEntry.js`
      },
      shared: dependencies
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig);