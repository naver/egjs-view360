"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4381],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var r=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,r,o=function(e,t){if(null==e)return{};var a,r,o={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var i=r.createContext({}),l=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,o=e.mdxType,n=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(a),u=o,k=d["".concat(i,".").concat(u)]||d[u]||m[u]||n;return a?r.createElement(k,s(s({ref:t},p),{},{components:a})):r.createElement(k,s({ref:t},p))}));function u(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=a.length,s=new Array(n);s[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,s[1]=c;for(var l=2;l<n;l++)s[l]=a[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},6417:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>n,metadata:()=>c,toc:()=>l});var r=a(7462),o=(a(7294),a(3905));const n={custom_edit_url:null},s="CubemapProjectionOptions",c={unversionedId:"api/Projection/Interface/CubemapProjectionOptions",id:"api/Projection/Interface/CubemapProjectionOptions",title:"CubemapProjectionOptions",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Projection/Interface/CubemapProjectionOptions.mdx",sourceDirName:"api/Projection/Interface",slug:"/api/Projection/Interface/CubemapProjectionOptions",permalink:"/egjs-view360/ko/docs/api/Projection/Interface/CubemapProjectionOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"StereoEquiProjection",permalink:"/egjs-view360/ko/docs/api/Projection/Class/StereoEquiProjection"},next:{title:"CubestripProjectionOptions",permalink:"/egjs-view360/ko/docs/api/Projection/Interface/CubestripProjectionOptions"}},i={},l=[{value:"Properties",id:"properties",level:2},{value:"cubemapFlipX",id:"cubemapFlipX",level:3},{value:"cubemapOrder",id:"cubemapOrder",level:3},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3}],p={toc:l};function m(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"cubemapprojectionoptions"},"CubemapProjectionOptions"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/projection/CubemapProjection.ts#L23"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../Class/CubemapProjection"},"CubemapProjection"),"\uc758 \uc635\uc158\ub4e4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"interface CubemapProjectionOptions extends ProjectionOptions\n")),(0,o.kt)("h3",null,"Extends"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"ProjectionOptions"},"ProjectionOptions"))),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#cubemapFlipX"},"cubemapFlipX")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ud050\ube0c\ub9f5 \uc774\ubbf8\uc9c0\ub97c \uc88c\uc6b0\ub300\uce6d\ud560\uc9c0 \uc5ec\ubd80."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#cubemapOrder"},"cubemapOrder")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ud050\ube0c\ub9f5 \uc774\ubbf8\uc9c0\uc758 \uc21c\uc11c."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#src"},"src")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#video"},"video")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"cubemapFlipX"},"cubemapFlipX")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"cubemapFlipX"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"false"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ud050\ube0c\ub9f5 \uc774\ubbf8\uc9c0\ub97c \uc88c\uc6b0\ub300\uce6d\ud560\uc9c0 \uc5ec\ubd80."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/projection/CubemapProjection.ts#L37"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"cubemapOrder"},"cubemapOrder")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"cubemapOrder"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"string")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,'"RLUDFB" (Right - Left - Up - Down - Front - Back)'))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ud050\ube0c\ub9f5 \uc774\ubbf8\uc9c0\uc758 \uc21c\uc11c."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/projection/CubemapProjection.ts#L30"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"src"},"src")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"src"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ud30c\ub178\ub77c\ub9c8 \uc774\ubbf8\uc9c0/\ube44\ub514\uc624\uc758 URL"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/projection/Projection.ts#L29"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"video"},"video")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"video"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,o.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc124\uc815\ud560 \ud504\ub85c\ud37c\ud2f0\ub97c \ub2f4\ub294 \uac1d\uccb4.")),(0,o.kt)("admonition",{title:"Example",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Default properties"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/projection/Projection.ts#L33"},"source")))))}m.isMDXComponent=!0}}]);