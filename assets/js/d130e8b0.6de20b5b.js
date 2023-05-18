"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[678],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>u});var s=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function n(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function c(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?n(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function o(e,a){if(null==e)return{};var t,s,r=function(e,a){if(null==e)return{};var t,s,r={},n=Object.keys(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=s.createContext({}),d=function(e){var a=s.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):c(c({},a),e)),t},m=function(e){var a=d(e.components);return s.createElement(l.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,r=e.mdxType,n=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=d(t),u=r,k=p["".concat(l,".").concat(u)]||p[u]||i[u]||n;return t?s.createElement(k,c(c({ref:a},m),{},{components:t})):s.createElement(k,c({ref:a},m))}));function u(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var n=t.length,c=new Array(n);c[0]=p;var o={};for(var l in a)hasOwnProperty.call(a,l)&&(o[l]=a[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var d=2;d<n;d++)c[d]=t[d];return s.createElement.apply(null,c)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},3747:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>c,default:()=>i,frontMatter:()=>n,metadata:()=>o,toc:()=>d});var s=t(7462),r=(t(7294),t(3905));const n={custom_edit_url:null},c="CameraControl",o={unversionedId:"api/Interface/CameraControl",id:"api/Interface/CameraControl",title:"CameraControl",description:"source",source:"@site/docs/api/Interface/CameraControl.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/CameraControl",permalink:"/egjs-view360/docs/api/Interface/CameraControl",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"AutoplayOptions",permalink:"/egjs-view360/docs/api/Interface/AutoplayOptions"},next:{title:"CameraEvents",permalink:"/egjs-view360/docs/api/Interface/CameraEvents"}},l={},d=[{value:"Properties",id:"properties",level:2},{value:"animating",id:"animating",level:3},{value:"enabled",id:"enabled",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"disable",id:"disable",level:3},{value:"enable",id:"enable",level:3},{value:"sync",id:"sync",level:3}],m={toc:d};function i(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,s.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"cameracontrol"},"CameraControl"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/CameraControl.ts#L11"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Interface for camera control")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface CameraControl\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#animating"},"animating")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Whether this control is animating the camera"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#enabled"},"enabled")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Whether this control is enabled or not")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#destroy"},"destroy")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Destroy the instance and remove all event listeners attached."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#disable"},"disable")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Disable this control and remove all event listeners"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#enable"},"enable")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Enable this control and add event listeners."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#sync"},"sync")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Synchronize this control's state to current camera state")))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"animating"},"animating")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"animating"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Whether this control is animating the camera"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/CameraControl.ts#L25"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"enabled"},"enabled")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"enabled"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Whether this control is enabled or not"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/CameraControl.ts#L18"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"destroy"},"destroy")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"destroy"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Destroy the instance and remove all event listeners attached."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/CameraControl.ts#L31"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"disable"},"disable")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"disable"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"disable(): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Disable this control and remove all event listeners"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/CameraControl.ts#L50"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"enable"},"enable")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"enable"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"enable(): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Enable this control and add event listeners."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/CameraControl.ts#L44"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"sync"},"sync")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"sync"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"sync(camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Synchronize this control's state to current camera state")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Camera's instance ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/CameraControl.ts#L38"},"source")))))}i.isMDXComponent=!0}}]);