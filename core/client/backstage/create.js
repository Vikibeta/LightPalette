// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
'use strict';

fw.main(function(pg){
	var tmpl = pg.tmpl;
	var _ = tmpl.i18n;

	var initPage = function(){
		var userInfo = lp.backstage.userInfo;
		var drivers = lp.backstage.driverList(userInfo.type);
		if(drivers.length) {
			var $btns = $('#content').html(tmpl.main(drivers)).find('input');
			$btns.click(function(){
				var $this = $(this);
				var type = $this.attr('driverId');
				$btns.attr('disabled', true);
				pg.rpc('post:create', {type: type}, function(_id){
					$('#content').html(pg.parent.parent.tmpl.busy());
					fw.go('/backstage/post/' + _id);
				}, function(err){
					lp.backstage.showError(err);
					$btns.removeAttr('disabled');
				});
			});
		} else {
			// no drivers enabled
			var $btns = $('#content').html('');
			lp.backstage.showError('noSuitableDriver');
		}
	};

	initPage();
});
