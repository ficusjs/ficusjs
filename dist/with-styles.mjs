function withStyles(t){return{...t,created(){t.styles&&"function"==typeof t.styles&&(globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.styles=globalThis.__ficusjs__.styles||{},this._injectStyles(t.styles())),t.created&&t.created.call(this)},_isStyleSheet:t=>"object"==typeof t&&t.tagName&&"style"===t.tagName.toLowerCase(),async _injectStyles(t){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.styles&&globalThis.__ficusjs__.styles[this.componentTagName])return;if(globalThis.__ficusjs__.styles[this.componentTagName]={loaded:!1},Array.isArray(t)&&t.filter((t=>"string"!=typeof t&&!this._isStyleSheet(t))).length||!Array.isArray(t)&&"string"!=typeof t&&!this._isStyleSheet(t))return void console.error("Dude, styles must return a CSS string or an array of CSS strings!");let e;e=Array.isArray(t)?await Promise.all(t.map((t=>this._processStyle(t,this.componentTagName)))):await this._processStyle(t,this.componentTagName),globalThis.__ficusjs__.styles[this.componentTagName].styles=e,globalThis.__ficusjs__.styles[this.componentTagName].loaded=!0,this.areStylesInjected=!0},_injectStylesheet(t){document.getElementsByTagName("head")[0].appendChild(t)},async _processStyle(t,e){if(this._isStyleSheet(t))return t.setAttribute("data-tag",e),this._injectStylesheet(t),t;if(/http[s]?:\/\/.+\.css$/.test(t)){const s=document.createElement("link");return s.rel="stylesheet",s.type="text/css",s.href=t,s.setAttribute("data-tag",e),document.head.appendChild(s),s}return/.+\.css$/.test(t)?globalThis.fetch(t).then((t=>t.text())).then((t=>this._createAndInjectStylesheet(t,{"data-tag":e}))):this._createAndInjectStylesheet(t,{"data-tag":e})},_createAndInjectStylesheet(t,e){const s=this._createStyle(t);return this._setElementAttributes(s,e),this._injectStylesheet(s),s},_createStyle(t){const e=document.createElement("style");return e.appendChild(document.createTextNode(t)),e},_setElementAttributes(t,e){e&&Object.keys(e).forEach((s=>{t.setAttribute(s,e[s])}))}}}export{withStyles};
