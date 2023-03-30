"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6033],{3905:(e,a,t)=>{t.d(a,{Zo:()=>i,kt:()=>u});var s=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function c(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,s,r=function(e,a){if(null==e)return{};var t,s,r={},o=Object.keys(e);for(s=0;s<o.length;s++)t=o[s],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)t=o[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var n=s.createContext({}),d=function(e){var a=s.useContext(n),t=a;return e&&(t="function"==typeof e?e(a):c(c({},a),e)),t},i=function(e){var a=d(e.components);return s.createElement(n.Provider,{value:a},e.children)},m={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,n=e.parentName,i=l(e,["components","mdxType","originalType","parentName"]),p=d(t),u=r,k=p["".concat(n,".").concat(u)]||p[u]||m[u]||o;return t?s.createElement(k,c(c({ref:a},i),{},{components:t})):s.createElement(k,c({ref:a},i))}));function u(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,c=new Array(o);c[0]=p;var l={};for(var n in a)hasOwnProperty.call(a,n)&&(l[n]=a[n]);l.originalType=e,l.mdxType="string"==typeof e?e:r,c[1]=l;for(var d=2;d<o;d++)c[d]=t[d];return s.createElement.apply(null,c)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},7401:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>n,contentTitle:()=>c,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var s=t(7462),r=(t(7294),t(3905));const o={custom_edit_url:null},c="StereoEquiProjection",l={unversionedId:"api/Projection/Class/StereoEquiProjection",id:"api/Projection/Class/StereoEquiProjection",title:"StereoEquiProjection",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Projection/Class/StereoEquiProjection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/StereoEquiProjection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/StereoEquiProjection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Projection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/Projection"},next:{title:"CubemapProjectionOptions",permalink:"/egjs-view360/ko/docs/api/Projection/Interface/CubemapProjectionOptions"}},n={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"MODE",id:"MODE",level:3},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"applyTexture",id:"applyTexture",level:3},{value:"getMesh",id:"getMesh",level:3},{value:"getTexture",id:"getTexture",level:3},{value:"releaseAllResources",id:"releaseAllResources",level:3},{value:"update",id:"update",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],i={toc:d};function m(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,s.Z)({},i,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"stereoequiprojection"},"StereoEquiProjection"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/StereoEquiProjection.ts#L40"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Stereo equirectangular \uc774\ubbf8\uc9c0 \uae30\ubc18\uc758 \ud504\ub85c\uc81d\uc158")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class StereoEquiProjection extends Projection<{\n  uEye: UniformFloat;\n  uTexScaleOffset: UniformVector4Array;\n  uTexture: UniformTexture2D\n}>\n")),(0,r.kt)("h3",null,"Extends"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"Projection"},"Projection"),"<","{",(0,r.kt)("br",{parentName:"li"}),"","\xa0","uEye:","\xa0","UniformFloat;",(0,r.kt)("br",{parentName:"li"}),"","\xa0","uTexScaleOffset:","\xa0","UniformVector4Array;",(0,r.kt)("br",{parentName:"li"}),"","\xa0","uTexture:","\xa0","UniformTexture2D",(0,r.kt)("br",{parentName:"li"}),"}",">")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#MODE"},"MODE")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc0ac\uc6a9\uac00\ub2a5\ud55c \uc2a4\ud14c\ub808\uc624\uc2a4\ucf54\ud53d \ubaa8\ub4dc\ub4e4"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#src"},"src")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#video"},"video")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#applyTexture"},"applyTexture")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc8fc\uc5b4\uc9c4 \ud14d\uc2a4\uccd0\ub97c \ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc5d0 \uc801\uc6a9\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#getMesh"},"getMesh")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Projection\uc744 \ud45c\uc2dc\ud558\uae30 \uc704\ud55c Mesh, src\ub97c \ub85c\ub4dc\ud558\uae30 \uc804\uae4c\uc9c0\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),"\uc785\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#getTexture"},"getTexture")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud65c\uc131\ud654\ub41c \ud14d\uc2a4\uccd0\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#releaseAllResources"},"releaseAllResources")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \uac16\uace0 \uc788\ub294 \ubaa8\ub4e0 \ub9ac\uc18c\uc2a4\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n","\uc774 \uba54\uc18c\ub4dc\ub294 \ud504\ub85c\uc81d\uc158 \ubcc0\uacbd \ubc0f View360\uc758 destroy \ud638\ucd9c \uc2dc \uc790\ub3d9\uc73c\ub85c \ud638\ucd9c\ub429\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#update"},"update")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158 \uc815\ubcf4\ub97c \uac31\uc2e0\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \uce74\uba54\ub77c\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \ucee8\ud2b8\ub864\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"\uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new StereoEquiProjection(options: StereoEquiProjectionOptions): StereoEquiProjection\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"options"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Interface/StereoEquiProjectionOptions"},"StereoEquiProjectionOptions")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc635\uc158\ub4e4"))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"MODE"},"MODE")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--info"},"static"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"MODE"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"{","\xa0","LEFT_RIGHT:","\xa0",'"',"left_right",'"',";","\xa0","TOP_BOTTOM:","\xa0",'"',"top_bottom",'"',"\xa0","}"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc0ac\uc6a9\uac00\ub2a5\ud55c \uc2a4\ud14c\ub808\uc624\uc2a4\ucf54\ud53d \ubaa8\ub4dc\ub4e4"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/StereoEquiProjection.ts#L50"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"src"},"src")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"src"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L48"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"video"},"video")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"video"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Default properties"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L63"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"applyTexture"},"applyTexture")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"applyTexture"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"applyTexture(ctx: WebGLContext, texture: Texture2D): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc8fc\uc5b4\uc9c4 \ud14d\uc2a4\uccd0\ub97c \ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc5d0 \uc801\uc6a9\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"ctx"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"WebGLContext"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"WebGL context \ud5ec\ud37c\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"texture"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"Texture2D"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc0c8\ub85c \uc801\uc6a9\ud560 \ud14d\uc2a4\uccd0")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/StereoEquiProjection.ts#L76"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"getMesh"},"getMesh")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"getMesh"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"null","\xa0","|","\xa0","TriangleMesh","<","{","\xa0","uEye:","\xa0","UniformFloat;","\xa0","\xa0","\xa0","uTexScaleOffset:","\xa0","UniformVector4Array;","\xa0","\xa0","\xa0","uTexture:","\xa0","UniformTexture2D","\xa0","}",">"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"getMesh(): null | TriangleMesh<{ uEye: UniformFloat; uTexScaleOffset: UniformVector4Array; uTexture: UniformTexture2D }>\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Projection\uc744 \ud45c\uc2dc\ud558\uae30 \uc704\ud55c Mesh, src\ub97c \ub85c\ub4dc\ud558\uae30 \uc804\uae4c\uc9c0\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),"\uc785\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L148"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"getTexture"},"getTexture")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"getTexture"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"null","\xa0","|","\xa0","Texture2D","\xa0","|","\xa0","TextureCube"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"getTexture(): null | Texture2D | TextureCube\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud65c\uc131\ud654\ub41c \ud14d\uc2a4\uccd0\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L137"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"releaseAllResources"},"releaseAllResources")),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"releaseAllResources"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"releaseAllResources(ctx: WebGLContext): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \uac16\uace0 \uc788\ub294 \ubaa8\ub4e0 \ub9ac\uc18c\uc2a4\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n","\uc774 \uba54\uc18c\ub4dc\ub294 \ud504\ub85c\uc81d\uc158 \ubcc0\uacbd \ubc0f View360\uc758 destroy \ud638\ucd9c \uc2dc \uc790\ub3d9\uc73c\ub85c \ud638\ucd9c\ub429\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"ctx"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"WebGLContext"))))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L98"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"update"},"update")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"update"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"update(camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158 \uc815\ubcf4\ub97c \uac31\uc2e0\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ucc38\uc870\ud560 \uce74\uba54\ub77c\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L129"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateCamera"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \uce74\uba54\ub77c\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc5c5\ub370\uc774\ud2b8\ud560 \uce74\uba54\ub77c\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L108"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateControl"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\uc158\uc758 \uc138\ud305\uc73c\ub85c \ucee8\ud2b8\ub864\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"control"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc5c5\ub370\uc774\ud2b8\ud560 \ucee8\ud2b8\ub864\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L119"},"source")))))}m.isMDXComponent=!0}}]);