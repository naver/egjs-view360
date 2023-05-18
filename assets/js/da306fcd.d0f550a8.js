"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4491],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>k});var s=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function n(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,s,o=function(e,a){if(null==e)return{};var t,s,o={},l=Object.keys(e);for(s=0;s<l.length;s++)t=l[s],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(s=0;s<l.length;s++)t=l[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var r=s.createContext({}),d=function(e){var a=s.useContext(r),t=a;return e&&(t="function"==typeof e?e(a):n(n({},a),e)),t},m=function(e){var a=d(e.components);return s.createElement(r.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,o=e.mdxType,l=e.originalType,r=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),p=d(t),k=o,u=p["".concat(r,".").concat(k)]||p[k]||i[k]||l;return t?s.createElement(u,n(n({ref:a},m),{},{components:t})):s.createElement(u,n({ref:a},m))}));function k(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var l=t.length,n=new Array(l);n[0]=p;var c={};for(var r in a)hasOwnProperty.call(a,r)&&(c[r]=a[r]);c.originalType=e,c.mdxType="string"==typeof e?e:o,n[1]=c;for(var d=2;d<l;d++)n[d]=t[d];return s.createElement.apply(null,n)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},1067:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>r,contentTitle:()=>n,default:()=>i,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var s=t(7462),o=(t(7294),t(3905));const l={custom_edit_url:null},n="RotateControl",c={unversionedId:"api/Class/RotateControl",id:"api/Class/RotateControl",title:"RotateControl",description:"Since version 4.0.0",source:"@site/docs/api/Class/RotateControl.mdx",sourceDirName:"api/Class",slug:"/api/Class/RotateControl",permalink:"/egjs-view360/docs/api/Class/RotateControl",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"PanoControl",permalink:"/egjs-view360/docs/api/Class/PanoControl"},next:{title:"View360",permalink:"/egjs-view360/docs/api/Class/View360"}},r={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"animating",id:"animating",level:3},{value:"disableKeyboard",id:"disableKeyboard",level:3},{value:"disablePitch",id:"disablePitch",level:3},{value:"disableYaw",id:"disableYaw",level:3},{value:"duration",id:"duration",level:3},{value:"easing",id:"easing",level:3},{value:"enabled",id:"enabled",level:3},{value:"keyboardScale",id:"keyboardScale",level:3},{value:"pitch",id:"pitch",level:3},{value:"pointerScale",id:"pointerScale",level:3},{value:"scrollable",id:"scrollable",level:3},{value:"yaw",id:"yaw",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"disable",id:"disable",level:3},{value:"enable",id:"enable",level:3},{value:"hasOn",id:"hasOn",level:3},{value:"off",id:"off",level:3},{value:"on",id:"on",level:3},{value:"once",id:"once",level:3},{value:"resize",id:"resize",level:3},{value:"sync",id:"sync",level:3},{value:"trigger",id:"trigger",level:3}],m={toc:d};function i(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,s.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"rotatecontrol"},"RotateControl"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L60"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,"Camera's rotation control")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class RotateControl extends Component<RotateControlEvents> implements CameraControl\n")),(0,o.kt)("h3",null,"Extends"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://naver.github.io/egjs-component/"},"Component"),"<","RotateControlEvents",">")),(0,o.kt)("h3",null,"Implements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"../Interface/CameraControl"},"CameraControl"))),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#animating"},"animating")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Whether this control is animating the camera"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disableKeyboard"},"disableKeyboard")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable rotation by keyboard."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disablePitch"},"disablePitch")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable X-axis(pitch) rotation."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disableYaw"},"disableYaw")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable Y-axis(yaw) rotation."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#duration"},"duration")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Duration of the input animation (ms)"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#easing"},"easing")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Easing function of the animation"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enabled"},"enabled")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Whether this control is enabled or not"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#keyboardScale"},"keyboardScale")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Scale factor for keyboard rotation"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#pitch"},"pitch")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Current pitch value"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#pointerScale"},"pointerScale")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Scale factor for mouse/touch rotation"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#scrollable"},"scrollable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll on mobile(touch) devices on canvas."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"When this option is enabled, users must swipe horizontally first then vertically to change view up or down.")))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#yaw"},"yaw")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Current yaw value")))),(0,o.kt)("div",{className:"doc-summary doc-methods"},(0,o.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#destroy"},"destroy")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Destroy the instance and remove all event listeners attached."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disable"},"disable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable this control and remove all event listeners"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enable"},"enable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Enable this control and add event listeners."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#hasOn"},"hasOn")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#off"},"off")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#on"},"on")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#once"},"once")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#resize"},"resize")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Resize control to match target size."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#sync"},"sync")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Synchronize this control's state to current camera state"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#trigger"},"trigger")),(0,o.kt)("div",{className:"doc-summary-desc"}))),(0,o.kt)("h2",{id:"constructor"},"Constructor"),(0,o.kt)("div",{className:"doc-member-subtitle"},"Create new RotateControl instance"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new RotateControl(controlEl: HTMLElement, enableBlocked: boolean, options: Partial<RotateControlOptions>): RotateControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"controlEl"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"HTMLElement"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Element to attach handlers "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"enableBlocked"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether to disable control on init "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"options"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<",(0,o.kt)("a",{parentName:"p",href:"../Interface/RotateControlOptions"},"RotateControlOptions"),">")),(0,o.kt)("div",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"{}"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Options for control "))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"animating"},"animating")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"animating"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether this control is animating the camera"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L94"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disableKeyboard"},"disableKeyboard")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disableKeyboard"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"false"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable rotation by keyboard."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L189"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disablePitch"},"disablePitch")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disablePitch"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"false"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable X-axis(pitch) rotation."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L173"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disableYaw"},"disableYaw")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disableYaw"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"false"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable Y-axis(yaw) rotation."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L181"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"duration"},"duration")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"duration"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"number")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"300"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Duration of the input animation (ms)"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L148"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"easing"},"easing")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"easing"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"EASING.EASE_OUT_CUBIC"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Easing function of the animation")),(0,o.kt)("admonition",{title:"See",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"../Variables/EASING"},"EASING")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L161"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enabled"},"enabled")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enabled"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether this control is enabled or not"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L86"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"keyboardScale"},"keyboardScale")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"keyboardScale"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"[number,number]")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"[1, 1]"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Scale factor for keyboard rotation"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L138"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"pitch"},"pitch")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"pitch"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"Motion"},"Motion")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Current pitch value"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L112"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"pointerScale"},"pointerScale")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"pointerScale"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"[number,number]")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"[1, 1]"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Scale factor for mouse/touch rotation"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L127"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"scrollable"},"scrollable")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"scrollable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll on mobile(touch) devices on canvas."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"When this option is enabled, users must swipe horizontally first then vertically to change view up or down.")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L116"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"yaw"},"yaw")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"yaw"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"Motion"},"Motion")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Current yaw value"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L105"},"source")))),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"destroy"},"destroy")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"destroy"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Destroy the instance and remove all event listeners attached."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L232"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disable"},"disable")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"disable(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable this control and remove all event listeners"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L312"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enable"},"enable")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"enable(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Enable this control and add event listeners."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L297"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"hasOn"},"hasOn")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"hasOn"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"hasOn<K>(eventName: K): boolean\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventName"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"off"},"off")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"off"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"RotateControl"},"RotateControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"off<K>(eventName: K, handlerToDetach: EventCallback<RotateControlEvents, K, RotateControl>): RotateControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventName"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"handlerToDetach"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"EventCallback","<","RotateControlEvents,","\xa0","K,","\xa0",(0,o.kt)("a",{parentName:"p",href:"RotateControl"},"RotateControl"),">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"on"},"on")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"on"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"RotateControl"},"RotateControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'on(eventHash: Partial<{ change: ((event: { delta: RotateDeltaType; isKeyboard: boolean; isTouch: boolean }) => any); disable: ((event: { updateCursor: boolean }) => any); enable: ((event: { control: CameraControl; updateCursor: boolean }) => any); inputEnd: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; scrolling: boolean }) => any); inputStart: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; srcEvent: MouseEvent | TouchEvent | KeyboardEvent }) => any); staticClick: ((event: { isTouch: boolean }) => any) }>): RotateControl\n')),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventHash"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<","{","\xa0","change:","\xa0","((event:","\xa0","{","\xa0","delta:","\xa0","RotateDeltaType;","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","disable:","\xa0","((event:","\xa0","{","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","enable:","\xa0","((event:","\xa0","{","\xa0","control:","\xa0",(0,o.kt)("a",{parentName:"p",href:"../Interface/CameraControl"},"CameraControl"),";","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputEnd:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","scrolling:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputStart:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","srcEvent:","\xa0","MouseEvent","\xa0","|","\xa0","TouchEvent","\xa0","|","\xa0","KeyboardEvent","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","staticClick:","\xa0","((event:","\xa0","{","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"once"},"once")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"once"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"RotateControl"},"RotateControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'once(eventHash: Partial<{ change: ((event: { delta: RotateDeltaType; isKeyboard: boolean; isTouch: boolean }) => any); disable: ((event: { updateCursor: boolean }) => any); enable: ((event: { control: CameraControl; updateCursor: boolean }) => any); inputEnd: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; scrolling: boolean }) => any); inputStart: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; srcEvent: MouseEvent | TouchEvent | KeyboardEvent }) => any); staticClick: ((event: { isTouch: boolean }) => any) }>): RotateControl\n')),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventHash"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<","{","\xa0","change:","\xa0","((event:","\xa0","{","\xa0","delta:","\xa0","RotateDeltaType;","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","disable:","\xa0","((event:","\xa0","{","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","enable:","\xa0","((event:","\xa0","{","\xa0","control:","\xa0",(0,o.kt)("a",{parentName:"p",href:"../Interface/CameraControl"},"CameraControl"),";","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputEnd:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","scrolling:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputStart:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","srcEvent:","\xa0","MouseEvent","\xa0","|","\xa0","TouchEvent","\xa0","|","\xa0","KeyboardEvent","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","staticClick:","\xa0","((event:","\xa0","{","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"resize"},"resize")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"resize"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"resize(hfov: number, aspect: number, width: number, height: number): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Resize control to match target size.")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"hfov"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Camera horizontal fov in degrees "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"aspect"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Camera aspect "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"width"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"New width "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"height"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"New height ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L290"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"sync"},"sync")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"sync"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"sync(camera: Camera): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Synchronize this control's state to current camera state")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"camera"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"Camera"},"Camera")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Camera's instance ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L324"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"trigger"},"trigger")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"trigger"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"RotateControl"},"RotateControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"trigger<K>(event: K, ...params: EventTriggerParams<RotateControlEvents, K>): RotateControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"event"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"params"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"EventTriggerParams","<","RotateControlEvents,","\xa0","K",">")))))))}i.isMDXComponent=!0}}]);