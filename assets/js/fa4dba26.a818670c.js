"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1093],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>u});var r=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,s=function(e,t){if(null==e)return{};var a,r,s={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var l=r.createContext({}),i=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},m=function(e){var t=i(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,s=e.mdxType,n=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=i(a),u=s,E=p["".concat(l,".").concat(u)]||p[u]||d[u]||n;return a?r.createElement(E,c(c({ref:t},m),{},{components:a})):r.createElement(E,c({ref:t},m))}));function u(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var n=a.length,c=new Array(n);c[0]=p;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:s,c[1]=o;for(var i=2;i<n;i++)c[i]=a[i];return r.createElement.apply(null,c)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},4056:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>n,metadata:()=>o,toc:()=>i});var r=a(7462),s=(a(7294),a(3905));const n={custom_edit_url:null},c="EASING",o={unversionedId:"api/Variables/EASING",id:"api/Variables/EASING",title:"EASING",description:"source",source:"@site/docs/api/Variables/EASING.mdx",sourceDirName:"api/Variables",slug:"/api/Variables/EASING",permalink:"/egjs-view360/docs/api/Variables/EASING",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"DEFAULT_CLASS",permalink:"/egjs-view360/docs/api/Variables/DEFAULT_CLASS"},next:{title:"ERROR_CODES",permalink:"/egjs-view360/docs/api/Variables/ERROR_CODES"}},l={},i=[{value:"Properties",id:"properties",level:2},{value:"EASE_OUT_BOUNCE",id:"EASE_OUT_BOUNCE",level:3},{value:"EASE_OUT_CUBIC",id:"EASE_OUT_CUBIC",level:3},{value:"LINEAR",id:"LINEAR",level:3},{value:"SINE_WAVE",id:"SINE_WAVE",level:3}],m={toc:i};function d(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"easing"},"EASING"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/const/external.ts#L59"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"Collection of predefined easing functions")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"const EASING: {\n  EASE_OUT_BOUNCE: ((x: number) => number);\n  EASE_OUT_CUBIC: ((x: number) => number);\n  LINEAR: ((x: number) => number);\n  SINE_WAVE: ((x: number) => number)\n}\n")),(0,s.kt)("div",{className:"doc-summary doc-properties"},(0,s.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#EASE_OUT_BOUNCE"},"EASE_OUT_BOUNCE")),(0,s.kt)("div",{className:"doc-summary-desc"})),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#EASE_OUT_CUBIC"},"EASE_OUT_CUBIC")),(0,s.kt)("div",{className:"doc-summary-desc"})),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#LINEAR"},"LINEAR")),(0,s.kt)("div",{className:"doc-summary-desc"})),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#SINE_WAVE"},"SINE_WAVE")),(0,s.kt)("div",{className:"doc-summary-desc"}))),(0,s.kt)("h2",{id:"properties"},"Properties"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"EASE_OUT_BOUNCE"},"EASE_OUT_BOUNCE")),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"EASE_OUT_BOUNCE"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/const/external.ts#L63"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"EASE_OUT_CUBIC"},"EASE_OUT_CUBIC")),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"EASE_OUT_CUBIC"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/const/external.ts#L62"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"LINEAR"},"LINEAR")),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"LINEAR"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/const/external.ts#L60"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"SINE_WAVE"},"SINE_WAVE")),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"SINE_WAVE"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/const/external.ts#L61"},"source")))))}d.isMDXComponent=!0}}]);