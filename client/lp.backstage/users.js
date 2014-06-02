// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
'use strict';

var USER_LIST_LEN = 20;

fw.main(function(pg){
	var tmpl = pg.tmpl;
	var _ = tmpl.i18n;

	// init page structure
	var $content = $('#content').html(tmpl.main());
	var $table = $content.find('.table');

	// build table
	var table = lp.tableBuilder($table, {idCol: 'id'}, [
		{ id: 'id', name: _('Username'), input: 'add' },
		{ id: 'displayName', name: _('Display Name') },
		{ id: 'type', name: _('Type'), input: {
			admin: _('admin'),
			editor: _('editor'),
			writer: _('writer'),
			contributor: _('contributor'),
			reader: _('reader')
		} },
		{ id: 'email', name: _('Email') },
		{ id: 'url', name: _('URL') },
		{ id: 'password', name: _('Password'), input: 'password' },
		{ id: 'description', type: 'extra' }
	], {
		type: _('reader')
	})
	.data(function(page){
		pg.rpc('user:list', {from: page*USER_LIST_LEN, count: USER_LIST_LEN}, function(r){
			table.setTotal(Math.ceil(r.total/USER_LIST_LEN));
			var rows = r.rows;
			for(var i=0; i<rows.length; i++) {
				rows[i].type = _(rows[i].type);
				rows[i].password = '******';
			}
			table.set(rows);
		}, function(err){
			lp.backstage.showError(err);
		});
	})
	.setPage(0, 1);

	// table operations
	table.add(function(data){
		if(data.password)
			data.password = CryptoJS.SHA256(data.id.toLowerCase() + '|' + data.password).toString();
		pg.rpc('user:set', data, true, function(){
			data.type = _(data.type);
			data.password = '******';
			table.addRow(data.id, data);
		}, function(err){
			lp.backstage.showError(err);
			table.enableAdd();
		});
	});
	table.change(function(data){
		if(data.password)
			data.password = CryptoJS.SHA256(data.id.toLowerCase() + '|' + data.password).toString();
		pg.rpc('user:set', data, false, function(){
			data.type = _(data.type);
			data.password = '******';
			table.setRow(data.id, data);
		}, function(err){
			lp.backstage.showError(err);
			table.enableModify(data.id);
		});
	});
	table.remove(function(id){
		pg.rpc('user:remove', {id: id}, function(){
			table.removeRow(id);
		}, function(err){
			lp.backstage.showError(err);
			table.enableModify(data.id);
		});
	});
});