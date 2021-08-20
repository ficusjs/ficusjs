function toKebabCase(e){return e.replace(/([A-Z])/g,"-$1").toLowerCase()}function elementRenderer(e,t){for(;t.firstChild;)t.removeChild(t.firstChild);let s;if("string"==typeof e)s=document.createElement("div"),s.innerHTML=e;else{if(!e.nodeName)throw new Error(`Unable to render ${e}. Have you included a renderer function?`);s=e}s&&t.appendChild(s)}function createCustomElement(e,t){const s=function(e){if(!e)return[];const t=[];return Object.keys(e).forEach((s=>{(null==e[s].observed||e[s].observed)&&t.push(toKebabCase(s))})),t}(t.props);globalThis.customElements.get(e)||globalThis.customElements.define(e,class extends globalThis.HTMLElement{static get observedAttributes(){return s}get componentTagName(){return e}connectedCallback(){null==this.connectedCallbackCount&&(this.connectedCallbackCount=0),this.connectedCallbackCount=this.connectedCallbackCount+1,this._checkInit(),this._preprocess()}disconnectedCallback(){"function"==typeof this.removed&&(this.removed(),this.isRemovedCalled=!0)}attributeChangedCallback(){null!=this.connectedCallbackCount&&(this._checkInit(),this._preprocess())}get initialised(){return this._props&&this._computed&&this.templateRenderer}_checkInit(){this.initialised||this._init(t)}_init(e){this._props=e.props||{},this._computed=e.computed||{},this.computedCache={},this.status="render",this.connectedCallbackCount=0,this.props=this._processProps(),this.root=this._processRoot(e.root),this.slots=this._processSlots(),this.render=e.render||null,this.templateRenderer=e.renderer||elementRenderer,this.template=null,this.created=e.created||null,this.mounted=e.mounted||null,this.updated=e.updated||null,this.removed=e.removed||null,this.isCreatedCalled=!1,this.isMountedCalled=!1,this.isRemovedCalled=!1,this.emit=(e,t)=>{!function(e,t,s={}){const o=Object.assign({},{bubbles:!0,cancelable:!0,composed:!1},s),n=globalThis.document.createEvent("CustomEvent");n.initCustomEvent(t,o.bubbles,o.cancelable,o.detail),Object.defineProperty(n,"composed",{value:o.composed}),e.dispatchEvent(n)}(this,e,{detail:t})},this._processMethodsAndComputedProps(e),this._processInstanceProps(this._props),"function"!=typeof this.created||this.isCreatedCalled||(this.created(),this.isCreatedCalled=!0)}_processProps(){const e={};return Object.keys(this._props).forEach((t=>{const s={},o=this._props[t],n=this._getAttribute(t);let r=null;if(null!=o.default&&(r=o.default),o.required&&null==n)null!=r?(console.info(`No biggie, the required prop '${t}' has no value set, so the default has been set`),s[t]=r):(s[t]=null,console.error(`The required prop '${t}' has no value set`));else switch(o.type){case String:default:s[t]=n||r;break;case Number:s[t]=null!=n?parseFloat(n):null!=r?r:0;break;case Boolean:s[t]=null!=n?"true"===n.toString():null!=r&&r;break;case Object:try{s[t]=null!=n?JSON.parse(n):null!=r?r:void 0}catch(e){s[t]=null!=r?r:void 0,console.error(`An object prop parse issue occurred with prop ${t} and value ${n}`)}}e[t]=s[t],this._instanceProps&&this._instanceProps[t]&&(e[t]=this._instanceProps[t])})),e}_processMethodsAndComputedProps(e){const t=this,s=Object.keys(e);s.length&&s.forEach((s=>{t[s]||"function"!=typeof e[s]||(t[s]=e[s].bind(t)),"computed"===s&&this._processComputed(e[s])}))}_processRoot(e){switch(e){case"standard":default:return this;case"shadow":return this.attachShadow({mode:"open"});case"shadow:closed":return this.attachShadow({mode:"closed"})}}_processComputed(e){const t=this,s=Object.keys(e);s.length&&s.forEach((s=>{t[s]?console.warn(`Computed property '${s}' already exists on the component instance`):Object.defineProperty(t,s,{get:()=>(t.computedCache[s]||(t.computedCache[s]=e[s].bind(t)()),t.computedCache[s])})}))}_processRender(){const e=this.render?this.render():void 0;e&&(this.template=e,this._updateRender())}_processSlots(){const e=this.childNodes,t={default:[]};return e.length>0&&[...e].forEach((e=>{const s=e.getAttribute?e.getAttribute("slot"):null;s?t[s]=e:t.default.push(e)})),t}_getAttribute(e){try{return this.getAttribute(toKebabCase(e))}catch(e){return console.error("A get prop error occurred",e),""}}_processInstanceProps(e){const t=this,s=Object.keys(e);e&&s.forEach((e=>{let s;t[e]&&(s=t[e],delete t[e]),Object.defineProperty(t,e,{get(){return this._instanceProps&&this._instanceProps[e]?this._instanceProps[e]:this.getAttribute(toKebabCase(e))},set(t){return this._instanceProps||(this._instanceProps={}),this._instanceProps[e]=t,this.setAttribute(toKebabCase(e),"object"==typeof t?JSON.stringify(t):t.toString()),!0},enumerable:!0}),s&&(t[e]=s)}))}_preprocess(){this.computedCache={},this.props=this._processProps(),this._processRender()}_updateRender(){var e;this.template&&("object"!=typeof(e=this.template)&&"function"!=typeof e||"function"!=typeof e.then?(this.templateRenderer(this.template,this.root),this._callLifecycleMethods()):this.template.then((e=>{this.templateRenderer(e,this.root),this._callLifecycleMethods()})).catch((e=>console.error("A component render error occurred",e))))}_callLifecycleMethods(){"function"!=typeof this.mounted||this.isMountedCalled||this.mounted(),this.isMountedCalled=!0,"function"==typeof this.updated&&this.isMountedCalled&&this.updated()}})}function createComponent(e,t){createCustomElement(e,function(e){return{...e,created(){if(e.state&&"function"!=typeof e.state)throw new Error("State must be a function!");this._state=e.state||{},"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this.setState=(e,t)=>{const setter=e=>{if(!e||"object"!=typeof e)return;const s=this.updated;t&&(this.updated=()=>{t(),this.updated=s||void 0}),this.status="transaction";for(const t in e)this.state[t]&&this.state[t]===e[t]||(this.state[t]=e[t]);this.status="render",this._processRender()},s=e(this.state);var o;"object"!=typeof(o=s)&&"function"!=typeof o||"function"!=typeof o.then?setter(s):s.then(setter)},e.created&&e.created.call(this)},_monitorState(e){const t=this;return new Proxy(e,{set:(e,s,o)=>(e[s]===o||(e[s]=o,t.computedCache={},"render"===t.status&&t._processRender()),!0)})}}}(t))}function use(e,{renderer:t,...s}){if(e.create&&"function"==typeof e.create)return e.create({createComponent:createComponent,renderer:t,...s,use:use})}export{createComponent,use};
