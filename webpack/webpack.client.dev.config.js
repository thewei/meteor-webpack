var webpack = require('webpack');
var config = require('./webpack.client.config');
var _ = require('lodash');
var devProps = require('./devProps');
var path = require('path');

function nodeModulePath(p){
    return path.join(__dirname,'../node_modules/',p);
}

config = _.cloneDeep(config);
config.entry.unshift( nodeModulePath('webpack-dev-server/client') + '?http://localhost:'+devProps.webpackPort+'/', nodeModulePath('webpack/hot/only-dev-server'));

var config = module.exports = _.assign( config, {
    plugins: (config.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]),
});
