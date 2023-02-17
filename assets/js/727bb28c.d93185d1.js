"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8919],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>u});var s=t(7294);function l(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function c(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function r(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?c(Object(t),!0).forEach((function(a){l(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function d(e,a){if(null==e)return{};var t,s,l=function(e,a){if(null==e)return{};var t,s,l={},c=Object.keys(e);for(s=0;s<c.length;s++)t=c[s],a.indexOf(t)>=0||(l[t]=e[t]);return l}(e,a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(s=0;s<c.length;s++)t=c[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var o=s.createContext({}),n=function(e){var a=s.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):r(r({},a),e)),t},m=function(e){var a=n(e.components);return s.createElement(o.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,l=e.mdxType,c=e.originalType,o=e.parentName,m=d(e,["components","mdxType","originalType","parentName"]),p=n(t),u=l,k=p["".concat(o,".").concat(u)]||p[u]||i[u]||c;return t?s.createElement(k,r(r({ref:a},m),{},{components:t})):s.createElement(k,r({ref:a},m))}));function u(e,a){var t=arguments,l=a&&a.mdxType;if("string"==typeof e||l){var c=t.length,r=new Array(c);r[0]=p;var d={};for(var o in a)hasOwnProperty.call(a,o)&&(d[o]=a[o]);d.originalType=e,d.mdxType="string"==typeof e?e:l,r[1]=d;for(var n=2;n<c;n++)r[n]=t[n];return s.createElement.apply(null,r)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},2471:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>r,default:()=>i,frontMatter:()=>c,metadata:()=>d,toc:()=>n});var s=t(7462),l=(t(7294),t(3905));const c={custom_edit_url:null},r="Autoplay",d={unversionedId:"api/Class/Autoplay",id:"api/Class/Autoplay",title:"Autoplay",description:"Since version 4.0.0",source:"@site/docs/api/Class/Autoplay.mdx",sourceDirName:"api/Class",slug:"/api/Class/Autoplay",permalink:"/egjs-view360/docs/api/Class/Autoplay",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"AutoResizer",permalink:"/egjs-view360/docs/api/Class/AutoResizer"},next:{title:"Camera",permalink:"/egjs-view360/docs/api/Class/Camera"}},o={},n=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"canInterrupt",id:"canInterrupt",level:3},{value:"delay",id:"delay",level:3},{value:"delayOnMouseLeave",id:"delayOnMouseLeave",level:3},{value:"disableOnInterrupt",id:"disableOnInterrupt",level:3},{value:"enabled",id:"enabled",level:3},{value:"pauseOnHover",id:"pauseOnHover",level:3},{value:"playing",id:"playing",level:3},{value:"speed",id:"speed",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"disable",id:"disable",level:3},{value:"enable",id:"enable",level:3},{value:"enableAfterDelay",id:"enableAfterDelay",level:3},{value:"update",id:"update",level:3}],m={toc:n};function i(e){let{components:a,...t}=e;return(0,l.kt)("wrapper",(0,s.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"autoplay"},"Autoplay"),(0,l.kt)("div",{className:"doc-side"},(0,l.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,l.kt)("div",{className:"doc-main-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L49"},"source")))),(0,l.kt)("div",{className:"doc-subtitle"},(0,l.kt)("p",null,"A manager class for autoplay feature.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"class Autoplay\n")),(0,l.kt)("div",{className:"doc-summary doc-properties"},(0,l.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#canInterrupt"},"canInterrupt")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Whether user can interrupt the rotation with click/wheel input"))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#delay"},"delay")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Reactivation delay after mouse input in milisecond."))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#delayOnMouseLeave"},"delayOnMouseLeave")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Reactivation delay after mouse leave when using pauseOnHover"))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#disableOnInterrupt"},"disableOnInterrupt")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Whether to disable autoplay on user interrupt"))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#enabled"},"enabled")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Whether autoplay is enabled or not"))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#pauseOnHover"},"pauseOnHover")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Whether to pause rotation on mouse hover"))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#playing"},"playing")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Whether autoplay is updating the camera at the moment"))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#speed"},"speed")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Y-axis(yaw) rotation speed")))),(0,l.kt)("div",{className:"doc-summary doc-methods"},(0,l.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#destroy"},"destroy")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Destroy the instance and remove all event listeners attached"))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#disable"},"disable")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Disable autoplay and remove all event handlers."))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#enable"},"enable")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Enable autoplay and add event listeners."))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#enableAfterDelay"},"enableAfterDelay")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Enable autoplay after current ",(0,l.kt)("inlineCode",{parentName:"p"},"delay")," value."))),(0,l.kt)("div",{className:"doc-summary-item"},(0,l.kt)("div",{className:"doc-summary-name"},(0,l.kt)("a",{href:"#update"},"update")),(0,l.kt)("div",{className:"doc-summary-desc"},(0,l.kt)("p",null,"Rotate camera by given deltaTime")))),(0,l.kt)("h2",{id:"constructor"},"Constructor"),(0,l.kt)("div",{className:"doc-member-subtitle"},"Create new AutoPlayer instance"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"new Autoplay(viewer: View360, element: HTMLElement, options: boolean | Partial<AutoplayOptions>): Autoplay\n")),(0,l.kt)("h4",null,"Parameters"),(0,l.kt)("div",{className:"doc-param"},(0,l.kt)("div",{className:"doc-param-header"},(0,l.kt)("span",{className:"doc-name"},"viewer"),(0,l.kt)("div",{className:"doc-type"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"View360"},"View360"))))),(0,l.kt)("div",{className:"doc-param"},(0,l.kt)("div",{className:"doc-param-header"},(0,l.kt)("span",{className:"doc-name"},"element"),(0,l.kt)("div",{className:"doc-type"},(0,l.kt)("p",null,"HTMLElement"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Canvas element "))),(0,l.kt)("div",{className:"doc-param"},(0,l.kt)("div",{className:"doc-param-header"},(0,l.kt)("span",{className:"doc-name"},"options"),(0,l.kt)("div",{className:"doc-type"},(0,l.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,l.kt)("a",{parentName:"p",href:"../Interface/AutoplayOptions"},"AutoplayOptions"),">"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Autoplay options "))),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"canInterrupt"},"canInterrupt")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"canInterrupt"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"boolean")),(0,l.kt)("span",{className:"doc-default",title:"Default Value"},(0,l.kt)("p",null,"true"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Whether user can interrupt the rotation with click/wheel input"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L131"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"delay"},"delay")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"delay"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"number")),(0,l.kt)("span",{className:"doc-default",title:"Default Value"},(0,l.kt)("p",null,"2000"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Reactivation delay after mouse input in milisecond."))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L95"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"delayOnMouseLeave"},"delayOnMouseLeave")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"delayOnMouseLeave"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"number")),(0,l.kt)("span",{className:"doc-default",title:"Default Value"},(0,l.kt)("p",null,"0"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Reactivation delay after mouse leave when using pauseOnHover"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L104"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"disableOnInterrupt"},"disableOnInterrupt")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"disableOnInterrupt"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"boolean")),(0,l.kt)("span",{className:"doc-default",title:"Default Value"},(0,l.kt)("p",null,"false"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Whether to disable autoplay on user interrupt"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L140"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"enabled"},"enabled")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"enabled"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"boolean"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Whether autoplay is enabled or not"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L74"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"pauseOnHover"},"pauseOnHover")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"pauseOnHover"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"boolean")),(0,l.kt)("span",{className:"doc-default",title:"Default Value"},(0,l.kt)("p",null,"false"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Whether to pause rotation on mouse hover"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L122"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"playing"},"playing")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"playing"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"boolean"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Whether autoplay is updating the camera at the moment"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L85"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"speed"},"speed")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-property"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"speed"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"number")),(0,l.kt)("span",{className:"doc-default",title:"Default Value"},(0,l.kt)("p",null,"1"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Y-axis(yaw) rotation speed"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L113"},"source")))),(0,l.kt)("h2",{id:"methods"},"Methods"),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"destroy"},"destroy")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-method"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"destroy"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"void"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Destroy the instance and remove all event listeners attached"))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L183"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"disable"},"disable")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-method"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"disable"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"void"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"disable(): void\n")),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Disable autoplay and remove all event handlers."))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L251"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"enable"},"enable")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-method"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"enable"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"void"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"enable(): void\n")),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Enable autoplay and add event listeners."))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L214"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"enableAfterDelay"},"enableAfterDelay")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-method"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"enableAfterDelay"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"void"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"enableAfterDelay(): void\n")),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Enable autoplay after current ",(0,l.kt)("inlineCode",{parentName:"p"},"delay")," value."))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L240"},"source")))),(0,l.kt)("div",{className:"doc-header-hidden"},(0,l.kt)("h3",{id:"update"},"update")),(0,l.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,l.kt)("div",{className:"doc-entry"},(0,l.kt)("details",{open:!0,className:"doc-method"},(0,l.kt)("summary",{className:"doc-member"},(0,l.kt)("span",{className:"doc-name"},"update"),(0,l.kt)("span",{className:"doc-type"},(0,l.kt)("p",null,"void"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"update(deltaTime: number): void\n")),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Rotate camera by given deltaTime")),(0,l.kt)("h4",null,"Parameters"),(0,l.kt)("div",{className:"doc-param"},(0,l.kt)("div",{className:"doc-param-header"},(0,l.kt)("span",{className:"doc-name"},"deltaTime"),(0,l.kt)("div",{className:"doc-type"},(0,l.kt)("p",null,"number"))),(0,l.kt)("div",{className:"doc-desc"},(0,l.kt)("p",null,"Number of milisec to update ")))),(0,l.kt)("div",{className:"doc-source"},(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Autoplay.ts#L193"},"source")))))}i.isMDXComponent=!0}}]);