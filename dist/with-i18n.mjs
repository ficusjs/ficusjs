function withI18n(t,e){return{...e,created(){this.setI18n(t),e.created&&e.created.call(this)},setI18n(t){const e=this;e._i18n=t,e.i18n={t:(t,n,i)=>e._i18n.t(t,n,i),getLocale:()=>e._i18n.getLocale()}}}}export{withI18n};
