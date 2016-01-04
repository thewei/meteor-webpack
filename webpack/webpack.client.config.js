var path = require('path');
var webpack = require('webpack');
var devProps = require('./devProps');
var cwd = process.cwd();
var pkg = require(path.join(cwd, './package.json'));

function appPath(p){
    return path.join(cwd, p);
}

function nodeModulePath(p){
    return path.join(__dirname,'../node_modules/',p);
}

module.exports = {
    entry: [
        pkg.buildConfig.entry.client,
    ],
    //target: 'node',
    devtool: 'eval',
    output: {
        path: appPath('webpack/assets'),
        filename: 'client.bundle.js',
        publicPath: 'http://localhost:'+devProps.webpackPort+'/assets/',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'babel-runtime': nodeModulePath('babel-runtime')
        },
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: [ nodeModulePath('react-hot-loader'), nodeModulePath('babel-loader?optional[]=runtime&stage=0') ],
            exclude: /node_modules|lib/,
        }, {
            test: /\.css$/,
            loaders: [ nodeModulePath('style-loader'), nodeModulePath('css-loader') ]
        }, {
            test: /\.json$/,
            loader: nodeModulePath('json-loader')
        }, ],
    }
};
