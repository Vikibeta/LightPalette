// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
'use strict';

var model = fw.module('db_model');

var COLLECTION_NAME = 'stat';
var MODEL_NAME = 'Stat';

module.exports = function(app, cb){
	// define schema
	var Schema = app.db.Schema;
	var schemaObj = {
		post: { type: Schema.Types.ObjectId, ref: app.config.db.prefix + 'post' },
		time: { type: Number },
		sid: { type: String },
		ip: { type: String }
	};
	var schema = new Schema(schemaObj, {autoIndex: false});
	schema.index({ time: -1 });
	schema.index({ post: 1, time: -1 });
	schema.index({ sid: 1, time: -1 });

	// create model
	var col = app.db.model(app.config.db.prefix + COLLECTION_NAME, schema);
	model[MODEL_NAME] = col;
	col.ensureIndexes(function(){
		cb();
	});
};
