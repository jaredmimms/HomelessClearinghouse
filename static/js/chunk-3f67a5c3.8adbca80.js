(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f67a5c3"],{"159b":function(e,t,r){var a=r("da84"),n=r("fdbc"),c=r("17c2"),o=r("9112");for(var i in n){var f=a[i],u=f&&f.prototype;if(u&&u.forEach!==c)try{o(u,"forEach",c)}catch(s){u.forEach=c}}},"17c2":function(e,t,r){"use strict";var a=r("b727").forEach,n=r("a640"),c=n("forEach");e.exports=c?[].forEach:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}},"391e":function(e,t,r){"use strict";r.r(t);var a=r("7a23"),n={id:"home-page"},c=Object(a["g"])("h1",null,"Homeless Clearinghouse lists services for the homeless.",-1),o=Object(a["g"])("h2",null,"Public Resources",-1),i=Object(a["g"])("h3",null,"Food Stamps",-1),f=Object(a["g"])("div",{style:{padding:"56.25% 0 0 0",position:"relative"}},[Object(a["g"])("iframe",{src:"https://player.vimeo.com/video/702122329?h=a4cf49feb4&badge=0&autopause=0&player_id=0&app_id=58479",frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:"",style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"},title:"Food Stamps"})],-1),u=Object(a["g"])("h3",null,"General Relief",-1),s=Object(a["g"])("div",{style:{padding:"56.25% 0 0 0",position:"relative"}},[Object(a["g"])("iframe",{src:"https://player.vimeo.com/video/702118928?h=9145f41705&badge=0&autopause=0&player_id=0&app_id=58479",frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:"",style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"},title:"General Relief"})],-1),l=Object(a["g"])("h2",null,"Private Listings",-1);function p(e,t,r,p,d,b){var h=Object(a["w"])("show-featured");return Object(a["p"])(),Object(a["d"])("div",n,[c,o,i,f,u,s,(Object(a["p"])(),Object(a["d"])(Object(a["x"])(e.script),{src:"https://player.vimeo.com/api/player.js",async:""})),l,Object(a["g"])(h,{offers:r.offers},null,8,["offers"])])}var d=Object(a["G"])("data-v-08a37e5c");Object(a["s"])("data-v-08a37e5c");var b={id:"show-featured"},h=Object(a["g"])("h2",null,"Featured Offers",-1),v={class:"clean-list"};Object(a["q"])();var g=d((function(e,t,r,n,c,o){var i=Object(a["w"])("router-link");return Object(a["p"])(),Object(a["d"])("div",b,[h,Object(a["g"])("ul",v,[(Object(a["p"])(!0),Object(a["d"])(a["a"],null,Object(a["v"])(o.featuredOffers,(function(e){return Object(a["p"])(),Object(a["d"])("li",{key:e.id},[Object(a["g"])(i,{to:"/offer/"+e.id},{default:d((function(){return[Object(a["f"])(Object(a["z"])(e.title),1)]})),_:2},1032,["to"])])})),128))])])})),O=(r("159b"),r("a9e3"),{props:{category:{type:String},offers:{type:Array,default:null}},data:function(){return{}},computed:{featuredOffers:function(){if(this.offers){var e=[];return this.offers.forEach((function(t){Number(t.featured)&&e.push(t)})),e}return null}}});r("bc54");O.render=g,O.__scopeId="data-v-08a37e5c";var j=O,y={props:{offers:{type:Array,default:null}},components:{"show-featured":j}};y.render=p;t["default"]=y},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var a=r("1d80"),n=r("5899"),c="["+n+"]",o=RegExp("^"+c+c+"*"),i=RegExp(c+c+"*$"),f=function(e){return function(t){var r=String(a(t));return 1&e&&(r=r.replace(o,"")),2&e&&(r=r.replace(i,"")),r}};e.exports={start:f(1),end:f(2),trim:f(3)}},7156:function(e,t,r){var a=r("861d"),n=r("d2bb");e.exports=function(e,t,r){var c,o;return n&&"function"==typeof(c=t.constructor)&&c!==r&&a(o=c.prototype)&&o!==r.prototype&&n(e,o),e}},"99df":function(e,t,r){},a640:function(e,t,r){"use strict";var a=r("d039");e.exports=function(e,t){var r=[][e];return!!r&&a((function(){r.call(null,t||function(){throw 1},1)}))}},a9e3:function(e,t,r){"use strict";var a=r("83ab"),n=r("da84"),c=r("94ca"),o=r("6eeb"),i=r("5135"),f=r("c6b6"),u=r("7156"),s=r("c04e"),l=r("d039"),p=r("7c73"),d=r("241c").f,b=r("06cf").f,h=r("9bf2").f,v=r("58a8").trim,g="Number",O=n[g],j=O.prototype,y=f(p(j))==g,m=function(e){var t,r,a,n,c,o,i,f,u=s(e,!1);if("string"==typeof u&&u.length>2)if(u=v(u),t=u.charCodeAt(0),43===t||45===t){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:a=2,n=49;break;case 79:case 111:a=8,n=55;break;default:return+u}for(c=u.slice(2),o=c.length,i=0;i<o;i++)if(f=c.charCodeAt(i),f<48||f>n)return NaN;return parseInt(c,a)}return+u};if(c(g,!O(" 0o1")||!O("0b1")||O("+0x1"))){for(var E,w=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof w&&(y?l((function(){j.valueOf.call(r)})):f(r)!=g)?u(new O(m(t)),r,w):m(t)},I=a?d(O):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),N=0;I.length>N;N++)i(O,E=I[N])&&!i(w,E)&&h(w,E,b(O,E));w.prototype=j,j.constructor=w,o(n,g,w)}},bc54:function(e,t,r){"use strict";r("99df")}}]);
//# sourceMappingURL=chunk-3f67a5c3.8adbca80.js.map