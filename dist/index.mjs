function toKebabCase(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function createCustomElement(t,e){const s=function(t){if(!t)return[];const e=[];return Object.keys(t).forEach((s=>{(null==t[s].observed||t[s].observed)&&e.push(toKebabCase(s))})),e}(e.props);globalThis.customElements.get(t)||globalThis.customElements.define(t,class extends globalThis.HTMLElement{static get observedAttributes(){return s}get componentTagName(){return t}connectedCallback(){null==this.connectedCallbackCount&&(this.connectedCallbackCount=0),this.connectedCallbackCount=this.connectedCallbackCount+1,this._checkInit(),this._preprocess()}disconnectedCallback(){"function"==typeof this.removed&&(this.removed(),this.isRemovedCalled=!0)}attributeChangedCallback(){null!=this.connectedCallbackCount&&(this._checkInit(),this._preprocess())}get initialised(){return this._props&&this._computed&&this.templateRenderer}_checkInit(){this.initialised||this._init(e)}_init(t){this._props=t.props||{},this._computed=t.computed||{},this.computedCache={},this.status="render",this.connectedCallbackCount=0,this.props=this._processProps(),this.root=this._processRoot(t.root),this.slots=this._processSlots(),this.render=t.render||null,this.templateRenderer=t.renderer,this.template=null,this.created=t.created||null,this.mounted=t.mounted||null,this.updated=t.updated||null,this.removed=t.removed||null,this.isCreatedCalled=!1,this.isMountedCalled=!1,this.isRemovedCalled=!1,this.emit=(t,e)=>{!function(t,e,s={}){const i=Object.assign({},{bubbles:!0,cancelable:!0,composed:!1},s),a=globalThis.document.createEvent("CustomEvent");a.initCustomEvent(e,i.bubbles,i.cancelable,i.detail),Object.defineProperty(a,"composed",{value:i.composed}),t.dispatchEvent(a)}(this,t,{detail:e})},this._processMethodsAndComputedProps(t),this._processInstanceProps(this._props),"function"!=typeof this.created||this.isCreatedCalled||(this.created(),this.isCreatedCalled=!0)}_processProps(){const t={};return Object.keys(this._props).forEach((e=>{const s={},i=this._props[e],a=this._getAttribute(e);let r=null;if(null!=i.default&&(r=i.default),i.required&&null==a)null!=r?(console.info(`No biggie, the required prop '${e}' has no value set, so the default has been set`),s[e]=r):(s[e]=null,console.error(`The required prop '${e}' has no value set`));else switch(i.type){case String:default:s[e]=a||r;break;case Number:s[e]=null!=a?parseFloat(a):null!=r?r:0;break;case Boolean:s[e]=null!=a?"true"===a.toString():null!=r&&r;break;case Object:try{s[e]=null!=a?JSON.parse(a):null!=r?r:void 0}catch(t){s[e]=null!=r?r:void 0,console.error(`An object prop parse issue occurred with prop ${e} and value ${a}`)}}t[e]=s[e],this._instanceProps&&this._instanceProps[e]&&(t[e]=this._instanceProps[e])})),t}_processMethodsAndComputedProps(t){const e=this,s=Object.keys(t);s.length&&s.forEach((s=>{e[s]||"function"!=typeof t[s]||(e[s]=t[s].bind(e)),"computed"===s&&this._processComputed(t[s])}))}_processRoot(t){switch(t){case"standard":default:return this;case"shadow":return this.attachShadow({mode:"open"});case"shadow:closed":return this.attachShadow({mode:"closed"})}}_processComputed(t){const e=this,s=Object.keys(t);s.length&&s.forEach((s=>{e[s]?console.warn(`Computed property '${s}' already exists on the component instance`):Object.defineProperty(e,s,{get:()=>(e.computedCache[s]||(e.computedCache[s]=t[s].bind(e)()),e.computedCache[s])})}))}_processRender(){const t=this.render?this.render():void 0;t&&(this.template=t,this._updateRender())}_processSlots(){const t=this.childNodes,e={default:[]};return t.length>0&&[...t].forEach((t=>{const s=t.getAttribute?t.getAttribute("slot"):null;s?e[s]=t:e.default.push(t)})),e}_getAttribute(t){try{return this.getAttribute(toKebabCase(t))}catch(t){return console.error("A get prop error occurred",t),""}}_processInstanceProps(t){const e=this,s=Object.keys(t);t&&s.forEach((t=>{let s;e[t]&&(s=e[t],delete e[t]),Object.defineProperty(e,t,{get(){return this._instanceProps&&this._instanceProps[t]?this._instanceProps[t]:this.getAttribute(toKebabCase(t))},set(e){return this._instanceProps||(this._instanceProps={}),this._instanceProps[t]=e,this.setAttribute(toKebabCase(t),"object"==typeof e?JSON.stringify(e):e.toString()),!0},enumerable:!0}),s&&(e[t]=s)}))}_preprocess(){this.computedCache={},this.props=this._processProps(),this._processRender()}_updateRender(){var t;this.template&&("object"!=typeof(t=this.template)&&"function"!=typeof t||"function"!=typeof t.then?(this.templateRenderer(this.template,this.root),this._callLifecycleMethods()):this.template.then((t=>{this.templateRenderer(t,this.root),this._callLifecycleMethods()})).catch((t=>console.error("A component render error occurred",t))))}_callLifecycleMethods(){"function"!=typeof this.mounted||this.isMountedCalled||this.mounted(),this.isMountedCalled=!0,"function"==typeof this.updated&&this.isMountedCalled&&this.updated()}})}function isPromise$1(t){return("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then}function withLocalState(t){return{...t,created(){if(t.state&&"function"!=typeof t.state)throw new Error("State must be a function!");this._state=t.state||{},"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this.setState=(t,e)=>{const setter=t=>{if(!t||"object"!=typeof t)return;const s=this.updated;e&&(this.updated=()=>{e(),this.updated=s||void 0}),this.status="transaction";for(const e in t)this.state[e]&&this.state[e]===t[e]||(this.state[e]=t[e]);this.status="render",this._processRender()},s=t(this.state);isPromise$1(s)?s.then(setter):setter(s)},t.created&&t.created.call(this)},_monitorState(t){const e=this;return new Proxy(t,{set:(t,s,i)=>(t[s]===i||(t[s]=i,e.computedCache={},"render"===e.status&&e._processRender()),!0)})}}}function createComponent(t,e){createCustomElement(t,withLocalState(e))}function withEventBus(t,e){return{...e,created(){this.setEventBus(t),e.created&&e.created.call(this)},mounted(){this._subscribeToEventBus(),e.mounted&&e.mounted.call(this)},updated(){this._subscribeToEventBus(),e.updated&&e.updated.call(this)},removed(){this._unsubscribeFromEventBus(),e.removed&&e.removed.call(this)},setEventBus(t){const e=this;e._eventBus=t,e._eventSubscriptions={},e.eventBus={subscribe:(t,s)=>(e._eventSubscriptions[t]={unsubscribe:e._eventBus.subscribe(t,s),callback:s},function(){const{unsubscribe:s}=e._eventSubscriptions[t];s&&s(),e._eventSubscriptions[t].unsubscribe=null}),publish(t,s={}){e._eventBus.publish(t,s)}}},_subscribeToEventBus(){for(const t in this._eventSubscriptions){const{unsubscribe:e,callback:s}=this._eventSubscriptions[t];e||(this._eventSubscriptions[t].unsubscribe=this._eventBus.subscribe(t,s))}},_unsubscribeFromEventBus(){for(const t in this._eventSubscriptions){const{unsubscribe:e}=this._eventSubscriptions[t];e&&e(),this._eventSubscriptions[t].unsubscribe=null}}}}function withStateTransactions(t){return{...t,created(){this.state=this._monitorTransactionState(this._state),this.setState=(t,e)=>{const setter=t=>{if(!t||"object"!=typeof t)return;const s=this.transaction,i=this.updated;e&&(this.updated=()=>{setTimeout(e),this.updated=i||void 0}),s||this.beginTransaction();for(const e in t)this.state[e]&&this.state[e]===t[e]||(this.state[e]=t[e]);s||this.endTransaction()},s=t(this.state);var i;"object"!=typeof(i=s)&&"function"!=typeof i||"function"!=typeof i.then?setter(s):s.then(setter)},t.created&&t.created.call(this)},beginTransaction(){this.transactionCache={},this.transaction=!0,this.status="transaction"},endTransaction(){this.transaction=!1,this.status="render",this._processRender()},rollbackTransaction(){Object.keys(this.transactionCache).forEach((t=>this.state[t]=this.transactionCache[t])),this.endTransaction()},_monitorTransactionState(t){const e=this;return new Proxy(t,{set:(t,s,i)=>(t[s]===i||(e.transaction&&!e.transactionCache[s]&&(e.transactionCache[s]=e._copyValue(t[s])),t[s]=i,e.computedCache={},"render"===e.status&&e._processRender()),!0),get:(t,e)=>t[e]})},_copyValue:t=>JSON.parse(JSON.stringify(t))}}function withLazyRender(t){return{...t,created(){t.created&&t.created.call(this),this.elementVisible=!1,this.intersectionObserver=new IntersectionObserver(((t,e)=>{t.forEach((t=>{t.isIntersecting&&!this.elementVisible&&(this.elementVisible=!0,this.intersectionObserver.disconnect(),this._processRender())}))}),{threshold:.1}),this.intersectionObserver.observe(this)},removed(){t.removed&&t.removed.call(this),this.intersectionObserver&&this.intersectionObserver.disconnect()}}}function withStore(t,e){return{...e,created(){this.subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(t),e.created&&e.created.call(this)},mounted(){this._subscribeToStores(!1),e.mounted&&e.mounted.call(this)},updated(){this._subscribeToStores(!1),e.updated&&e.updated.call(this)},removed(){this._unsubscribeFromStores(),e.removed&&e.removed.call(this)},setStore(t){this.store=t,this._subscribeToStores()},_subscribeToStores(t=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this.subscribeCallback),t&&this.subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((t=>{this.store[t]&&this.store[t].subscribe&&"function"==typeof this.store[t].subscribe&&!this.unsubscribe[t]&&(this.unsubscribe[t]=this.store[t].subscribe(this.subscribeCallback))})),t&&this.subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((t=>{this.unsubscribe[t]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}function withStyles(t){return{...t,created(){t.styles&&"function"==typeof t.styles&&(globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.styles=globalThis.__ficusjs__.styles||{},this._injectStyles(t.styles())),t.created&&t.created.call(this)},_injectStyles(t){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.styles&&globalThis.__ficusjs__.styles[this.componentTagName])return;if(Array.isArray(t)&&t.filter((t=>"string"!=typeof t)).length||!Array.isArray(t)&&"string"!=typeof t)return void console.error("Dude, styles must return a string or an array of strings!");let e="";Array.isArray(t)?Promise.all(t.map((t=>this._processStyle(t)))).then((t=>{e=t.filter((t=>t)).join("\n"),this._createAndInjectStylesheet(e,{"data-tag":this.componentTagName})})):this._processStyle(t).then((t=>this._createAndInjectStylesheet(t,{"data-tag":this.componentTagName})))},_processStyle(t){if(/http[s]?:\/\/.+\.css$/.test(t)){const e=document.createElement("link");return e.rel="stylesheet",e.type="text/css",e.href=t,document.head.appendChild(e),Promise.resolve()}return/.+\.css$/.test(t)?globalThis.fetch(t).then((t=>t.text())):Promise.resolve(t)},_createAndInjectStylesheet(t,e){const s=this._createStyle(t);this._setElementAttributes(s,e),document.head.appendChild(s),globalThis.__ficusjs__.styles[this.componentTagName]={loaded:!0,style:s}},_createStyle(t){const e=document.createElement("style");return e.appendChild(document.createTextNode(t)),e},_setElementAttributes(t,e){e&&Object.keys(e).forEach((s=>{t.setAttribute(s,e[s])}))}}}class t{constructor(t){this.machine=t}get initialState(){return this.machine.initial||Object.keys(this.machine.states)[0]}transition(t,e){return this.machine.states[t].on[e]}}function withStateMachine(e,s){return{...s,created(){this._stateMachineDefinition=e,this._stateMachine=new t(e),this.initialState=this._stateMachine.initialState,this.state={context:{},matches(t){return t===this.value},value:this.initialState},this.setState=(t,e)=>{if(!t||"object"!=typeof t)return;const s=this.updated;e&&(this.updated=()=>{e.call(this),this.updated=s||void 0}),this.status="transaction";for(const e in t)"value"===e?this.state[e]=t[e]:this.state.context[e]&&this.state.context[e]===t[e]||(this.state.context[e]=t[e]);this.status="render",this._processRender()},s.created&&s.created.call(this)},send(t){let e,s;if("string"==typeof t)e=t;else{const{type:i,...a}=t;e=i,s=a}const{value:i}=this.state,a=this._stateMachine.transition(i,e)||i,r="object"==typeof a&&a.target?a.target:a,n="object"==typeof a&&a.action?a.action:a,o=this._stateMachineDefinition.actions&&this._stateMachineDefinition.actions[n]?()=>this._stateMachineDefinition.actions[n].call(this,s):()=>{};this.setState({value:r},o)}}}function withXStateService(t,e){return{...e,created(){this._setupService(t),e.created&&e.created.call(this)},send(t){this.service.send(t)},mounted(){this._startService(),e.mounted&&e.mounted.call(this)},updated(){this._startService(),e.updated&&e.updated.call(this)},removed(){this._stopService(),e.removed&&e.removed.call(this)},_setupService(t){this.service=t,this.subscription=t.subscribe((t=>{this.state=t,this.computedCache={},this._processRender()})),this._startService()},_startService(){this.service&&this.subscription&&"Running"!==this.service.status&&this.service.start()},_stopService(){this.service&&this.subscription&&"Running"===this.service.status&&this.service.stop()}}}class e{constructor(){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.eventBus)return globalThis.__ficusjs__.eventBus;this.events={},globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.eventBus=globalThis.__ficusjs__.eventBus||this}subscribe(t,e){const s=this;s.events[t]||(s.events[t]=[]);return s.events[t].push(e),()=>{s.events[t]=s.events[t].filter((t=>t!==e))}}publish(t,e={}){return this.events[t]?this.events[t].map((t=>t(e))):[]}}function createEventBus(){return new e}function getEventBus(){return createEventBus()}class s{constructor(t,e){this.namespace=t,this.storage=e}setState(t){t?(this.storage.setItem(`${this.namespace}:state`,"string"==typeof t?t:JSON.stringify(t)),this.storage.setItem(`${this.namespace}:lastUpdated`,(new Date).getTime().toString())):this.removeState()}getState(){const t=this.storage.getItem(`${this.namespace}:state`);return t?JSON.parse(t):void 0}lastUpdated(){const t=this.storage.getItem(`${this.namespace}:lastUpdated`);return t?parseInt(t,10):void 0}removeState(){this.storage.removeItem(`${this.namespace}:state`),this.storage.removeItem(`${this.namespace}:lastUpdated`)}}function createPersist(t,e="session"){return new s(t,"local"===e?globalThis.localStorage:globalThis.sessionStorage)}class i{constructor(t){const e=this;e.getters={},e.actions={},e.mutations={},e.state={},e.getterCache={},e.status="resting",e.transaction=!1,e.transactionCache={},e.callbacks=[],t.getters&&(e.getters=new Proxy(t.getters||{},{get:(t,s)=>(e.getterCache[s]||(e.getterCache[s]=t[s](e.state)),e.getterCache[s])})),t.actions&&(e.actions=t.actions),t.mutations&&(e.mutations=t.mutations);let s=t.initialState||{};if(e.copyOfInitialState=e._copyValue(s),e.ttl=-1,e.lastUpdatedState={},t.ttl&&(e.ttl=t.ttl,Object.keys(e.copyOfInitialState).forEach((t=>e.lastUpdatedState[t]=(new Date).getTime()))),t.persist){e.persist="string"==typeof t.persist?createPersist(t.persist):t.persist;const i=e.persist.getState(),a=e.persist.lastUpdated();i&&a&&(-1===e.ttl||e._lastUpdatedTimeDiff(a)<e.ttl)&&(s=i)}this._processState(s)}_processState(t){const e=this;e.state=new Proxy(t,{set:(t,s,i)=>(e.transaction&&!e.transactionCache[s]&&(e.transactionCache[s]=e._copyValue(t[s])),t[s]=i,e.lastUpdatedState[s]=(new Date).getTime(),e.getterCache={},e.transaction||(e.persist&&e.persist.setState(e.state),e.status="resting",e._processCallbacks(e.state)),!0),get:(t,s)=>e.ttl>-1&&e._lastUpdatedTimeDiff(e.lastUpdatedState[s])>e.ttl?(e.persist&&e.persist.removeState(),e.copyOfInitialState[s]):t[s]})}_lastUpdatedTimeDiff(t){return Math.round(((new Date).getTime()-t)/1e3)}dispatch(t,e){return"function"!=typeof this.actions[t]?(console.error(`Dude, the store action "${t}" doesn't exist.`),!1):(this.status="action",this.actions[t](this,e))}commit(t,e){if("function"!=typeof this.mutations[t])return console.error(`Dude, the store mutation "${t}" doesn't exist`),!1;this.status="mutation";const s=this.mutations[t](this.state,e);return this.state=s,this.persist&&this.persist.setState(s),!0}_processCallbacks(t){return!(!this.callbacks.length||this.transaction)&&(this.callbacks.forEach((e=>e(t))),!0)}subscribe(t){if("function"!=typeof t)return console.error("Dude, you can only subscribe to store changes with a valid function"),!1;return this.callbacks.push(t),()=>{this.callbacks=this.callbacks.filter((e=>e!==t))}}_copyValue(t){return JSON.parse(JSON.stringify(t))}begin(){this.transactionCache={},this.transaction=!0}end(){this.transaction=!1,this._processCallbacks(this.state)}rollback(){Object.keys(this.transactionCache).forEach((t=>this.state[t]=this.transactionCache[t])),this.end()}clear(t=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const e=this._copyValue(this.copyOfInitialState);for(const t in e)this.state[t]=e[t];this.transaction=!1,this.status="resting",t&&this._processCallbacks(this.state)}}function createStore(t,e){let s=getStore(t);return s||(s=new i(e),console.warn("createStore function is deprecated. Use createAppState and getAppState in v3.3.0 to create stores"),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[t]=s,s)}function getStore(t){if(console.warn("getStore function is deprecated. Use createAppState and getAppState in v3.3.0 to create stores"),globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[t])return globalThis.__ficusjs__.store[t]}class a{constructor(t){const e=this;e.state={},e.getterCache={},e.status="resting",e.transaction=!1,e.transactionCache={},e.callbacks=[],this._processActions(t);let s=t.initialState||{};if(e.copyOfInitialState=e._copyValue(s),e.ttl=-1,e.lastUpdatedState={},t.ttl&&(e.ttl=t.ttl,Object.keys(e.copyOfInitialState).forEach((t=>e.lastUpdatedState[t]=(new Date).getTime()))),t.persist){e.persist="string"==typeof t.persist?createPersist(t.persist):t.persist;const i=e.persist.getState(),a=e.persist.lastUpdated();i&&a&&(-1===e.ttl||e._lastUpdatedTimeDiff(a)<e.ttl)&&(s=i)}this._processState(s)}_processActions(t){const e=this,s=Object.keys(t);s.length&&s.forEach((s=>{e[s]||"function"!=typeof t[s]||(e[s]=t[s].bind(e))}))}_processState(t){const e=this;e.state=new Proxy(t,{set:(t,s,i)=>(e.transaction&&!e.transactionCache[s]&&(e.transactionCache[s]=e._copyValue(t[s])),t[s]=i,e.lastUpdatedState[s]=(new Date).getTime(),e.getterCache={},e.transaction||(e.persist&&e.persist.setState(e.state),e.status="resting",e._processCallbacks(e.state)),!0),get:(t,s)=>e.ttl>-1&&e._lastUpdatedTimeDiff(e.lastUpdatedState[s])>e.ttl?(e.persist&&e.persist.removeState(),e.copyOfInitialState[s]):t[s]})}_lastUpdatedTimeDiff(t){return Math.round((new Date).getTime()-t)}setState(t){const setter=t=>{if(!t||"object"!=typeof t)return;const e=this.transaction;e||(this.transactionCache={},this.transaction=!0);for(const e in t)this.state[e]&&this.state[e]===t[e]||(this.state[e]=t[e]);e||(this.transaction=!1,this.persist&&this.persist.setState(this.state),this._processCallbacks(this.state))},e=t(this.state);isPromise$1(e)?e.then(setter):setter(e)}getState(t){if(t){if(!this.getterCache[t]){const e=(Array.isArray(t)?t:t.match(/([^[.\]])+/g)).reduce(((t,e)=>t&&t[e]),this.state);if(null==e)return;this.getterCache[t]=e}return this.getterCache[t]}}_processCallbacks(t){return!!this.callbacks.length&&(this.callbacks.forEach((e=>e(t))),!0)}subscribe(t){if("function"!=typeof t)throw new Error("Dude, you can only subscribe to store changes with a valid function");return this.callbacks.push(t),()=>{this.callbacks=this.callbacks.filter((e=>e!==t))}}_copyValue(t){return t?JSON.parse(JSON.stringify(t)):t}clear(t=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const e=this._copyValue(this.copyOfInitialState);for(const t in e)this.state[t]=e[t];this.transaction=!1,this.status="resting",t&&this._processCallbacks(this.state)}}function createAppState(t,e){let s=getAppState(t);return s||(s=new a(e),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[t]=s,s)}function getAppState(t){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[t])return globalThis.__ficusjs__.store[t]}function use(t,{renderer:e,...s}){if(t.create&&"function"==typeof t.create)return t.create({createCustomElement:createCustomElement,renderer:e,...s,createComponent:createComponent,createEventBus:createEventBus,getEventBus:getEventBus,createAppState:createAppState,getAppState:getAppState,createPersist:createPersist,createStore:createStore,getStore:getStore,use:use})}export{createAppState,createComponent,createCustomElement,createEventBus,createPersist,createStore,getAppState,getEventBus,getStore,use,withEventBus,withLazyRender,withLocalState,withStateMachine,withStateTransactions,withStore,withStyles,withXStateService};
