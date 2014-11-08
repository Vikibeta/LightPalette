/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
"undefined"==typeof document||"classList"in document.createElement("a")||!function(t){var e="classList",n="prototype",i=(t.HTMLElement||t.Element)[n],r=Object,s=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array[n].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},o=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},c=function(t,e){if(""===e)throw new o("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new o("INVALID_CHARACTER_ERR","String contains an invalid character");return a.call(t,e)},u=function(t){for(var e=s.call(t.className),n=e?e.split(/\s+/):[],i=0,r=n.length;r>i;i++)this.push(n[i]);this._updateClassName=function(){t.className=this.toString()}},l=u[n]=[],f=function(){return new u(this)};if(o[n]=Error[n],l.item=function(t){return this[t]||null},l.contains=function(t){return t+="",-1!==c(this,t)},l.add=function(t){t+="",-1===c(this,t)&&(this.push(t),this._updateClassName())},l.remove=function(t){t+="";var e=c(this,t);-1!==e&&(this.splice(e,1),this._updateClassName())},l.toggle=function(t){t+="",-1===c(this,t)?this.add(t):this.remove(t)},l.toString=function(){return this.join(" ")},r.defineProperty){var h={get:f,enumerable:!0,configurable:!0};try{r.defineProperty(i,e,h)}catch(d){-2146823252===d.number&&(h.enumerable=!1,r.defineProperty(i,e,h))}}else r[n].__defineGetter__&&i.__defineGetter__(e,f)}(self);
