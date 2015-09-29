var path = require('path');
var webpack = require('webpack');
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
        appPath('./app/main-server'),
    ],
    //target: 'node',
    output: {
        path: appPath('webpack/assets'),
        filename: 'server.bundle.js',
        publicPath: '/assets/',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            app: appPath('./app'),
            'babel-runtime': nodeModulePath('babel-runtime')
        },
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: [ nodeModulePath('react-hot-loader'), nodeModulePath('babel-loader?optional[]=runtime&stage=0') ],
            exclude: /node_modules|lib/,
        }, {
            test: /\.json$/,
            loader: nodeModulePath('json-loader')
        }, ],
    },
};
