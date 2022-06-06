/*! For license information please see 64.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[64],{37840:(e,t,r)=>{r.d(t,{Z:()=>_});var n=r(67294),o=r(73727),i=r(87462),a=r(63366),s=r(45697),c=r.n(s),l=r(94184),u=r.n(l),f=r(23663),d=["className","cssModule","active","tag"],p={tag:f.iC,active:c().bool,className:c().string,cssModule:c().object},h=function(e){var t=e.className,r=e.cssModule,o=e.active,s=e.tag,c=(0,a.Z)(e,d),l=(0,f.mx)(u()(t,!!o&&"active","breadcrumb-item"),r);return n.createElement(s,(0,i.Z)({},c,{className:l,"aria-current":o?"page":void 0}))};h.propTypes=p,h.defaultProps={tag:"li"};const y=h;var b=["className","listClassName","cssModule","children","tag","listTag","aria-label"],m={tag:f.iC,listTag:f.iC,className:c().string,listClassName:c().string,cssModule:c().object,children:c().node,"aria-label":c().string},g=function(e){var t=e.className,r=e.listClassName,o=e.cssModule,s=e.children,c=e.tag,l=e.listTag,d=e["aria-label"],p=(0,a.Z)(e,b),h=(0,f.mx)(u()(t),o),y=(0,f.mx)(u()("breadcrumb",r),o);return n.createElement(c,(0,i.Z)({},p,{className:h,"aria-label":d}),n.createElement(l,{className:y},s))};g.propTypes=m,g.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"};const v=g;var x=r(14416),j=r(85893);function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function P(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function k(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function C(e,t){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},C(e,t)}function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=L(e);if(t){var o=L(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return E(this,r)}}function E(e,t){if(t&&("object"===w(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}var Z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(a,e);var t,r,n,i=S(a);function a(){return P(this,a),i.apply(this,arguments)}return t=a,(r=[{key:"render",value:function(){var e=this.props,t=e.items,r=e.main,n=e.icon,i=e.content.cms.pages.general.home,a=e.dark,s=void 0!==a&&a,c=null;return t&&(c=t.map((function(e,t){return(0,j.jsx)(y,{children:(0,j.jsx)(o.OL,{className:"text-border",to:e.to,children:e.content})},t)}))),(0,j.jsxs)(v,{className:"d-none d-sm-flex align-items-center",color:s?"light":"secondary",listClassName:"bg-transparent rounded-0 justify-content-end",style:{top:"50%",right:0,transform:"translateY(-10px)",position:"absolute",zIndex:1e3},children:[(0,j.jsx)(y,{children:(0,j.jsxs)(o.OL,{className:"text-blue text-decoration-none",to:"/",children:[n&&(0,j.jsx)("i",{className:"fas fa-"+n+" mr-1"}),(0,j.jsx)("span",{className:"text-500 text-blue-50",children:i})]})}),c,(0,j.jsx)(y,{color:"blue",className:"text-decoration-none",active:!0,children:r})]})}}])&&k(t.prototype,r),n&&k(t,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(n.Component);const _=(0,x.$j)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){N(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e)}))(Z)},40342:(e,t,r)=>{r.d(t,{Z:()=>p});var n=r(67294),o=r(45046),i=r(32701),a=r(10684),s=r(97975),c=r(51436),l=r(92814),u=r(85893);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,o,i=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return d(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const p=function(e){var t=e.deleteAction,r=e.className,d=void 0===r?"":r,p=e.children,h=f((0,n.useState)(!1),2),y=h[0],b=h[1],m=function(){return b(!y)};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("span",{style:{cursor:"pointer"},onClick:m,children:p}),(0,u.jsxs)(o.Z,{isOpen:y,toggle:m,centered:!0,className:d,children:[(0,u.jsx)(i.Z,{toggle:m,children:"Delete item"}),(0,u.jsxs)(a.Z,{className:"text-center",children:[(0,u.jsx)("p",{children:"Are you sure you want to delete this item?"}),(0,u.jsxs)("div",{children:[(0,u.jsxs)(s.Z,{color:"danger",onClick:function(){m(),t()},children:["Delete ",(0,u.jsx)(l.G,{icon:c.$aW,fixedWidth:!0})]})," ",(0,u.jsxs)(s.Z,{color:"secondary",onClick:m,children:["Close ",(0,u.jsx)(l.G,{icon:c.NBC,fixedWidth:!0})]})]})]})]})]})}},87149:(e,t,r)=>{r.d(t,{Z:()=>A});var n=r(67294),o=r(14416),i=r(609),a=r(57472),s=r(91592),c=r(42365),l=r(36595),u=r(92814),f=r(51436),d=r(73727),p=r(92903),h=r(93379),y=r.n(h),b=r(53815),m={insert:"head",singleton:!1};y()(b.Z,m);b.Z.locals;var g,v=r(85893);function x(e){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(e)}function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(){w=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function c(e,t,r,n){var o=t&&t.prototype instanceof f?t:f,i=Object.create(o.prototype),a=new P(n||[]);return i._invoke=function(e,t,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return C()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=j(a,r);if(s){if(s===u)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=l(e,t,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===u)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(e,r,a),i}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var u={};function f(){}function d(){}function p(){}var h={};s(h,o,(function(){return this}));var y=Object.getPrototypeOf,b=y&&y(y(k([])));b&&b!==t&&r.call(b,o)&&(h=b);var m=p.prototype=f.prototype=Object.create(h);function g(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function v(e,t){function n(o,i,a,s){var c=l(e[o],e,i);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==x(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(f).then((function(e){u.value=e,a(u)}),(function(e){return n("throw",e,a,s)}))}s(c.arg)}var o;this._invoke=function(e,r){function i(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(i,i):i()}}function j(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,j(e,t),"throw"===t.method))return u;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var n=l(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,u;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,u):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,u)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function N(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function k(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:C}}function C(){return{value:void 0,done:!0}}return d.prototype=p,s(m,"constructor",p),s(p,"constructor",d),d.displayName=s(p,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,s(e,a,"GeneratorFunction")),e.prototype=Object.create(m),e},e.awrap=function(e){return{__await:e}},g(v.prototype),s(v.prototype,i,(function(){return this})),e.AsyncIterator=v,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new v(c(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},g(m),s(m,a,"Generator"),s(m,o,(function(){return this})),s(m,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=k,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(N),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,u):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),u},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),N(r),u}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:k(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),u}},e}function O(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function N(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){O(i,n,o,a,s,"next",e)}function s(e){O(i,n,o,a,s,"throw",e)}a(void 0)}))}}function P(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function k(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function C(e,t){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},C(e,t)}function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Z(e);if(t){var o=Z(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return E(this,r)}}function E(e,t){if(t&&("object"===x(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return L(e)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Z(e){return Z=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},Z(e)}function _(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(h,e);var t,r,n,o=S(h);function h(){var e;P(this,h);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return _(L(e=o.call.apply(o,[this].concat(r))),"state",{show:10,search:"",page:1,pageNumber:1,pageFirst:1,pageSecond:2,pageLast:3}),_(L(e),"inputChangedHandler",(function(t){var r=t.target,n=r.name,o=r.value,i=e.state,a=i.page,s=i.show,c=i.search;return e.firstPageHandler(),"show"===n?(e.props.get(a,o,c),e.setState({show:o})):"search"===n?(g&&clearTimeout(g),g=setTimeout((function(){e.props.get(a,s,o),clearTimeout(g)}),1e3),e.setState({search:o})):void 0})),_(L(e),"previousPageHandler",(function(){var t=e.state.page;t<=1||e.pageChangeHandler(t-1)})),_(L(e),"nextPageHandler",(function(){var t=e.state,r=t.page;r>=t.pageNumber||e.pageChangeHandler(r+1)})),_(L(e),"firstPageHandler",(function(){e.state.page<=1||e.pageChangeHandler(1)})),_(L(e),"lastPageHandler",(function(){var t=e.state,r=t.page,n=t.pageNumber;r>=n||e.pageChangeHandler(n)})),_(L(e),"pageChangeHandler",(function(t){var r,n=e.state,o=n.show,i=n.search,a=n.pageNumber,s=(r=t<3?1:t===a?a-2:t-1)+1,c=r+2;e.setState({page:t,pageFirst:r,pageSecond:s,pageLast:c},(function(){return e.props.get(t,o,i)}))})),_(L(e),"onClick",(function(t){t.preventDefault();var r=t.target.href;e.exportData(r)})),_(L(e),"exportData",function(){var t=N(w().mark((function t(r){var n,o,i,a,s,c,l,u,f,d,p;return w().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.props,o=n.data,i=n.title,a=r.split("/")[r.split("/").length-1],s=i+"."+a,c=localStorage.getItem("token"),t.prev=4,(l=new FormData).append("data",o),l.append("name",s),t.next=10,fetch(r,{method:"POST",mode:"cors",body:l,headers:{Authorization:c}});case 10:return u=t.sent,t.next=13,u.blob();case 13:f=t.sent,d=URL.createObjectURL(f),(p=document.createElement("a")).style.display="none",p.href=d,p.download=s,document.body.appendChild(p),p.click(),window.URL.revokeObjectURL(d),t.next=27;break;case 24:t.prev=24,t.t0=t.catch(4),console.log(t.t0);case 27:case"end":return t.stop()}}),t,null,[[4,24]])})));return function(e){return t.apply(this,arguments)}}()),e}return t=h,(r=[{key:"componentDidUpdate",value:function(e,t){var r=this.props.total,n=this.state.show;e.total===r&&t.show===n||this.setState({pageNumber:Math.ceil(r/n)})}},{key:"render",value:function(){var e=this,t=this.props,r=t.fields,n=t.array,o=t.loading,h=void 0!==o&&o,y=t.total,b=void 0===y?0:y,m=t.limit,g=t.bordered,x=t.title,j=t.subtitle,w=t.add,O=t.link,N=t.dark,P=void 0!==N&&N,k=t.borderless,C=t.outerClassName,S=void 0===C?"":C,E=t.select,L=t.children,Z=t.selectHandler,_=t.content.cms.pages.components.list,T=this.state,A=T.show,D=T.search,I=T.page,U=T.pageFirst,R=T.pageSecond,H=T.pageLast,F=T.pageNumber,M=r.map((function(e){var t=e.name,r=e.fixed;return(0,v.jsx)("th",{className:"text-nowrap",style:r?{position:"sticky",right:0}:{},children:t},t)}));M.unshift((0,v.jsx)("th",{className:"text-center align-middle",children:_.sl},"#")),E&&M.unshift((0,v.jsx)("th",{className:"align-middle text-center",children:(0,v.jsx)("input",{type:"checkbox",onClick:Z,className:"select_all"})},"select_all"));var G=n.map((function(e,t){if(m&&t>=m)return null;var n=[(0,v.jsx)("th",{className:"text-center align-middle",children:("All"===A?0:(I-1)*A)+t+1},"primary"+t)];return E&&n.unshift((0,v.jsx)("th",{className:"text-center align-middle",children:(0,v.jsx)("input",{type:"checkbox",value:e._id})},"secondary"+t)),r.forEach((function(t){var r=t.key,o=t.minWidth,i=t.fixed;n.push((0,v.jsx)("td",{className:"align-middle text-truncate",style:(0,p.v4)({minWidth:o,maxWidth:250,borderColor:P?"#606060":"#DEE2E6"},i?{position:"sticky",right:0,backgroundColor:P?"#1B223F":"#F4F4F4"}:{}),children:e[r]},r))})),(0,v.jsx)("tr",{className:"align-middle",children:n},t+1)})),z=b%A,B=0===b?b:0!==z?z:A;return(0,v.jsxs)("div",{className:"UI List shadow "+S,children:[(0,v.jsx)("input",{type:"hidden",id:"table-show",value:A}),(0,v.jsx)("input",{type:"hidden",id:"table-page",value:I}),(0,v.jsx)("input",{type:"hidden",id:"table-search",value:D}),(0,v.jsxs)("div",{className:"header",children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{className:"title",children:x}),(0,v.jsx)("div",{className:"subtitle",children:j}),(0,v.jsx)("div",{className:"blue-line"})]}),(0,v.jsxs)("div",{className:"show",children:[(0,v.jsx)("div",{className:"text",children:_.show}),(0,v.jsxs)(i.Z,{type:"select",name:"show",onChange:this.inputChangedHandler,className:"select",children:[(0,v.jsx)("option",{value:"10",children:"10"}),(0,v.jsx)("option",{value:"25",children:"25"}),(0,v.jsx)("option",{value:"50",children:"50"}),(0,v.jsx)("option",{value:"100",children:"100"}),(0,v.jsx)("option",{value:"All",children:_.all})]})]}),(0,v.jsxs)(a.Z,{className:"export",children:[(0,v.jsxs)(s.Z,{color:"blue",caret:!0,children:[(0,v.jsx)("i",{className:"fas fa-file-export"}),"Export"]}),(0,v.jsxs)(c.Z,{children:[(0,v.jsxs)("a",{href:"/api/export/xlsx",onClick:this.onClick,className:"dropdown-item",children:[(0,v.jsx)("i",{className:"fas fa-file-excel"}),_.excel]}),(0,v.jsxs)("a",{href:"/api/export/pdf",onClick:this.onClick,className:"dropdown-item",children:[(0,v.jsx)("i",{className:"fas fa-file-pdf"}),_.pdf]}),(0,v.jsxs)("a",{href:"/api/export/csv",onClick:this.onClick,className:"dropdown-item",children:[(0,v.jsx)("i",{className:"fas fa-file-csv"}),_.csv]}),(0,v.jsxs)("a",{href:"/api/export/pdf",onClick:this.onClick,className:"dropdown-item",children:[(0,v.jsx)("i",{className:"fas fa-print"}),_.print]})]})]}),(0,v.jsx)("div",{className:"search",children:(0,v.jsx)(i.Z,{type:"search",name:"search",onChange:this.inputChangedHandler,placeholder:"".concat(_.search,"...")})}),w&&(0,v.jsx)(d.rU,{to:O,className:"link",children:(0,v.jsxs)("button",{className:"btn btn-blue",children:[w,(0,v.jsx)("i",{className:"fas fa-plus"})]})})]}),(0,v.jsxs)("div",{className:"body",children:[(0,v.jsxs)("div",{className:"table-responsive scrollbar-blue",children:[(0,v.jsxs)(l.Z,{dark:P,bordered:g,hover:!0,borderless:k,children:[(0,v.jsx)("thead",{children:(0,v.jsx)("tr",{children:M})}),(0,v.jsx)("tbody",{children:!h&&G})]}),h&&(0,v.jsxs)("div",{className:"loading",children:[_.loading,"..."]})]}),(0,v.jsx)("div",{children:L}),(0,v.jsxs)("div",{children:[(0,v.jsxs)("div",{children:[_.showing," ",+I!==F&&+I>1?A:B," ",_.from," ",b," ",b>1?_.entries.plural:_.entries.singular,"."]}),(0,v.jsx)("div",{className:"pt-2 d-flex justify-content-end",children:"All"!==A&&(0,v.jsxs)("ul",{className:"pagination btn-group",children:[1!==I&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("li",{className:"btn btn-yellow",onClick:this.firstPageHandler,children:[(0,v.jsx)(u.G,{icon:f.UXu,className:"mr-2"}),_.first]}),(0,v.jsx)("li",{className:"btn btn-darkblue text-secondary",onClick:this.previousPageHandler,children:(0,v.jsx)(u.G,{icon:f.A35})})]}),(0,v.jsx)("li",{className:"btn btn-darkblue "+(I===U?"text-700 active":"secondary"),onClick:function(){return e.pageChangeHandler(U)},children:U}),F>1&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("li",{className:"btn btn-darkblue "+(I===R?"text-700 active":"secondary"),onClick:function(){return e.pageChangeHandler(R)},children:R}),F>2&&(0,v.jsx)("li",{className:"btn btn-darkblue "+(I===H?"text-700 active":"secondary"),onClick:function(){return e.pageChangeHandler(H)},children:H}),I!==F&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("li",{className:"btn btn-darkblue text-secondary",onClick:this.nextPageHandler,children:(0,v.jsx)(u.G,{icon:f._tD})}),(0,v.jsxs)("li",{className:"btn btn-primary",onClick:this.lastPageHandler,children:[_.last,(0,v.jsx)(u.G,{icon:f.cLY,className:"ml-2"})]})]})]})]})})]})]})]})}}])&&k(t.prototype,r),n&&k(t,n),Object.defineProperty(t,"prototype",{writable:!1}),h}(n.Component);const A=(0,o.$j)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){_(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e)}))(T)},50171:(e,t,r)=>{r.d(t,{Z:()=>c});r(67294);var n=r(93379),o=r.n(n),i=r(38154),a={insert:"head",singleton:!1};o()(i.Z,a);i.Z.locals;var s=r(85893);const c=function(e){var t=e.title,r=e.subtitle,n=e.children,o=e.icon;return(0,s.jsxs)("div",{className:"UI PageTitle",children:[(0,s.jsx)("div",{className:"blue-line"}),(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"fas fa-"+o})}),(0,s.jsxs)("div",{className:"flex-fill",children:[(0,s.jsx)("div",{className:"title",children:t}),(0,s.jsx)("div",{children:r})]}),(0,s.jsx)("div",{children:n})]})}},34173:(e,t,r)=>{r.d(t,{Z:()=>u});var n=r(67294),o=r(45046),i=r(32701),a=r(10684),s=r(85893);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,o,i=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const u=function(e){var t=e.title,r=e.content,l=e.className,u=e.children,f=c((0,n.useState)(!1),2),d=f[0],p=f[1],h=function(){return p(!d)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{style:{cursor:"pointer"},onClick:h,children:u}),(0,s.jsxs)(o.Z,{isOpen:d,toggle:h,size:"lg",centered:!0,className:l,children:[t&&(0,s.jsx)(i.Z,{toggle:h,children:t}),(0,s.jsx)(a.Z,{children:(0,s.jsx)("div",{className:"p-2",children:r})})]})]})}},99412:(e,t,r)=>{r.d(t,{Z:()=>o});r(67294);var n=r(85893);const o=function(e){var t=e.err;return t?(0,n.jsx)("div",{className:"alert alert-danger",children:t.message?t.message:t}):null}},62932:(e,t,r)=>{r.d(t,{Z:()=>O});var n=r(67294),o=r(87462),i=r(63366),a=r(4942),s=r(45697),c=r.n(s),l=r(94184),u=r.n(l),f=r(23663),d=r(69638),p=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b={children:c().node,className:c().string,closeClassName:c().string,closeAriaLabel:c().string,cssModule:c().object,color:c().string,fade:c().bool,isOpen:c().bool,toggle:c().func,tag:f.iC,transition:c().shape(d.Z.propTypes),innerRef:c().oneOfType([c().object,c().string,c().func])},m={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:y(y({},d.Z.defaultProps),{},{unmountOnExit:!0})};function g(e){var t=e.className,r=e.closeClassName,a=e.closeAriaLabel,s=e.cssModule,c=e.tag,l=e.color,h=e.isOpen,b=e.toggle,m=e.children,g=e.transition,v=e.fade,x=e.innerRef,j=(0,i.Z)(e,p),w=(0,f.mx)(u()(t,"alert","alert-"+l,{"alert-dismissible":b}),s),O=(0,f.mx)(u()("close",r),s),N=y(y(y({},d.Z.defaultProps),g),{},{baseClass:v?g.baseClass:"",timeout:v?g.timeout:0});return n.createElement(d.Z,(0,o.Z)({},j,N,{tag:c,className:w,in:h,role:"alert",innerRef:x}),b?n.createElement("button",{type:"button",className:O,"aria-label":a,onClick:b},n.createElement("span",{"aria-hidden":"true"},"×")):null,m)}g.propTypes=b,g.defaultProps=m;const v=g;var x=r(85893);function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,o,i=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return w(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const O=function(e){var t=e.message,r=e.time,o=j((0,n.useState)(!0),2),i=o[0],a=o[1];return r&&setTimeout((function(){a(!1)}),r),t?(0,x.jsx)(v,{color:t.type,isOpen:i,children:t.content}):null}},10064:(e,t,r)=>{r.r(t),r.d(t,{default:()=>C});var n=r(67294),o=r(14416),i=r(32905),a=r(73727),s=r(99412),c=r(87149),l=r(34173),u=r(62932),f=r(50171),d=r(40342),p=r(37840),h=r(1119),y=r(92903),b=r(85893);function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function x(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function j(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function w(e,t){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},w(e,t)}function O(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=P(e);if(t){var o=P(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return N(this,r)}}function N(e,t){if(t&&("object"===m(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(h,e);var t,r,n,o=O(h);function h(){return x(this,h),o.apply(this,arguments)}return t=h,(r=[{key:"componentDidMount",value:function(){this.props.get()}},{key:"componentWillUnmount",value:function(){this.props.reset()}},{key:"render",value:function(){var e=this,t=this.props,r=t.content.cms.pages,n=r.components.list,o=n.action,h=n.see,m=r.backend.pages.elders,g=m.icon,v=m.title,x=m.add,j=m.index,w=m.form,O=t.backend.elders,N=O.loading,P=O.error,k=O.message,C=O.elders,S=void 0===C?[]:C,E=O.total,L=t.auth.data.role.features,Z=localStorage.getItem("lang"),_=L.find((function(e){return"elders"===e.prefix})),T=!_&&(0,b.jsx)(i.l_,{to:"/user/dashboard"}),A=(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(s.Z,{err:P})}),D=this.props.location.state?(0,b.jsx)(u.Z,{time:5e3,message:this.props.location.state.message}):null,I=(0,b.jsx)(u.Z,{message:k}),U=S.map((function(t){var r=t.title[Z];return(0,y.v4)(t,{created_at:(0,y.Ny)(t.created_at),title:r,photo:t.photo&&(0,b.jsxs)("div",{className:"d-flex",children:[(0,b.jsx)("span",{children:h}),(0,b.jsx)("span",{className:"ml-auto",children:(0,b.jsx)(l.Z,{title:"".concat(w.elder_photo,": ").concat(t.name),content:(0,b.jsx)("img",{src:t.photo,className:"w-100"}),children:(0,b.jsx)("i",{className:"fas fa-eye text-green mr-2 fa-fw"})})})]}),action:(0,b.jsxs)("div",{className:"text-center",children:[(0,b.jsx)(a.rU,{to:"/user/elders/".concat(t.id),className:"mx-1",children:(0,b.jsx)("i",{className:"fas fa-eye text-green fa-fw"})}),JSON.parse(_.permissions).includes("u")&&(0,b.jsx)(a.rU,{to:"/user/elders/".concat(t.id,"/edit"),className:"mx-1",children:(0,b.jsx)("i",{className:"fas fa-edit text-brokenblue fa-fw"})}),JSON.parse(_.permissions).includes("d")&&(0,b.jsx)("span",{className:"mx-1",children:(0,b.jsx)(d.Z,{deleteAction:function(){return e.props.delete(t.id)},children:(0,b.jsx)("i",{className:"fas fa-trash fa-fw text-red fa-fw"})})})]})})})),R=(0,b.jsx)(c.Z,{array:U,loading:N,data:JSON.stringify(S),get:this.props.get,total:E,bordered:!0,add:x,link:"/user/elders/add",icon:g,title:j,className:"shadow-sm",fields:[{name:w.name,key:"name"},{name:w.email,key:"email"},{name:w.title,key:"title"},{name:w.photo,key:"photo"},{name:w.paid,key:"paid"},{name:o,key:"action",fixed:!0}]});return(0,b.jsxs)("div",{className:"Elders",children:[(0,b.jsx)(f.Z,{title:v,subtitle:j,children:(0,b.jsx)(p.Z,{main:j})}),(0,b.jsxs)("div",{className:"content",children:[T,A,D,I,R]})]})}}])&&j(t.prototype,r),n&&j(t,n),Object.defineProperty(t,"prototype",{writable:!1}),h}(n.Component);const C=(0,i.EN)((0,o.$j)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e)}),(function(e){return{get:function(t,r,n){return e((0,h.ll)(t,r,n))},delete:function(t){return e((0,h.mv)(t))},reset:function(){return e((0,h.JL)())}}}))(k))},1119:(e,t,r)=>{r.d(t,{Iw:()=>f,JL:()=>l,Nf:()=>p,OQ:()=>d,ll:()=>u,mv:()=>y,qs:()=>h});var n=r(92903),o=r(73501);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];return n.ds.apply(void 0,["elders",{start:function(){return{type:o.n4}},success:function(e){return a({type:o.Cf},e)},fail:function(e){return{type:o.fl,error:e}}},e].concat(r))},l=function(){return{type:o.GD}},u=function(e,t,r){return c("index",e,t,r)},f=function(){return c("info")},d=function(e){return c("show",e)},p=function(e){return c("post",e)},h=function(e,t){return c("patch",e,t)},y=function(e){return c("delete",e)}},53815:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,".UI.List{background-color:var(--white);border-radius:var(--border-radius);padding:36px 51px 75px}.UI.List .header{align-items:center;display:flex;margin-bottom:86px}.UI.List .header .title{font-size:18px;font-weight:700;margin-bottom:5px}.UI.List .header .subtitle{font-size:12px;margin-bottom:15px}.UI.List .header .blue-line{background-color:var(--blue);border-radius:5px;height:7px;width:34px}.UI.List .header .show{align-items:center;display:none;margin-left:auto}.UI.List .header .export{display:none}.UI.List .header .search{margin-left:auto;margin-right:15px}.UI.List .header .search input{background-color:var(--border-5);border:none;border-radius:var(--border-radius);color:var(--border);height:45px;padding:15px 24px}.UI.List .body table{color:inherit}.UI.List .body table thead{background-color:var(--border-10)}",""]);const i=o},38154:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,'.UI.PageTitle{align-items:center;background-color:var(--white);display:flex;height:81px;padding-left:66px;position:-webkit-sticky;position:sticky;top:78.47px;z-index:1000}.UI.PageTitle:after{background-color:var(--blue-10);content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.UI.PageTitle .blue-line{background-color:var(--blue);height:100%;left:0;position:absolute;top:0;width:9px}.UI.PageTitle .icon{color:var(--blue);font-size:33px;padding-right:23px}.UI.PageTitle .title{font-size:16px;font-weight:500;margin-bottom:10px}',""]);const i=o},36595:(e,t,r)=>{r.d(t,{Z:()=>h});var n=r(87462),o=r(63366),i=r(67294),a=r(45697),s=r.n(a),c=r(94184),l=r.n(c),u=r(23663),f=["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"],d={className:s().string,cssModule:s().object,size:s().string,bordered:s().bool,borderless:s().bool,striped:s().bool,dark:s().bool,hover:s().bool,responsive:s().oneOfType([s().bool,s().string]),tag:u.iC,responsiveTag:u.iC,innerRef:s().oneOfType([s().func,s().string,s().object])},p=function(e){var t=e.className,r=e.cssModule,a=e.size,s=e.bordered,c=e.borderless,d=e.striped,p=e.dark,h=e.hover,y=e.responsive,b=e.tag,m=e.responsiveTag,g=e.innerRef,v=(0,o.Z)(e,f),x=(0,u.mx)(l()(t,"table",!!a&&"table-"+a,!!s&&"table-bordered",!!c&&"table-borderless",!!d&&"table-striped",!!p&&"table-dark",!!h&&"table-hover"),r),j=i.createElement(b,(0,n.Z)({},v,{ref:g,className:x}));if(y){var w=(0,u.mx)(!0===y?"table-responsive":"table-responsive-"+y,r);return i.createElement(m,{className:w},j)}return j};p.propTypes=d,p.defaultProps={tag:"table",responsiveTag:"div"};const h=p}}]);