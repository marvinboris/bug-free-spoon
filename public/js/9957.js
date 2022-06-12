/*! For license information please see 9957.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9957],{39826:(t,e,r)=>{r.d(e,{Z:()=>j});var n=r(67294),o=r(14416),i=r(73727),c=r(92903),a=r(93379),u=r.n(a),l=r(87395),s={insert:"head",singleton:!1};u()(l.Z,s);l.Z.locals;var f=r(85893);function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function d(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function v(t,e){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},v(t,e)}function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=x(t);if(e){var o=x(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return g(this,r)}}function g(t,e){if(e&&("object"===p(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function x(t){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},x(t)}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&v(t,e)}(a,t);var e,r,n,o=m(a);function a(){return y(this,a),o.apply(this,arguments)}return e=a,(r=[{key:"render",value:function(){var t=this.props,e=t.content.cms.pages.components.publication_block,r=t.photo,n=t.title,o=t.body,a=t.link,u=void 0===a?"/":a,l=localStorage.getItem("lang"),s=(0,c.M3)(o[l]);return(0,f.jsxs)("div",{className:"UI PublicationBlock shadow-sm",children:[(0,f.jsx)("div",{className:"embed-responsive embed-responsive-16by9 bg-img",style:{backgroundImage:'url("'+r+'")'},children:!r&&(0,f.jsx)("div",{className:"title",children:n[l]})}),(0,f.jsxs)("div",{className:"text",children:[(0,f.jsx)("div",{className:"title text-truncate",children:n[l]}),(0,f.jsx)("div",{className:"body",children:s&&s.length>90?s.substr(0,90)+"...":s}),(0,f.jsxs)(i.rU,{to:u,className:"btn btn-blue",children:[e.read_more,(0,f.jsx)("i",{className:"fas fa-angle-double-right"})]})]})]})}}])&&b(e.prototype,r),n&&b(e,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(n.Component);const j=(0,o.$j)((function(t){return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){d(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t)}))(w)},19011:(t,e,r)=>{r.d(e,{Z:()=>u});r(67294);var n=r(93379),o=r.n(n),i=r(82580),c={insert:"head",singleton:!1};o()(i.Z,c);i.Z.locals;var a=r(85893);const u=function(t){var e=t.title,r=t.subtitle;return(0,a.jsx)("div",{className:"PageTitle",children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("div",{className:"title",children:e}),(0,a.jsx)("div",{className:"subtitle",children:r})]})})}},28476:(t,e,r)=>{r.d(e,{Z:()=>u});r(67294);var n=r(93379),o=r.n(n),i=r(53181),c={insert:"head",singleton:!1};o()(i.Z,c);i.Z.locals;var a=r(85893);const u=function(t){var e=t.title,r=t.subtitle,n=t.icon,o=t.centered;return(0,a.jsxs)("div",{className:"SectionTitle"+(o?" centered":""),children:[n&&(0,a.jsx)("div",{className:"icon",children:(0,a.jsx)("div",{className:"wrapper",children:(0,a.jsx)("i",{className:"fas fa-"+n})})}),(0,a.jsxs)("div",{className:"text",children:[(0,a.jsx)("div",{className:"title",children:e}),(0,a.jsx)("div",{className:"subtitle",children:r})]})]})}},9957:(t,e,r)=>{r.r(e),r.d(e,{default:()=>S});var n=r(67294),o=r(14416),i=r(32905),c=r(19011),a=r(28476),u=r(39826),l=r(5735),s=r(93379),f=r.n(s),p=r(25992),h={insert:"head",singleton:!1};f()(p.Z,h);p.Z.locals;var d=r(85893);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){m(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function m(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function x(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function j(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=P(t);if(e){var o=P(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return O(this,r)}}function O(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function P(t){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},P(t)}var k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(i,t);var e,r,n,o=j(i);function i(){return g(this,i),o.apply(this,arguments)}return e=i,(r=[{key:"componentDidMount",value:function(){this.props.get()}},{key:"componentWillUnmount",value:function(){this.props.reset()}},{key:"render",value:function(){var t=this.props,e=t.content.cms.pages.frontend.pages.publications,r=t.frontend.publications,n=(r.loading,r.publications),o=(void 0===n?[]:n).map((function(t){return(0,d.jsx)("div",{className:"col-lg-4",children:(0,d.jsx)(u.Z,v({},t))},JSON.stringify(t))}));return(0,d.jsxs)("div",{className:"Publications",children:[(0,d.jsx)(c.Z,v({},e)),(0,d.jsx)("section",{className:"publications",children:(0,d.jsxs)("div",{className:"container",children:[(0,d.jsx)(a.Z,v({},e.publications)),(0,d.jsx)("p",{children:e.publications.description}),(0,d.jsx)("div",{className:"row",children:o})]})})]})}}])&&x(e.prototype,r),n&&x(e,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(n.Component);const S=(0,i.EN)((0,o.$j)((function(t){return v({},t)}),(function(t){return{get:function(){return t((0,l.FH)())},reset:function(){return t((0,l.Qs)())}}}))(k))},5735:(t,e,r)=>{r.d(e,{FH:()=>y,Qs:()=>f,b:()=>b});var n=r(73501);function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(){i=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},c=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",u=n.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),c=new k(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return E()}for(r.method=o,r.arg=i;;){var c=r.delegate;if(c){var a=j(c,r);if(a){if(a===p)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,c),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var p={};function h(){}function d(){}function y(){}var b={};l(b,c,(function(){return this}));var v=Object.getPrototypeOf,m=v&&v(v(S([])));m&&m!==e&&r.call(m,c)&&(b=m);var g=y.prototype=h.prototype=Object.create(b);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(i,c,a,u){var l=f(t[i],t,c);if("throw"!==l.type){var s=l.arg,p=s.value;return p&&"object"==o(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(p).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,u)}))}u(l.arg)}var i;this._invoke=function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}}function j(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,p;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return d.prototype=y,l(g,"constructor",y),l(y,"constructor",d),d.displayName=l(y,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,u,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},x(w.prototype),l(w.prototype,a,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var c=new w(s(e,r,n,o),i);return t.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},x(g),l(g,u,"Generator"),l(g,c,(function(){return this})),l(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return c.type="throw",c.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var a=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(a&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},t}function c(t,e,r,n,o,i,c){try{var a=t[i](c),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){c(i,n,o,a,u,"next",t)}function u(t){c(i,n,o,a,u,"throw",t)}a(void 0)}))}}function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var s="/api/",f=function(){return{type:n.cP}},p=function(){return{type:n.yR}},h=function(t){return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){l(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({type:n.gn},t)},d=function(t){return{type:n.cv,error:t}},y=function(){return function(){var t=a(i().mark((function t(e){var r,n;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(p()),t.prev=1,t.next=4,fetch("".concat(s,"publications"));case 4:return r=t.sent,t.next=7,r.json();case 7:n=t.sent,e(h(n)),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),console.log(t.t0),e(d(t.t0));case 15:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}()},b=function(t){return function(){var e=a(i().mark((function e(r){var n,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(p()),e.prev=1,e.next=4,fetch("".concat(s,"publications/").concat(t));case 4:return n=e.sent,e.next=7,n.json();case 7:o=e.sent,r(h(o)),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),r(d(e.t0));case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}()}},87395:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,'.UI.PublicationBlock{border-radius:var(--border-radius);margin:10px;overflow:hidden}.UI.PublicationBlock .embed-responsive .title{align-items:center;background-color:var(--blue-70);color:var(--white);display:flex;font-size:24px;font-weight:500;height:100%;justify-content:center;left:0;overflow:hidden;padding:24px;position:absolute;text-align:center;text-overflow:ellipsis;top:0;width:100%}.UI.PublicationBlock .embed-responsive .title:after{background-color:var(--black);content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.UI.PublicationBlock .text{background-color:var(--white);padding:24px}.UI.PublicationBlock .text .title{font-size:24px;margin-bottom:15px}.UI.PublicationBlock .text .body{height:40px;margin-bottom:40px;overflow:hidden;text-overflow:ellipsis}',""]);const i=o},82580:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,'.PageTitle{background-color:var(--blue-80);position:relative}.PageTitle:after{background-color:var(--black);content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.PageTitle .container{align-items:center;color:var(--white);display:flex;flex-direction:column;justify-content:center;padding-bottom:80px;padding-top:80px}.PageTitle .container .title{border-bottom:.5px solid var(--white);font-size:2rem;font-weight:700;margin-bottom:7px}',""]);const i=o},53181:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".SectionTitle{align-items:stretch;display:flex;margin-bottom:15px}.SectionTitle .icon{padding-right:11px}.SectionTitle .icon .wrapper{align-items:center;background-color:var(--blue-10);border-radius:var(--border-radius);color:var(--blue);display:flex;font-size:20px;height:57px;justify-content:center;width:57px}.SectionTitle .text .title{border-bottom:.5px solid var(--border);color:var(--blue);display:inline-block;font-size:24px;font-weight:500}.SectionTitle.centered{justify-content:center}.SectionTitle.centered .text{text-align:center}@media (min-width:800px){.SectionTitle{margin-bottom:20px}.SectionTitle .icon{display:block;padding-right:13px}.SectionTitle .icon .wrapper{font-size:25px;height:67px;width:67px}.SectionTitle .text .title{font-size:27px;margin-bottom:3px}}@media (min-width:1280px){.SectionTitle{margin-bottom:25px}.SectionTitle .icon{padding-right:15px}.SectionTitle .icon .wrapper{font-size:30px;height:77px;width:77px}.SectionTitle .text .title{font-size:30px;margin-bottom:7px}}",""]);const i=o},25992:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".Frontend .Publications section{background-color:var(--blue-10)}.Frontend .Publications section .container .PublicationBlock{margin-bottom:16px}@media (min-width:800px){.Frontend .Publications section .container .PublicationBlock{margin-bottom:20px}}@media (min-width:1280px){.Frontend .Publications section .container .PublicationBlock{margin-bottom:24px}}",""]);const i=o}}]);