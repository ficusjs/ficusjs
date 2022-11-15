function toKebabCase(e){return e.replace(/([A-Z])/g,"-$1").toLowerCase()}function elementRenderer(e,n){for(;n.firstChild;)n.removeChild(n.firstChild);let h;if("string"==typeof e)h=document.createElement("div"),h.innerHTML=e;else{if(!e.nodeName)throw new Error(`Unable to render ${e}. Have you included a renderer function?`);h=e}h&&n.appendChild(h)}function createCustomElement(e,n){const h={type:String};n.props&&n.props.key&&console.warn('Prop "key" is a default property on the component instance, you cannot override it.');const d=function(e){if(!e)return[];const n=[];return Object.keys(e).forEach((h=>{(null==e[h].observed||e[h].observed)&&n.push(toKebabCase(h))})),n}({...n.props,key:h});globalThis.customElements.get(e)||globalThis.customElements.define(e,class extends globalThis.HTMLElement{static get observedAttributes(){return d}get componentTagName(){return e}connectedCallback(){null==this.connectedCallbackCount&&(this.connectedCallbackCount=0),this.connectedCallbackCount=this.connectedCallbackCount+1,this._checkInit(),this._preprocess()}disconnectedCallback(){"function"==typeof this.removed&&(this.removed(),this.isRemovedCalled=!0)}attributeChangedCallback(){null!=this.connectedCallbackCount&&(this._checkInit(),this._preprocess(),"function"==typeof this.propsDidUpdate&&this.isMountedCalled&&this.propsDidUpdate())}get initialised(){return this._props&&this._computed&&this.templateRenderer}_checkInit(){this.initialised||this._init(n)}_init(n){this.ficusCustomElement=e,this._props={...n.props||{},key:h},this._computed=n.computed||{},this.computedCache={},this.status="render",this.connectedCallbackCount=0,this.props=this._processProps(),this.root=this._processRoot(n.root),this.slots=this._processSlots(),this.render=n.render||null,this.templateRenderer=n.renderer||elementRenderer,this.template=null,this.created=n.created||null,this.mounted=n.mounted||null,this.updated=n.updated||null,this.removed=n.removed||null,this.propsDidUpdate=n.propsDidUpdate||null,this.isCreatedCalled=!1,this.isMountedCalled=!1,this.isRemovedCalled=!1,this.emit=(e,n)=>{!function(e,n,h={}){const d=Object.assign({},{bubbles:!0,cancelable:!0,composed:!1},h),p=new CustomEvent(n,{bubbles:d.bubbles,cancelable:d.cancelable,composed:d.composed,detail:d.detail});e.dispatchEvent(p)}(this,e,{detail:n})},this._processMethodsAndComputedProps(n),this._processInstanceProps(this._props),"function"!=typeof this.created||this.isCreatedCalled||(this.created(),this.isCreatedCalled=!0)}_processProps(){const e={};return Object.keys(this._props).forEach((n=>{const h={},d=this._props[n],p=this._getAttribute(n);let _=null;if(null!=d.default&&(_=d.default),d.required&&null==p)null!=_?(console.info(`No biggie, the required prop '${n}' has no value set, so the default has been set`),h[n]=_):(h[n]=null,console.error(`The required prop '${n}' has no value set`));else switch(d.type){case String:default:h[n]=p||_;break;case Number:h[n]=null!=p?parseFloat(p):null!=_?_:0;break;case Boolean:h[n]=null!=p?"true"===p.toString():null!=_&&_;break;case Object:case Array:try{h[n]=null!=p?JSON.parse(p):null!=_?_:void 0}catch(e){h[n]=null!=_?_:void 0,console.error(`An object prop parse issue occurred with prop ${n} and value ${p}`)}}e[n]=h[n],this._instanceProps&&this._instanceProps[n]&&(e[n]=this._instanceProps[n])})),e}_processMethodsAndComputedProps(e){const n=this,h=Object.keys(e);h.length&&h.forEach((h=>{n[h]||"function"!=typeof e[h]||(n[h]=e[h].bind(n)),"computed"===h&&this._processComputed(e[h])}))}_processRoot(e){switch(e){case"standard":default:return this;case"shadow":return this.attachShadow({mode:"open"});case"shadow:closed":return this.attachShadow({mode:"closed"})}}_processComputed(e){const n=this,h=Object.keys(e);h.length&&h.forEach((h=>{n[h]?console.warn(`Computed property '${h}' already exists on the component instance`):Object.defineProperty(n,h,{get:()=>(n.computedCache[h]||(n.computedCache[h]=e[h].bind(n)()),n.computedCache[h])})}))}_processRender(){const e=this.render?this.render():void 0;e&&(this.template=e,this._updateRender())}_processSlots(){const e=this.childNodes,n={default:[]};return e.length>0&&[...e].forEach((e=>{const h=e.getAttribute?e.getAttribute("slot"):null;h?n[h]=e:n.default.push(e)})),n}_getAttribute(e){try{return this.getAttribute(toKebabCase(e))}catch(e){return console.error("A get prop error occurred",e),""}}_processInstanceProps(e){const n=this,h=Object.keys(e);e&&h.forEach((e=>{let h;n[e]&&(h=n[e],delete n[e]),Object.defineProperty(n,e,{get(){return this._instanceProps&&this._instanceProps[e]?this._instanceProps[e]:this.getAttribute(toKebabCase(e))},set(n){return this._instanceProps||(this._instanceProps={}),this._instanceProps[e]=n,this.setAttribute(toKebabCase(e),"object"==typeof n?JSON.stringify(n):n.toString()),!0},enumerable:!0}),h&&(n[e]=h)}))}_preprocess(){this.computedCache={},this.props=this._processProps(),this._processRender()}_updateRender(){var e;this.template&&("object"!=typeof(e=this.template)&&"function"!=typeof e||"function"!=typeof e.then?(this.templateRenderer(this.template,this.root),this._callLifecycleMethods()):this.template.then((e=>{this.templateRenderer(e,this.root),this._callLifecycleMethods()})).catch((e=>console.error("A component render error occurred",e))))}_callLifecycleMethods(){"function"!=typeof this.mounted||this.isMountedCalled||this.mounted(),this.isMountedCalled=!0,"function"==typeof this.updated&&this.isMountedCalled&&this.updated()}})}function isPromise$1(e){return("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}function withLocalState(e){return{...e,created(){if(e.state&&"function"!=typeof e.state)throw new Error("State must be a function!");this._state=e.state||{},"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this.setState=(e,n)=>{const setter=e=>{if(!e||"object"!=typeof e)return;const h=this.updated;n&&(this.updated=()=>{n(),this.updated=h||void 0}),this.status="transaction";for(const n in e)this.state[n]&&this.state[n]===e[n]||(this.state[n]=e[n]);this.status="render",this._processRender()},h=e(this.state);isPromise$1(h)?h.then(setter):setter(h)},e.created&&e.created.call(this)},_monitorState(e){const n=this;return new Proxy(e,{set:(e,h,d)=>(e[h]===d||(e[h]=d,n.computedCache={},"render"===n.status&&n._processRender()),!0)})}}}function createComponent(e,n){createCustomElement(e,withLocalState(n))}function withEventBus(e,n){return{...n,created(){this.setEventBus(e),n.created&&n.created.call(this)},mounted(){this._subscribeToEventBus(),n.mounted&&n.mounted.call(this)},updated(){this._subscribeToEventBus(),n.updated&&n.updated.call(this)},removed(){this._unsubscribeFromEventBus(),n.removed&&n.removed.call(this)},setEventBus(e){const n=this;n._eventBus=e,n._eventSubscriptions={},n.eventBus={subscribe:(e,h,d)=>(n._eventSubscriptions[e]={unsubscribe:n._eventBus.subscribe(e,h,d),callback:h,options:d},function(){const{unsubscribe:h}=n._eventSubscriptions[e];h&&h(),n._eventSubscriptions[e].unsubscribe=null}),publish(e,h={}){n._eventBus.publish(e,h)},getSubscribers:e=>n._eventBus.getSubscribers(e)}},_subscribeToEventBus(){for(const e in this._eventSubscriptions){const{unsubscribe:n,callback:h,options:d}=this._eventSubscriptions[e];n||(this._eventSubscriptions[e].unsubscribe=this._eventBus.subscribe(e,h,d))}},_unsubscribeFromEventBus(){for(const e in this._eventSubscriptions){const{unsubscribe:n}=this._eventSubscriptions[e];n&&n(),this._eventSubscriptions[e].unsubscribe=null}}}}function withStateTransactions(e){return{...e,created(){this.state=this._monitorTransactionState(this._state),this.setState=(e,n)=>{const setter=e=>{if(!e||"object"!=typeof e)return;const h=this.transaction,d=this.updated;n&&(this.updated=()=>{setTimeout(n),this.updated=d||void 0}),h||this.beginTransaction();for(const n in e)this.state[n]&&this.state[n]===e[n]||(this.state[n]=e[n]);h||this.endTransaction()},h=e(this.state);var d;"object"!=typeof(d=h)&&"function"!=typeof d||"function"!=typeof d.then?setter(h):h.then(setter)},e.created&&e.created.call(this)},beginTransaction(){this.transactionCache={},this.transaction=!0,this.status="transaction"},endTransaction(){this.transaction=!1,this.status="render",this._processRender()},rollbackTransaction(){Object.keys(this.transactionCache).forEach((e=>this.state[e]=this.transactionCache[e])),this.endTransaction()},_monitorTransactionState(e){const n=this;return new Proxy(e,{set:(e,h,d)=>(e[h]===d||(n.transaction&&!n.transactionCache[h]&&(n.transactionCache[h]=n._copyValue(e[h])),e[h]=d,n.computedCache={},"render"===n.status&&n._processRender()),!0),get:(e,n)=>e[n]})},_copyValue:e=>JSON.parse(JSON.stringify(e))}}function withLazyRender(e){return{...e,created(){e.created&&e.created.call(this),this.elementVisible=!1,this.intersectionObserver=new IntersectionObserver(((e,n)=>{e.forEach((e=>{e.isIntersecting&&!this.elementVisible&&(this.elementVisible=!0,this.intersectionObserver.disconnect(),this._processRender())}))}),{threshold:.1}),this.intersectionObserver.observe(this)},removed(){e.removed&&e.removed.call(this),this.intersectionObserver&&this.intersectionObserver.disconnect()}}}function withBreakpointRender(e,n){return{...n,created(){this.setBreakpointConfig(e),n.created&&n.created.call(this)},mounted(){this._addBreakpointListeners(),n.mounted&&n.mounted.call(this)},updated(){this._addBreakpointListeners(),n.updated&&n.updated.call(this)},removed(){this._removeBreakpointListeners(),n.removed&&n.removed.call(this)},_addBreakpointListeners(){const e=this;e._breakpointConfig&&e._breakpointConfig.reactive&&e._breakpointListeners.forEach((e=>{if(!e.listenerSubscribed){const n=window.matchMedia(e.query);n.addEventListener("change",e.listener),e.mediaQueryList=n,e.listenerSubscribed=!0}}))},_removeBreakpointListeners(){const e=this;e._breakpointListeners&&e._breakpointListeners.forEach((e=>{e.mediaQueryList&&(e.mediaQueryList.removeEventListener("change",e.listener),e.listenerSubscribed=!1)}))},setBreakpointConfig(e){const h=this;h._breakpointConfig=e;const d=Object.keys(e.breakpoints).sort(((e,n)=>e-n));if(!n.render)throw new Error("Dude, when using breakpoints, you must provide a 'render' method for the smallest screen size");const p=d.map(((d,p)=>{const _=`only screen and (min-width: ${d}px)`,b=e.breakpoints[d].method;return{query:_,method:b,listener(e){e.matches&&n[b]&&(h.render=n[b],h._processRender())},mediaQueryList:void 0,listenerSubscribed:!1}}));p.unshift({query:`only screen and (max-width: ${d[0]-1}px)`,method:"render",listener(e){e.matches&&(h.render=n.render,h._processRender())},mediaQueryList:void 0,listenerSubscribed:!1}),h._removeBreakpointListeners(),this._breakpointListeners=p,h._addBreakpointListeners(),p.forEach((e=>{e.mediaQueryList.matches&&n[e.method]&&(h.render=n[e.method])}))}}}function withStyles(e){return{...e,created(){e.styles&&"function"==typeof e.styles&&(globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.styles=globalThis.__ficusjs__.styles||{},this._injectStyles(e.styles())),e.created&&e.created.call(this)},_isStyleSheet:e=>"object"==typeof e&&e.tagName&&"style"===e.tagName.toLowerCase(),async _injectStyles(e){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.styles&&globalThis.__ficusjs__.styles[this.componentTagName])return;if(globalThis.__ficusjs__.styles[this.componentTagName]={loaded:!1},Array.isArray(e)&&e.filter((e=>"string"!=typeof e&&!this._isStyleSheet(e))).length||!Array.isArray(e)&&"string"!=typeof e&&!this._isStyleSheet(e))return void console.error("Dude, styles must return a CSS string or an array of CSS strings!");let n;n=Array.isArray(e)?await Promise.all(e.map((e=>this._processStyle(e,this.componentTagName)))):await this._processStyle(e,this.componentTagName),globalThis.__ficusjs__.styles[this.componentTagName].styles=n,globalThis.__ficusjs__.styles[this.componentTagName].loaded=!0,this.areStylesInjected=!0},_injectStylesheet(e){document.getElementsByTagName("head")[0].appendChild(e)},async _processStyle(e,n){if(this._isStyleSheet(e))return e.setAttribute("data-tag",n),this._injectStylesheet(e),e;if(/http[s]?:\/\/.+\.css$/.test(e)){const h=document.createElement("link");return h.rel="stylesheet",h.type="text/css",h.href=e,h.setAttribute("data-tag",n),document.head.appendChild(h),h}return/.+\.css$/.test(e)?globalThis.fetch(e).then((e=>e.text())).then((e=>this._createAndInjectStylesheet(e,{"data-tag":n}))):this._createAndInjectStylesheet(e,{"data-tag":n})},_createAndInjectStylesheet(e,n){const h=this._createStyle(e);return this._setElementAttributes(h,n),this._injectStylesheet(h),h},_createStyle(e){const n=document.createElement("style");return n.appendChild(document.createTextNode(e)),n},_setElementAttributes(e,n){n&&Object.keys(n).forEach((h=>{e.setAttribute(h,n[h])}))}}}function withI18n(e,n){return{...n,created(){this.setI18n(e),n.created&&n.created.call(this)},setI18n(e){const n=this;n._i18n=e,n.i18n={t:(e,h,d)=>n._i18n.t(e,h,d),getLocale:()=>n._i18n.getLocale(),setLocale(e){n._i18n.setLocale(e)}}}}}function withI18nReactive(e,n){return withI18n(e,{...n,created(){this.eventBus&&this.eventBus.subscribe("i18n:locale:changed",(e=>{this.key=e})),n.created&&n.created.call(this)}})}function withStore(e,n){return{...n,created(){this._subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(e),n.created&&n.created.call(this)},mounted(){this._subscribeToStores(!1),n.mounted&&n.mounted.call(this)},updated(){this._subscribeToStores(!1),n.updated&&n.updated.call(this)},removed(){this._unsubscribeFromStores(),n.removed&&n.removed.call(this)},setStore(e){this.store=e,this._subscribeToStores()},_subscribeToStores(e=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this._subscribeCallback),e&&this._subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((e=>{this.store[e]&&this.store[e].subscribe&&"function"==typeof this.store[e].subscribe&&!this.unsubscribe[e]&&(this.unsubscribe[e]=this.store[e].subscribe(this._subscribeCallback))})),e&&this._subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((e=>{this.unsubscribe[e]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}function withWorkerStore(e,n){return{...n,created(){const h=this;if(h.worker=e,globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.workers=globalThis.__ficusjs__.workers||new Map,globalThis.__ficusjs__.workers.has(e)){const n=globalThis.__ficusjs__.workers.get(e);n.has(h)||n.add(h)}else{const n=new Set;n.add(h),globalThis.__ficusjs__.workers.set(e,n)}e.onmessage||(h.worker.onmessage=n=>{const h=globalThis.__ficusjs__.workers.get(e);for(const e of h)e.state=n.data,e.computedCache={},e._processRender.apply(e)}),h.store={dispatch(e,n){h.worker.postMessage({actionName:e,payload:n})}},n.created&&n.created.call(h)}}}class e{constructor(e,n,h={}){this.namespace=e,this.storage=n,this.options=h,this._init()}_init(){if("performance"in globalThis&&this.options.clearOnReload){const e=globalThis.performance.getEntriesByType("navigation").map((e=>e.type));this.lastUpdated()&&e.includes("reload")&&this.removeState()}}setState(e){e?(this.storage.setItem(`${this.namespace}:state`,this._normalizeState(e)),this.storage.setItem(`${this.namespace}:lastUpdated`,(new Date).getTime().toString())):this.removeState()}_normalizeState(e){return"object"==typeof e&&this.options.saveState&&"function"==typeof this.options.saveState?JSON.stringify(this.options.saveState(e)):"string"!=typeof e?JSON.stringify(e):e}getState(){const e=this.storage.getItem(`${this.namespace}:state`);return e?JSON.parse(e):void 0}lastUpdated(){const e=this.storage.getItem(`${this.namespace}:lastUpdated`);return e?parseInt(e,10):void 0}removeState(){this.storage.removeItem(`${this.namespace}:state`),this.storage.removeItem(`${this.namespace}:lastUpdated`)}}function createPersist(n,h="session",d){return new e(n,"local"===h?globalThis.localStorage:globalThis.sessionStorage,d)}function wrapXStateService(e,h,d){const p={_xstateService:e,_getterCache:{},_persist:"string"==typeof d?createPersist(d):d,get status(){return this._xstateService?this._xstateService.status:n.INIT},get state(){return this._xstateService.state},subscribe(e){return this._xstateService.subscribe((()=>{this._getterCache={},this._persist&&this._xstateService.status===n.RUNNING&&this._persist.setState(this._xstateService.state),e()}))},send(e){this._xstateService.send(e)},start(){this._xstateService.start(this._persist?this._persist.getState():void 0)}};return h&&(p.getters=new Proxy(h,{get(e,n){if(!p._getterCache[n]){const h=e[n](p._xstateService.state.context);p._getterCache[n]=h}return p._getterCache[n]}})),p}const n=Object.freeze({INIT:-1,NOT_STARTED:0,RUNNING:1,STOPPED:2});function withXStateService(e,h){return{...h,created(){this._subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setXStateService(e),h.created&&h.created.call(this)},mounted(){this._subscribeToFsmService(!1),h.mounted&&h.mounted.call(this)},updated(){this._subscribeToFsmService(!1),h.updated&&h.updated.call(this)},removed(){this._unsubscribeFromFsmService(),h.removed&&h.removed.call(this)},setXStateService(e){this.fsm=e&&e.status!==n.INIT?e:wrapXStateService(e),this._fsmSubscriptionCallback=()=>{this.fsm.status===n.RUNNING&&this._fsmSubscription&&this._subscribeCallback()},this._subscribeToFsmService()},_startFsmService(){this.fsm&&this._fsmSubscription&&this.fsm.status===n.NOT_STARTED&&this.fsm.start()},_subscribeToFsmService(e=!0){this.fsm&&this.fsm.status!==n.INIT&&!this._fsmSubscription&&(this._fsmSubscription=this.fsm.subscribe(this._fsmSubscriptionCallback),e&&this._fsmSubscriptionCallback(),this._startFsmService())},_unsubscribeFromFsmService(){this.fsm&&this.fsm.status!==n.INIT&&this._fsmSubscription&&"function"==typeof this._fsmSubscription&&(this._fsmSubscription(),this._fsmSubscription=null)}}}class h{constructor(){this.extensions={}}withBreakpointRender(e){return this.extensions[withBreakpointRender]={func:withBreakpointRender,arg:e},this}withEventBus(e){return this.extensions[withEventBus]={func:withEventBus,arg:e},this}withI18n(e){return this.extensions[withI18n]={func:withI18n,arg:e},this}withI18nReactive(e){return this.extensions[withI18nReactive]={func:withI18nReactive,arg:e},this}withLazyRender(){return this.extensions[withLazyRender]={func:withLazyRender,arg:void 0},this}withStyles(){return this.extensions[withStyles]={func:withStyles,arg:void 0},this}withLocalState(){return this.extensions[withLocalState]={func:withLocalState,arg:void 0},this}withStore(e){return this.extensions[withStore]={func:withStore,arg:e},this}withWorkerStore(e){return this.extensions[withWorkerStore]={func:withWorkerStore,arg:e},this}withXStateService(e){return this.extensions[withXStateService]={func:withXStateService,arg:e},this}create(e){return Object.keys(this.extensions).reduce(((e,n)=>{const h=this.extensions[n];return h.arg?h.func(h.arg,e):h.func(e)}),e)}}const d={newInstance:()=>new h};class p{constructor(e){this.machine=e}get initialState(){return this.machine.initial||Object.keys(this.machine.states)[0]}transition(e,n){return this.machine.states[e].on[n]}}function withStateMachine(e,n){return{...n,created(){this._stateMachineDefinition=e,this._stateMachine=new p(e),this.initialState=this._stateMachine.initialState,this.state={context:{},matches(e){return e===this.value},value:this.initialState},this.setState=(e,n)=>{if(!e||"object"!=typeof e)return;const h=this.updated;n&&(this.updated=()=>{n.call(this),this.updated=h||void 0}),this.status="transaction";for(const n in e)"value"===n?this.state[n]=e[n]:this.state.context[n]&&this.state.context[n]===e[n]||(this.state.context[n]=e[n]);this.status="render",this._processRender()},n.created&&n.created.call(this)},send(e){let n,h;if("string"==typeof e)n=e;else{const{type:d,...p}=e;n=d,h=p}const{value:d}=this.state,p=this._stateMachine.transition(d,n)||d,_="object"==typeof p&&p.target?p.target:p,b="object"==typeof p&&p.action?p.action:p,g=this._stateMachineDefinition.actions&&this._stateMachineDefinition.actions[b]?()=>this._stateMachineDefinition.actions[b].call(this,h):()=>{};this.setState({value:_},g)}}}class _{constructor(){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.eventBus)return globalThis.__ficusjs__.eventBus;this.subscribers={},globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.eventBus=globalThis.__ficusjs__.eventBus||this}getSubscribers(e){return e?this.subscribers[e]:this.subscribers}subscribe(e,n,h={}){const d=this,p={callCount:0,fireOnce:!1,...h};d.subscribers[e]||(d.subscribers[e]=new Map);return d.subscribers[e].set(n,p),()=>{const h=new Map;d.subscribers[e].forEach(((e,d)=>d!==n&&h.set(d,e))),d.subscribers[e]=h}}publish(e,n){if(!this.subscribers[e])return[];const h=new Map;return this.subscribers[e].forEach(((e,d)=>{e.fireOnce&&1===e.callCount||(d(n),++e.callCount,h.set(d,e))})),h}}function createEventBus(){return new _}function getEventBus(){return createEventBus()}function createStore(e,n){let h=getStore(e);return h||(h=new class{constructor(e){const n=this;n.getters={},n.actions={},n.mutations={},n.state={},n.getterCache={},n.status="resting",n.transaction=!1,n.transactionCache={},n.callbacks=[],e.getters&&(n.getters=new Proxy(e.getters||{},{get:(e,h)=>(n.getterCache[h]||(n.getterCache[h]=e[h](n.state)),n.getterCache[h])})),e.actions&&(n.actions=e.actions),e.mutations&&(n.mutations=e.mutations);let h=e.initialState||{};if(n.copyOfInitialState=n._copyValue(h),n.ttl=-1,n.lastUpdatedState={},e.ttl&&(n.ttl=e.ttl,Object.keys(n.copyOfInitialState).forEach((e=>n.lastUpdatedState[e]=(new Date).getTime()))),e.persist){n.persist="string"==typeof e.persist?createPersist(e.persist):e.persist;const d=n.persist.getState(),p=n.persist.lastUpdated();d&&p&&(-1===n.ttl||n._lastUpdatedTimeDiff(p)<n.ttl)&&(h=d)}this._processState(h)}_processState(e){const n=this;n.state=new Proxy(e,{set:(e,h,d)=>(n.transaction&&!n.transactionCache[h]&&(n.transactionCache[h]=n._copyValue(e[h])),e[h]=d,n.lastUpdatedState[h]=(new Date).getTime(),n.getterCache={},n.transaction||(n.persist&&n.persist.setState(n.state),n.status="resting",n._processCallbacks(n.state)),!0),get:(e,h)=>n.ttl>-1&&n._lastUpdatedTimeDiff(n.lastUpdatedState[h])>n.ttl?(n.persist&&n.persist.removeState(),n.copyOfInitialState[h]):e[h]})}_lastUpdatedTimeDiff(e){return Math.round(((new Date).getTime()-e)/1e3)}dispatch(e,n){return"function"!=typeof this.actions[e]?(console.error(`Dude, the store action "${e}" doesn't exist.`),!1):(this.status="action",this.actions[e](this,n))}commit(e,n){if("function"!=typeof this.mutations[e])return console.error(`Dude, the store mutation "${e}" doesn't exist`),!1;this.status="mutation";const h=this.mutations[e](this.state,n);return this.state=h,this.persist&&this.persist.setState(h),!0}_processCallbacks(e){return!(!this.callbacks.length||this.transaction||(this.callbacks.forEach((n=>n(e))),0))}subscribe(e){return"function"!=typeof e?(console.error("Dude, you can only subscribe to store changes with a valid function"),!1):(this.callbacks.push(e),()=>{this.callbacks=this.callbacks.filter((n=>n!==e))})}_copyValue(e){return JSON.parse(JSON.stringify(e))}begin(){this.transactionCache={},this.transaction=!0}end(){this.transaction=!1,this._processCallbacks(this.state)}rollback(){Object.keys(this.transactionCache).forEach((e=>this.state[e]=this.transactionCache[e])),this.end()}clear(e=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const n=this._copyValue(this.copyOfInitialState);for(const e in n)this.state[e]=n[e];this.transaction=!1,this.status="resting",e&&this._processCallbacks(this.state)}}(n),console.warn("createStore function is deprecated. Use createAppState and getAppState in v3.3.0 to create stores"),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[e]=h,h)}function getStore(e){if(console.warn("getStore function is deprecated. Use createAppState and getAppState in v3.3.0 to create stores"),globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[e])return globalThis.__ficusjs__.store[e]}class b{constructor(e){const n=this;n.state={},n.getterCache={},n.status="resting",n.transaction=!1,n.transactionCache={},n.callbacks=[],this._processActions(e);let h=e.initialState||{};if(n.copyOfInitialState=n._copyValue(h),n.ttl=-1,n.lastUpdatedState={},e.ttl&&(n.ttl=e.ttl,Object.keys(n.copyOfInitialState).forEach((e=>n.lastUpdatedState[e]=(new Date).getTime()))),n.persist=void 0,e.persist){n.persist="string"==typeof e.persist?createPersist(e.persist):e.persist;const d=n.persist.getState(),p=n.persist.lastUpdated();d&&p&&(-1===n.ttl||n._lastUpdatedTimeDiff(p)<n.ttl)&&(h=d)}this._processState(h)}_processActions(e){const n=this,h=Object.keys(e);h.length&&h.forEach((h=>{n[h]||"function"!=typeof e[h]||(n[h]=e[h].bind(n))}))}_processState(e){const n=this;n.state=new Proxy(e,{set:(e,h,d)=>(n.transaction&&!n.transactionCache[h]&&(n.transactionCache[h]=n._copyValue(e[h])),e[h]=d,n.lastUpdatedState[h]=(new Date).getTime(),n.getterCache={},n.transaction||(n.persist&&n.persist.setState(n.state),n.status="resting",n._processCallbacks(n.state)),!0),get:(e,h)=>n.ttl>-1&&n._lastUpdatedTimeDiff(n.lastUpdatedState[h])>n.ttl?(n.persist&&n.persist.removeState(),n.copyOfInitialState[h]):e[h]})}_lastUpdatedTimeDiff(e){return Math.round((new Date).getTime()-e)}setState(e){const setter=e=>{if(!e||"object"!=typeof e)return;const n=this.transaction;n||(this.transactionCache={},this.transaction=!0);for(const n in e)this.state[n]&&this.state[n]===e[n]||(this.state[n]=e[n]);n||(this.transaction=!1,this.persist&&this.persist.setState(this.state),this._processCallbacks(this.state))},n=e(this.state);isPromise$1(n)?n.then(setter):setter(n)}getState(e){if(e&&("string"==typeof e||"function"==typeof e)){if(!this.getterCache[e]){let n;if("function"==typeof e)n=e(this.state);else{n=(Array.isArray(e)?e:e.match(/([^[.\]])+/g)).reduce(((e,n)=>e&&e[n]),this.state)}if(null==n)return;this.getterCache[e]=n}return this.getterCache[e]}}_processCallbacks(e){return!!this.callbacks.length&&(this.callbacks.forEach((n=>n(e))),!0)}subscribe(e){if("function"!=typeof e)throw new Error("Dude, you can only subscribe to store changes with a valid function");return this.callbacks.includes(e)||this.callbacks.push(e),()=>{this.callbacks=this.callbacks.filter((n=>n!==e))}}_copyValue(e){return e?JSON.parse(JSON.stringify(e)):e}clear(e=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const n=this._copyValue(this.copyOfInitialState);for(const e in n)this.state[e]=n[e];this.transaction=!1,this.status="resting",e&&this._processCallbacks(this.state)}}function createAppState(e,n){let h=getAppState(e);return h||(h=new b(n),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[e]=h,h)}function getAppState(e){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[e])return globalThis.__ficusjs__.store[e]}class g{constructor(){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.i18n)return globalThis.__ficusjs__.i18n;this.registry={},this.currentLocale="en",this.interpolateRE=/{{\s*(\w+)\s*}}/g,this.pluralizationRules={en:{pluralizeTo:"count",getVariationIndex:e=>1===e?0:1}},this._init(),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.i18n=globalThis.__ficusjs__.i18n||this}_init(){if("undefined"!=typeof window&&"undefined"!=typeof document){const e=new URLSearchParams(window.location.search).get("lang"),n=e||(document.documentElement.lang?document.documentElement.lang:navigator.language);n&&this.setLocale(n)}}_translatePlural(e,n,h,d,p){const _=this.pluralizationRules[d],b=Object.keys(h),g=1===b.length?b[0]:p||_.pluralizeTo,m=parseFloat(h[g]);if(isNaN(m))throw new Error(`Translation pluralization missing parameters on key '${e}'`);return this._interpolate(n[_.getVariationIndex(m)],h)}_interpolate(e,n){return n?e.replace(this.interpolateRE,(function(e,h){return null!=n[h]?n[h]:e})):e}t(e,n,h){const d=(h=h||{}).locale||this.currentLocale,p=h.registry||this.registry,_=p[d]&&p[d][e];return void 0===_?this.whenUndefined(e,d):Array.isArray(_)?this._translatePlural(e,_,n,d,h.pluralizeTo):this._interpolate(_,n)}add(e,n,h){return n=n||this.currentLocale,this.registry[n]=this.registry[n]||{},Object.keys(e).forEach((d=>{const p=e[d],_=h?h+"."+d:d,b=typeof p;Array.isArray(p)||"string"===b||"number"===b?this.registry[n][_]=p:this.add(p,n,_)})),this}setLocale(e){return this.currentLocale=e,this}getLocale(){return this.currentLocale}interpolateWith(e){return this.interpolateRE=e,this}setPluralizationRule(e,n,h){return this.pluralizationRules[e]={pluralizeTo:h&&(h.pluralizeTo||"count"),getVariationIndex:n},this}whenUndefined(e,n){return e}clear(){return this.registry={},this}}function createI18n(){return new g}function getI18n(){return createI18n()}
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
***************************************************************************** */function t(e,n){var h="function"==typeof Symbol&&e[Symbol.iterator];if(!h)return e;var d,p,_=h.call(e),b=[];try{for(;(void 0===n||n-- >0)&&!(d=_.next()).done;)b.push(d.value)}catch(e){p={error:e}}finally{try{d&&!d.done&&(h=_.return)&&h.call(_)}finally{if(p)throw p.error}}return b}var m;!function(e){e[e.NotStarted=0]="NotStarted",e[e.Running=1]="Running",e[e.Stopped=2]="Stopped"}(m||(m={}));var S={type:"xstate.init"};function r(e){return void 0===e?[]:[].concat(e)}function i(e){return{type:"xstate.assign",assignment:e}}function o(e,n){return"string"==typeof(e="string"==typeof e&&n&&n[e]?n[e]:e)?{type:e}:"function"==typeof e?{type:e.name,exec:e}:e}function a(e){return function(n){return e===n}}function u(e){return"string"==typeof e?{type:e}:e}function c(e,n){return{value:e,context:n,actions:[],changed:!1,matches:a(e)}}function f(e,n,h){var d=n,p=!1;return[e.filter((function(e){if("xstate.assign"===e.type){p=!0;var n=Object.assign({},d);return"function"==typeof e.assignment?n=e.assignment(d,h):Object.keys(e.assignment).forEach((function(p){n[p]="function"==typeof e.assignment[p]?e.assignment[p](d,h):e.assignment[p]})),d=n,!1}return!0})),d,p]}function s(e,n){void 0===n&&(n={});var h=t(f(r(e.states[e.initial].entry).map((function(e){return o(e,n.actions)})),e.context,S),2),d=h[0],p=h[1],_={config:e,_options:n,initialState:{value:e.initial,actions:d,context:p,matches:a(e.initial)},transition:function(n,h){var d,p,b="string"==typeof n?{value:n,context:e.context}:n,g=b.value,m=b.context,S=u(h),y=e.states[g];if(y.on){var v=r(y.on[S.type]);try{for(var w=function(e){var n="function"==typeof Symbol&&Symbol.iterator,h=n&&e[n],d=0;if(h)return h.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&d>=e.length&&(e=void 0),{value:e&&e[d++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(v),T=w.next();!T.done;T=w.next()){var C=T.value;if(void 0===C)return c(g,m);var k="string"==typeof C?{target:C}:C,j=k.target,E=k.actions,x=void 0===E?[]:E,I=k.cond,R=void 0===I?function(){return!0}:I,O=void 0===j,A=null!=j?j:g,B=e.states[A];if(R(m,S)){var L=t(f((O?r(x):[].concat(y.exit,x,B.entry).filter((function(e){return e}))).map((function(e){return o(e,_._options.actions)})),m,S),3),N=L[0],P=L[1],U=L[2],M=null!=j?j:g;return{value:M,context:P,actions:N,changed:j!==g||N.length>0||U,matches:a(M)}}}}catch(e){d={error:e}}finally{try{T&&!T.done&&(p=w.return)&&p.call(w)}finally{if(d)throw d.error}}}return c(g,m)}};return _}var l=function(e,n){return e.actions.forEach((function(h){var d=h.exec;return d&&d(e.context,n)}))};function interpret(e,n,h){const d=wrapXStateService(function(e){var n=e.initialState,h=m.NotStarted,d=new Set,p={_machine:e,send:function(p){h===m.Running&&(n=e.transition(n,p),l(n,u(p)),d.forEach((function(e){return e(n)})))},subscribe:function(e){return d.add(e),e(n),{unsubscribe:function(){return d.delete(e)}}},start:function(d){if(d){var _="object"==typeof d?d:{context:e.config.context,value:d};n={value:_.value,actions:[],context:_.context,matches:a(_.value)}}else n=e.initialState;return h=m.Running,l(n,S),p},stop:function(){return h=m.Stopped,d.clear(),p},get state(){return n},get status(){return h}};return p}(e),n,h);return d}function createXStateService(e,n,h,d){const p=interpret(n,h,d);return globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.xstate=globalThis.__ficusjs__.xstate||{},globalThis.__ficusjs__.xstate[e]=p,p}function getXStateService(e){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.xstate&&globalThis.__ficusjs__.xstate[e])return globalThis.__ficusjs__.xstate[e]}function use(e,{renderer:h,...d}){if(e.create&&"function"==typeof e.create)return e.create({createCustomElement:createCustomElement,renderer:h,...d,createComponent:createComponent,createEventBus:createEventBus,getEventBus:getEventBus,createAppState:createAppState,getAppState:getAppState,createPersist:createPersist,createStore:createStore,getStore:getStore,createI18n:createI18n,getI18n:getI18n,assign:i,createMachine:s,createXStateService:createXStateService,getXStateService:getXStateService,interpret:interpret,wrapXStateService:wrapXStateService,XStateServiceStatus:n,use:use})}export{d as ExtensionBuilder,n as XStateServiceStatus,i as assign,createAppState,createComponent,createCustomElement,createEventBus,createI18n,s as createMachine,createPersist,createStore,createXStateService,getAppState,getEventBus,getI18n,getStore,getXStateService,interpret,use,withBreakpointRender,withEventBus,withI18n,withI18nReactive,withLazyRender,withLocalState,withStateMachine,withStateTransactions,withStore,withStyles,withWorkerStore,withXStateService,wrapXStateService};
