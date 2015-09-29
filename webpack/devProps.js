var path = require('path');
var cwd = process.cwd();
var pkg = require( path.join( cwd, './package.json' ) );
var host = '0.0.0.0';
var webpackPort = pkg.devServer && pkg.devServer.webpackPort || 9090;
var meteorPort = pkg.devServer && pkg.devServer.meteorPort || 3000;

module.exports = {
  host: host,
  webpackPort: webpackPort, 
  meteorPort: meteorPort,
  baseUrl: 'http://' + host + ':' + webpackPort,
  contentBase: 'http://' + host + ':' + meteorPort,
};