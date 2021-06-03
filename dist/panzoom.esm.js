// @fancyapps/ui/Panzoom v4.0.0-beta.1
const t=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),i=(...e)=>{let s=!1;"boolean"==typeof e[0]&&(s=e.shift());let n=e[0];if(!n||"object"!=typeof n)throw new Error("extendee must be an object");const o=e.slice(1),r=o.length;for(let e=0;e<r;e++){const r=o[e];for(let e in r)if(r.hasOwnProperty(e)){const o=r[e];if(s&&(Array.isArray(o)||t(o))){const t=Array.isArray(o)?[]:{};n[e]=i(!0,n.hasOwnProperty(e)?n[e]:t,o)}else n[e]=o}}return n},e=(t,i=1e3)=>(t=parseFloat(t)||0,Math.round((t+Number.EPSILON)*i)/i),s="undefined"!=typeof window&&window.ResizeObserver||class{constructor(t){this.observables=[],this.boundCheck=this.check.bind(this),this.boundCheck(),this.callback=t}observe(t){if(this.observables.some((i=>i.el===t)))return;const i={el:t,size:{height:t.clientHeight,width:t.clientWidth}};this.observables.push(i)}unobserve(t){this.observables=this.observables.filter((i=>i.el!==t))}disconnect(){this.observables=[]}check(){const t=this.observables.filter((t=>{const i=t.el.clientHeight,e=t.el.clientWidth;if(t.size.height!==i||t.size.width!==e)return t.size.height=i,t.size.width=e,!0})).map((t=>t.el));t.length>0&&this.callback(t),window.requestAnimationFrame(this.boundCheck)}},n=function(t){return!(!t||t.classList.contains("carousel__track")||t===document.body)&&(function(t){const i=window.getComputedStyle(t)["overflow-y"],e=window.getComputedStyle(t)["overflow-x"],s=("scroll"===i||"auto"===i)&&Math.abs(t.scrollHeight-t.clientHeight)>1,n=("scroll"===e||"auto"===e)&&Math.abs(t.scrollWidth-t.clientWidth)>1;return s||n}(t)?t:n(t.parentNode))},o=t=>{let i=0;return t&&(i=t instanceof SVGElement?Math.min(t.getClientRects()[0].width,t.width.baseVal.value):Math.max(t.offsetWidth,t.scrollWidth)),i},r=t=>{let i=0;return t&&(i=t instanceof SVGElement?Math.min(t.getClientRects()[0].height,t.height.baseVal.value):Math.max(t.offsetHeight,t.scrollHeight)),i};const h={panOnlyZoomed:!1,lockAxis:!1,friction:.72,decelFriction:.92,zoomFriction:.72,bounceForce:.1,baseScale:1,minScale:1,maxScale:2,step:.5,zoomInCentered:!0,pinchToZoom:!0,textSelection:!0,click:"toggleZoom",clickDelay:250,doubleClick:!1,wheel:"zoom",wheelFactor:30,wheelLimit:3,touch:!0,draggableClass:"is-draggable",draggingClass:"is-dragging"};class c extends class{constructor(t={}){this.options=i(!0,{},t),this.plugins=[],this.events={};for(const t of["on","once"])for(const i of Object.entries(this.options[t]||{}))this[t](...i)}option(t,i){t=String(t);let e=(s=t,n=this.options,s.split(".").reduce((function(t,i){return t[i]}),n));var s,n;return"function"==typeof e&&(e=e.call(this,t)),void 0===e?i:e}localize(t,i=[]){return String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,s)=>{let n=!1;if(n=s?this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${s}`):this.option(`l10n.${e}`),!n)return e;for(let t=0;t<i.length;t++)n=n.split(i[t][0]).join(i[t][1]);return n}))}on(i,e){if(t(i)){for(const t of Object.entries(i))this.on(...t);return this}return String(i).split(" ").forEach((t=>{const i=this.events[t]=this.events[t]||[];-1==i.indexOf(e)&&i.push(e)})),this}once(i,e){if(t(i)){for(const t of Object.entries(i))this.once(...t);return this}return String(i).split(" ").forEach((t=>{const i=(...s)=>{this.off(t,i),e.call(this,this,...s)};i._=e,this.on(t,i)})),this}off(i,e){if(!t(i))return i.split(" ").forEach((t=>{const i=this.events[t];if(!i||!i.length)return this;let s=-1;for(let t=0,n=i.length;t<n;t++){const n=i[t];if(n&&(n===e||n._===e)){s=t;break}}-1!=s&&i.splice(s,1)})),this;for(const t of Object.entries(i))this.off(...t)}trigger(t,...i){for(const e of[...this.events[t]||[]].slice())if(e&&!1===e.call(this,this,...i))return!1;for(const e of[...this.events["*"]||[]].slice())if(e&&!1===e.call(this,t,this,...i))return!1;return!0}attachPlugins(t){const e={};for(const[s,n]of Object.entries(t||{}))!1!==this.options[s]&&(this.options[s]=i({},n.defaults||{},this.options[s]),e[s]=new n(this));for(const[t,i]of Object.entries(e))i.attach(this);return this.plugins=Object.assign({},this.plugins,e),this}detachPlugins(){for(const t in this.plugins){let i;(i=this.plugins[t])&&"function"==typeof i.detach&&i.detach(this)}return this.plugins={},this}}{constructor(t,e={}){if(super(e=i(!0,{},h,e)),!(t instanceof HTMLElement))throw new Error("Viewport not found");this.state="init",this.$viewport=t;for(const t of["onPointerDown","onPointerMove","onPointerUp","onWheel","onClick"])this[t]=this[t].bind(this);if(this.$content=this.option("content"),this.$content||(this.$content=this.$viewport.querySelector(".panzoom__content")),!this.$content)throw new Error("Content not found");if(!1===this.option("textSelection")&&this.$viewport.classList.add("not-selectable"),this.resetValues(),this.attachPlugins(c.Plugins),this.trigger("init"),this.handleContent(),this.attachEvents(),this.trigger("ready"),"init"===this.state){const t=this.option("baseScale");1===t?(this.state="ready",this.handleCursor()):this.panTo({scale:t,friction:0})}}handleContent(){if(this.$content instanceof HTMLImageElement){const t=()=>{const t=this.$content.naturalWidth;this.maxScale=this.option("maxScale"),this.options.maxScale=function(){const i=this.contentDim.width;return t>0&&i>0?t/i*this.maxScale:this.maxScale},this.updateMetrics(),this.trigger(t>0?"load":"error")};!0!==this.$content.complete?(this.$content.onload=()=>t(),this.$content.onerror=()=>t()):t()}else this.updateMetrics()}resetValues(){this.viewportDim={top:0,left:0,width:0,height:0},this.contentDim={width:0,height:0},this.friction=this.option("friction"),this.current={x:0,y:0,scale:1},this.velocity={x:0,y:0,scale:0},this.pan={x:0,y:0,scale:1},this.drag={startTime:null,firstPosition:null,startPosition:null,startPoint:null,startDistance:null,endPosition:null,endPoint:null,distance:0,distanceX:0,distanceY:0,elapsedTime:0},this.lockAxis=null,this.pendingAnimateUpdate=null,this.pendingResizeUpdate=null,this.pointers=[]}updateMetrics(){let{top:t,left:i,width:e,height:s}=this.$viewport.getBoundingClientRect();const n=window.getComputedStyle(this.$viewport);e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),s-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom),this.viewportDim={top:t,left:i,width:e,height:s},this.contentDim={width:this.option("width",o(this.$content)),height:this.option("hidth",r(this.$content))},this.trigger("updateMetrics"),this.updateBounds()}updateBounds(t){const i={from:0,to:0},s={from:0,to:0};if(t||(t=this.velocity.scale?this.pan.scale:this.current.scale),t<1)return[i,s];const n=this.contentDim,o=this.viewportDim,r=n.width*t,h=n.height*t;return i.to=e(.5*(r-n.width)),n.width>o.width?i.from=e(i.to+o.width-r):i.from=e(-1*i.to),s.to=e(.5*(h-n.height)),n.height>o.height?s.from=e(s.to+o.height-h):s.from=e(-1*s.to),this.boundX=i,this.boundY=s,this.trigger("updateBounds",t),[this.boundX,this.boundY]}zoomIn(t){this.zoomTo(this.current.scale+(t||this.option("step")))}zoomOut(t){this.zoomTo(this.current.scale-(t||this.option("step")))}toggleZoom(t={}){const i=this.option("maxScale"),e=this.option("baseScale");this.zoomTo(this.current.scale>e+.5*(i-e)?e:i,t)}zoomTo(t,i={}){let{x:e=null,y:s=null,friction:n=this.option("zoomFriction")}=i;t||(t=this.option("baseScale")),t=Math.max(Math.min(t,this.option("maxScale")),this.option("minScale"));const o=this.contentDim.width,r=this.contentDim.height,h=o*this.current.scale,c=r*this.current.scale,a=o*t,l=r*t;null===e&&(e=.5*h),null===s&&(s=.5*c),!1===this.option("zoomInCentered")&&(e<.5*h&&(e=h),e>h&&(e=0),s<0&&(s=c),s>c&&(s=0));let d=(a-h)*((h>0?e/h:0)-.5),p=(l-c)*((c>0?s/c:0)-.5);Math.abs(d)<1&&(d=0),Math.abs(p)<1&&(p=0),e=this.current.x-d,s=this.current.y-p,this.panTo({x:e,y:s,scale:t,friction:n})}panTo(t){let{x:i=0,y:e=0,scale:s=this.current.scale,friction:n=this.option("friction"),ignoreBounds:o=!1}=t;if(n||this.stopMoving(),!0!==o){const[t,n]=this.updateBounds(s);t&&(i=Math.max(Math.min(i,t.to),t.from)),n&&(e=Math.max(Math.min(e,n.to),n.from))}return n>0&&(Math.abs(i-this.current.x)>.1||Math.abs(e-this.current.y)>.1||Math.abs(s-this.current.scale)>.1)?(this.state="panning",this.friction=n,this.pan={x:i,y:e,scale:s},this.velocity={x:(1/this.friction-1)*(i-this.current.x),y:(1/this.friction-1)*(e-this.current.y),scale:(1/this.friction-1)*(s-this.current.scale)},this.animate(),this):(this.pendingAnimateUpdate&&(cancelAnimationFrame(this.pendingAnimateUpdate),this.pendingAnimateUpdate=null),this.state="ready",this.stopMoving(),this.current={x:i,y:e,scale:s},this.transform(),this.handleCursor(),this.trigger("afterAnimate",!0),this)}animate(){if(!this.pendingAnimateUpdate){if(this.applyBoundForce(),this.applyDragForce(),this.velocity.x*=this.friction,this.velocity.y*=this.friction,this.velocity.scale*=this.friction,this.current.x+=this.velocity.x,this.current.y+=this.velocity.y,this.current.scale+=this.velocity.scale,"dragging"==this.state||"pointerdown"==this.state||Math.abs(this.velocity.x)>.05||Math.abs(this.velocity.y)>.05||Math.abs(this.velocity.scale)>.05)return this.transform(),void(this.pendingAnimateUpdate=requestAnimationFrame((()=>{this.pendingAnimateUpdate=null,this.animate()})));this.current.x=e(this.current.x+this.velocity.x/(1/this.friction-1)),this.current.y=e(this.current.y+this.velocity.y/(1/this.friction-1)),Math.abs(this.current.x)<.5&&(this.current.x=0),Math.abs(this.current.y)<.5&&(this.current.y=0),this.current.scale=e(this.current.scale+this.velocity.scale/(1/this.friction-1),1e4),Math.abs(this.current.scale-1)<.01&&(this.current.scale=1),this.state="ready",this.stopMoving(),this.transform(),this.handleCursor(),this.trigger("afterAnimate")}}handleCursor(){const t=this.option("draggableClass");t&&this.option("touch")&&(this.contentDim.width<=this.viewportDim.width&&1==this.option("panOnlyZoomed")&&this.current.scale<=this.option("baseScale")?this.$viewport.classList.remove(t):this.$viewport.classList.add(t))}isMoved(){return 0!==this.current.x||0!==this.current.y||1!==this.current.scale||this.velocity.x>0||this.velocity.y>0||this.velocity.scale>0}stopMoving(){this.velocity={x:0,y:0,scale:0}}transform(){this.trigger("beforeTransform");const t=e(this.current.x,100),i=e(this.current.y,100),s=e(this.current.scale,1e5);Math.abs(t)<=.1&&Math.abs(i)<=.1&&Math.abs(s-1)<=.1?this.$content.style.transform="":this.$content.style.transform=`translate3d(${t}px, ${i}px, 0px) scale(${s})`,this.trigger("afterTransform")}applyBoundForce(){if("decel"!==this.state)return;const t={x:0,y:0},i=this.option("bounceForce"),e=this.boundX,s=this.boundY;let n,o,r,h;if(e&&(n=this.current.x<e.from,o=this.current.x>e.to),s&&(r=this.current.y<s.from,h=this.current.y>s.to),n||o){const s=(n?e.from:e.to)-this.current.x;let r=s*i;const h=this.current.x+(this.velocity.x+r)/(1/this.friction-1);n&&h<e.from||o&&h>e.to||(r=s*i-this.velocity.x),t.x=r}if(r||h){const e=(r?s.from:s.to)-this.current.y;let n=e*i;const o=this.current.y+(this.velocity.y+n)/(1/this.friction-1);r&&o<s.from||h&&o>s.to||(n=e*i-this.velocity.y),t.y=n}this.velocity.x+=t.x,this.velocity.y+=t.y}applyDragForce(){"dragging"===this.state&&(this.velocity={x:(1/this.friction-1)*(this.drag.endPosition.x-this.current.x),y:(1/this.friction-1)*(this.drag.endPosition.y-this.current.y),scale:(1/this.friction-1)*(this.drag.endPosition.scale-this.current.scale)})}attachEvents(){const t=this.$viewport;this.resizeObserver=this.resizeObserver||new s((t=>{this.pendingResizeUpdate=this.pendingResizeUpdate||setTimeout((()=>{this.pendingResizeUpdate=null;let i=t&&t[0].contentRect;!i&&this.$viewport&&(i=this.$viewport.getBoundingClientRect()),i&&(Math.abs(i.width-this.viewportDim.width)>1||Math.abs(i.height-this.viewportDim.height)>1)&&this.updateMetrics()}),50)})),this.resizeObserver.observe(t),t.addEventListener("click",this.onClick,{passive:!1}),t.addEventListener("wheel",this.onWheel,{passive:!1}),this.option("touch")&&(window.PointerEvent?(t.addEventListener("pointerdown",this.onPointerDown,{passive:!1}),t.addEventListener("pointermove",this.onPointerMove,{passive:!1}),t.addEventListener("pointerup",this.onPointerUp),t.addEventListener("pointercancel",this.onPointerUp)):(t.addEventListener("touchstart",this.onPointerDown,{passive:!1}),t.addEventListener("touchmove",this.onPointerMove,{passive:!1}),t.addEventListener("touchend",this.onPointerUp),t.addEventListener("touchcancel",this.onPointerUp),t.addEventListener("mousedown",this.onPointerDown)))}detachEvents(){this.resizeObserver&&this.resizeObserver.disconnect(),this.resizeObserver=null,this.pendingResizeUpdate&&(clearTimeout(this.pendingResizeUpdate),this.pendingResizeUpdate=null);const t=this.$viewport;window.PointerEvent?(t.removeEventListener("pointerdown",this.onPointerDown,{passive:!1}),t.removeEventListener("pointermove",this.onPointerMove,{passive:!1}),t.removeEventListener("pointerup",this.onPointerUp),t.removeEventListener("pointercancel",this.onPointerUp)):(t.removeEventListener("touchstart",this.onPointerDown,{passive:!1}),t.removeEventListener("touchmove",this.onPointerMove,{passive:!1}),t.removeEventListener("touchend",this.onPointerUp),t.removeEventListener("touchcancel",this.onPointerUp),t.removeEventListener("mousedown",this.onPointerDown)),t.removeEventListener("click",this.onClick,{passive:!1}),t.removeEventListener("wheel",this.onWheel,{passive:!1})}copyPointer(t){return{pointerId:t.pointerId,clientX:t.clientX,clientY:t.clientY}}findPointerIndex(t){let i=this.pointers.length;for(;i--;)if(this.pointers[i].pointerId===t.pointerId)return i;return-1}addPointer(t){let i=0;if(t.touches&&t.touches.length)for(const e of t.touches)e.pointerId=i++,this.addPointer(e);else i=this.findPointerIndex(t),i>-1&&this.pointers.splice(i,1),this.pointers.push(t)}removePointer(t){if(t.touches){for(;this.pointers.length;)this.pointers.pop();return}const i=this.findPointerIndex(t);i>-1&&this.pointers.splice(i,1)}getMiddlePoint(){let t=[...this.pointers];t=t.sort(((t,i)=>i.pointerId-t.pointerId));const i=t.shift(),e=t.shift();return e?{clientX:.5*(i.clientX-e.clientX)+e.clientX,clientY:.5*(i.clientY-e.clientY)+e.clientY}:{clientX:i?i.clientX:0,clientY:i?i.clientY:0}}getDistance(t,i){if(!(t=(t=t||[...this.pointers]).slice())||t.length<2)return 0;const e=(t=t.sort(((t,i)=>i.pointerId-t.pointerId))).shift(),s=t.shift(),n=Math.abs(s.clientX-e.clientX);if("x"===i)return n;const o=Math.abs(s.clientY-e.clientY);return"y"===i?o:Math.sqrt(Math.pow(n,2)+Math.pow(o,2))}resetDragState(){const{left:t,top:e}=this.$content.getClientRects()[0],s=this.getMiddlePoint(),n={top:e,left:t,x:this.current.x,y:this.current.y,scale:this.current.scale};i(this.drag,{startPosition:i({},n),startPoint:i({},s),startDistance:this.getDistance(),endPosition:i({},n),endPoint:i({},s),distance:0,distanceX:0,distanceY:0}),"pointerdown"===this.state&&(this.lockAxis=null,this.drag.startTime=new Date,this.drag.firstPosition=Object.assign({},n)),this.stopMoving(),this.friction=this.option("friction")}onPointerDown(t){if(t&&!(t.button&&t.button>0))if(this.option("panOnlyZoomed")&&this.velocity.scale)t.preventDefault();else{if(this.resetDragState(),!this.pointers.length){if(-1!==["BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(t.target.nodeName))return;if(this.option("textSelection")&&((t,i,e)=>{const s=t.childNodes,n=document.createRange();for(let t=0;t<s.length;t++){const o=s[t];if(o.nodeType!==Node.TEXT_NODE)continue;n.selectNodeContents(o);const r=n.getBoundingClientRect();if(i>=r.left&&e>=r.top&&i<=r.right&&e<=r.bottom)return o}return!1})(t.target,t.clientX,t.clientY))return;if(n(t.target))return}if((()=>{const t=window.getSelection?window.getSelection():document.selection;t&&t.rangeCount&&t.getRangeAt(0).getClientRects().length&&(t.removeAllRanges?t.removeAllRanges():t.empty&&t.empty())})(),this.pointers.length>1||this.pointers.length&&this.lockAxis)t.preventDefault();else if(!1!==this.trigger("touchStart",t))if(t.preventDefault(),this.state="pointerdown",this.addPointer(this.copyPointer(t)),this.resetDragState(),window.PointerEvent)try{t.target.setPointerCapture(t.pointerId)}catch(t){}else document.addEventListener("mousemove",this.onPointerMove,{passive:!1}),document.addEventListener("mouseup",this.onPointerUp,{passive:!1})}}onPointerMove(t){if(t.targetTouches&&t.targetTouches.length>1)return;if("pointerdown"!==this.state&&"dragging"!==this.state)return;if(0==this.trigger("touchMove",t))return void t.preventDefault();if(this.addPointer(this.copyPointer(t)),this.pointers.length>1&&!1===this.option("pinchToZoom"))return;if(1==this.option("panOnlyZoomed")&&this.current.scale===this.option("baseScale")&&this.pointers.length<2)return void t.preventDefault();const i=this.getMiddlePoint(),e=[i,this.drag.startPoint];this.drag.distance=this.getDistance(e);const s=this.events.click&&this.events.click.length||this.events.doubleClick&&this.events.doubleClick.length||this.option.click||this.option.doubleClick;if(this.drag.distance<6&&(s||this.option("lockAxis")&&!this.lockAxis))return;if("pointerdown"==this.state&&(this.state="dragging"),"dragging"!==this.state)return;const n=this.option("lockAxis");if(!this.lockAxis&&n)if("xy"===n){const t=this.getDistance(e,"x"),i=this.getDistance(e,"y"),s=Math.abs(180*Math.atan2(i,t)/Math.PI);this.lockAxis=s>45&&s<135?"y":"x"}else this.lockAxis=n;t.preventDefault(),t.stopPropagation(),this.$viewport.classList.add(this.option("draggingClass")),this.animate();let o=this.current.scale,r=0,h=0;if(this.current.scale===this.option("baseScale")&&"y"===this.lockAxis||(r=i.clientX-this.drag.startPoint.clientX),this.current.scale===this.option("baseScale")&&"x"===this.lockAxis||(h=i.clientY-this.drag.startPoint.clientY),this.drag.endPosition.x=this.drag.startPosition.x+r,this.drag.endPosition.y=this.drag.startPosition.y+h,this.pointers.length>1){this.drag.middlePoint=i,o=this.drag.startPosition.scale*this.getDistance()/this.drag.startDistance,o=Math.max(Math.min(o,2*this.option("maxScale")),.5*this.option("minScale"));const t=this.$content.width,e=this.$content.height,s=t*this.drag.startPosition.scale,n=e*this.drag.startPosition.scale,r=e*o,h=(t*o-s)*((this.drag.startPoint.clientX-this.drag.startPosition.left)/s-.5),c=(r-n)*((this.drag.startPoint.clientY-this.drag.startPosition.top)/n-.5);this.drag.endPosition.x-=h,this.drag.endPosition.y-=c,this.drag.endPosition.scale=o,this.updateBounds(o)}this.applyDragResistance()}onPointerUp(t){if(this.removePointer(t),window.PointerEvent)try{t.target.releasePointerCapture(t.pointerId)}catch(t){}else document.removeEventListener("mousemove",this.onPointerMove,{passive:!1}),document.removeEventListener("mouseup",this.onPointerUp,{passive:!1});if(this.pointers.length>0)return t.preventDefault(),void this.resetDragState();if("pointerdown"!==this.state&&"dragging"!==this.state)return;this.$viewport.classList.remove(this.option("draggingClass"));const{top:e,left:s}=this.$content.getClientRects()[0],n=this.drag;if(i(!0,n,{elapsedTime:new Date-n.startTime,distanceX:n.endPosition.x-n.firstPosition.x,distanceY:n.endPosition.y-n.firstPosition.y,endPosition:{top:e,left:s}}),n.distance=Math.sqrt(Math.pow(n.distanceX,2)+Math.pow(n.distanceY,2)),this.state="decel",this.friction=this.option("decelFriction"),this.pan={x:this.current.x+this.velocity.x/(1/this.friction-1),y:this.current.y+this.velocity.y/(1/this.friction-1),scale:this.current.scale+this.velocity.scale/(1/this.friction-1)},!1===this.trigger("touchEnd",t))return;if("decel"!==this.state)return;const o=this.option("minScale");if(this.current.scale<o)return void this.zoomTo(o,{friction:.64});const r=this.option("maxScale");if(this.current.scale-r>.01){const t={friction:.64};n.middlePoint&&(t.x=n.middlePoint.clientX-s,t.y=n.middlePoint.clientY-e),this.zoomTo(r,t)}}applyDragResistance(){const t=this.boundX,i=this.boundY;let e,s,n,o;if(t&&(e=this.drag.endPosition.x<t.from,s=this.drag.endPosition.x>t.to),i&&(n=this.drag.endPosition.y<i.from,o=this.drag.endPosition.y>i.to),e||s){const i=e?t.from:t.to,s=this.drag.endPosition.x-i;this.drag.endPosition.x=i+.3*s}if(n||o){const t=n?i.from:i.to,e=this.drag.endPosition.y-t;this.drag.endPosition.y=t+.3*e}}onWheel(t){!1!==this.trigger("wheel",t)&&"zoom"==this.option("wheel",t)&&this.zoomWithWheel(t)}zoomWithWheel(t){void 0===this.changedDelta&&(this.changedDelta=0);let i=this.current.scale;const e=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail));if(e<0&&i<=this.option("minScale")||e>0&&i>=this.option("maxScale")){if(this.changedDelta+=Math.abs(e),this.changedDelta>this.option("wheelLimit"))return}else this.changedDelta=0;i=i*(100+e*this.option("wheelFactor"))/100,t.preventDefault();const{top:s,left:n}=this.$content.getClientRects()[0],o=t.clientX-n,r=t.clientY-s;this.zoomTo(i,{x:o,y:r})}onClick(t){if(t.defaultPrevented)return;if(window.getSelection().toString().length)return t.stopPropagation(),void t.stopImmediatePropagation();if(this.drag.startPosition&&this.drag.endPosition&&(Math.abs(this.drag.endPosition.top-this.drag.startPosition.top)>1||Math.abs(this.drag.endPosition.left-this.drag.startPosition.left)>1))return t.stopPropagation(),void t.stopImmediatePropagation();if(this.drag.distance>(this.lockAxis?6:1))return t.preventDefault(),t.stopPropagation(),void t.stopImmediatePropagation();let i=null,e=null;void 0!==t.clientX&&void 0!==t.clientY&&(i=t.clientX-this.$content.getClientRects()[0].left,e=t.clientY-this.$content.getClientRects()[0].top);let s=this.options.doubleClick;if(!s&&this.events.doubleClick&&this.events.doubleClick.length&&(s=!0),s){if(!this.clickTimer)return this.lastClickEvent=t,void(this.clickTimer=setTimeout((()=>{this.clickTimer=null,!1!==this.trigger("click",t)&&"toggleZoom"===this.option("click")&&this.toggleZoom({x:i,y:e})}),this.option("clickDelay")));this.getDistance([t,this.lastClickEvent])>=6||(clearTimeout(this.clickTimer),this.clickTimer=null,!1!==this.trigger("doubleClick",t)&&"toggleZoom"===this.option("doubleClick")&&this.toggleZoom({x:i,y:e}))}else{if(!1===this.trigger("click",t))return;"toggleZoom"===this.option("click")&&this.toggleZoom({x:i,y:e})}}destroy(){"destroy"!==this.state&&(this.state="destroy",this.$viewport.classList.remove("not-selectable"),this.$content instanceof HTMLImageElement&&!this.$content.complete&&(this.$content.onload=null,this.$content.onerror=null),this.pendingAnimateUpdate&&(cancelAnimationFrame(this.pendingAnimateUpdate),this.pendingAnimateUpdate=null),this.clickTimer&&(clearTimeout(this.clickTimer),this.clickTimer=null),this.detachEvents(),this.pointers=[],this.resetValues(),this.$viewport=null,this.$content=null,this.options={},this.events={})}}c.version="4.0.0-beta.1",c.Plugins={};export{c as Panzoom};
