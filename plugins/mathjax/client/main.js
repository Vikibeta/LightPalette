// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
'use strict';

fw.main(function(pg){
	pg.on('childLoadEnd', function(){
		MathJax.Hub.Typeset('wrapper');
	});
});
