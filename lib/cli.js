#!/usr/bin/env node

var program = require('commander');
var gulp = require('gulp');
var gulpfile = require('./gulpfile');

program
    .version(require('../package').version, '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .parse(process.argv);

var subcmd = program.args[0];
var args = process.argv.slice(3);

if (!subcmd) {
    program.help();
} else {
    try {
        gulp.start(subcmd);
    } catch (err) {
        program.help();
    }
}

function printHelp() {
    console.log('  Commands:');
    console.log();
    console.log('    init           initialize');
    console.log('    build          build entry files specified in package.json');
    console.log('    server         debug with server');
    console.log();
}
