// Copyright 2014 LastLeaf, LICENSE: github.lastleaf.me/MIT
"use strict";fw.main(function(a){var n=a.tmpl,i=(n.i18n,function(){if(!a.destroyed){var i=lp.backstage.userInfo;if(!i._id){var t=$("#content").html(n.login());return t.find(".section_title a").click(function(a){a.preventDefault();var n=$(this).closest(".section");n.hasClass("section_folded")&&n.parent().children(".section:not(.section_folded)").addClass("section_folded").children("form").slideUp(200,function(){n.removeClass("section_folded").children("form").slideDown(200)})}),t.find(".section_folded>form").hide(),void t.find("form").each(function(){var n=$(this);a.form(this,function(){return n.find(".passwordRe").length&&n.find(".passwordRe").val()!==n.find(".password").val()?(n.find(".passwordRe").val("").focus(),!1):(n.find(".password").val()&&n.find("[name=password]").val(CryptoJS.SHA256(n.find("[name=_id]").val().toLowerCase()+"|"+n.find(".password").val())),void n.find("[type=submit]").prop("disabled",!0))},function(){location.pathname="/backstage/home"},function(a){n.find("[type=submit]").prop("disabled",!1),lp.backstage.showError(a)})})}var e=function(t,e){var o=$("#content").html(n.main({username:i._id,displayName:i.displayName,type:i.type,email:i.email,url:i.url,description:i.description,avatar:i.avatar?i.avatar+"/128.png":lp.gravatarUrl(i.email,128),avatarDel:!!i.avatar,posts:t,comments:e}));o.find(".new_post").click(function(){fw.go("/backstage/post")});var r=o.children(".home_user");r.find(".avatar_file input").change(function(){var n=this.files[0],i=URL.createObjectURL(n),t=document.createElement("img");t.onload=function(){URL.revokeObjectURL(i);var n=document.createElement("canvas");n.width=n.height=128,n.getContext("2d").drawImage(t,0,0,128,128),r.find(".avatar_error").html(""),$(".avatar").fadeTo(200,.5),a.rpc("user:avatar",n.toDataURL("image/png"),function(){location.reload()},function(a){lp.backstage.showError(a)})},t.src=i}),r.find(".avatar_del a").click(function(n){n.preventDefault(),$(this).hide(),$(".avatar").fadeTo(200,.5),a.rpc("user:avatar","",function(){location.reload()},function(a){lp.backstage.showError(a)})}),r.find(".avatar").click(function(){r.find(".avatar_file input").click()});var d=r.find(".user_info").on("click",".info",function(){d.find(".info").hide(),d.find("input, textarea").css("display","block")});a.form(d[0],function(){d.find(".error").html(""),d.find(".submit").attr("disabled",!0)},function(){location.reload()},function(a){d.find(".submit").attr("disabled",!1),lp.backstage.showError(a)});var s=r.find(".user_password");r.find(".modify_password").click(function(a){a.preventDefault(),$(this).hide(),s.fadeIn(200)}),a.form(s[0],function(){return s.find(".new").val()!==s.find(".newRe").val()?(s.find(".newRe").val("").focus(),!1):(s.find("[name=password]").val(CryptoJS.SHA256(i._id.toLowerCase()+"|"+s.find(".new").val())),s.find("[name=original]").val(CryptoJS.SHA256(i._id.toLowerCase()+"|"+s.find(".original").val())),s.find(".error").html(""),void s.find(".submit").attr("disabled",!0))},function(){s.find(".submit").attr("disabled",!1),s.hide(),r.find(".modify_password").fadeIn(200)},function(a){s.find(".submit").attr("disabled",!1),lp.backstage.showError(a)})};a.rpc("comment:list",{depth:1,desc:"yes",from:0,count:10},function(n){a.rpc("post:list",{from:0,count:10},function(a){e(a,n)},function(a){a&&lp.backstage.showError(a)})},function(a){a&&lp.backstage.showError(a)})}});lp.backstage.userInfo?i():a.parent.on("userInfoReady",i)});
