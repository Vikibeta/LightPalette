// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
"use strict";lp.theme=function(e){var n=e.tmpl;window.localStorage||(window.localStorage={}),e.on("contentUnloaded",function(){document.getElementById("content").innerHTML=""}),e.on("contentLoaded",function(){var e=document.querySelector(".post_not_found");e&&(e.innerHTML=n.notFound());var t=document.querySelector(".post_single");if(t){var r=t.getAttribute("post-id"),o=document.createElement("div");o.setAttribute("class","comment");var l=JSON.parse(localStorage["lightPalette-commentConfig"]||"{}");o.innerHTML=n.comment({postId:r,userInfo:lp.userInfo,displayName:l.displayName,email:l.email,url:l.url}),lp.comments.form(o.querySelector(".comment_new>form"),function(){o.querySelector(".comment_error").innerHTML="",o.querySelector(".submit").disabled=!0},function(){c.querySelector('[name="url"]')&&(localStorage["lightPalette-commentConfig"]=JSON.stringify({displayName:c.querySelector('[name="displayName"]').value,email:c.querySelector('[name="email"]').value,url:c.querySelector('[name="url"]').value})),a(),i()},function(e){o.querySelector(".comment_error").innerHTML=n.commentError[e]||n.commentError.system,o.querySelector(".submit").disabled=!1}),t.appendChild(o);var c=o.querySelector(".comment_new"),a=c.querySelector(".comment_cancel").onclick=function(){c.querySelector("textarea").value="",c.parentNode.removeChild(c),o.appendChild(c),c.querySelector('[name="responseTo"]').value="",o.querySelector(".comment_error").innerHTML=""},m=o.querySelector(".comment_list"),i=function(){o.querySelector(".submit").disabled=!0,lp.comments.list(r,function(n){m.innerHTML="",e(m,n.rows,3),o.querySelector(".submit").disabled=!1},function(){m.innerHTML=""});var e=function(t,r,l){var a=document.createElement("ul");for(t.appendChild(a);r.length;){var m=r.shift();m.depth=l;var i=document.createElement("li");i.innerHTML=n.commentItem(m),a.appendChild(i);var u=i.querySelector(".comment_reply>a");u&&(u.responseToId=m._id,u.onclick=function(){c.parentNode===this.parentNode?(c.parentNode.removeChild(c),o.appendChild(c),c.querySelector('[name="responseTo"]').value=""):(c.parentNode.removeChild(c),this.parentNode.appendChild(c),c.querySelector('[name="responseTo"]').value=this.responseToId)}),m.response&&m.response.length&&e(i.querySelector(".comment_response"),m.response,l-1)}}};i()}})};
