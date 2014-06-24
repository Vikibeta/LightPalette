// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
'use strict';

var fs = require('fs');
var path = require('path');

var site = fw.module('db_model').Site;

exports.global = {
	lib: [
		'/lib/crypto'
	],
	main: 'global',
};

// frontstage drivers
var drivers = exports.drivers = {
	parent: 'global',
	main: {
		src: [],
		minify: 'drivers/min.js'
	},
	style: {
		src: [],
		minify: 'drivers/min.css'
	},
	tmpl: {
		src: [],
		minify: 'drivers/min.tmpl'
	},
};
var dirs = fs.readdirSync('client/drivers');
for(var i=dirs.length-1; i>=0; i--) {
	var dir = dirs[i];
	if(!fs.statSync('client/drivers/' + dir).isDirectory())
		continue;
	var files = fs.readdirSync('client/drivers/' + dir);
	for(var j=files.length-1; j>=0; j--) {
		var file = files[j];
		var ext = path.extname(file);
		if(ext === '.js' && file.slice(-7) !== '.min.js') {
			if(file === 'main.js')
				drivers.main.src.push('drivers/' + dir + '/' + file);
			else
				drivers.main.src.unshift('drivers/' + dir + '/' + file);
		}
		if(ext === '.stylus' || (ext === '.css' && file.slice(-8) !== '.min.css')) {
			if(file === 'main.stylus' || file === 'main.css')
				drivers.style.src.push('drivers/' + dir + '/' + file);
			else
				drivers.style.src.unshift('drivers/' + dir + '/' + file);
		}
		if(ext === '.tmpl') {
			if(file === 'main.tmpl')
				drivers.tmpl.src.push('drivers/' + dir + '/' + file);
			else
				drivers.tmpl.src.unshift('drivers/' + dir + '/' + file);
		}
	}
}

// frontstage
var frontstage = exports.forestage = {
	parent: 'drivers',
	lib: {
		src: [],
		minify: 'theme/min.js'
	},
	style: {
		src: [],
		minify: 'theme/min.css'
	},
	tmpl: {
		src: [],
		minify: 'theme/min.tmpl'
	},
	main: 'frontstage',
	render: 'frontstage',
	reload: 'both'
};

// get theme file list
if(fs.existsSync('client/theme')) {
	var files = fs.readdirSync('client/theme');
	for(var i=0; i<files.length; i++) {
		var file = files[i];
		var ext = path.extname(file);
		if(ext === '.js' && file.slice(-7) !== '.min.js') {
			if(file === 'main.js')
				frontstage.lib.src.push('theme/' + file);
			else
				frontstage.lib.src.unshift('theme/' + file);
		}
		if(ext === '.stylus' || (ext === '.css' && file.slice(-8) !== '.min.css')) {
			if(file === 'main.css' || file === 'main.stylus')
				frontstage.style.src.push('theme/' + file);
			else
				frontstage.style.src.unshift('theme/' + file);
		}
		if(ext === '.tmpl') {
			if(file === 'main.tmpl')
				frontstage.tmpl.src.push('theme/' + file);
			else
				frontstage.tmpl.src.unshift('theme/' + file);
		}
	}
}
if(!frontstage.lib.src.length)
	delete frontstage.lib;
if(!frontstage.style.src.length)
	delete frontstage.style;
if(!frontstage.tmpl.src.length)
	delete frontstage.tmpl;

exports['*'] = {
	parent: 'forestage',
	render: 'index',
};
