// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
"use strict";fw.main(function(e){var n=e.tmpl,i=n.i18n;lp.registerDriver("presentation",{name:i("Presentation"),priority:6e3,editor:function(e,i,r){var t=$(e).html(n.presentation({driver:i.driver,admin:"admin"===r.type})),d=$(".presentation .driver_slide_table"),c=$(".presentation .driver_slide"),l=function(e,n){var i=d.children().eq(e),r=i.children().eq(n);i.children().length<=1?i.remove():r.remove(),d.children().length||s(),d.children().each(function(e,n){$(n).children().eq(0).text(e).end().eq(1).text("").end()})},o=function(e,n){var i=$('<div class="driver_slide_row"></div>'),r=d.children().eq(e);return"undefined"!=typeof n&&n<r.children().length?i.insertBefore(r.children().eq(n)):i.appendTo(r),d.children().each(function(e,n){$(n).children().eq(0).text(e).end().eq(1).text("").end()}),i},s=function(e,n){var i=$('<div class="driver_slide_col"></div>');return"undefined"!=typeof e&&e<d.children().length?(i.insertBefore(d.children().eq(e)),o(e,0,n)):(i.appendTo(d),o(d.children().length-1,0,n)),i},a=function(e,n,i){if(d.html(""),e.length)for(var r=0;r<e.length;r++){s();for(var t=e[r],c=1;c<t.length;c++)o(r,c)}else s();u(n,i)},h=0,f=0,u=function(e,n,i,r){"undefined"==typeof i&&(i=h),"undefined"==typeof r&&(r=f),v(d.children().eq(i).children().eq(r));var t=d.children();e>=t.length&&(e=t.length-1),0>e&&(e=0);var c=t.eq(e),l=c.children();n>=l.length&&(n=l.length-1),0>n&&(n=0);var o=l.eq(n);h=e,f=n,p(o)},v=function(e){e.removeClass("driver_slide_row-selected"),c.html("")},p=function(e){e.addClass("driver_slide_row-selected"),c.html(n.presentationContent(K[h][f]))},_=function(){K[h][f]=c.children().val()};d.on("click",".driver_slide_row",function(){_();var e=0,n=0,i=this,r=this.parentElement;d.children().each(function(){return this===r?!1:void e++}),d.children().eq(e).children().each(function(){return this===i?!1:void n++}),u(e,n)});var y=function(){_(),s(h,""),K.splice(h,0,[""]),u(h,0,h+1,f),c.children().focus()},g=function(){_(),s(h+1,""),K.splice(h+1,0,[""]),u(h+1,0,h,f),c.children().focus()},k=function(){_(),o(h,f,""),K[h].splice(f,0,""),u(h,f,h,f+1),c.children().focus()},m=function(){_(),o(h,f+1,""),K[h].splice(f+1,0,""),u(h,f+1,h,f),c.children().focus()},q=function(){l(h,f),K[h].length<=1?1===K.length?K[0]=[""]:K.splice(h,1):K[h].splice(f,1),u(h,f),c.children().focus()};$(".presentation .driver_slide_add-left").click(y),$(".presentation .driver_slide_add-right").click(g),$(".presentation .driver_slide_add-top").click(k),$(".presentation .driver_slide_add-bottom").click(m),$(".presentation .driver_slide_del").click(q);var C=function(){_(),u(h-1,f),c.children().focus()},x=function(){_(),u(h+1,f),c.children().focus()},b=function(){_(),u(h,f-1),c.children().focus()},w=function(){_(),u(h,f+1),c.children().focus()};c.on("keyup","textarea",function(e){(e.ctrlKey||e.metaKey)&&(e.shiftKey?(37===e.keyCode&&y(),39===e.keyCode&&g(),38===e.keyCode&&k(),40===e.keyCode&&m()):(37===e.keyCode&&C(),39===e.keyCode&&x(),38===e.keyCode&&b(),40===e.keyCode&&w()),46===e.keyCode&&(e.preventDefault(),q()))}),i.driver||(i.driver={});var K=i.driver.content||[[""]];return a(K,0,0),{get:function(){_();var e=t.find(".driver_abstract textarea").val();return{driver:{enableHtml:$(".presentation .driver_use_html input").prop("checked"),"abstract":e,content:K}}}}}})});
