fw._tmpls({i18n:{Time:"时间","IP Address":"IP地址","Visitor ID":"访客ID"},main:function(t,i,n,o,s){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.helpers),s=s||{},'\n	<div class="stat_options">\n		博文访问量\n		<select class="stat_time">\n			<option value="3600">1小时</option>\n			<option value="86400">24小时</option>\n			<option value="259200" selected>3天</option>\n			<option value="604800" selected>7天</option>\n			<option value="2592000">30天</option>\n			<option value="7776000">90天</option>\n			<option value="31536000">365天</option>\n			<option value="0">完整历史</option>\n		</select>\n	</div>\n	<div class="stat_title"></div>\n	<div class="stat_meta"></div>\n	<div class="table"></div>\n'},statMeta:function(t,i,n,o,s){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.helpers),s=s||{};var e,a,l="",p="function",v=this.escapeExpression;return l+="\n	来自 ",(a=n.visitors)?e=a.call(i,{hash:{},data:s}):(a=i&&i.visitors,e=typeof a===p?a.call(i,{hash:{},data:s}):a),l+=v(e)+" 访问者的 ",(a=n.visits)?e=a.call(i,{hash:{},data:s}):(a=i&&i.visits,e=typeof a===p?a.call(i,{hash:{},data:s}):a),l+=v(e)+" 次访问\n"}});
