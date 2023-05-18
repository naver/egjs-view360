"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9409],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var r=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,r,s=function(e,t){if(null==e)return{};var a,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var l=r.createContext({}),d=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):n(n({},t),e)),a},p=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},i={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=d(a),u=s,k=m["".concat(l,".").concat(u)]||m[u]||i[u]||o;return a?r.createElement(k,n(n({ref:t},p),{},{components:a})):r.createElement(k,n({ref:t},p))}));function u(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=a.length,n=new Array(o);n[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:s,n[1]=c;for(var d=2;d<o;d++)n[d]=a[d];return r.createElement.apply(null,n)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},4017:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>n,default:()=>i,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var r=a(7462),s=(a(7294),a(3905));const o={custom_edit_url:null},n="HotspotRenderer",c={unversionedId:"api/Class/HotspotRenderer",id:"api/Class/HotspotRenderer",title:"HotspotRenderer",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Class/HotspotRenderer.mdx",sourceDirName:"api/Class",slug:"/api/Class/HotspotRenderer",permalink:"/egjs-view360/ko/docs/api/Class/HotspotRenderer",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Hotspot",permalink:"/egjs-view360/ko/docs/api/Class/Hotspot"},next:{title:"Motion",permalink:"/egjs-view360/ko/docs/api/Class/Motion"}},l={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Methods",id:"methods",level:2},{value:"refresh",id:"refresh",level:3},{value:"render",id:"render",level:3}],p={toc:d};function i(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"hotspotrenderer"},"HotspotRenderer"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/hotspot/HotspotRenderer.ts#L34"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"Hotspot \ub80c\ub354\ub7ec")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"class HotspotRenderer\n")),(0,s.kt)("div",{className:"doc-summary doc-methods"},(0,s.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#refresh"},"refresh")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud56b\uc2a4\ud31f \ub8e8\ud2b8 \uc5d8\ub9ac\uba3c\ud2b8 \ub0b4\uc5d0\uc11c \ud56b\uc2a4\ud31f \uc5d8\ub9ac\uba3c\ud2b8\ub4e4\uc744 \uc218\uc9d1\ud558\uc5ec \uac31\uc2e0\ud569\ub2c8\ub2e4."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#render"},"render")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ud56b\uc2a4\ud31f\ub4e4\uc744 \ub80c\ub354\ub9c1\ud569\ub2c8\ub2e4.")))),(0,s.kt)("h2",{id:"constructor"},"Constructor"),(0,s.kt)("div",{className:"doc-member-subtitle"},"\uc0c8 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"new HotspotRenderer(rootEl: HTMLElement, renderer: WebGLRenderer, options: Partial<HotspotOptions>): HotspotRenderer\n")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"rootEl"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"HTMLElement"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ud56b\uc2a4\ud31f\ub4e4\uc758 \ucee8\ud14c\uc774\ub108 \uc5d8\ub9ac\uba3c\ud2b8"))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"renderer"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"WebGLRenderer"},"WebGLRenderer")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"WebGLRenderer\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"options"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"Partial","<",(0,s.kt)("a",{parentName:"p",href:"../Interface/HotspotOptions"},"HotspotOptions"),">"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Hotspot \uc635\uc158\ub4e4"))),(0,s.kt)("h2",{id:"methods"},"Methods"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"refresh"},"refresh")),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"refresh"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"refresh(): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud56b\uc2a4\ud31f \ub8e8\ud2b8 \uc5d8\ub9ac\uba3c\ud2b8 \ub0b4\uc5d0\uc11c \ud56b\uc2a4\ud31f \uc5d8\ub9ac\uba3c\ud2b8\ub4e4\uc744 \uc218\uc9d1\ud558\uc5ec \uac31\uc2e0\ud569\ub2c8\ub2e4.")),(0,s.kt)("h4",{className:"doc-comment-title"},"Throws"),(0,s.kt)("p",null,"data-position\uc774 x, y, z\uc88c\ud45c\ub97c \uc804\ubd80 \ud3ec\ud568\ud558\uace0 \uc788\uc9c0 \uc54a\uc744 \ub54c")),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/hotspot/HotspotRenderer.ts#L65"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"render"},"render")),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"render"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"render(camera: Camera): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ud56b\uc2a4\ud31f\ub4e4\uc744 \ub80c\ub354\ub9c1\ud569\ub2c8\ub2e4.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"camera"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"Camera"},"Camera")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Camera\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/hotspot/HotspotRenderer.ts#L78"},"source")))))}i.isMDXComponent=!0}}]);