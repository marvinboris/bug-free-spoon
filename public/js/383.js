/*! For license information please see 383.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[383],{19011:(t,e,n)=>{n.d(e,{Z:()=>u});n(67294);var r=n(93379),o=n.n(r),i=n(82580),c={insert:"head",singleton:!1};o()(i.Z,c);i.Z.locals;var a=n(85893);const u=function(t){var e=t.title,n=t.subtitle;return(0,a.jsx)("div",{className:"PageTitle",children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("div",{className:"title",children:e}),(0,a.jsx)("div",{className:"subtitle",children:n})]})})}},30383:(t,e,n)=>{n.r(e),n.d(e,{default:()=>O});var r=n(67294),o=n(14416),i=n(32905),c=n(19011),a=n(5735),u=n(93379),s=n.n(u),l=n(5979),f={insert:"head",singleton:!1};s()(l.Z,f);l.Z.locals;var p=n(85893);function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},m(t,e)}function g(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=x(t);if(e){var o=x(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return w(this,n)}}function w(t,e){if(e&&("object"===h(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function x(t){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},x(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&m(t,e)}(i,t);var e,n,r,o=g(i);function i(){return d(this,i),o.apply(this,arguments)}return e=i,(n=[{key:"componentDidMount",value:function(){this.props.get(this.props.match.params.slug)}},{key:"componentWillUnmount",value:function(){this.props.reset()}},{key:"render",value:function(){var t,e=this.props,n=e.content.cms.pages.frontend.pages.publications,r=e.frontend.publications,o=r.loading,i=r.publication,a=localStorage.getItem("lang");if(o)t=(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(c.Z,{title:n.title,subtitle:n.loading})});else if(i){var u=i.title,s=i.author,l=i.body,f=i.photo;t=(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.Z,{title:n.title,subtitle:u[a]}),(0,p.jsx)("section",{className:"publication",children:(0,p.jsxs)("div",{className:"container",children:[(0,p.jsx)("div",{className:"title",children:u[a]}),(0,p.jsxs)("div",{className:"author",children:[n.written_by," ",(0,p.jsx)("span",{children:s})]}),(0,p.jsx)("div",{className:"embed-responsive embed-responsive-16by9 bg-img",style:{backgroundImage:'url("'+f+'")'}}),(0,p.jsx)("div",{className:"content",dangerouslySetInnerHTML:{__html:l[a]}})]})})]})}return(0,p.jsx)("div",{className:"Publications Show",children:t})}}])&&v(e.prototype,n),r&&v(e,r),Object.defineProperty(e,"prototype",{writable:!1}),i}(r.Component);const O=(0,i.EN)((0,o.$j)((function(t){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach((function(e){b(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t)}),(function(t){return{get:function(e){return t((0,a.b)(e))},reset:function(){return t((0,a.Qs)())}}}))(j))},5735:(t,e,n)=>{n.d(e,{FH:()=>b,Qs:()=>f,b:()=>d});var r=n(73501);function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(){i=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},c=r.iterator||"@@iterator",a=r.asyncIterator||"@@asyncIterator",u=r.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),c=new S(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return L()}for(n.method=o,n.arg=i;;){var c=n.delegate;if(c){var a=j(c,n);if(a){if(a===p)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=f(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,c),i}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var p={};function h(){}function y(){}function b(){}var d={};s(d,c,(function(){return this}));var v=Object.getPrototypeOf,m=v&&v(v(E([])));m&&m!==e&&n.call(m,c)&&(d=m);var g=b.prototype=h.prototype=Object.create(d);function w(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function r(i,c,a,u){var s=f(t[i],t,c);if("throw"!==s.type){var l=s.arg,p=l.value;return p&&"object"==o(p)&&n.call(p,"__await")?e.resolve(p.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(p).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,u)}))}u(s.arg)}var i;this._invoke=function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}}function j(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var r=f(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,p;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function E(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return y.prototype=b,s(g,"constructor",b),s(b,"constructor",y),y.displayName=s(b,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s(t,u,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(x.prototype),s(x.prototype,a,(function(){return this})),t.AsyncIterator=x,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var c=new x(l(e,n,r,o),i);return t.isGeneratorFunction(n)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},w(g),s(g,u,"Generator"),s(g,c,(function(){return this})),s(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return c.type="throw",c.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var a=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(a&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),P(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;P(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:E(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),p}},t}function c(t,e,n,r,o,i,c){try{var a=t[i](c),u=a.value}catch(t){return void n(t)}a.done?e(u):Promise.resolve(u).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){c(i,r,o,a,u,"next",t)}function u(t){c(i,r,o,a,u,"throw",t)}a(void 0)}))}}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l="/api/",f=function(){return{type:r.cP}},p=function(){return{type:r.yR}},h=function(t){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({type:r.gn},t)},y=function(t){return{type:r.cv,error:t}},b=function(){return function(){var t=a(i().mark((function t(e){var n,r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(p()),t.prev=1,t.next=4,fetch("".concat(l,"publications"));case 4:return n=t.sent,t.next=7,n.json();case 7:r=t.sent,e(h(r)),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),console.log(t.t0),e(y(t.t0));case 15:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}()},d=function(t){return function(){var e=a(i().mark((function e(n){var r,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(p()),e.prev=1,e.next=4,fetch("".concat(l,"publications/").concat(t));case 4:return r=e.sent,e.next=7,r.json();case 7:o=e.sent,n(h(o)),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),n(y(e.t0));case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}()}},82580:(t,e,n)=>{n.d(e,{Z:()=>i});var r=n(23645),o=n.n(r)()((function(t){return t[1]}));o.push([t.id,'.PageTitle{background-color:var(--blue-80);position:relative}.PageTitle:after{background-color:var(--black);content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.PageTitle .container{align-items:center;color:var(--white);display:flex;flex-direction:column;justify-content:center;padding-bottom:80px;padding-top:80px}.PageTitle .container .title{border-bottom:.5px solid var(--white);font-size:2rem;font-weight:700;margin-bottom:7px}',""]);const i=o},5979:(t,e,n)=>{n.d(e,{Z:()=>i});var r=n(23645),o=n.n(r)()((function(t){return t[1]}));o.push([t.id,".Publications.Show .publication .container .title{color:var(--blue);font-size:24px;font-weight:700;margin-bottom:16px}.Publications.Show .publication .container .author{font-size:14px;margin-bottom:20px}.Publications.Show .publication .container .author span{color:var(--blue);font-weight:700}.Publications.Show .publication .container .bg-img{margin-bottom:20px}.Publications.Show .publication .container .content{font-size:14px;text-align:justify}@media (min-width:800px){.Publications.Show .publication .container .title{font-size:27px;margin-bottom:20px}.Publications.Show .publication .container .author{font-size:16px;margin-bottom:30px}.Publications.Show .publication .container .bg-img{margin-bottom:30px}.Publications.Show .publication .container .content{font-size:16px}}@media (min-width:1280px){.Publications.Show .publication .container .title{font-size:30px;margin-bottom:24px}.Publications.Show .publication .container .author{font-size:18px;margin-bottom:40px}.Publications.Show .publication .container .bg-img{margin-bottom:40px}.Publications.Show .publication .container .content{font-size:18px}}",""]);const i=o}}]);