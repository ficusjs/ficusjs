function toKebabCase(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function createComponent(t,e){const s=function(t){if(!t)return[];const e=[];return Object.keys(t).forEach(s=>{(null==t[s].observed||t[s].observed)&&e.push(toKebabCase(s))}),e}(e.props);window.customElements.get(t)||window.customElements.define(t,class extends HTMLElement{static get observedAttributes(){return s}connectedCallback(){this._checkInit(),this._subscribeToStores(!1),this._subscribeToEventBus(),this._preprocess(),"function"!=typeof this.mounted||this.isMountedCalled||(this.mounted(),this.isMountedCalled=!0),"function"==typeof this.updated&&this.isMountedCalled&&this.updated()}disconnectedCallback(){this._unsubscribeFromStores(),this._unsubscribeFromEventBus(),"function"==typeof this.removed&&(this.removed(),this.isRemovedCalled=!0)}attributeChangedCallback(){this._checkInit(),this._preprocess()}get initialised(){return this._props&&this._state&&this._computed&&this.templateRenderer}_checkInit(){this.initialised||this._init(e)}_init(t){if(this._props=t.props||{},this._computed=t.computed||{},t.state&&"function"!=typeof t.state)throw new Error("State must be a function!");this._state=t.state||{},this.computedCache={},this.subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(e.store||null),this.setEventBus(e.eventBus||null),this.props=this._processProps(),"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this._processInitProps(t),this.root=this._processRoot(t.root),this.slots=this._processSlots(),this.render=t.render||null,this.templateRenderer=t.renderer,this.template=null,this.created=t.created||null,this.mounted=t.mounted||t.ready||null,this.updated=t.updated||null,this.removed=t.removed||null,this.isCreatedCalled=!1,this.isMountedCalled=!1,this.isRemovedCalled=!1,this.emit=(t,e)=>{!function(t,e,s={}){const i=Object.assign({},{bubbles:!0,cancelable:!0,composed:!1},s);let n;"composed"in CustomEvent.prototype?n=new CustomEvent(e,i):(n=document.createEvent("CustomEvent"),n.initCustomEvent(e,i.bubbles,i.cancelable,i.detail),Object.defineProperty(n,"composed",{value:i.composed})),t.dispatchEvent(n)}(this,t,{detail:e})},this._processInstanceProps(this._props),"function"!=typeof this.created||this.isCreatedCalled||(this.created(),this.isCreatedCalled=!0)}_processProps(){const t={};return Object.keys(this._props).forEach(e=>{const s={},i=this._props[e],n=this._getAttribute(e);let r=null;if(null!=i.default&&(r=i.default),i.required&&null==n)null!=r?(console.info(`No biggie, the required prop '${e}' has no value set, so the default has been set`),s[e]=r):(s[e]=null,console.error(`The required prop '${e}' has no value set`));else switch(i.type){case String:default:s[e]=n||r;break;case Number:s[e]=null!=n?parseFloat(n):null!=r?r:0;break;case Boolean:s[e]=null!=n?"true"===n.toString():null!=r&&r;break;case Object:try{s[e]=null!=n?JSON.parse(n):null!=r?r:void 0}catch(t){s[e]=null!=r?r:void 0,console.error("An object parse issue occurred",t)}}t[e]=s[e],this._instanceProps&&this._instanceProps[e]&&(t[e]=this._instanceProps[e])}),t}_processInitProps(t){const e=this,s=["state","created","mounted","updated","removed","render","renderer","setStore","setEventBus"],i=Object.keys(t);i.length&&i.forEach(i=>{e[i]||s.includes(i)||"function"!=typeof t[i]||(e[i]=t[i].bind(e)),"computed"===i&&this._processComputed(t[i])})}_processRoot(t){switch(t){case"standard":default:return this;case"shadow":return this.attachShadow({mode:"open"});case"shadow:closed":return this.attachShadow({mode:"closed"})}}_processComputed(t){const e=this,s=Object.keys(t);s.length&&s.forEach(s=>{e[s]?console.warn(`Computed property '${s}' already exists on the component instance`):Object.defineProperty(e,s,{get:()=>(e.computedCache[s]||(e.computedCache[s]=t[s].bind(e)()),e.computedCache[s])})})}_processRender(){const t=this.render?this.render():void 0;t&&(this.template=t,this._updateRender())}_monitorState(t){const e=this;return new Proxy(t,{set:(t,s,i)=>(t[s]===i||(t[s]=i,e.computedCache={},e._processRender()),!0)})}_processSlots(){const t=this.childNodes,e={default:[]};return t.length>0&&[...t].forEach(t=>{const s=t.getAttribute?t.getAttribute("slot"):null;s?e[s]=t:e.default.push(t)}),e}_getAttribute(t){try{return this.getAttribute(toKebabCase(t))}catch(t){return console.error("A get prop error occurred",t),""}}_processInstanceProps(t){const e=this,s=Object.keys(t);t&&s.forEach(t=>{e[t]?console.warn(`Instance property '${t}' already exists on the component instance`):Object.defineProperty(e,t,{get(){return this._instanceProps&&this._instanceProps[t]?this._instanceProps[t]:this.getAttribute(toKebabCase(t))},set(e){return this._instanceProps||(this._instanceProps={}),this._instanceProps[t]=e,this.setAttribute(toKebabCase(t),"object"==typeof e?JSON.stringify(e):e.toString()),this.attributeChangedCallback(),!0},enumerable:!0})})}_preprocess(){this.computedCache={},this.props=this._processProps(),this._processRender()}_updateRender(){var t;this.template&&("object"!=typeof(t=this.template)&&"function"!=typeof t||"function"!=typeof t.then?this.templateRenderer(this.template,this.root):this.template.then(t=>this.templateRenderer(t,this.root)).catch(t=>console.error("A component render error occurred",t)))}_subscribeToStores(t=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this.subscribeCallback),t&&this.subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach(t=>{this.store[t]&&this.store[t].subscribe&&"function"==typeof this.store[t].subscribe&&!this.unsubscribe[t]&&(this.unsubscribe[t]=this.store[t].subscribe(this.subscribeCallback))}),t&&this.subscribeCallback()}}_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach(t=>{this.unsubscribe[t]()}),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}_subscribeToEventBus(){for(const t in this._eventSubscriptions){const{unsubscribe:e,callback:s}=this._eventSubscriptions[t];e||(this._eventSubscriptions[t].unsubscribe=this._eventBus.subscribe(t,s))}}_unsubscribeFromEventBus(){for(const t in this._eventSubscriptions){const{unsubscribe:e}=this._eventSubscriptions[t];e&&e(),this._eventSubscriptions[t].unsubscribe=null}}setStore(t){this.store=t,this._subscribeToStores()}setEventBus(t){const e=this;this._eventBus=t,this._eventSubscriptions={},this.eventBus={subscribe:(t,s)=>(e._eventSubscriptions[t]={unsubscribe:e._eventBus.subscribe(t,s),callback:s},function(){const{unsubscribe:s}=e._eventSubscriptions[t];s&&s(),e._eventSubscriptions[t].unsubscribe=null}),publish(t,s={}){e._eventBus.publish(t,s)}}}})}class t{constructor(){if("undefined"!=typeof window&&window.__ficusjs__&&window.__ficusjs__.eventBus)return window.__ficusjs__.eventBus;this.events={},"undefined"!=typeof window&&(window.__ficusjs__=window.__ficusjs__||{},window.__ficusjs__.eventBus=window.__ficusjs__.eventBus||this)}subscribe(t,e){const s=this;s.events[t]||(s.events[t]=[]);return s.events[t].push(e),()=>{s.events[t]=s.events[t].filter(t=>t!==e)}}publish(t,e={}){return this.events[t]?this.events[t].map(t=>t(e)):[]}}function createEventBus(){return new t}function getEventBus(){return createEventBus()}class e{constructor(t,e){this.namespace=t,this.storage=e}setState(t){t?(this.storage.setItem(this.namespace+":state","string"==typeof t?t:JSON.stringify(t)),this.storage.setItem(this.namespace+":lastUpdated",(new Date).getTime().toString())):this.removeState()}getState(){return JSON.parse(this.storage.getItem(this.namespace+":state"))}lastUpdated(){return parseInt(this.storage.getItem(this.namespace+":lastUpdated"),10)}removeState(){this.storage.removeItem(this.namespace+":state"),this.storage.removeItem(this.namespace+":lastUpdated")}}class s{constructor(t){const e=this;e.getters={},e.actions={},e.mutations={},e.state={},e.getterCache={},e.status="resting",e.transaction=!1,e.transactionCache={},e.callbacks=[],t.getters&&(e.getters=new Proxy(t.getters||{},{get(t,s){if(!e.getterCache[s]){const i=t[s](e.state);e.getterCache[s]=i}return e.getterCache[s]}})),t.actions&&(e.actions=t.actions),t.mutations&&(e.mutations=t.mutations);let s=t.initialState||{};if(e.copyOfInitialState=e._copyValue(s),e.ttl=-1,e.lastUpdatedState={},t.ttl&&(e.ttl=t.ttl,Object.keys(e.copyOfInitialState).forEach(t=>e.lastUpdatedState[t]=(new Date).getTime())),t.persist){e.persist="string"==typeof t.persist?createPersist(t.persist):t.persist;const i=e.persist.getState(),n=e.persist.lastUpdated();i&&n&&(-1===e.ttl||e._lastUpdatedTimeDiff(n)<e.ttl)&&(s=i)}this._processState(s)}_processState(t){const e=this;e.state=new Proxy(t,{set:(t,s,i)=>(e.transaction&&!e.transactionCache[s]&&(e.transactionCache[s]=e._copyValue(t[s])),t[s]=i,e.lastUpdatedState[s]=(new Date).getTime(),e.getterCache={},"clear"!==e.status&&(e._processCallbacks(e.state),e.status="resting"),!0),get:(t,s)=>e.ttl>-1&&e._lastUpdatedTimeDiff(e.lastUpdatedState[s])>e.ttl?(e.persist&&e.persist.removeState(),e.copyOfInitialState[s]):t[s]})}_lastUpdatedTimeDiff(t){return Math.round(((new Date).getTime()-t)/1e3)}dispatch(t,e){return"function"!=typeof this.actions[t]?(console.error(`Dude, the store action "${t}" doesn't exist.`),!1):(this.status="action",this.actions[t](this,e))}commit(t,e){if("function"!=typeof this.mutations[t])return console.error(`Dude, the store mutation "${t}" doesn't exist`),!1;this.status="mutation";const s=this.mutations[t](this.state,e);return this.state=s,this.persist&&this.persist.setState(s),!0}_processCallbacks(t){return!(!this.callbacks.length||this.transaction)&&(this.callbacks.forEach(e=>e(t)),!0)}subscribe(t){if("function"!=typeof t)return console.error("Dude, you can only subscribe to store changes with a valid function"),!1;return this.callbacks.push(t),()=>{this.callbacks=this.callbacks.filter(e=>e!==t)}}_copyValue(t){return JSON.parse(JSON.stringify(t))}begin(){this.transactionCache={},this.transaction=!0}end(){this.transaction=!1,this._processCallbacks(this.state)}rollback(){Object.keys(this.transactionCache).forEach(t=>this.state[t]=this.transactionCache[t]),this.end()}clear(t=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.status="clear";const e=this._copyValue(this.copyOfInitialState);for(const t in e)this.state[t]=e[t];this.status="resting",t&&this._processCallbacks(this.state)}}function createStore(t,e){const i=new s(e);return"undefined"!=typeof window&&(window.__ficusjs__=window.__ficusjs__||{},window.__ficusjs__.store=window.__ficusjs__.store||{},window.__ficusjs__.store[t]=i),i}function createPersist(t,s="session"){return new e(t,"local"===s?window.localStorage:window.sessionStorage)}function getStore(t){if("undefined"!=typeof window&&window.__ficusjs__&&window.__ficusjs__.store&&window.__ficusjs__.store[t])return window.__ficusjs__.store[t]}function use(t){t.create&&"function"==typeof t.create&&t.create({createComponent:createComponent,createEventBus:createEventBus,getEventBus:getEventBus,createPersist:createPersist,createStore:createStore,getStore:getStore,use:use})}export{createComponent,createEventBus,createPersist,createStore,getEventBus,getStore,use};
