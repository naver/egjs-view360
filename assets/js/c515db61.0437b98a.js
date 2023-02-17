"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9112],{3905:(e,a,t)=>{t.d(a,{Zo:()=>d,kt:()=>k});var s=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function n(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?n(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,s,o=function(e,a){if(null==e)return{};var t,s,o={},n=Object.keys(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var r=s.createContext({}),m=function(e){var a=s.useContext(r),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},d=function(e){var a=m(e.components);return s.createElement(r.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,o=e.mdxType,n=e.originalType,r=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=m(t),k=o,u=p["".concat(r,".").concat(k)]||p[k]||i[k]||n;return t?s.createElement(u,l(l({ref:a},d),{},{components:t})):s.createElement(u,l({ref:a},d))}));function k(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var n=t.length,l=new Array(n);l[0]=p;var c={};for(var r in a)hasOwnProperty.call(a,r)&&(c[r]=a[r]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var m=2;m<n;m++)l[m]=t[m];return s.createElement.apply(null,l)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},9846:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>r,contentTitle:()=>l,default:()=>i,frontMatter:()=>n,metadata:()=>c,toc:()=>m});var s=t(7462),o=(t(7294),t(3905));const n={custom_edit_url:null},l="ZoomControl",c={unversionedId:"api/Class/ZoomControl",id:"api/Class/ZoomControl",title:"ZoomControl",description:"Since version 4.0.0",source:"@site/docs/api/Class/ZoomControl.mdx",sourceDirName:"api/Class",slug:"/api/Class/ZoomControl",permalink:"/egjs-view360/docs/api/Class/ZoomControl",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"XRManager",permalink:"/egjs-view360/docs/api/Class/XRManager"},next:{title:"BeforeRenderEvent",permalink:"/egjs-view360/docs/api/Event/BeforeRenderEvent"}},r={},m=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"animating",id:"animating",level:3},{value:"duration",id:"duration",level:3},{value:"easing",id:"easing",level:3},{value:"enabled",id:"enabled",level:3},{value:"scale",id:"scale",level:3},{value:"scrollable",id:"scrollable",level:3},{value:"zoom",id:"zoom",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"disable",id:"disable",level:3},{value:"enable",id:"enable",level:3},{value:"hasOn",id:"hasOn",level:3},{value:"off",id:"off",level:3},{value:"on",id:"on",level:3},{value:"once",id:"once",level:3},{value:"sync",id:"sync",level:3},{value:"trigger",id:"trigger",level:3}],d={toc:m};function i(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,s.Z)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"zoomcontrol"},"ZoomControl"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L46"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,"Camera's zoom control")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class ZoomControl extends Component<ZoomControlEvents> implements CameraControl\n")),(0,o.kt)("h3",null,"Extends"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://naver.github.io/egjs-component/"},"Component"),"<","ZoomControlEvents",">")),(0,o.kt)("h3",null,"Implements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"../Interface/CameraControl"},"CameraControl"))),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#animating"},"animating")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Whether this control is animating the camera"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#duration"},"duration")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Duration of the input animation (ms)"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#easing"},"easing")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Easing function of the animation"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enabled"},"enabled")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Whether this control is enabled or not"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#scale"},"scale")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Scale factor of the zoom"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#scrollable"},"scrollable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll by mouse wheel on canvas."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"When this option is enabled, zoom by mouse wheel will be disabled.")))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#zoom"},"zoom")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Current zoom value")))),(0,o.kt)("div",{className:"doc-summary doc-methods"},(0,o.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#destroy"},"destroy")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Destroy the instance and remove all event listeners attached."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disable"},"disable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable this control and remove all event listeners"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enable"},"enable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Enable this control and add event listeners."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#hasOn"},"hasOn")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#off"},"off")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#on"},"on")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#once"},"once")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#sync"},"sync")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Synchronize this control's state to current camera state"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#trigger"},"trigger")),(0,o.kt)("div",{className:"doc-summary-desc"}))),(0,o.kt)("h2",{id:"constructor"},"Constructor"),(0,o.kt)("div",{className:"doc-member-subtitle"},"Create new ZoomControl instance"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new ZoomControl(controlEl: HTMLElement, enableBlocked: boolean, options: Partial<ZoomControlOptions>): ZoomControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"controlEl"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"HTMLElement"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Element to attach handlers "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"enableBlocked"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether to disable control on init "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"options"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<",(0,o.kt)("a",{parentName:"p",href:"../Interface/ZoomControlOptions"},"ZoomControlOptions"),">")),(0,o.kt)("div",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"{}"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Options for control "))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"animating"},"animating")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"animating"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether this control is animating the camera"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L69"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"duration"},"duration")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"duration"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"number")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"300"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Duration of the input animation (ms)"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L104"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"easing"},"easing")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"easing"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"EASING.EASE_OUT_CUBIC"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Easing function of the animation")),(0,o.kt)("admonition",{title:"See",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"../Variables/EASING"},"EASING")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L113"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enabled"},"enabled")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enabled"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Whether this control is enabled or not"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L61"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"scale"},"scale")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"scale"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"number")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"1"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Scale factor of the zoom"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L95"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"scrollable"},"scrollable")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"scrollable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll by mouse wheel on canvas."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"When this option is enabled, zoom by mouse wheel will be disabled.")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L80"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"zoom"},"zoom")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"zoom"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"number"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Current zoom value"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L76"},"source")))),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"destroy"},"destroy")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"destroy"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Destroy the instance and remove all event listeners attached."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L145"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disable"},"disable")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"disable(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable this control and remove all event listeners"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L175"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enable"},"enable")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"enable(): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Enable this control and add event listeners."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L162"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"hasOn"},"hasOn")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"hasOn"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"hasOn<K>(eventName: K): boolean\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventName"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"off"},"off")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"off"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"ZoomControl"},"ZoomControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"off<K>(eventName: K, handlerToDetach: EventCallback<ZoomControlEvents, K, ZoomControl>): ZoomControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventName"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"handlerToDetach"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"EventCallback","<","ZoomControlEvents,","\xa0","K,","\xa0",(0,o.kt)("a",{parentName:"p",href:"ZoomControl"},"ZoomControl"),">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"on"},"on")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"on"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"ZoomControl"},"ZoomControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'on(eventHash: Partial<{ change: ((event: { delta: number; isKeyboard: boolean; isTouch: boolean }) => any); disable: ((event: { updateCursor: boolean }) => any); enable: ((event: { control: CameraControl; updateCursor: boolean }) => any); inputEnd: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; scrolling: boolean }) => any); inputStart: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; srcEvent: MouseEvent | TouchEvent | KeyboardEvent }) => any); staticClick: ((event: { isTouch: boolean }) => any) }>): ZoomControl\n')),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventHash"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<","{","\xa0","change:","\xa0","((event:","\xa0","{","\xa0","delta:","\xa0","number;","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","disable:","\xa0","((event:","\xa0","{","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","enable:","\xa0","((event:","\xa0","{","\xa0","control:","\xa0",(0,o.kt)("a",{parentName:"p",href:"../Interface/CameraControl"},"CameraControl"),";","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputEnd:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","scrolling:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputStart:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","srcEvent:","\xa0","MouseEvent","\xa0","|","\xa0","TouchEvent","\xa0","|","\xa0","KeyboardEvent","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","staticClick:","\xa0","((event:","\xa0","{","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"once"},"once")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"once"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"ZoomControl"},"ZoomControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'once(eventHash: Partial<{ change: ((event: { delta: number; isKeyboard: boolean; isTouch: boolean }) => any); disable: ((event: { updateCursor: boolean }) => any); enable: ((event: { control: CameraControl; updateCursor: boolean }) => any); inputEnd: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; scrolling: boolean }) => any); inputStart: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; srcEvent: MouseEvent | TouchEvent | KeyboardEvent }) => any); staticClick: ((event: { isTouch: boolean }) => any) }>): ZoomControl\n')),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventHash"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<","{","\xa0","change:","\xa0","((event:","\xa0","{","\xa0","delta:","\xa0","number;","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","disable:","\xa0","((event:","\xa0","{","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","enable:","\xa0","((event:","\xa0","{","\xa0","control:","\xa0",(0,o.kt)("a",{parentName:"p",href:"../Interface/CameraControl"},"CameraControl"),";","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputEnd:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","scrolling:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputStart:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","srcEvent:","\xa0","MouseEvent","\xa0","|","\xa0","TouchEvent","\xa0","|","\xa0","KeyboardEvent","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","staticClick:","\xa0","((event:","\xa0","{","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"sync"},"sync")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"sync"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"sync(camera: Camera): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Synchronize this control's state to current camera state")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"camera"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"Camera"},"Camera")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Camera's instance ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L186"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"trigger"},"trigger")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"trigger"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"ZoomControl"},"ZoomControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"trigger<K>(event: K, ...params: EventTriggerParams<ZoomControlEvents, K>): ZoomControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"event"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"params"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"EventTriggerParams","<","ZoomControlEvents,","\xa0","K",">")))))))}i.isMDXComponent=!0}}]);