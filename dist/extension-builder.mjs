function withBreakpointRender(t,e){return{...e,created(){this.setBreakpointConfig(t),e.created&&e.created.call(this)},mounted(){this._addBreakpointListeners(),e.mounted&&e.mounted.call(this)},updated(){this._addBreakpointListeners(),e.updated&&e.updated.call(this)},removed(){this._removeBreakpointListeners(),e.removed&&e.removed.call(this)},_addBreakpointListeners(){const t=this;t._breakpointConfig&&t._breakpointConfig.reactive&&t._breakpointListeners.forEach((t=>{if(!t.listenerSubscribed){const e=window.matchMedia(t.query);e.addEventListener("change",t.listener),t.mediaQueryList=e,t.listenerSubscribed=!0}}))},_removeBreakpointListeners(){const t=this;t._breakpointListeners&&t._breakpointListeners.forEach((t=>{t.mediaQueryList&&(t.mediaQueryList.removeEventListener("change",t.listener),t.listenerSubscribed=!1)}))},setBreakpointConfig(t){const e=this;e._breakpointConfig=t;const s=Object.keys(t.breakpoints).sort(((t,e)=>t-e)),i=s.map(((i,r)=>{let n;0===r?n=`only screen and (max-width: ${i}px)`:r===s.length-1?(n=`only screen and (min-width: ${parseInt(s[r-1],10)+1}px) and (max-width: ${i}px)`,n=`only screen and (min-width: ${parseInt(i,10)+1}px)`):n=`only screen and (min-width: ${parseInt(s[r-1],10)+1}px) and (max-width: ${i}px)`;const c=t.breakpoints[i].method;return{query:n,method:c,listener(t){t.matches&&e[c]&&(e.render=e[c],e._processRender())},mediaQueryList:void 0,listenerSubscribed:!1}}));e._removeBreakpointListeners(),this._breakpointListeners=i,e._addBreakpointListeners(),i.forEach((t=>{t.mediaQueryList.matches&&e[t.method]&&(e.render=e[t.method])}))}}}function withLazyRender(t){return{...t,created(){t.created&&t.created.call(this),this.elementVisible=!1,this.intersectionObserver=new IntersectionObserver(((t,e)=>{t.forEach((t=>{t.isIntersecting&&!this.elementVisible&&(this.elementVisible=!0,this.intersectionObserver.disconnect(),this._processRender())}))}),{threshold:.1}),this.intersectionObserver.observe(this)},removed(){t.removed&&t.removed.call(this),this.intersectionObserver&&this.intersectionObserver.disconnect()}}}function withStyles(t){return{...t,created(){t.styles&&"function"==typeof t.styles&&(globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.styles=globalThis.__ficusjs__.styles||{},this._injectStyles(t.styles())),t.created&&t.created.call(this)},_isStyleSheet:t=>"object"==typeof t&&t.tagName&&"style"===t.tagName.toLowerCase(),async _injectStyles(t){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.styles&&globalThis.__ficusjs__.styles[this.componentTagName])return;if(globalThis.__ficusjs__.styles[this.componentTagName]={loaded:!1},Array.isArray(t)&&t.filter((t=>"string"!=typeof t&&!this._isStyleSheet(t))).length||!Array.isArray(t)&&"string"!=typeof t&&!this._isStyleSheet(t))return void console.error("Dude, styles must return a CSS string or an array of CSS strings!");let e;e=Array.isArray(t)?await Promise.all(t.map((t=>this._processStyle(t,this.componentTagName)))):await this._processStyle(t,this.componentTagName),globalThis.__ficusjs__.styles[this.componentTagName].styles=e,globalThis.__ficusjs__.styles[this.componentTagName].loaded=!0,this.areStylesInjected=!0},_injectStylesheet(t){document.getElementsByTagName("head")[0].appendChild(t)},async _processStyle(t,e){if(this._isStyleSheet(t))return t.setAttribute("data-tag",e),this._injectStylesheet(t),t;if(/http[s]?:\/\/.+\.css$/.test(t)){const s=document.createElement("link");return s.rel="stylesheet",s.type="text/css",s.href=t,s.setAttribute("data-tag",e),document.head.appendChild(s),s}return/.+\.css$/.test(t)?globalThis.fetch(t).then((t=>t.text())).then((t=>this._createAndInjectStylesheet(t,{"data-tag":e}))):this._createAndInjectStylesheet(t,{"data-tag":e})},_createAndInjectStylesheet(t,e){const s=this._createStyle(t);return this._setElementAttributes(s,e),this._injectStylesheet(s),s},_createStyle(t){const e=document.createElement("style");return e.appendChild(document.createTextNode(t)),e},_setElementAttributes(t,e){e&&Object.keys(e).forEach((s=>{t.setAttribute(s,e[s])}))}}}function withEventBus(t,e){return{...e,created(){this.setEventBus(t),e.created&&e.created.call(this)},mounted(){this._subscribeToEventBus(),e.mounted&&e.mounted.call(this)},updated(){this._subscribeToEventBus(),e.updated&&e.updated.call(this)},removed(){this._unsubscribeFromEventBus(),e.removed&&e.removed.call(this)},setEventBus(t){const e=this;e._eventBus=t,e._eventSubscriptions={},e.eventBus={subscribe:(t,s,i)=>(e._eventSubscriptions[t]={unsubscribe:e._eventBus.subscribe(t,s,i),callback:s,options:i},function(){const{unsubscribe:s}=e._eventSubscriptions[t];s&&s(),e._eventSubscriptions[t].unsubscribe=null}),publish(t,s={}){e._eventBus.publish(t,s)},getSubscribers:t=>e._eventBus.getSubscribers(t)}},_subscribeToEventBus(){for(const t in this._eventSubscriptions){const{unsubscribe:e,callback:s,options:i}=this._eventSubscriptions[t];e||(this._eventSubscriptions[t].unsubscribe=this._eventBus.subscribe(t,s,i))}},_unsubscribeFromEventBus(){for(const t in this._eventSubscriptions){const{unsubscribe:e}=this._eventSubscriptions[t];e&&e(),this._eventSubscriptions[t].unsubscribe=null}}}}function withI18n(t,e){return{...e,created(){this.setI18n(t),e.created&&e.created.call(this)},setI18n(t){const e=this;e._i18n=t,e.i18n={t:(t,s,i)=>e._i18n.t(t,s,i),getLocale:()=>e._i18n.getLocale()}}}}function withLocalState(t){return{...t,created(){if(t.state&&"function"!=typeof t.state)throw new Error("State must be a function!");this._state=t.state||{},"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this.setState=(t,e)=>{const setter=t=>{if(!t||"object"!=typeof t)return;const s=this.updated;e&&(this.updated=()=>{e(),this.updated=s||void 0}),this.status="transaction";for(const e in t)this.state[e]&&this.state[e]===t[e]||(this.state[e]=t[e]);this.status="render",this._processRender()},s=t(this.state);var i;"object"!=typeof(i=s)&&"function"!=typeof i||"function"!=typeof i.then?setter(s):s.then(setter)},t.created&&t.created.call(this)},_monitorState(t){const e=this;return new Proxy(t,{set:(t,s,i)=>(t[s]===i||(t[s]=i,e.computedCache={},"render"===e.status&&e._processRender()),!0)})}}}function withStore(t,e){return{...e,created(){this._subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(t),e.created&&e.created.call(this)},mounted(){this._subscribeToStores(!1),e.mounted&&e.mounted.call(this)},updated(){this._subscribeToStores(!1),e.updated&&e.updated.call(this)},removed(){this._unsubscribeFromStores(),e.removed&&e.removed.call(this)},setStore(t){this.store=t,this._subscribeToStores()},_subscribeToStores(t=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this._subscribeCallback),t&&this._subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((t=>{this.store[t]&&this.store[t].subscribe&&"function"==typeof this.store[t].subscribe&&!this.unsubscribe[t]&&(this.unsubscribe[t]=this.store[t].subscribe(this._subscribeCallback))})),t&&this._subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((t=>{this.unsubscribe[t]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}function withWorkerStore(t,e){return{...e,created(){const s=this;if(s.worker=t,globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.workers=globalThis.__ficusjs__.workers||new Map,globalThis.__ficusjs__.workers.has(t)){const e=globalThis.__ficusjs__.workers.get(t);e.has(s)||e.add(s)}else{const e=new Set;e.add(s),globalThis.__ficusjs__.workers.set(t,e)}t.onmessage||(s.worker.onmessage=e=>{const s=globalThis.__ficusjs__.workers.get(t);for(const t of s)t.state=e.data,t.computedCache={},t._processRender.apply(t)}),s.store={dispatch(t,e){s.worker.postMessage({actionName:t,payload:e})}},e.created&&e.created.call(s)}}}const t=Object.freeze({INIT:-1,NOT_STARTED:0,RUNNING:1,STOPPED:2});function withXStateService(e,s){return{...s,created(){this._subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setXStateService(e),s.created&&s.created.call(this)},mounted(){this._subscribeToFsmService(!1),s.mounted&&s.mounted.call(this)},updated(){this._subscribeToFsmService(!1),s.updated&&s.updated.call(this)},removed(){this._unsubscribeFromFsmService(),s.removed&&s.removed.call(this)},setXStateService(e){this.fsm=e&&e.status!==t.INIT?e:function(e){return{_xstateService:e,get status(){return this._xstateService?this._xstateService.status:t.INIT},get state(){return this._xstateService.state},subscribe(t){return this._xstateService.subscribe(t)},send(t){this._xstateService.send(t)},start(){this._xstateService.start()}}}(e),this._fsmSubscriptionCallback=()=>{this.fsm.status===t.RUNNING&&this._fsmSubscription&&this._subscribeCallback()},this._subscribeToFsmService()},_startFsmService(){this.fsm&&this._fsmSubscription&&this.fsm.status===t.NOT_STARTED&&this.fsm.start()},_subscribeToFsmService(e=!0){this.fsm&&this.fsm.status!==t.INIT&&!this._fsmSubscription&&(this._fsmSubscription=this.fsm.subscribe(this._fsmSubscriptionCallback),e&&this._fsmSubscriptionCallback(),this._startFsmService())},_unsubscribeFromFsmService(){this.fsm&&this.fsm.status!==t.INIT&&this._fsmSubscription&&"function"==typeof this._fsmSubscription&&(this._fsmSubscription(),this._fsmSubscription=null)}}}class e{constructor(){this.extensions={}}withBreakpointRender(t){return this.extensions[withBreakpointRender]={func:withBreakpointRender,arg:t},this}withEventBus(t){return this.extensions[withEventBus]={func:withEventBus,arg:t},this}withI18n(t){return this.extensions[withI18n]={func:withI18n,arg:t},this}withLazyRender(){return this.extensions[withLazyRender]={func:withLazyRender,arg:void 0},this}withStyles(){return this.extensions[withStyles]={func:withStyles,arg:void 0},this}withLocalState(){return this.extensions[withLocalState]={func:withLocalState,arg:void 0},this}withStore(t){return this.extensions[withStore]={func:withStore,arg:t},this}withWorkerStore(t){return this.extensions[withWorkerStore]={func:withWorkerStore,arg:t},this}withXStateService(t){return this.extensions[withXStateService]={func:withXStateService,arg:t},this}create(t){return Object.keys(this.extensions).reduce(((t,e)=>{const s=this.extensions[e];return s.arg?s.func(s.arg,t):s.func(t)}),t)}}const s={newInstance:()=>new e};export{s as ExtensionBuilder};
