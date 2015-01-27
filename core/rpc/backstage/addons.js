// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
'use strict';

var fs = require('fs');
var async = require('async');
var semver = require('semver');
var formFilter = fw.module('form_filter');
var User = fw.module('db_model').User;
var PluginSettings = fw.module('db_model').PluginSettings;
var ThemeSettings = fw.module('db_model').ThemeSettings;
var dbSites = fw.module('db_sites.js');

// get whole plugins list
exports.listPlugins = function(conn, res, args){
	User.checkPermission(conn, 'admin', function(r){
		if(!r) return res.err('noPermission');
		// collect plugin settings
		var blocked = !conn.app.config.app.enablePlugins;
		var enabledPlugins = conn.app.config.app.plugins;
		var pluginsInfo = {};
		async.waterfall([function(cb){
			fs.readdir('plugins', function(err, globalPlugins){
				if(err) return cb();
				async.each(globalPlugins, function(id, cb){
					var path = 'plugins/' + id;
					fs.readFile(path + '/plugin.json', function(err, buf){
						try { pluginsInfo[id] = JSON.parse(buf.toString('utf8')); } catch(e) {}
						cb();
					});
				}, cb);
			});
		}, function(cb){
			fs.readdir(conn.app.config.app.siteRoot + '/plugins', function(err, sitePlugins){
				if(err) return cb();
				async.each(sitePlugins, function(id, cb){
					var path = conn.app.config.app.siteRoot + '/plugins/' + id;
					fs.readFile(path + '/plugin.json', function(err, buf){
						try { pluginsInfo[id] = JSON.parse(buf.toString('utf8')); } catch(e) {}
						cb();
					});
				}, cb);
			});
		}], function(){
			// processing plugin infos
			var rows = [];
			for(var k in pluginsInfo) {
				pluginsInfo[k].id = k;
				pluginsInfo[k].enabled = (enabledPlugins.indexOf(k) >= 0);
				pluginsInfo[k].settings = !!pluginsInfo[k].settings;
				if(!pluginsInfo[k].lightpalette || !semver.satisfies(fw.config.lpVersion, pluginsInfo[k].lightpalette.toString()))
					pluginsInfo[k].incompatible = true;
				rows.push(pluginsInfo[k]);
			}
			rows.sort(function(a, b){
				return ( a.title <= b.title ? -1 : 1 );
			});
			res({blocked: blocked, rows: rows});
		});
	});
};

// get whole theme list
exports.listThemes = function(conn, res, args){
	User.checkPermission(conn, 'admin', function(r){
		if(!r) return res.err('noPermission');
		// collect theme settings
		var blocked = !conn.app.config.app.enableTheme;
		var enabledTheme = conn.app.config.app.theme;
		var themesInfo = {};
		async.waterfall([function(cb){
			fs.readdir('themes', function(err, globalThemes){
				if(err) return cb();
				async.each(globalThemes, function(id, cb){
					var path = 'themes/' + id;
					fs.readFile(path + '/theme.json', function(err, buf){
						try { themesInfo[id] = JSON.parse(buf.toString('utf8')); } catch(e) {}
						cb();
					});
				}, cb);
			});
		}, function(cb){
			fs.readdir(conn.app.config.app.siteRoot + '/themes', function(err, siteThemes){
				if(err) return cb();
				async.each(siteThemes, function(id, cb){
					var path = conn.app.config.app.siteRoot + '/themes/' + id;
					fs.readFile(path + '/theme.json', function(err, buf){
						try { themesInfo[id] = JSON.parse(buf.toString('utf8')); } catch(e) {}
						cb();
					});
				}, cb);
			});
		}], function(){
			// processing theme infos
			var rows = [];
			for(var k in themesInfo) {
				themesInfo[k].id = k;
				themesInfo[k].enabled = (k === enabledTheme);
				themesInfo[k].settings = !!themesInfo[k].settings;
				if(!themesInfo[k].lightpalette || !semver.satisfies(fw.config.lpVersion, themesInfo[k].lightpalette.toString()))
					themesInfo[k].incompatible = true;
				rows.push(themesInfo[k]);
			}
			rows.sort(function(a, b){
				return ( a.title <= b.title ? -1 : 1 );
			});
			res({blocked: blocked, rows: rows});
		});
	});
};

// enable/disable plugins
exports.alterPlugins = function(conn, res, args){
	var args = formFilter(args, {
		enable: [String, /\S([\S ]*\S)?/g],
		disable: [String, /\S([\S ]*\S)?/g],
		restart: ''
	});
	User.checkPermission(conn, 'admin', function(r){
		if(!r) return res.err('noPermission');
		var siteId = conn.app.config.app.siteId;
		dbSites.findById(siteId, function(err, site){
			if(err || !site) return res.err('system');
			var plugins = site.plugins;
			for(var i=plugins.length-1; i>=0; i--) {
				if(args.disable.indexOf(plugins[i]) >= 0) plugins.splice(i, 1);
			}
			site.plugins = plugins.concat(args.enable);
			site.save(function(){
				conn.app.config.app.plugins = site.plugins;
				conn.app.config.app.version = String(Date.now());
				if(args.restart) conn.app.restart();
				else res();
			});
		});
	});
};

// enable/disable themes
exports.alterThemes = function(conn, res, args){
	var args = formFilter(args, {
		enable: [String, /\S([\S ]*\S)?/g],
		restart: ''
	});
	if(!args.enable[0]) res.err('system');
	User.checkPermission(conn, 'admin', function(r){
		if(!r) return res.err('noPermission');
		var siteId = conn.app.config.app.siteId;
		dbSites.findById(siteId, function(err, site){
			if(err || !site) return res.err('system');
			site.theme = args.enable[0];
			site.save(function(){
				conn.app.config.app.theme = site.theme;
				conn.app.config.app.version = String(Date.now());
				if(args.restart) conn.app.restart();
				else res();
			});
		});
	});
};

// set plugin settings
exports.pluginSettings = function(conn, res, id, newSettings){
	var id = String(id);
	User.checkPermission(conn, 'admin', function(r){
		if(!r) return res.err('noPermission');
		if(typeof(newSettings) === 'undefined') {
			// get settings
			PluginSettings.get(id, function(err, v){
				if(err) return res.err('system');
				res(v);
			});
		} else {
			// set settings
			PluginSettings.set(id, newSettings, function(err){
				if(err) return res.err('system');
				res();
			});
		}
	});
};

// set theme settings
exports.themeSettings = function(conn, res, id, newSettings){
	var id = String(id);
	User.checkPermission(conn, 'admin', function(r){
		if(!r) return res.err('noPermission');
		if(typeof(newSettings) === 'undefined') {
			// get settings
			ThemeSettings.get(id, function(err, v){
				if(err) return res.err('system');
				res(v);
			});
		} else {
			// set settings
			ThemeSettings.set(id, newSettings, function(err){
				if(err) return res.err('system');
				res();
			});
		}
	});
};
