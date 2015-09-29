var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var symlink = require('gulp-symlink');
var del = require('del');
var copy = require('gulp-copy-ext');
var sequence = require('gulp-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackClientDevConfig = require('../webpack/webpack.client.dev.config');
var webpackClientProConfig = require('../webpack/webpack.client.pro.config');
var webpackServerDevConfig = require('../webpack/webpack.server.config');
var cwd = process.cwd();
var pkg = require(path.join(cwd, './package.json'));

function appPath(p){
	return path.join(cwd, p);
}

var loadClientBundle = appPath(pkg.buildConfig.dist.loadClientBundle);
var serverBundle = appPath(pkg.buildConfig.dist.server);
var clientBundle = appPath(pkg.buildConfig.dist.client);
var _serverBundle = appPath('./webpack/assets/server.bundle.js');
var _clientBundle = appPath('./webpack/assets/client.bundle.js');
var _loadClientBundle = path.join(__dirname, '../webpack/loadClientBundle.html');
var serverEntry = appPath(pkg.buildConfig.entry.server);
var clientEntry = appPath(pkg.buildConfig.entry.client);

function runWebpack(opts, callback){
	var config = {};
	switch(opts){
		case "client":
			config = webpackClientProConfig;
			break;
		case "server":
			config = webpackServerDevConfig;
	}
	// run webpack
	return webpack( config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true 
        }));
        if(callback) callback();
    });
};

function runWebpackServer(callback){
	// Start a webpack-dev-server
    var compiler = webpack(webpackClientDevConfig);

    return new WebpackDevServer(compiler, {
		contentBase: "./dist",
		publicPath: "/assets/",
  		hot: true,
        stats: { 
        	colors: true 
        }
    }).listen( 9090, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        if(callback) callback();
    });
}

// clean
gulp.task('clean:bundle', function(){
	return del([ clientBundle, serverBundle, loadClientBundle ]);
});

// 编译 client
gulp.task('build:client:development', function(callback){
	return runWebpackServer(callback);
});

// 编译 client
gulp.task('build:client:production', function(callback){
	return runWebpack("client", callback);
});

// 编译 server
gulp.task('build:server:development', function(callback){
	return runWebpack("server", callback);
});

// 编译 server
gulp.task('build:server:production', function(callback){
	return runWebpack("server", callback);
});

gulp.task('link:client:development', function(){
	return gulp.src([ _serverBundle , _loadClientBundle ])
	    .pipe(symlink([ serverBundle, loadClientBundle]))
});

gulp.task('copy:client:production', function(){
	gulp.src([ _clientBundle ])
	    .pipe(copy())
	    .pipe(gulp.dest( path.join(clientBundle,'../') ));
});

gulp.task('copy:server:production', function(){
	gulp.src([ _serverBundle ])
	    .pipe(copy())
	    .pipe(gulp.dest( path.join(serverBundle,'../') ));
});

gulp.task('watch:client', function(){
	gulp.watch([  path.join( serverEntry,'../','server','/**/**'), serverEntry ],['build:server:development']);
});

// server
gulp.task("server", sequence('clean:bundle', 'build:server:development', 'build:client:development', 'watch:client', 'link:client:development'));

// build
gulp.task("build", sequence('clean:bundle', 'build:server:production', 'build:client:production', 'copy:client:production', 'copy:server:production'));
