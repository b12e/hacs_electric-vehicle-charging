function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",v=u.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??$)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,O=document,M=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,R="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,z=/>/g,V=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),q=new WeakMap,F=O.createTreeWalker(O,129);function G(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===H?"!--"===c[1]?r=T:void 0!==c[1]?r=z:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=V):void 0!==c[3]&&(r=V):r===V?">"===c[0]?(r=n??H,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?V:'"'===c[3]?j:D):r===j||r===D?r=V:r===T||r===z?r=H:(r=V,n=void 0);const d=r===V&&t[e+1].startsWith("/>")?" ":"";o+=r===H?i+k:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),F.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===W)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);F.currentNode=s;let n=F.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=F.nextNode(),o++)}return F.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),U(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Y(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Y(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),o||=!U(a)||a!==this._$AH[r],a===I?t=I:t!==I&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??I)===W)return;const i=this._$AH,s=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==I&&(i===I||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(K,Q),(w.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;class rt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.1");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},ht=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return dt({...t,state:!0,attribute:!1})}var gt,ut;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(gt||(gt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={}));let ft=class extends rt{setConfig(t){this._config=t}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue,s=void 0!==e.checked?e.checked:e.value;if(this._config[i]===s)return;const n={...this._config};i&&(""===s||void 0===s?delete n[i]:n[i]=s),function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});n.detail=i,t.dispatchEvent(n)}(this,"config-changed",{config:n})}_entitiesByDomain(t){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith(`${t}.`)).sort():[]}render(){return this.hass&&this._config?(this._entitiesByDomain("sensor"),L`
      <div class="card-config">
        <div class="header">
          <div class="title">Electric Vehicle Charging Card Configuration</div>
          <div class="subtitle">Configure your EV charging display</div>
        </div>

        <div class="section">
          <div class="section-title">Required Settings</div>

          <ha-entity-picker
            .label=${"Battery Entity (Required)"}
            .hass=${this.hass}
            .value=${this._config.battery_entity||""}
            .configValue=${"battery_entity"}
            @value-changed=${this._valueChanged}
            .includeDomains=${["sensor"]}
            allow-custom-entity
          ></ha-entity-picker>

          <paper-input
            label="Maximum Capacity (kWh)"
            .value=${this._config.max_capacity||""}
            .configValue=${"max_capacity"}
            type="number"
            step="0.1"
            min="0"
            @value-changed=${this._valueChanged}
          ></paper-input>
          <div class="help-text">
            Enter your battery's maximum capacity in kWh (e.g., 17.4 for a 17.4 kWh battery)
          </div>
        </div>

        <div class="section">
          <div class="section-title">Display Options</div>

          <paper-input
            label="Card Name (Optional)"
            .value=${this._config.name||""}
            .configValue=${"name"}
            @value-changed=${this._valueChanged}
          ></paper-input>

          <ha-formfield label="Show Card Name">
            <ha-switch
              .checked=${!1!==this._config.show_name}
              .configValue=${"show_name"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Metrics Panel">
            <ha-switch
              .checked=${!1!==this._config.show_metrics}
              .configValue=${"show_metrics"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Compact Mode">
            <ha-switch
              .checked=${!0===this._config.compact}
              .configValue=${"compact"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="section">
          <div class="section-title">Charging Metrics (Optional)</div>
          <div class="help-text">
            Add these entities to display real-time charging information and enable animations
          </div>

          <ha-entity-picker
            .label=${"Power Entity (Watts)"}
            .hass=${this.hass}
            .value=${this._config.power_entity||""}
            .configValue=${"power_entity"}
            @value-changed=${this._valueChanged}
            .includeDomains=${["sensor"]}
            allow-custom-entity
          ></ha-entity-picker>

          <ha-entity-picker
            .label=${"Voltage Entity (Optional)"}
            .hass=${this.hass}
            .value=${this._config.voltage_entity||""}
            .configValue=${"voltage_entity"}
            @value-changed=${this._valueChanged}
            .includeDomains=${["sensor"]}
            allow-custom-entity
          ></ha-entity-picker>

          <ha-entity-picker
            .label=${"Current/Amperage Entity (Optional)"}
            .hass=${this.hass}
            .value=${this._config.amperage_entity||""}
            .configValue=${"amperage_entity"}
            @value-changed=${this._valueChanged}
            .includeDomains=${["sensor"]}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <div class="tips">
          <div class="tips-title">💡 Tips</div>
          <ul>
            <li>The battery entity should report in kWh</li>
            <li>Power entity enables the animated charging indicator</li>
            <li>Animation speed changes based on charging power</li>
            <li>All metric entities are optional but recommended for full functionality</li>
          </ul>
        </div>
      </div>
    `):L``}static get styles(){return r`
      :host {
        display: block;
      }

      .card-config {
        padding: 16px;
      }

      .header {
        margin-bottom: 24px;
      }

      .title {
        font-size: 20px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .section {
        margin-bottom: 24px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .section-title {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 16px;
      }

      .help-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 8px;
        margin-bottom: 16px;
        font-style: italic;
      }

      ha-entity-picker,
      paper-input {
        display: block;
        margin-bottom: 16px;
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        padding: 8px 0;
      }

      ha-switch {
        margin-left: auto;
      }

      .tips {
        padding: 16px;
        background: var(--info-color, #2196f3);
        background: color-mix(in srgb, var(--info-color, #2196f3) 10%, transparent);
        border-radius: 8px;
        border-left: 4px solid var(--info-color, #2196f3);
      }

      .tips-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .tips ul {
        margin: 0;
        padding-left: 20px;
        color: var(--secondary-text-color);
        font-size: 13px;
      }

      .tips li {
        margin-bottom: 4px;
      }
    `}};t([dt({attribute:!1})],ft.prototype,"hass",void 0),t([pt()],ft.prototype,"_config",void 0),ft=t([ct("ev-charging-card-editor")],ft);let mt=class extends rt{static getStubConfig(){return{type:"custom:ev-charging-card",battery_entity:"",max_capacity:17.4,show_name:!0,show_metrics:!0,compact:!1}}setConfig(t){if(!t.battery_entity)throw new Error("You need to define a battery_entity");if(!t.max_capacity||t.max_capacity<=0)throw new Error("You need to define a valid max_capacity (greater than 0)");this.config={show_name:!0,show_metrics:!0,compact:!1,...t}}shouldUpdate(t){if(!this.config)return!1;if(t.has("config"))return!0;const e=t.get("hass");if(!e)return!0;return[this.config.battery_entity,this.config.power_entity,this.config.voltage_entity,this.config.amperage_entity].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}getEntityState(t){return t&&this.hass&&this.hass.states[t]||null}getNumericValue(t){const e=this.getEntityState(t);if(!e)return 0;const i=parseFloat(e.state);return isNaN(i)?0:i}isCharging(){return this.getNumericValue(this.config.power_entity)>0}getChargingSpeed(){const t=this.getNumericValue(this.config.power_entity);return 0===t||t<3e3?"slow":t<7e3?"medium":"fast"}render(){if(!this.hass||!this.config)return L``;if(!this.getEntityState(this.config.battery_entity))return L`
        <ha-card>
          <div class="card-content error">
            <p>Entity not found: ${this.config.battery_entity}</p>
          </div>
        </ha-card>
      `;const t=this.getNumericValue(this.config.battery_entity),e=this.config.max_capacity,i=Math.min(100,Math.max(0,t/e*100)),s=this.getNumericValue(this.config.power_entity),n=this.getNumericValue(this.config.voltage_entity),o=this.getNumericValue(this.config.amperage_entity),r=this.getEntityState(this.config.power_entity),a=this.getEntityState(this.config.voltage_entity),c=this.getEntityState(this.config.amperage_entity),l=this.isCharging(),h=this.getChargingSpeed();return L`
      <ha-card class="${this.config.compact?"compact":""}">
        <div class="card-content">
          ${this.config.show_name&&this.config.name?L`<div class="card-header">
                <div class="name">${this.config.name}</div>
              </div>`:""}

          <div class="main-section">
            <div class="icon-container">
              <div class="battery-icon ${l?"charging":""}">
                ${l?L`<div class="charging-bolt ${h}">⚡</div>`:L`<div class="battery-static">🔋</div>`}
              </div>
            </div>

            <div class="content-section">
              <div class="primary-info">
                <div class="percentage">${i.toFixed(0)}%</div>
                <div class="capacity">
                  ${t.toFixed(1)} / ${e.toFixed(1)} kWh
                </div>
              </div>

              <div class="progress-bar-container">
                <div class="progress-bar">
                  <div
                    class="progress-fill ${l?"charging":""}"
                    style="width: ${i}%"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          ${this.config.show_metrics&&(this.config.power_entity||this.config.voltage_entity||this.config.amperage_entity)?L`
                <div class="metrics-section">
                  ${this.config.power_entity?L`
                        <div class="metric-item">
                          <div class="metric-icon">⚡</div>
                          <div class="metric-info">
                            <div class="metric-label">Power</div>
                            <div class="metric-value">
                              ${s.toFixed(0)}
                              ${r?.attributes?.unit_of_measurement||"W"}
                            </div>
                          </div>
                        </div>
                      `:""}
                  ${this.config.voltage_entity?L`
                        <div class="metric-item">
                          <div class="metric-icon">🔌</div>
                          <div class="metric-info">
                            <div class="metric-label">Voltage</div>
                            <div class="metric-value">
                              ${n.toFixed(1)}
                              ${a?.attributes?.unit_of_measurement||"V"}
                            </div>
                          </div>
                        </div>
                      `:""}
                  ${this.config.amperage_entity?L`
                        <div class="metric-item">
                          <div class="metric-icon">🔆</div>
                          <div class="metric-info">
                            <div class="metric-label">Current</div>
                            <div class="metric-value">
                              ${o.toFixed(1)}
                              ${c?.attributes?.unit_of_measurement||"A"}
                            </div>
                          </div>
                        </div>
                      `:""}
                </div>
              `:""}
        </div>
      </ha-card>
    `}static get styles(){return r`
      :host {
        display: block;
      }

      ha-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 12px;
      }

      ha-card.compact {
        padding: 8px 12px;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex: 1;
      }

      .error {
        color: var(--error-color);
        padding: 12px;
      }

      /* Header Section */
      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }

      .name {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
        line-height: 1.2;
      }

      /* Main Section - Horizontal Layout (Mushroom Style) */
      .main-section {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      /* Icon Container - Left Side */
      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 42px;
        height: 42px;
      }

      .battery-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: color-mix(in srgb, var(--state-icon-color, var(--state-inactive-color)) 10%, transparent);
        transition: background 0.3s ease;
      }

      .battery-icon.charging {
        background: color-mix(in srgb, var(--state-icon-active-color, var(--state-active-color)) 20%, transparent);
      }

      .charging-bolt,
      .battery-static {
        font-size: 28px;
        line-height: 1;
      }

      .charging-bolt {
        animation: pulse 1s ease-in-out infinite;
      }

      .charging-bolt.slow {
        animation-duration: 2s;
      }

      .charging-bolt.medium {
        animation-duration: 1s;
      }

      .charging-bolt.fast {
        animation-duration: 0.5s;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.15);
        }
      }

      /* Content Section - Right Side */
      .content-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
        min-width: 0;
      }

      .primary-info {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-wrap: wrap;
      }

      .percentage {
        font-size: 22px;
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1;
      }

      .capacity {
        font-size: 14px;
        font-weight: 400;
        color: var(--secondary-text-color);
        line-height: 1;
      }

      /* Progress Bar */
      .progress-bar-container {
        width: 100%;
      }

      .progress-bar {
        position: relative;
        width: 100%;
        height: 4px;
        background: color-mix(in srgb, var(--state-icon-color, var(--state-inactive-color)) 20%, transparent);
        border-radius: 2px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: var(--state-icon-color, var(--state-inactive-color));
        border-radius: 2px;
        transition: width 0.5s ease-in-out;
      }

      .progress-fill.charging {
        background: var(--state-icon-active-color, var(--state-active-color));
      }

      /* Metrics Section */
      .metrics-section {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 4px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color);
      }

      .metric-item {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
        padding: 8px;
        background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
        border-radius: 12px;
      }

      .metric-icon {
        font-size: 20px;
        opacity: 0.7;
        flex-shrink: 0;
      }

      .metric-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }

      .metric-label {
        font-size: 11px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1;
      }

      .metric-value {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Responsive Design */
      @media (max-width: 600px) {
        .metrics-section {
          flex-direction: column;
        }

        .metric-item {
          flex: none;
          width: 100%;
        }
      }

      /* Compact Mode */
      ha-card.compact .main-section {
        gap: 12px;
      }

      ha-card.compact .icon-container {
        width: 36px;
        height: 36px;
      }

      ha-card.compact .charging-bolt,
      ha-card.compact .battery-static {
        font-size: 24px;
      }

      ha-card.compact .percentage {
        font-size: 18px;
      }

      ha-card.compact .capacity {
        font-size: 12px;
      }
    `}getCardSize(){return 3}static getConfigElement(){return document.createElement("ev-charging-card-editor")}};t([dt({attribute:!1})],mt.prototype,"hass",void 0),t([pt()],mt.prototype,"config",void 0),mt=t([ct("ev-charging-card")],mt),window.customCards=window.customCards||[],window.customCards.push({type:"ev-charging-card",name:"EV Charging Card",description:"Display electric vehicle charging progress with real-time metrics"}),console.info("%c EV-CHARGING-CARD %c Version 1.0.0 ","color: white; background: #4caf50; font-weight: 700;","color: #4caf50; background: white; font-weight: 700;");export{mt as EVChargingCard};
//# sourceMappingURL=ev-charging-card.js.map
