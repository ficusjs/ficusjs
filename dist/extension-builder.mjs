function withBreakpointRender(e,t){return{...t,created(){this.setBreakpointConfig(e),t.created&&t.created.call(this)},mounted(){this._addBreakpointListeners(),t.mounted&&t.mounted.call(this)},updated(){this._addBreakpointListeners(),t.updated&&t.updated.call(this)},removed(){this._removeBreakpointListeners(),t.removed&&t.removed.call(this)},_addBreakpointListeners(){const e=this;e._breakpointConfig&&e._breakpointConfig.reactive&&e._breakpointListeners.forEach((e=>{if(!e.listenerSubscribed){const t=window.matchMedia(e.query);t.addEventListener("change",e.listener),e.mediaQueryList=t,e.listenerSubscribed=!0}}))},_removeBreakpointListeners(){const e=this;e._breakpointListeners&&e._breakpointListeners.forEach((e=>{e.mediaQueryList&&(e.mediaQueryList.removeEventListener("change",e.listener),e.listenerSubscribed=!1)}))},setBreakpointConfig(e){const t=this;t._breakpointConfig=e;const s=Object.keys(e.breakpoints).sort(((e,t)=>e-t)),i=s.map(((i,r)=>{let n;0===r?n=`only screen and (max-width: ${i}px)`:r===s.length-1?(n=`only screen and (min-width: ${parseInt(s[r-1],10)+1}px) and (max-width: ${i}px)`,n=`only screen and (min-width: ${parseInt(i,10)+1}px)`):n=`only screen and (min-width: ${parseInt(s[r-1],10)+1}px) and (max-width: ${i}px)`;const o=e.breakpoints[i].method;return{query:n,method:o,listener(e){e.matches&&t[o]&&(t.render=t[o],t._processRender())},mediaQueryList:void 0,listenerSubscribed:!1}}));t._removeBreakpointListeners(),this._breakpointListeners=i,t._addBreakpointListeners(),i.forEach((e=>{e.mediaQueryList.matches&&t[e.method]&&(t.render=t[e.method])}))}}}function withLazyRender(e){return{...e,created(){e.created&&e.created.call(this),this.elementVisible=!1,this.intersectionObserver=new IntersectionObserver(((e,t)=>{e.forEach((e=>{e.isIntersecting&&!this.elementVisible&&(this.elementVisible=!0,this.intersectionObserver.disconnect(),this._processRender())}))}),{threshold:.1}),this.intersectionObserver.observe(this)},removed(){e.removed&&e.removed.call(this),this.intersectionObserver&&this.intersectionObserver.disconnect()}}}function withStyles(e){return{...e,created(){e.styles&&"function"==typeof e.styles&&(globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.styles=globalThis.__ficusjs__.styles||{},this._injectStyles(e.styles())),e.created&&e.created.call(this)},_injectStyles(e){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.styles&&globalThis.__ficusjs__.styles[this.componentTagName])return;if(Array.isArray(e)&&e.filter((e=>"string"!=typeof e)).length||!Array.isArray(e)&&"string"!=typeof e)return void console.error("Dude, styles must return a string or an array of strings!");let t="";Array.isArray(e)?Promise.all(e.map((e=>this._processStyle(e)))).then((e=>{t=e.filter((e=>e)).join("\n"),this._createAndInjectStylesheet(t,{"data-tag":this.componentTagName})})):this._processStyle(e).then((e=>this._createAndInjectStylesheet(e,{"data-tag":this.componentTagName})))},_processStyle(e){if(/http[s]?:\/\/.+\.css$/.test(e)){const t=document.createElement("link");return t.rel="stylesheet",t.type="text/css",t.href=e,document.head.appendChild(t),Promise.resolve()}return/.+\.css$/.test(e)?globalThis.fetch(e).then((e=>e.text())):Promise.resolve(e)},_createAndInjectStylesheet(e,t){const s=this._createStyle(e);this._setElementAttributes(s,t),document.head.appendChild(s),globalThis.__ficusjs__.styles[this.componentTagName]={loaded:!0,style:s}},_createStyle(e){const t=document.createElement("style");return t.appendChild(document.createTextNode(e)),t},_setElementAttributes(e,t){t&&Object.keys(t).forEach((s=>{e.setAttribute(s,t[s])}))}}}function withEventBus(e,t){return{...t,created(){this.setEventBus(e),t.created&&t.created.call(this)},mounted(){this._subscribeToEventBus(),t.mounted&&t.mounted.call(this)},updated(){this._subscribeToEventBus(),t.updated&&t.updated.call(this)},removed(){this._unsubscribeFromEventBus(),t.removed&&t.removed.call(this)},setEventBus(e){const t=this;t._eventBus=e,t._eventSubscriptions={},t.eventBus={subscribe:(e,s,i)=>(t._eventSubscriptions[e]={unsubscribe:t._eventBus.subscribe(e,s,i),callback:s,options:i},function(){const{unsubscribe:s}=t._eventSubscriptions[e];s&&s(),t._eventSubscriptions[e].unsubscribe=null}),publish(e,s={}){t._eventBus.publish(e,s)},getSubscribers:e=>t._eventBus.getSubscribers(e)}},_subscribeToEventBus(){for(const e in this._eventSubscriptions){const{unsubscribe:t,callback:s,options:i}=this._eventSubscriptions[e];t||(this._eventSubscriptions[e].unsubscribe=this._eventBus.subscribe(e,s,i))}},_unsubscribeFromEventBus(){for(const e in this._eventSubscriptions){const{unsubscribe:t}=this._eventSubscriptions[e];t&&t(),this._eventSubscriptions[e].unsubscribe=null}}}}function withI18n(e,t){return{...t,created(){this.setI18n(e),t.created&&t.created.call(this)},setI18n(e){const t=this;t._i18n=e,t.i18n={t:(e,s,i)=>t._i18n.t(e,s,i),getLocale:()=>t._i18n.getLocale()}}}}function withLocalState(e){return{...e,created(){if(e.state&&"function"!=typeof e.state)throw new Error("State must be a function!");this._state=e.state||{},"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this.setState=(e,t)=>{const setter=e=>{if(!e||"object"!=typeof e)return;const s=this.updated;t&&(this.updated=()=>{t(),this.updated=s||void 0}),this.status="transaction";for(const t in e)this.state[t]&&this.state[t]===e[t]||(this.state[t]=e[t]);this.status="render",this._processRender()},s=e(this.state);var i;"object"!=typeof(i=s)&&"function"!=typeof i||"function"!=typeof i.then?setter(s):s.then(setter)},e.created&&e.created.call(this)},_monitorState(e){const t=this;return new Proxy(e,{set:(e,s,i)=>(e[s]===i||(e[s]=i,t.computedCache={},"render"===t.status&&t._processRender()),!0)})}}}function withStore(e,t){return{...t,created(){this.subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(e),t.created&&t.created.call(this)},mounted(){this._subscribeToStores(!1),t.mounted&&t.mounted.call(this)},updated(){this._subscribeToStores(!1),t.updated&&t.updated.call(this)},removed(){this._unsubscribeFromStores(),t.removed&&t.removed.call(this)},setStore(e){this.store=e,this._subscribeToStores()},_subscribeToStores(e=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this.subscribeCallback),e&&this.subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((e=>{this.store[e]&&this.store[e].subscribe&&"function"==typeof this.store[e].subscribe&&!this.unsubscribe[e]&&(this.unsubscribe[e]=this.store[e].subscribe(this.subscribeCallback))})),e&&this.subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((e=>{this.unsubscribe[e]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}function withWorkerStore(e,t){return{...t,created(){if(this.worker=e,globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.workers=globalThis.__ficusjs__.workers||new Map,globalThis.__ficusjs__.workers.has(e)){const t=globalThis.__ficusjs__.workers.get(e);t.has(this)||t.add(this)}else{const t=new Set;t.add(this),globalThis.__ficusjs__.workers.set(e,t)}e.onmessage||(this.worker.onmessage=t=>{const s=globalThis.__ficusjs__.workers.get(e);for(const e of s)e.state=t.data,e.computedCache={},e._processRender.apply(e)}),t.created&&t.created.call(this)},dispatch(e,t){this.worker.postMessage({actionName:e,payload:t})}}}class e{constructor(){this.extensions={}}withBreakpointRender(e){return this.extensions[withBreakpointRender]={func:withBreakpointRender,arg:e},this}withEventBus(e){return this.extensions[withEventBus]={func:withEventBus,arg:e},this}withI18n(e){return this.extensions[withI18n]={func:withI18n,arg:e},this}withLazyRender(){return this.extensions[withLazyRender]={func:withLazyRender,arg:void 0},this}withStyles(){return this.extensions[withStyles]={func:withStyles,arg:void 0},this}withLocalState(){return this.extensions[withLocalState]={func:withLocalState,arg:void 0},this}withStore(e){return this.extensions[withStore]={func:withStore,arg:e},this}withWorkerStore(e){return this.extensions[withWorkerStore]={func:withWorkerStore,arg:e},this}create(e){return Object.keys(this.extensions).reduce(((e,t)=>{const s=this.extensions[t];return s.func(s.arg,e)}),e)}}const t={newInstance:()=>new e};export{t as ExtensionBuilder};
