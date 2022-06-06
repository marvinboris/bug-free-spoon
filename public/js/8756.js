/*! For license information please see 8756.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8756],{5099:(t,e,r)=>{r.d(e,{Z:()=>u});r(67294);var n=r(93379),o=r.n(n),i=r(17236),c={insert:"head",singleton:!1};o()(i.Z,c);i.Z.locals;var a=r(85893);const u=function(t){var e=t.title,r=t.subtitle;return(0,a.jsx)("div",{className:"PageTitle",children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("div",{className:"title",children:e}),(0,a.jsx)("div",{className:"subtitle",children:r})]})})}},49458:(t,e,r)=>{r.d(e,{Z:()=>j});var n=r(67294),o=r(14416),i=r(93379),c=r.n(i),a=r(53716),u={insert:"head",singleton:!1};c()(a.Z,u);a.Z.locals;var s=r(85893);function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=b(t);if(e){var o=b(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return v(this,r)}}function v(t,e){if(e&&("object"===l(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return m(t)}function m(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},b(t)}function g(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&d(t,e)}(i,t);var e,r,n,o=y(i);function i(){var t;p(this,i);for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return g(m(t=o.call.apply(o,[this].concat(r))),"state",{days:"00",hours:"00",minutes:"00",seconds:"00"}),g(m(t),"twoDigits",(function(t){return t>9?t:"0"+t})),g(m(t),"getTime",(function(){var e,r,n,o,i=t.props.time,c=new Date(i).getTime(),a=(new Date).getTime();a>=c?(e=r=n=o=0,clearInterval(t.getTime)):(e=Math.floor((c-a)/864e5),r=Math.floor((c-a)/36e5)-24*e,n=Math.floor((c-a)/6e4)-24*e*60-60*r,o=Math.floor((c-a)/1e3)-24*e*60*60-60*r*60-60*n),t.setState({days:t.twoDigits(e),hours:t.twoDigits(r),minutes:t.twoDigits(n),seconds:t.twoDigits(o)})})),t}return e=i,(r=[{key:"componentDidMount",value:function(){setInterval(this.getTime,1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.getTime)}},{key:"render",value:function(){var t=this.props.content.cms.pages.components.remaining_time,e=this.state,r=e.days,n=e.hours,o=e.minutes,i=e.seconds;return(0,s.jsxs)("div",{className:"UI RemainingTime",children:[(0,s.jsxs)("div",{className:"days",children:[(0,s.jsx)("div",{children:t.days}),(0,s.jsx)("div",{className:"block",children:r})]}),(0,s.jsxs)("div",{className:"hours",children:[(0,s.jsx)("div",{children:t.hours}),(0,s.jsx)("div",{className:"block",children:n})]}),(0,s.jsxs)("div",{className:"minutes",children:[(0,s.jsx)("div",{children:t.minutes}),(0,s.jsx)("div",{className:"block",children:o})]}),(0,s.jsxs)("div",{className:"seconds",children:[(0,s.jsx)("div",{children:t.seconds}),(0,s.jsx)("div",{className:"block",children:i})]}),(0,s.jsx)("div",{className:"remaining",children:t.remaining})]})}}])&&h(e.prototype,r),n&&h(e,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(n.Component);const j=(0,o.$j)((function(t){return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){g(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t)}))(w)},8756:(t,e,r)=>{r.r(e),r.d(e,{default:()=>Z});var n=r(67294),o=r(14416),i=r(32905),c=r(5099),a=r(49458),u=r(73501);function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(){l=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function a(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(t){a=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),c=new E(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return k()}for(r.method=o,r.arg=i;;){var c=r.delegate;if(c){var a=x(c,r);if(a){if(a===p)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,c),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var p={};function h(){}function d(){}function y(){}var v={};a(v,o,(function(){return this}));var m=Object.getPrototypeOf,b=m&&m(m(S([])));b&&b!==e&&r.call(b,o)&&(v=b);var g=y.prototype=h.prototype=Object.create(v);function w(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function n(o,i,c,a){var u=f(t[o],t,i);if("throw"!==u.type){var l=u.arg,p=l.value;return p&&"object"==s(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){n("next",t,c,a)}),(function(t){n("throw",t,c,a)})):e.resolve(p).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,a)}))}a(u.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,p;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return d.prototype=y,a(g,"constructor",y),a(y,"constructor",d),d.displayName=a(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,a(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(j.prototype),a(j.prototype,i,(function(){return this})),t.AsyncIterator=j,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var c=new j(u(e,r,n,o),i);return t.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},w(g),a(g,c,"Generator"),a(g,o,(function(){return this})),a(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return c.type="throw",c.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var a=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(a&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},t}function f(t,e,r,n,o,i,c){try{var a=t[i](c),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,o)}function p(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function c(t){f(i,n,o,c,a,"next",t)}function a(t){f(i,n,o,c,a,"throw",t)}c(void 0)}))}}function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function d(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var y="/api/",v=function(){return{type:u.wd}},m=function(t){return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){d(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({type:u.mD},t)},b=function(t){return{type:u.XH,error:t}},g=r(93379),w=r.n(g),j=r(68634),x={insert:"head",singleton:!1};w()(j.Z,x);j.Z.locals;var O=r(85893);function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function E(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function S(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function k(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function T(t,e){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},T(t,e)}function L(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=D(t);if(e){var o=D(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return N(this,r)}}function N(t,e){if(e&&("object"===P(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function D(t){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},D(t)}var R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&T(t,e)}(i,t);var e,r,n,o=L(i);function i(){return k(this,i),o.apply(this,arguments)}return e=i,(r=[{key:"componentDidMount",value:function(){this.props.get(this.props.match.params.slug)}},{key:"componentWillUnmount",value:function(){this.props.reset()}},{key:"render",value:function(){var t,e=this.props,r=e.content.cms.pages.frontend.pages.events,n=e.frontend.events,o=n.loading,i=n.event,u=localStorage.getItem("lang");if(o)t=(0,O.jsx)(O.Fragment,{children:(0,O.jsx)(c.Z,{title:r.title,subtitle:r.loading})});else if(i){var s=i.title,l=i.description,f=i.date,p=i.body,h=i.photo;t=(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(c.Z,{title:r.title,subtitle:s[u]}),(0,O.jsx)("section",{className:"event",children:(0,O.jsxs)("div",{className:"container",children:[(0,O.jsx)("div",{className:"title",children:s[u]}),(0,O.jsx)("div",{className:"embed-responsive embed-responsive-16by9 bg-img",style:{backgroundImage:'linear-gradient(rgba(0, 0, 0, .45), rgba(0, 0, 0, .45)), url("'+h+'")'},children:(0,O.jsx)(a.Z,{time:f})}),(0,O.jsx)("div",{className:"description",dangerouslySetInnerHTML:{__html:l[u]}}),(0,O.jsx)("div",{className:"content",dangerouslySetInnerHTML:{__html:p[u]}})]})})]})}return(0,O.jsx)("div",{className:"Events Show",children:t})}}])&&_(e.prototype,r),n&&_(e,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(n.Component);const Z=(0,i.EN)((0,o.$j)((function(t){return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?E(Object(r),!0).forEach((function(e){S(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t)}),(function(t){return{get:function(e){return t(function(t){return function(){var e=p(l().mark((function e(r){var n,o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(v()),e.prev=1,e.next=4,fetch("".concat(y,"events/").concat(t));case 4:return n=e.sent,e.next=7,n.json();case 7:o=e.sent,r(m(o)),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),r(b(e.t0));case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}()}(e))},reset:function(){return t({type:u.Uz})}}}))(R))},17236:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,'.PageTitle{background-color:var(--blue-80);position:relative}.PageTitle:after{background-color:var(--black);content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.PageTitle .container{align-items:center;color:var(--white);display:flex;flex-direction:column;justify-content:center;padding:80px 0}.PageTitle .container .title{border-bottom:.5px solid var(--white);font-size:2rem;font-weight:700;margin-bottom:7px}',""]);const i=o},53716:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".RemainingTime{align-items:flex-end;display:flex;font-weight:700}.RemainingTime>div:not(.remaining){align-items:center;display:flex;flex-direction:column;margin-right:20px}.RemainingTime>div:not(.remaining) .block{border:1px solid var(--white);border-radius:10px;margin-top:5px;padding:8px 0;text-align:center;width:45px}",""]);const i=o},68634:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".Events.Show .event .container{padding:80px 0}.Events.Show .event .container .title{color:var(--blue);font-size:30px;font-weight:700;margin-bottom:24px}.Events.Show .event .container .bg-img{border-radius:var(--border-radius);margin-bottom:40px;position:relative}.Events.Show .event .container .bg-img .RemainingTime{background-color:var(--blue);border:1px solid var(--white);border-bottom-left-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-top:none;color:var(--white);display:block;left:50%;padding:20px 40px;position:absolute;top:0;transform:translateX(-50%)}.Events.Show .event .container .bg-img .RemainingTime>div:not(.remaining){display:inline-flex;margin:0 10px}.Events.Show .event .container .bg-img .RemainingTime .remaining{margin-top:10px;text-align:center}.Events.Show .event .container .description{color:var(--blue);font-size:24px;font-weight:500px;margin-bottom:20px}.Events.Show .event .container .content{font-size:18px;text-align:justify}",""]);const i=o}}]);