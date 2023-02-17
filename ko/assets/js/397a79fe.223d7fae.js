"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3537],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>u});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),l=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=l(r),u=n,v=d["".concat(c,".").concat(u)]||d[u]||p[u]||o;return r?a.createElement(v,i(i({ref:t},m),{},{components:r})):a.createElement(v,i({ref:t},m))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2648:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=r(7462),n=(r(7294),r(3905));const o={custom_edit_url:null},i="CameraEvents",s={unversionedId:"api/Interface/CameraEvents",id:"api/Interface/CameraEvents",title:"CameraEvents",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Interface/CameraEvents.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/CameraEvents",permalink:"/egjs-view360/ko/docs/api/Interface/CameraEvents",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"CameraControl",permalink:"/egjs-view360/ko/docs/api/Interface/CameraControl"},next:{title:"CameraOptions",permalink:"/egjs-view360/ko/docs/api/Interface/CameraOptions"}},c={},l=[{value:"Properties",id:"properties",level:2},{value:"animationEnd",id:"animationEnd",level:3}],m={toc:l};function p(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"cameraevents"},"CameraEvents"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Camera.ts#L32"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"../Class/Camera"},"Camera"),"\uac00 \ud2b8\ub9ac\uac70\ud560 \uc218 \uc788\ub294 \uc774\ubca4\ud2b8\ub4e4")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface CameraEvents\n")),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#animationEnd"},"animationEnd")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uce74\uba54\ub77c \uc560\ub2c8\uba54\uc774\uc158\uc774 \uba48\ucdc4\uc744 \ub54c \ud2b8\ub9ac\uac70\ub418\ub294 \uc774\ubca4\ud2b8")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"animationEnd"},"animationEnd")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"animationEnd"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"{","\xa0","animation:","\xa0",(0,n.kt)("a",{parentName:"p",href:"../Class/CameraAnimation"},"CameraAnimation"),"\xa0","}"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uce74\uba54\ub77c \uc560\ub2c8\uba54\uc774\uc158\uc774 \uba48\ucdc4\uc744 \ub54c \ud2b8\ub9ac\uac70\ub418\ub294 \uc774\ubca4\ud2b8"))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/core/Camera.ts#L40"},"source")))))}p.isMDXComponent=!0}}]);