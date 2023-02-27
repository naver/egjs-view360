"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3152],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>k});var s=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function d(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function c(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?d(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function n(e,a){if(null==e)return{};var t,s,r=function(e,a){if(null==e)return{};var t,s,r={},d=Object.keys(e);for(s=0;s<d.length;s++)t=d[s],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(e);for(s=0;s<d.length;s++)t=d[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=s.createContext({}),l=function(e){var a=s.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):c(c({},a),e)),t},m=function(e){var a=l(e.components);return s.createElement(o.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,r=e.mdxType,d=e.originalType,o=e.parentName,m=n(e,["components","mdxType","originalType","parentName"]),p=l(t),k=r,u=p["".concat(o,".").concat(k)]||p[k]||i[k]||d;return t?s.createElement(u,c(c({ref:a},m),{},{components:t})):s.createElement(u,c({ref:a},m))}));function k(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var d=t.length,c=new Array(d);c[0]=p;var n={};for(var o in a)hasOwnProperty.call(a,o)&&(n[o]=a[o]);n.originalType=e,n.mdxType="string"==typeof e?e:r,c[1]=n;for(var l=2;l<d;l++)c[l]=t[l];return s.createElement.apply(null,c)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},3237:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>c,default:()=>i,frontMatter:()=>d,metadata:()=>n,toc:()=>l});var s=t(7462),r=(t(7294),t(3905));const d={custom_edit_url:null},c="WebGLRenderer",n={unversionedId:"api/Class/WebGLRenderer",id:"api/Class/WebGLRenderer",title:"WebGLRenderer",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Class/WebGLRenderer.mdx",sourceDirName:"api/Class",slug:"/api/Class/WebGLRenderer",permalink:"/egjs-view360/ko/docs/api/Class/WebGLRenderer",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"View360Error",permalink:"/egjs-view360/ko/docs/api/Class/View360Error"},next:{title:"XRManager",permalink:"/egjs-view360/ko/docs/api/Class/XRManager"}},o={},l=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"ctx",id:"ctx",level:3},{value:"aspect",id:"aspect",level:3},{value:"canvas",id:"canvas",level:3},{value:"height",id:"height",level:3},{value:"pixelRatio",id:"pixelRatio",level:3},{value:"width",id:"width",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"render",id:"render",level:3},{value:"renderVR",id:"renderVR",level:3},{value:"resize",id:"resize",level:3}],m={toc:l};function i(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,s.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"webglrenderer"},"WebGLRenderer"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L16"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"WebGL \uae30\ubc18\uc758 \ud504\ub85c\uc81d\uc158 \ub80c\ub354\ub7ec")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class WebGLRenderer\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#ctx"},"ctx")),(0,r.kt)("div",{className:"doc-summary-desc"})),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#aspect"},"aspect")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ub108\ube44 / \ub192\uc774\uc758 \ube44\uc728 (= width / height)"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#canvas"},"canvas")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4 \uc5d8\ub9ac\uba3c\ud2b8"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#height"},"height")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4\uc758 \ub192\uc774 (",(0,r.kt)("inlineCode",{parentName:"p"},"devicePixelRatio"),"\uac00 \uc801\uc6a9\ub418\uc9c0 \uc54a\uc740)"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#pixelRatio"},"pixelRatio")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac ",(0,r.kt)("inlineCode",{parentName:"p"},"devicePixelRatio")," \uac12."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#width"},"width")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4\uc758 \ubcf4\uc774\ub294 \ub108\ube44 (",(0,r.kt)("inlineCode",{parentName:"p"},"devicePixelRatio"),"\uac00 \uc801\uc6a9\ub418\uc9c0 \uc54a\uc740)")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#destroy"},"destroy")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc778\uc2a4\ud134\uc2a4\ub97c \uc81c\uac70\ud558\uace0 \uc0ac\uc6a9\ub41c \ub9ac\uc18c\uc2a4\ub97c \uc804\ubd80 \ud574\uc81c\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#render"},"render")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud504\ub85c\uc81d\uc158\uc744 \ub80c\ub354\ub9c1\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#renderVR"},"renderVR")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"VR \ud504\ub808\uc784\uc744 \ub80c\ub354\ub9c1\ud569\ub2c8\ub2e4. VR \uc138\uc158 \uc9c4\uc785 \ub3c4\uc911\uc5d0\ub9cc \uc0ac\uc6a9\ub429\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#resize"},"resize")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4\uc758 \ud06c\uae30\ub97c \uc7ac\uacc4\uc0b0\ud574\uc11c \ub0b4\ubd80\uc758 \uc0ac\uc774\uc988 \uce90\uc2dc\uac12\uc744 \uac31\uc2e0\ud569\ub2c8\ub2e4.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"\uc0c8 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new WebGLRenderer(canvas: HTMLCanvasElement, debug: boolean): WebGLRenderer\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"canvas"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"HTMLCanvasElement"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4 \uc5d8\ub9ac\uba3c\ud2b8"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"debug"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"boolean"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"WebGL debug \ud65c\uc131\ud654 \uc5ec\ubd80"))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"ctx"},"ctx")),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"ctx"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"WebGLContext")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L21"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"aspect"},"aspect")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"aspect"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ub108\ube44 / \ub192\uc774\uc758 \ube44\uc728 (= width / height)")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const aspect = view360.renderer.width / view360.renderer.pixelRatio;\nassert(aspect === view360.renderer.aspect);\n")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L61"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"canvas"},"canvas")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"canvas"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"HTMLCanvasElement"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4 \uc5d8\ub9ac\uba3c\ud2b8"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L28"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"height"},"height")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"height"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4\uc758 \ub192\uc774 (",(0,r.kt)("inlineCode",{parentName:"p"},"devicePixelRatio"),"\uac00 \uc801\uc6a9\ub418\uc9c0 \uc54a\uc740)"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L40"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"pixelRatio"},"pixelRatio")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"pixelRatio"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac ",(0,r.kt)("inlineCode",{parentName:"p"},"devicePixelRatio")," \uac12.")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},"cosnt renderingWidth = view360.renderer.width * view360.renderer.pixelRatio;\n")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L50"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"width"},"width")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"width"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4\uc758 \ubcf4\uc774\ub294 \ub108\ube44 (",(0,r.kt)("inlineCode",{parentName:"p"},"devicePixelRatio"),"\uac00 \uc801\uc6a9\ub418\uc9c0 \uc54a\uc740)"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L34"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"destroy"},"destroy")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"destroy"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc778\uc2a4\ud134\uc2a4\ub97c \uc81c\uac70\ud558\uace0 \uc0ac\uc6a9\ub41c \ub9ac\uc18c\uc2a4\ub97c \uc804\ubd80 \ud574\uc81c\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L81"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"render"},"render")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"render"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"render(projection: Projection<CommonProjectionUniforms>, camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud504\ub85c\uc81d\uc158\uc744 \ub80c\ub354\ub9c1\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"projection"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Projection/Class/Projection"},"Projection"),"<","CommonProjectionUniforms",">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ub80c\ub354\ub9c1\ud560 \ud504\ub85c\uc81d\uc158"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"Camera"},"Camera")))))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L116"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"renderVR"},"renderVR")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"renderVR"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"renderVR(projection: Projection<CommonProjectionUniforms>, vr: XRManager, frame: XRFrame): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"VR \ud504\ub808\uc784\uc744 \ub80c\ub354\ub9c1\ud569\ub2c8\ub2e4. VR \uc138\uc158 \uc9c4\uc785 \ub3c4\uc911\uc5d0\ub9cc \uc0ac\uc6a9\ub429\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"projection"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Projection/Class/Projection"},"Projection"),"<","CommonProjectionUniforms",">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ub80c\ub354\ub9c1\ud560 \ud504\ub85c\uc81d\uc158"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"vr"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"XRManager"},"XRManager")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"XRManager\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"frame"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"XRFrame"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"VR \ud504\ub808\uc784")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L138"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"resize"},"resize")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"resize"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"resize(): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uce94\ubc84\uc2a4\uc758 \ud06c\uae30\ub97c \uc7ac\uacc4\uc0b0\ud574\uc11c \ub0b4\ubd80\uc758 \uc0ac\uc774\uc988 \uce90\uc2dc\uac12\uc744 \uac31\uc2e0\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/WebGLRenderer.ts#L94"},"source")))))}i.isMDXComponent=!0}}]);