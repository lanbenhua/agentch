var t=function(){return t=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},t.apply(this,arguments)},e=function(){function t(){this.handlers=[],this.handlers=[]}return t.prototype.use=function(t,e,n){return this.handlers=this.handlers.concat({onFulfilled:t,onRejected:e,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},t.prototype.reject=function(t){this.handlers[t]&&(this.handlers[t]=null)},t.prototype.forEach=function(t){this.handlers.forEach((function(e,n){null!==e&&t(e,n)}))},t}(),n=function(t,e,n){try{return JSON.stringify(t,e,n)}catch(t){return""}};function r(t){return null==t}
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function o(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return!!o(t)&&(void 0===t.constructor||!!o(t.constructor.prototype)&&!!t.constructor.prototype.hasOwnProperty("isPrototypeOf"))}var u=function(){function t(t){this._contentType=t}return t.prototype.marshal=function(t){var e=this._contentType;if("formdata"===e)return function(t){if(t instanceof FormData)return t;var e=new FormData;i(t)&&Object.entries(t).forEach((function(t){var n=t[0],o=t[1];r(o)||(Array.isArray(o)&&o.forEach((function(t){r(t)||e.append(n,a(t))})),e.append(n,a(o)))}));"string"==typeof t&&new URLSearchParams(t).forEach((function(t,n){e.append(n,t)}));return e}(t);if("json"===e)return"string"==typeof t?t:n(t);if("form"===e)return function(t){if("string"==typeof t)return t;if(t instanceof URLSearchParams)return t.toString();if(i(t))return s(t);if(t instanceof FormData){var e={};return t.forEach((function(t,n){e[n]=t})),s(e)}return""}(t);if("blob"===e){if(!(t instanceof Blob))throw new Error("BodyParser: must be a blob when content type is blob");return t}if("buffer"===e){if(!(t instanceof ArrayBuffer))throw new Error("BodyParser: must be a arraybuffer when content type is arraybuffer");return t}return"text"===e?"string"==typeof t?t:n(t):t},t}();function s(t){return Object.entries(t).reduce((function(t,e){var n=e[0],o=e[1];return r(o)?t:Array.isArray(o)?(o.forEach((function(e){r(e)||t.append(n,a(e))})),t):(t.append(n,a(o)),t)}),new URLSearchParams).toString()}function a(t){return r(t)?"":"string"==typeof t?t:"number"==typeof t||"boolean"==typeof t?String(t):n(t)}var c=function(){function t(t,e){this._size=10,this._queue=[],this._pending=0,this._queue=[],this._pending=0,this._options=e,this.resize(t)}return Object.defineProperty(t.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"queue",{get:function(){return this._queue},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"pending",{get:function(){return this._pending},enumerable:!1,configurable:!0}),t.prototype.resize=function(t){this._size=t,this._check()},t.prototype.run=function(t){var e=this;return new Promise((function(t){return e._push(t)})).then(t).then(this._finish,this._error)},t.prototype._check=function(){if(!(this._pending>=this.size||this._queue.length<1)){this._pending++;var t=this._queue.shift();t&&t(void 0),this._check()}},t.prototype._push=function(t){this._queue.push(t),this._check()},t.prototype._pop=function(){if(this._pending--,this._pending<0)throw new Error("Pop called more than there were pending fetches");this._check()},t.prototype._finish=function(t){return this._pop(),t},t.prototype._error=function(t){throw this._pop(),t},t}(),f=function(){function t(){this._d=new Map}return t.prototype.signal=function(t){var e;return null===(e=this._d.get(t))||void 0===e?void 0:e.signal},t.prototype.isAborted=function(t){var e,n;return null===(n=null===(e=this.signal(t))||void 0===e?void 0:e.aborted)||void 0===n||n},t.prototype.abort=function(t,e){if(!this.isAborted(t)){var n=this._d.get(t);n&&n.abort(e)}},t.prototype.set=function(t,e){this._d.set(t,e)},t.prototype.delete=function(t){return this._d.delete(t)},t.prototype.clear=function(){this._d.clear()},t}(),p=window.fetch,h={json:"application/json; charset=utf-8",form:"application/x-www-form-urlencoded; charset=utf-8",formdata:void 0,buffer:"text/plain; charset=utf-8",text:"text/plain; charset=utf-8",blob:void 0},l={timeout:6e4},d={},y=function(){function n(n,r){var o;this._abortors=new f,this._interceptors={request:new e,response:new e},this._base=n,this._init=t(t({},l),r),(null===(o=null==r?void 0:r.queue)||void 0===o?void 0:o.size)&&(this._queue=new c(null==r?void 0:r.queue.size))}return Object.defineProperty(n.prototype,"init",{get:function(){return this._init},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"base",{get:function(){return this._base},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"queue",{get:function(){return this._queue},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"interceptors",{get:function(){return this._interceptors},enumerable:!1,configurable:!0}),n.prototype.abort=function(t,e){this._abortors.abort(t,e)},n.prototype.request=function(t){var e=this;return this._queue?this._queue.run((function(){return e._request(t)})):this._request(t)},n.prototype._request=function(t){this.resolveInput(t);var e=this.resolveReqInit(t);return this.resolveTimeoutAutoAbort(e),this.handleInterceptors(e)},n.prototype.resolveInput=function(t){var e,n=v(this._base||(null==t?void 0:t.base),t.input);if("GET"===(null===(e=null==t?void 0:t.method)||void 0===e?void 0:e.toUpperCase())&&(null==t?void 0:t.data)){var r=n.indexOf("?"),o=r<0?n:n.slice(0,n.indexOf("?")),i=_(r<0?"":n.slice(n.indexOf("?")),null==t?void 0:t.data);n=o+(i?"?".concat(i):"")}t.url=n},n.prototype.resolveReqInit=function(e){var n=t(t(t({},d),this._init),e);n.method||(n.method="GET"),n.method=n.method.toUpperCase();var r=(null==n?void 0:n.contentType)&&h[null==n?void 0:n.contentType],o=t({},r?{"Content-Type":r}:null);return n.headers=t(t(t({},d.headers),o),n.headers),n.body="GET"===n.method||"HEAD"===n.method?void 0:void 0!==n.body&&null!==n.body?n.body:new u(null==n?void 0:n.contentType).marshal(n.data),n},n.prototype.resolveTimeoutAutoAbort=function(t){var e=this,n=t.timeout;if(n&&!t.signal){var r=new AbortController;t.signal||(t.signal=r.signal),this._abortors.set(this._getAbortId(t),r);var o=setTimeout((function(){r.abort("Timeout of exceeded"),e._abortors.delete(e._getAbortId(t)),clearTimeout(o)}),n)}},n.prototype._getAbortId=function(t){var e,n,r;return null!==(e=t.abortId)&&void 0!==e?e:(null!==(n=t.method)&&void 0!==n?n:"")+(null!==(r=t.url)&&void 0!==r?r:"")},n.prototype.handleInterceptors=function(t){var e=[],n=!0;this._interceptors.request.forEach((function(r){var o=r.runWhen,i=r.onFulfilled,u=r.onRejected;"function"==typeof o&&!1===o(t)||(n=n&&r.synchronous,e.unshift(i,u))}));var r,o=[];if(this._interceptors.response.forEach((function(t){return o.unshift(t.onFulfilled,t.onRejected)})),!n){var i=[this.dispatchFetch.bind(this),void 0];for(Array.prototype.unshift.apply(i,e),i=i.concat(o),r=Promise.resolve(t);i.length;){var u=i.shift(),s=i.shift();u&&(r=r.then(u,s))}return r}for(var a=t;e.length;){u=e.shift(),s=e.shift();try{u&&(a=u(a))}catch(t){s&&s(t);break}}for(var c=this.dispatchFetch(t);o.length;){u=o.shift(),s=o.shift();u&&(c=c.then(u,s))}return c},n.prototype.dispatchFetch=function(t){var e,n=this,r=t.url||t.input;return r?p(r,t).then((function(n){e=n;var r=(null==t?void 0:t.responseType)||b(n);if(!r)throw new Error("Agent: except a response type but null");return"json"===r?n.json():"buffer"===r?n.arrayBuffer():"text"===r?n.text():"blob"===r?n.blob():"form"===r||"formdata"===r?n.formData():n.json()})).then((function(r){return n.decorateResponse(t,e,r)})).finally((function(){n._abortors.delete(n._getAbortId(t))})):Promise.reject(new Error("Agent: unexpected error, url must have a value and be a string, but null!"))},n.prototype.decorateResponse=function(t,e,n){return{url:e.url,data:n,ok:e.ok,status:e.status,statusText:e.statusText,headers:e.headers,__init__:t,__agent__:this,__response__:e}},n}(),b=function(t){var e=t.headers.get("content-type");return e?(null==e?void 0:e.includes("application/json"))?"json":(null==e?void 0:e.includes("text/plain"))||(null==e?void 0:e.includes("text/html"))||(null==e?void 0:e.includes("application/xml"))?"text":void 0:null},v=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=/(?<!(https?|file|wss?):)\/\/+/,r=/^(https?|file|wss?):\/\//;return t.filter(Boolean).map(String).reduce((function(t,e){return new RegExp(r).test(e)?e:t+"/"+e})).replace(new RegExp(n,"gm"),"/")};function _(t,e){var n=new URLSearchParams(t),r=new u("form").marshal(e),o=new URLSearchParams("?"+r);return o.forEach((function(t,e){null!=t&&n.append(e,t)})),o.toString()}export{y as default};
