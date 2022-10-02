/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(e,n){var v="function"==typeof Symbol&&e[Symbol.iterator];if(!v)return e;var _,g,h=v.call(e),p=[];try{for(;(void 0===n||n-- >0)&&!(_=h.next()).done;)p.push(_.value)}catch(e){g={error:e}}finally{try{_&&!_.done&&(v=h.return)&&v.call(h)}finally{if(g)throw g.error}}return p}var e;!function(e){e[e.NotStarted=0]="NotStarted",e[e.Running=1]="Running",e[e.Stopped=2]="Stopped"}(e||(e={}));var n={type:"xstate.init"};function r(e){return void 0===e?[]:[].concat(e)}function i(e){return{type:"xstate.assign",assignment:e}}function o(e,n){return"string"==typeof(e="string"==typeof e&&n&&n[e]?n[e]:e)?{type:e}:"function"==typeof e?{type:e.name,exec:e}:e}function a(e){return function(n){return e===n}}function u(e){return"string"==typeof e?{type:e}:e}function c(e,n){return{value:e,context:n,actions:[],changed:!1,matches:a(e)}}function f(e,n,v){var _=n,g=!1;return[e.filter((function(e){if("xstate.assign"===e.type){g=!0;var n=Object.assign({},_);return"function"==typeof e.assignment?n=e.assignment(_,v):Object.keys(e.assignment).forEach((function(g){n[g]="function"==typeof e.assignment[g]?e.assignment[g](_,v):e.assignment[g]})),_=n,!1}return!0})),_,g]}function s(e,v){void 0===v&&(v={});var _=t(f(r(e.states[e.initial].entry).map((function(e){return o(e,v.actions)})),e.context,n),2),g=_[0],h=_[1],p={config:e,_options:v,initialState:{value:e.initial,actions:g,context:h,matches:a(e.initial)},transition:function(n,v){var _,g,h="string"==typeof n?{value:n,context:e.context}:n,x=h.value,S=h.context,y=u(v),b=e.states[x];if(b.on){var d=r(b.on[y.type]);try{for(var m=function(e){var n="function"==typeof Symbol&&Symbol.iterator,v=n&&e[n],_=0;if(v)return v.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&_>=e.length&&(e=void 0),{value:e&&e[_++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(d),T=m.next();!T.done;T=m.next()){var j=T.value;if(void 0===j)return c(x,S);var w="string"==typeof j?{target:j}:j,N=w.target,X=w.actions,E=void 0===X?[]:X,O=w.cond,R=void 0===O?function(){return!0}:O,C=void 0===N,I=null!=N?N:x,P=e.states[I];if(R(S,y)){var D=t(f((C?r(E):[].concat(b.exit,E,P.entry).filter((function(e){return e}))).map((function(e){return o(e,p._options.actions)})),S,y),3),k=D[0],z=D[1],A=D[2],G=null!=N?N:x;return{value:G,context:z,actions:k,changed:N!==x||k.length>0||A,matches:a(G)}}}}catch(e){_={error:e}}finally{try{T&&!T.done&&(g=m.return)&&g.call(m)}finally{if(_)throw _.error}}}return c(x,S)}};return p}var l=function(e,n){return e.actions.forEach((function(v){var _=v.exec;return _&&_(e.context,n)}))};function wrapXStateService(e){return{_xstateService:e,get status(){return this._xstateService?this._xstateService.status:v.INIT},get state(){return this._xstateService.state},subscribe(e){return this._xstateService.subscribe(e)},send(e){this._xstateService.send(e)},start(){this._xstateService.start()}}}const v=Object.freeze({INIT:-1,NOT_STARTED:0,RUNNING:1,STOPPED:2});function interpret(v,_){const g=wrapXStateService(function(v){var _=v.initialState,g=e.NotStarted,h=new Set,p={_machine:v,send:function(n){g===e.Running&&(_=v.transition(_,n),l(_,u(n)),h.forEach((function(e){return e(_)})))},subscribe:function(e){return h.add(e),e(_),{unsubscribe:function(){return h.delete(e)}}},start:function(h){if(h){var x="object"==typeof h?h:{context:v.config.context,value:h};_={value:x.value,actions:[],context:x.context,matches:a(x.value)}}else _=v.initialState;return g=e.Running,l(_,n),p},stop:function(){return g=e.Stopped,h.clear(),p},get state(){return _},get status(){return g}};return p}(v));return _?function(e,n){return e._getterCache={},e.getters=new Proxy(n,{get(n,v){if(!e._getterCache[v]){const _=n[v](e._xstateService.state.context);e._getterCache[v]=_}return e._getterCache[v]}}),e.subscribe((()=>{e._getterCache={}})),e}(g,_):g}function createXStateService(e,n,v){const _=interpret(n,v);return globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.xstate=globalThis.__ficusjs__.xstate||{},globalThis.__ficusjs__.xstate[e]=_,_}function getXStateService(e){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.xstate&&globalThis.__ficusjs__.xstate[e])return globalThis.__ficusjs__.xstate[e]}export{v as XStateServiceStatus,i as assign,s as createMachine,createXStateService,getXStateService,interpret,wrapXStateService};
