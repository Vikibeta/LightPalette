// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
"use strict";var LIST_LEN=20;fw.main(function(e){var t=e.tmpl,n=t.i18n,o=$("#content").html(t.main()),i=o.find(".table"),a=lp.tableBuilder(i,{idCol:"_id"},[{id:"displayName",name:n("User"),input:"add"},{id:"email",name:n("Email"),input:"add"},{id:"url",name:n("URL"),input:"add"},{id:"post.title",name:n("Post"),input:"add"},{id:"dateTimeString",name:n("Time"),input:"add"},{id:"blocked",name:n("Blocked"),input:{"false":n("no"),"true":n("yes")}},{id:"content",type:"extra",input:"add"}]).data(function(t){e.rpc("comment:list",{desc:"yes",blocked:"yes",depth:1,from:t*LIST_LEN,count:LIST_LEN},function(e){a.setTotal(Math.ceil(e.total/LIST_LEN));var t=e.rows;a.set(t)},function(e){lp.backstage.showError(e)})}).setPage(0,1);a.add(function(t){e.rpc("comment:create",t,function(){a.addRow(t._id,t)},function(e){lp.backstage.showError(e),a.enableAdd()})}),a.change(function(t,n){e.rpc("comment:block",{_id:n,blocked:"true"===t.blocked?"yes":""},function(){a.setRow(n,t)},function(e){lp.backstage.showError(e),a.enableModify(n)})}),a.remove(function(t){e.rpc("comment:remove",{_id:t},function(){a.removeRow(t)},function(e){lp.backstage.showError(e),a.enableModify(t)})})});
