"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[268],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>k});var s=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function c(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function r(e,a){if(null==e)return{};var t,s,o=function(e,a){if(null==e)return{};var t,s,o={},l=Object.keys(e);for(s=0;s<l.length;s++)t=l[s],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(s=0;s<l.length;s++)t=l[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var n=s.createContext({}),d=function(e){var a=s.useContext(n),t=a;return e&&(t="function"==typeof e?e(a):c(c({},a),e)),t},m=function(e){var a=d(e.components);return s.createElement(n.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,o=e.mdxType,l=e.originalType,n=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),p=d(t),k=o,u=p["".concat(n,".").concat(k)]||p[k]||i[k]||l;return t?s.createElement(u,c(c({ref:a},m),{},{components:t})):s.createElement(u,c({ref:a},m))}));function k(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var l=t.length,c=new Array(l);c[0]=p;var r={};for(var n in a)hasOwnProperty.call(a,n)&&(r[n]=a[n]);r.originalType=e,r.mdxType="string"==typeof e?e:o,c[1]=r;for(var d=2;d<l;d++)c[d]=t[d];return s.createElement.apply(null,c)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},7058:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>n,contentTitle:()=>c,default:()=>i,frontMatter:()=>l,metadata:()=>r,toc:()=>d});var s=t(7462),o=(t(7294),t(3905));const l={custom_edit_url:null},c="PanoControl",r={unversionedId:"api/Class/PanoControl",id:"api/Class/PanoControl",title:"PanoControl",description:"Since version 4.0.0",source:"@site/docs/api/Class/PanoControl.mdx",sourceDirName:"api/Class",slug:"/api/Class/PanoControl",permalink:"/egjs-view360/docs/api/Class/PanoControl",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Object3D",permalink:"/egjs-view360/docs/api/Class/Object3D"},next:{title:"RotateControl",permalink:"/egjs-view360/docs/api/Class/RotateControl"}},n={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"animating",id:"animating",level:3},{value:"disableContextMenu",id:"disableContextMenu",level:3},{value:"enabled",id:"enabled",level:3},{value:"gyro",id:"gyro",level:3},{value:"ignoreZoomScale",id:"ignoreZoomScale",level:3},{value:"rotate",id:"rotate",level:3},{value:"scrollable",id:"scrollable",level:3},{value:"useGrabCursor",id:"useGrabCursor",level:3},{value:"wheelScrollable",id:"wheelScrollable",level:3},{value:"zoom",id:"zoom",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"disable",id:"disable",level:3},{value:"enable",id:"enable",level:3},{value:"resize",id:"resize",level:3},{value:"sync",id:"sync",level:3},{value:"update",id:"update",level:3}],m={toc:d};function i(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,s.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"panocontrol"},"PanoControl"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L69"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,"Panorama control for View360")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class PanoControl\n")),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#animating"},"animating")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Whether one of the controls is animating at the moment"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disableContextMenu"},"disableContextMenu")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enabled"},"enabled")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Whether the control is enabled or not"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#gyro"},"gyro")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"A control for camera rotation with gyroscope input.",(0,o.kt)("br",{parentName:"p"}),"\n","You can also change options of gyro with this."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#ignoreZoomScale"},"ignoreZoomScale")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", disables rotation slow-down by zoom-value."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#rotate"},"rotate")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"A control for camera rotation.",(0,o.kt)("br",{parentName:"p"}),"\n","You can also change options of rotate with this."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#scrollable"},"scrollable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#useGrabCursor"},"useGrabCursor")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Apply CSS ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"},"cursor")," by current state of input when using mouse.",(0,o.kt)("br",{parentName:"p"}),"\n","If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", this will add CSS style to canvas element. It'll apply ",(0,o.kt)("inlineCode",{parentName:"p"},'cursor: "grab"')," by default and ",(0,o.kt)("inlineCode",{parentName:"p"},'cursor: "grabbing"')," when holding the mouse button."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#wheelScrollable"},"wheelScrollable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#zoom"},"zoom")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"A control for camera zoom.",(0,o.kt)("br",{parentName:"p"}),"\n","You can also change options of zoom with this.")))),(0,o.kt)("div",{className:"doc-summary doc-methods"},(0,o.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#destroy"},"destroy")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Destroy the instance and remove all event listeners attached.",(0,o.kt)("br",{parentName:"p"}),"\n","This also will reset CSS cursor to initial."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disable"},"disable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable this control and remove all event listeners"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enable"},"enable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Enable this control and add event listeners."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#resize"},"resize")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Resize control to match target size."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#sync"},"sync")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Synchronize this control's state to current camera state"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#update"},"update")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Update control by given deltaTime")))),(0,o.kt)("h2",{id:"constructor"},"Constructor"),(0,o.kt)("div",{className:"doc-member-subtitle"},"Create new instance."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new PanoControl(element: HTMLElement, camera: Camera, options: PanoControlOptions): PanoControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"element"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"HTMLElement"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Canvas element "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"camera"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"Camera"},"Camera")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Camera instance "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"options"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../Interface/PanoControlOptions"},"PanoControlOptions")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Options for PanoControl "))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"animating"},"animating")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"animating"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether one of the controls is animating at the moment"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L159"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disableContextMenu"},"disableContextMenu")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disableContextMenu"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L102"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enabled"},"enabled")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enabled"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether the control is enabled or not"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L139"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"gyro"},"gyro")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"gyro"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"GyroControl"},"GyroControl")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"A control for camera rotation with gyroscope input.",(0,o.kt)("br",{parentName:"p"}),"\n","You can also change options of gyro with this."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L151"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"ignoreZoomScale"},"ignoreZoomScale")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"ignoreZoomScale"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", disables rotation slow-down by zoom-value."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L130"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"rotate"},"rotate")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"rotate"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"RotateControl"},"RotateControl")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"A control for camera rotation.",(0,o.kt)("br",{parentName:"p"}),"\n","You can also change options of rotate with this."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L143"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"scrollable"},"scrollable")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"scrollable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L118"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"useGrabCursor"},"useGrabCursor")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"useGrabCursor"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Apply CSS ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"},"cursor")," by current state of input when using mouse.",(0,o.kt)("br",{parentName:"p"}),"\n","If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", this will add CSS style to canvas element. It'll apply ",(0,o.kt)("inlineCode",{parentName:"p"},'cursor: "grab"')," by default and ",(0,o.kt)("inlineCode",{parentName:"p"},'cursor: "grabbing"')," when holding the mouse button."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L86"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"wheelScrollable"},"wheelScrollable")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"wheelScrollable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L123"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"zoom"},"zoom")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"zoom"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"ZoomControl"},"ZoomControl")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"A control for camera zoom.",(0,o.kt)("br",{parentName:"p"}),"\n","You can also change options of zoom with this."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L147"},"source")))),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"destroy"},"destroy")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"destroy"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Destroy the instance and remove all event listeners attached.",(0,o.kt)("br",{parentName:"p"}),"\n","This also will reset CSS cursor to initial."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L208"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disable"},"disable")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"disable(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable this control and remove all event listeners"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L264"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enable"},"enable")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"Promise","<","void",">"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"enable(): Promise<void>\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Enable this control and add event listeners."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L233"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"resize"},"resize")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"resize"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"resize(width: number, height: number): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Resize control to match target size.")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"width"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"New width "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"height"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"New height ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L222"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"sync"},"sync")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"sync"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"sync(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Synchronize this control's state to current camera state"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L317"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"update"},"update")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"update"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"update(delta: number): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Update control by given deltaTime")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"delta"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Number of milisec to update ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/PanoControl.ts#L283"},"source")))))}i.isMDXComponent=!0}}]);