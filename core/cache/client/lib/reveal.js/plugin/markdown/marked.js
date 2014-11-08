/**
 * marked - a markdown parser
 * Copyright (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){function e(e){this.tokens=[],this.tokens.links={},this.options=e||o.defaults,this.rules=h.normal,this.options.gfm&&(this.rules=this.options.tables?h.tables:h.gfm)}function t(e,t){if(this.options=t||o.defaults,this.links=e,this.rules=a.normal,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.rules=this.options.breaks?a.breaks:a.gfm:this.options.pedantic&&(this.rules=a.pedantic)}function s(e){this.tokens=[],this.token=null,this.options=e||o.defaults}function n(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function i(e,t){return e=e.source,t=t||"",function s(n,i){return n?(i=i.source||i,i=i.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(n,i),s):new RegExp(e,t)}}function r(){}function l(e){for(var t,s,n=1;n<arguments.length;n++){t=arguments[n];for(s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e}function o(t,i,r){if(r||"function"==typeof i){r||(r=i,i=null),i&&(i=l({},o.defaults,i));var h=e.lex(h,i),a=i.highlight,u=0,p=h.length,g=0;if(!a||a.length<3)return r(null,s.parse(h,i));for(var c=function(){delete i.highlight;var e=s.parse(h,i);return i.highlight=a,r(null,e)};p>g;g++)(function(e){return"code"===e.type?(u++,a(e.text,e.lang,function(t,s){return null==s||s===e.text?--u||c():(e.text=s,e.escaped=!0,void(--u||c()))})):void 0})(h[g])}else try{return i&&(i=l({},o.defaults,i)),s.parse(e.lex(t,i),i)}catch(f){if(f.message+="\nPlease report this to https://github.com/chjj/marked.",(i||o.defaults).silent)return"<p>An error occured:</p><pre>"+n(f.message+"",!0)+"</pre>";throw f}}var h={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:r,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:r,lheading:/^([^\n]+)\n *(=|-){3,} *\n*/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:r,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};h.bullet=/(?:[*+-]|\d+\.)/,h.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,h.item=i(h.item,"gm")(/bull/g,h.bullet)(),h.list=i(h.list)(/bull/g,h.bullet)("hr",/\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(),h._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b",h.html=i(h.html)("comment",/\x3c!--[\s\S]*?--\x3e/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,h._tag)(),h.paragraph=i(h.paragraph)("hr",h.hr)("heading",h.heading)("lheading",h.lheading)("blockquote",h.blockquote)("tag","<"+h._tag)("def",h.def)(),h.normal=l({},h),h.gfm=l({},h.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),h.gfm.paragraph=i(h.paragraph)("(?!","(?!"+h.gfm.fences.source.replace("\\1","\\2")+"|")(),h.tables=l({},h.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),e.rules=h,e.lex=function(t,s){var n=new e(s);return n.lex(t)},e.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},e.prototype.token=function(e,t){for(var s,n,i,r,l,o,a,u,p,e=e.replace(/^ +$/gm,"");e;)if((i=this.rules.newline.exec(e))&&(e=e.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(e))e=e.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]});else if(i=this.rules.heading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(t&&(i=this.rules.nptable.exec(e))){for(e=e.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},u=0;u<o.align.length;u++)o.align[u]=/^ *-+: *$/.test(o.align[u])?"right":/^ *:-+: *$/.test(o.align[u])?"center":/^ *:-+ *$/.test(o.align[u])?"left":null;for(u=0;u<o.cells.length;u++)o.cells[u]=o.cells[u].split(/ *\| */);this.tokens.push(o)}else if(i=this.rules.lheading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(i=this.rules.hr.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,t),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(e)){for(e=e.substring(i[0].length),r=i[2],this.tokens.push({type:"list_start",ordered:r.length>1}),i=i[0].match(this.rules.item),s=!1,p=i.length,u=0;p>u;u++)o=i[u],a=o.length,o=o.replace(/^ *([*+-]|\d+\.) +/,""),~o.indexOf("\n ")&&(a-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+a+"}","gm"),"")),this.options.smartLists&&u!==p-1&&(l=h.bullet.exec(i[u+1])[0],r===l||r.length>1&&l.length>1||(e=i.slice(u+1).join("\n")+e,u=p-1)),n=s||/\n\n(?!\s*$)/.test(o),u!==p-1&&(s="\n"===o[o.length-1],n||(n=s)),this.tokens.push({type:n?"loose_item_start":"list_item_start"}),this.token(o,!1),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(e))e=e.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===i[1]||"script"===i[1],text:i[0]});else if(t&&(i=this.rules.def.exec(e)))e=e.substring(i[0].length),this.tokens.links[i[1].toLowerCase()]={href:i[2],title:i[3]};else if(t&&(i=this.rules.table.exec(e))){for(e=e.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<o.align.length;u++)o.align[u]=/^ *-+: *$/.test(o.align[u])?"right":/^ *:-+: *$/.test(o.align[u])?"center":/^ *:-+ *$/.test(o.align[u])?"left":null;for(u=0;u<o.cells.length;u++)o.cells[u]=o.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(o)}else if(t&&(i=this.rules.paragraph.exec(e)))e=e.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1][i[1].length-1]?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var a={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:r,tag:/^\x3c!--[\s\S]*?--\x3e|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:r,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};a._inside=/(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/,a._href=/\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,a.link=i(a.link)("inside",a._inside)("href",a._href)(),a.reflink=i(a.reflink)("inside",a._inside)(),a.normal=l({},a),a.pedantic=l({},a.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),a.gfm=l({},a.normal,{escape:i(a.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:i(a.text)("]|","~]|")("|","|https?://|")()}),a.breaks=l({},a.gfm,{br:i(a.br)("{2,}","*")(),text:i(a.gfm.text)("{2,}","*")()}),t.rules=a,t.output=function(e,s,n){var i=new t(s,n);return i.output(e)},t.prototype.output=function(e){for(var t,s,i,r,l="";e;)if(r=this.rules.escape.exec(e))e=e.substring(r[0].length),l+=r[1];else if(r=this.rules.autolink.exec(e))e=e.substring(r[0].length),"@"===r[2]?(s=this.mangle(":"===r[1][6]?r[1].substring(7):r[1]),i=this.mangle("mailto:")+s):(s=n(r[1]),i=s),l+='<a href="'+i+'">'+s+"</a>";else if(r=this.rules.url.exec(e))e=e.substring(r[0].length),s=n(r[1]),i=s,l+='<a href="'+i+'">'+s+"</a>";else if(r=this.rules.tag.exec(e))e=e.substring(r[0].length),l+=this.options.sanitize?n(r[0]):r[0];else if(r=this.rules.link.exec(e))e=e.substring(r[0].length),l+=this.outputLink(r,{href:r[2],title:r[3]});else if((r=this.rules.reflink.exec(e))||(r=this.rules.nolink.exec(e))){if(e=e.substring(r[0].length),t=(r[2]||r[1]).replace(/\s+/g," "),t=this.links[t.toLowerCase()],!t||!t.href){l+=r[0][0],e=r[0].substring(1)+e;continue}l+=this.outputLink(r,t)}else if(r=this.rules.strong.exec(e))e=e.substring(r[0].length),l+="<strong>"+this.output(r[2]||r[1])+"</strong>";else if(r=this.rules.em.exec(e))e=e.substring(r[0].length),l+="<em>"+this.output(r[2]||r[1])+"</em>";else if(r=this.rules.code.exec(e))e=e.substring(r[0].length),l+="<code>"+n(r[2],!0)+"</code>";else if(r=this.rules.br.exec(e))e=e.substring(r[0].length),l+="<br>";else if(r=this.rules.del.exec(e))e=e.substring(r[0].length),l+="<del>"+this.output(r[1])+"</del>";else if(r=this.rules.text.exec(e))e=e.substring(r[0].length),l+=n(r[0]);else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return l},t.prototype.outputLink=function(e,t){return"!"!==e[0][0]?'<a href="'+n(t.href)+'"'+(t.title?' title="'+n(t.title)+'"':"")+">"+this.output(e[1])+"</a>":'<img src="'+n(t.href)+'" alt="'+n(e[1])+'"'+(t.title?' title="'+n(t.title)+'"':"")+">"},t.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/--/g,"—").replace(/'([^']*)'/g,"‘$1’").replace(/"([^"]*)"/g,"“$1”").replace(/\.{3}/g,"…"):e},t.prototype.mangle=function(e){for(var t,s="",n=e.length,i=0;n>i;i++)t=e.charCodeAt(i),Math.random()>.5&&(t="x"+t.toString(16)),s+="&#"+t+";";return s},s.parse=function(e,t){var n=new s(t);return n.parse(e)},s.prototype.parse=function(e){this.inline=new t(e.links,this.options),this.tokens=e.reverse();for(var s="";this.next();)s+=this.tok();return s},s.prototype.next=function(){return this.token=this.tokens.pop()},s.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},s.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},s.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return"<hr>\n";case"heading":return"<h"+this.token.depth+">"+this.inline.output(this.token.text)+"</h"+this.token.depth+">\n";case"code":if(this.options.highlight){var e=this.options.highlight(this.token.text,this.token.lang);null!=e&&e!==this.token.text&&(this.token.escaped=!0,this.token.text=e)}return this.token.escaped||(this.token.text=n(this.token.text,!0)),"<pre><code"+(this.token.lang?' class="'+this.options.langPrefix+this.token.lang+'"':"")+">"+this.token.text+"</code></pre>\n";case"table":var t,s,i,r,l,o="";for(o+="<thead>\n<tr>\n",s=0;s<this.token.header.length;s++)t=this.inline.output(this.token.header[s]),o+=this.token.align[s]?'<th align="'+this.token.align[s]+'">'+t+"</th>\n":"<th>"+t+"</th>\n";for(o+="</tr>\n</thead>\n",o+="<tbody>\n",s=0;s<this.token.cells.length;s++){for(i=this.token.cells[s],o+="<tr>\n",l=0;l<i.length;l++)r=this.inline.output(i[l]),o+=this.token.align[l]?'<td align="'+this.token.align[l]+'">'+r+"</td>\n":"<td>"+r+"</td>\n";o+="</tr>\n"}return o+="</tbody>\n","<table>\n"+o+"</table>\n";case"blockquote_start":for(var o="";"blockquote_end"!==this.next().type;)o+=this.tok();return"<blockquote>\n"+o+"</blockquote>\n";case"list_start":for(var h=this.token.ordered?"ol":"ul",o="";"list_end"!==this.next().type;)o+=this.tok();return"<"+h+">\n"+o+"</"+h+">\n";case"list_item_start":for(var o="";"list_item_end"!==this.next().type;)o+="text"===this.token.type?this.parseText():this.tok();return"<li>"+o+"</li>\n";case"loose_item_start":for(var o="";"list_item_end"!==this.next().type;)o+=this.tok();return"<li>"+o+"</li>\n";case"html":return this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);case"paragraph":return"<p>"+this.inline.output(this.token.text)+"</p>\n";case"text":return"<p>"+this.parseText()+"</p>\n"}},r.exec=r,o.options=o.setOptions=function(e){return l(o.defaults,e),o},o.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:""},o.Parser=s,o.parser=s.parse,o.Lexer=e,o.lexer=e.lex,o.InlineLexer=t,o.inlineLexer=t.output,o.parse=o,"object"==typeof exports?module.exports=o:"function"==typeof define&&define.amd?define(function(){return o}):this.marked=o}).call(function(){return this||("undefined"!=typeof window?window:global)}());
