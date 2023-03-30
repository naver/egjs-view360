"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3973],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var s=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,s,r=function(e,t){if(null==e)return{};var a,s,r={},c=Object.keys(e);for(s=0;s<c.length;s++)a=c[s],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(s=0;s<c.length;s++)a=c[s],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var n=s.createContext({}),i=function(e){var t=s.useContext(n),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=i(e.components);return s.createElement(n.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},p=s.forwardRef((function(e,t){var a=e.components,r=e.mdxType,c=e.originalType,n=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=i(a),u=r,k=p["".concat(n,".").concat(u)]||p[u]||m[u]||c;return a?s.createElement(k,o(o({ref:t},d),{},{components:a})):s.createElement(k,o({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=a.length,o=new Array(c);o[0]=p;var l={};for(var n in t)hasOwnProperty.call(t,n)&&(l[n]=t[n]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var i=2;i<c;i++)o[i]=a[i];return s.createElement.apply(null,o)}return s.createElement.apply(null,a)}p.displayName="MDXCreateElement"},2050:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>n,contentTitle:()=>o,default:()=>m,frontMatter:()=>c,metadata:()=>l,toc:()=>i});var s=a(7462),r=(a(7294),a(3905));const c={custom_edit_url:null},o="Object3D",l={unversionedId:"api/Class/Object3D",id:"api/Class/Object3D",title:"Object3D",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Class/Object3D.mdx",sourceDirName:"api/Class",slug:"/api/Class/Object3D",permalink:"/egjs-view360/ko/docs/api/Class/Object3D",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Motion",permalink:"/egjs-view360/ko/docs/api/Class/Motion"},next:{title:"PanoControl",permalink:"/egjs-view360/ko/docs/api/Class/PanoControl"}},n={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"matrix",id:"matrix",level:3},{value:"position",id:"position",level:3},{value:"rotation",id:"rotation",level:3},{value:"scale",id:"scale",level:3},{value:"Methods",id:"methods",level:2},{value:"updateMatrix",id:"updateMatrix",level:3}],d={toc:i};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,s.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"object3d"},"Object3D"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/core/Object3D.ts#L13"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"3D \uc624\ube0c\uc81d\ud2b8\uc758 \ubca0\uc774\uc2a4 \ud074\ub798\uc2a4")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class Object3D\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#matrix"},"matrix")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uc758 local matrix"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#position"},"position")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uc758 \uc704\uce58"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#rotation"},"rotation")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \uc624\ube0c\uc81d\ud2b8\uc758 \ud68c\uc804\uc744 \ub098\ud0c0\ub0b4\ub294 \uc0ac\uc6d0\uc218 \uac12"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#scale"},"scale")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uac00 \uac01 \ucd95\uc73c\ub85c \ud655\ub300\ub41c \uc815\ub3c4\ub97c \ub098\ud0c0\ub0b4\ub294 \ubca1\ud130")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateMatrix"},"updateMatrix")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uc758 local matrix\ub97c \uac31\uc2e0\ud569\ub2c8\ub2e4.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"\uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Object3D(): Object3D\n")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"matrix"},"matrix")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"matrix"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"mat4"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uc758 local matrix"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/core/Object3D.ts#L19"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"position"},"position")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"position"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"vec3"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uc758 \uc704\uce58"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/core/Object3D.ts#L31"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"rotation"},"rotation")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"rotation"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"quat"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \uc624\ube0c\uc81d\ud2b8\uc758 \ud68c\uc804\uc744 \ub098\ud0c0\ub0b4\ub294 \uc0ac\uc6d0\uc218 \uac12"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/core/Object3D.ts#L25"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"scale"},"scale")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"scale"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"vec3"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uac00 \uac01 \ucd95\uc73c\ub85c \ud655\ub300\ub41c \uc815\ub3c4\ub97c \ub098\ud0c0\ub0b4\ub294 \ubca1\ud130"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/core/Object3D.ts#L37"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateMatrix"},"updateMatrix")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateMatrix"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateMatrix(): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc624\ube0c\uc81d\ud2b8\uc758 local matrix\ub97c \uac31\uc2e0\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/core/Object3D.ts#L55"},"source")))))}m.isMDXComponent=!0}}]);