"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[716],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var r=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function n(e,t){if(null==e)return{};var a,r,s=function(e,t){if(null==e)return{};var a,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var l=r.createContext({}),i=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},d=function(e){var t=i(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,d=n(e,["components","mdxType","originalType","parentName"]),p=i(a),u=s,k=p["".concat(l,".").concat(u)]||p[u]||m[u]||o;return a?r.createElement(k,c(c({ref:t},d),{},{components:a})):r.createElement(k,c({ref:t},d))}));function u(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=a.length,c=new Array(o);c[0]=p;var n={};for(var l in t)hasOwnProperty.call(t,l)&&(n[l]=t[l]);n.originalType=e,n.mdxType="string"==typeof e?e:s,c[1]=n;for(var i=2;i<o;i++)c[i]=a[i];return r.createElement.apply(null,c)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},2950:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>o,metadata:()=>n,toc:()=>i});var r=a(7462),s=(a(7294),a(3905));const o={custom_edit_url:null},c="EquirectProjection",n={unversionedId:"api/Projection/Class/EquirectProjection",id:"api/Projection/Class/EquirectProjection",title:"EquirectProjection",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Projection/Class/EquirectProjection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/EquirectProjection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/EquirectProjection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"EquiangularProjection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/EquiangularProjection"},next:{title:"LittlePlanetProjection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/LittlePlanetProjection"}},l={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"createMesh",id:"createMesh",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],d={toc:i};function m(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,r.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"equirectprojection"},"EquirectProjection"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/projection/EquirectProjection.ts#L31"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"\ub4f1 \uc7a5\ubc29\ud615 \ub3c4\ubc95(Equirectangular projection) \uae30\ubc18\uc758 \ud504\ub85c\uc81d\uc158")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"class EquirectProjection extends Projection\n")),(0,s.kt)("h3",null,"Extends"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"Projection"},"Projection"))),(0,s.kt)("div",{className:"doc-summary doc-properties"},(0,s.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#src"},"src")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#video"},"video")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")))),(0,s.kt)("div",{className:"doc-summary doc-methods"},(0,s.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#createMesh"},"createMesh")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc73c\ub85c\ubd80\ud130 TriangleMesh\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \uce74\uba54\ub77c\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#updateControl"},"updateControl")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \ucee8\ud2b8\ub864\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")))),(0,s.kt)("h2",{id:"constructor"},"Constructor"),(0,s.kt)("div",{className:"doc-member-subtitle"},"\uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"new EquirectProjection(options: EquirectProjectionOptions): EquirectProjection\n")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"options"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Interface/EquirectProjectionOptions"},"EquirectProjectionOptions")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc635\uc158\ub4e4"))),(0,s.kt)("h2",{id:"properties"},"Properties"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"src"},"src")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"src"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/projection/Projection.ts#L41"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"video"},"video")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"video"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,s.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")),(0,s.kt)("admonition",{title:"Example",type:"info"},(0,s.kt)("p",{parentName:"admonition"},"Default properties"),(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/projection/Projection.ts#L56"},"source")))),(0,s.kt)("h2",{id:"methods"},"Methods"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"createMesh"},"createMesh")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"createMesh"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"TriangleMesh","<","{","\xa0","uTexture:","\xa0","UniformTexture2D","\xa0","}",">"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"createMesh(ctx: WebGLContext, texture: Texture2D): TriangleMesh<{ uTexture: UniformTexture2D }>\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc73c\ub85c\ubd80\ud130 TriangleMesh\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"ctx"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"WebGLContext"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"WebGL context \ud5ec\ud37c\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"texture"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"Texture2D"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc0c8\ub85c \uc801\uc6a9\ud560 \ud14d\uc2a4\uccd0")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/projection/EquirectProjection.ts#L41"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"updateCamera"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \uce74\uba54\ub77c\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"camera"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc5c5\ub370\uc774\ud2b8\ud560 \uce74\uba54\ub77c\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/projection/Projection.ts#L87"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"updateControl"},"updateControl")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"updateControl"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \ucee8\ud2b8\ub864\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"control"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc5c5\ub370\uc774\ud2b8\ud560 \ucee8\ud2b8\ub864\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/projection/Projection.ts#L98"},"source")))))}m.isMDXComponent=!0}}]);