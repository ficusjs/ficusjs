function withStore(s,e){return{...e,created(){this._subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(s),e.created&&e.created.call(this)},mounted(){this._subscribeToStores(!1),e.mounted&&e.mounted.call(this)},updated(){this._subscribeToStores(!1),e.updated&&e.updated.call(this)},removed(){this._unsubscribeFromStores(),e.removed&&e.removed.call(this)},setStore(s){this.store=s,this._subscribeToStores()},_subscribeToStores(s=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this._subscribeCallback),s&&this._subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((s=>{this.store[s]&&this.store[s].subscribe&&"function"==typeof this.store[s].subscribe&&!this.unsubscribe[s]&&(this.unsubscribe[s]=this.store[s].subscribe(this._subscribeCallback))})),s&&this._subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((s=>{this.unsubscribe[s]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}export{withStore};
