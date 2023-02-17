"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1710],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>u});var o=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,o,r=function(e,t){if(null==e)return{};var a,o,r={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=o.createContext({}),i=function(e){var t=o.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},m=function(e){var t=i(e.components);return o.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,l=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),d=i(a),u=r,k=d["".concat(l,".").concat(u)]||d[u]||p[u]||n;return a?o.createElement(k,s(s({ref:t},m),{},{components:a})):o.createElement(k,s({ref:t},m))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,s=new Array(n);s[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var i=2;i<n;i++)s[i]=a[i];return o.createElement.apply(null,s)}return o.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5502:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>n,metadata:()=>c,toc:()=>i});var o=a(7462),r=(a(7294),a(3905));const n={custom_edit_url:null},s="ZoomControlOptions",c={unversionedId:"api/Interface/ZoomControlOptions",id:"api/Interface/ZoomControlOptions",title:"ZoomControlOptions",description:"Since version 4.0.0",source:"@site/docs/api/Interface/ZoomControlOptions.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/ZoomControlOptions",permalink:"/egjs-view360/docs/api/Interface/ZoomControlOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"View360Options",permalink:"/egjs-view360/docs/api/Interface/View360Options"},next:{title:"ControlBar",permalink:"/egjs-view360/docs/api/Plugin/Class/ControlBar"}},l={},i=[{value:"Properties",id:"properties",level:2},{value:"duration",id:"duration",level:3},{value:"easing",id:"easing",level:3},{value:"scale",id:"scale",level:3}],m={toc:i};function p(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,o.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"zoomcontroloptions"},"ZoomControlOptions"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L24"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Options for ",(0,r.kt)("a",{parentName:"p",href:"../Class/ZoomControl"},"ZoomControl"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface ZoomControlOptions\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#duration"},"duration")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Duration of the input animation (ms)"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#easing"},"easing")),(0,r.kt)("div",{className:"doc-summary-desc"})),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#scale"},"scale")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Scale factor of the zoom")))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"duration"},"duration")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"duration"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number")),(0,r.kt)("span",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"300"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Duration of the input animation (ms)"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L32"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"easing"},"easing")),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"easing"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L36"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"scale"},"scale")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"scale"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number")),(0,r.kt)("span",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"1"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Scale factor of the zoom"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/control/ZoomControl.ts#L28"},"source")))))}p.isMDXComponent=!0}}]);