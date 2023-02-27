"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9291],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var s=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,s,o=function(e,t){if(null==e)return{};var a,s,o={},r=Object.keys(e);for(s=0;s<r.length;s++)a=r[s],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)a=r[s],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=s.createContext({}),i=function(e){var t=s.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):n(n({},t),e)),a},p=function(e){var t=i(e.components);return s.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},m=s.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=i(a),u=o,k=m["".concat(l,".").concat(u)]||m[u]||d[u]||r;return a?s.createElement(k,n(n({ref:t},p),{},{components:a})):s.createElement(k,n({ref:t},p))}));function u(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,n=new Array(r);n[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,n[1]=c;for(var i=2;i<r;i++)n[i]=a[i];return s.createElement.apply(null,n)}return s.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5869:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>n,default:()=>d,frontMatter:()=>r,metadata:()=>c,toc:()=>i});var s=a(7462),o=(a(7294),a(3905));const r={custom_edit_url:null},n="Hotspot",c={unversionedId:"api/Class/Hotspot",id:"api/Class/Hotspot",title:"Hotspot",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Class/Hotspot.mdx",sourceDirName:"api/Class",slug:"/api/Class/Hotspot",permalink:"/egjs-view360/ko/docs/api/Class/Hotspot",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"GyroControl",permalink:"/egjs-view360/ko/docs/api/Class/GyroControl"},next:{title:"HotspotRenderer",permalink:"/egjs-view360/ko/docs/api/Class/HotspotRenderer"}},l={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"element",id:"element",level:3},{value:"position",id:"position",level:3}],p={toc:i};function d(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,s.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"hotspot"},"Hotspot"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/hotspot/Hotspot.ts#L12"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,"\ud56b\uc2a4\ud31f \ub370\uc774\ud130")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class Hotspot\n")),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#element"},"element")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ud56b\uc2a4\ud31f\uc758 HTMLElement"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#position"},"position")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ud56b\uc2a4\ud31f\uc744 \ub80c\ub354\ub9c1\ud560 \uc704\uce58")))),(0,o.kt)("h2",{id:"constructor"},"Constructor"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new Hotspot(element: HTMLElement, position: vec3): Hotspot\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"element"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"HTMLElement")))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"position"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"vec3")))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"element"},"element")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"element"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"HTMLElement"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ud56b\uc2a4\ud31f\uc758 HTMLElement"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/hotspot/Hotspot.ts#L18"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"position"},"position")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"position"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"vec3"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ud56b\uc2a4\ud31f\uc744 \ub80c\ub354\ub9c1\ud560 \uc704\uce58"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/hotspot/Hotspot.ts#L24"},"source")))))}d.isMDXComponent=!0}}]);