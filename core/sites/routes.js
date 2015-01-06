// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
	global: {
		lib: [
			{
				src: '/lib/jquery-1.11.1',
				userAgent: 'MSIE (6|7|8)\.'
			}, {
				src: '/lib/jquery-2.1.1',
				userAgent: '^.*(?!MSIE (6|7|8)\.)'
			}],
		style: 'main.css',
	},
	"*": {
		redirect: "/",
	},
	"/": {
		parent: 'global',
		main: 'index.js'
	},
	"/sites": {
		parent: 'global',
		main: 'sites.js',
		tmpl: 'sites.tmpl'
	},
	"/install": {
		parent: 'global',
		main: 'install.js',
		tmpl: 'install.tmpl'
	},
};
