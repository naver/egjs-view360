"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8230],{3905:(e,t,a)=>{a.d(t,{Zo:()=>i,kt:()=>u});var s=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function n(e,t){if(null==e)return{};var a,s,r=function(e,t){if(null==e)return{};var a,s,r={},o=Object.keys(e);for(s=0;s<o.length;s++)a=o[s],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)a=o[s],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=s.createContext({}),d=function(e){var t=s.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},i=function(e){var t=d(e.components);return s.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},p=s.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,i=n(e,["components","mdxType","originalType","parentName"]),p=d(a),u=r,k=p["".concat(l,".").concat(u)]||p[u]||m[u]||o;return a?s.createElement(k,c(c({ref:t},i),{},{components:a})):s.createElement(k,c({ref:t},i))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,c=new Array(o);c[0]=p;var n={};for(var l in t)hasOwnProperty.call(t,l)&&(n[l]=t[l]);n.originalType=e,n.mdxType="string"==typeof e?e:r,c[1]=n;for(var d=2;d<o;d++)c[d]=a[d];return s.createElement.apply(null,c)}return s.createElement.apply(null,a)}p.displayName="MDXCreateElement"},3460:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>o,metadata:()=>n,toc:()=>d});var s=a(7462),r=(a(7294),a(3905));const o={custom_edit_url:null},c="Projection",n={unversionedId:"api/Projection/Class/Projection",id:"api/Projection/Class/Projection",title:"Projection",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Projection/Class/Projection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/Projection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/Projection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"LittlePlanetProjection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/LittlePlanetProjection"},next:{title:"StereoEquiProjection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/StereoEquiProjection"}},l={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"createMesh",id:"createMesh",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],i={toc:d};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,s.Z)({},i,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"projection"},"Projection"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L35"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"\ud504\ub85c\uc81d\uc158 \ubca0\uc774\uc2a4 \ud074\ub798\uc2a4.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"abstract class Projection\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#src"},"src")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#video"},"video")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#createMesh"},"createMesh")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc73c\ub85c\ubd80\ud130 TriangleMesh\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \uce74\uba54\ub77c\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \ucee8\ud2b8\ub864\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"\uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Projection(options: ProjectionOptions): Projection\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"options"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Interface/ProjectionOptions"},"ProjectionOptions")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc635\uc158\ub4e4"))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"src"},"src")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"src"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L41"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"video"},"video")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"video"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Default properties"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L56"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"createMesh"},"createMesh")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--success"},"abstract"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"createMesh"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"TriangleMesh","<","CommonProjectionUniforms",">"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"createMesh(ctx: WebGLContext, texture: Texture): TriangleMesh<CommonProjectionUniforms>\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc73c\ub85c\ubd80\ud130 TriangleMesh\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"ctx"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"WebGLContext"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"WebGL context \ud5ec\ud37c\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"texture"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"Texture"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc0c8\ub85c \uc801\uc6a9\ud560 \ud14d\uc2a4\uccd0")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L79"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateCamera"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \uce74\uba54\ub77c\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc5c5\ub370\uc774\ud2b8\ud560 \uce74\uba54\ub77c\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L87"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateControl"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \ucee8\ud2b8\ub864\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"control"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc5c5\ub370\uc774\ud2b8\ud560 \ucee8\ud2b8\ub864\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L98"},"source")))))}m.isMDXComponent=!0}}]);