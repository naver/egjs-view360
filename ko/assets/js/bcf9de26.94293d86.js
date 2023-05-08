"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3145],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>u});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=o.createContext({}),l=function(e){var t=o.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(r),u=n,k=d["".concat(c,".").concat(u)]||d[u]||m[u]||a;return r?o.createElement(k,i(i({ref:t},p),{},{components:r})):o.createElement(k,i({ref:t},p))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var l=2;l<a;l++)i[l]=r[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"},285:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var o=r(7462),n=(r(7294),r(3905));const a={custom_edit_url:null},i="ControlBarItemOptions",s={unversionedId:"api/Plugin/Interface/ControlBarItemOptions",id:"api/Plugin/Interface/ControlBarItemOptions",title:"ControlBarItemOptions",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Plugin/Interface/ControlBarItemOptions.mdx",sourceDirName:"api/Plugin/Interface",slug:"/api/Plugin/Interface/ControlBarItemOptions",permalink:"/egjs-view360/ko/docs/api/Plugin/Interface/ControlBarItemOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"AutoHideOptions",permalink:"/egjs-view360/ko/docs/api/Plugin/Interface/AutoHideOptions"},next:{title:"ControlBarOptions",permalink:"/egjs-view360/ko/docs/api/Plugin/Interface/ControlBarOptions"}},c={},l=[{value:"Properties",id:"properties",level:2},{value:"order",id:"order",level:3},{value:"position",id:"position",level:3}],p={toc:l};function m(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"controlbaritemoptions"},"ControlBarItemOptions"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L16"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"../ControlBar/ControlBarItem"},"ControlBarItem"),"\uc758 \uacf5\ud1b5 \uc635\uc158\ub4e4")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface ControlBarItemOptions\n")),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#order"},"order")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\ub3d9\uc77c\ud55c position \ub0b4\uc5d0\uc11c\uc758 \uc21c\uc11c, \uc791\uc744\uc218\ub85d \uba3c\uc800 \ud45c\uc2dc\ub429\ub2c8\ub2e4."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#position"},"position")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ud45c\uc2dc\ud560 \uc704\uce58.")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"order"},"order")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"order"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"number"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\ub3d9\uc77c\ud55c position \ub0b4\uc5d0\uc11c\uc758 \uc21c\uc11c, \uc791\uc744\uc218\ub85d \uba3c\uc800 \ud45c\uc2dc\ub429\ub2c8\ub2e4."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L24"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"position"},"position")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"position"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,'"',"top-left",'"',"\xa0","|","\xa0",'"',"top-right",'"',"\xa0","|","\xa0",'"',"main-top",'"',"\xa0","|","\xa0",'"',"main-bottom",'"',"\xa0","|","\xa0",'"',"main-left",'"',"\xa0","|","\xa0",'"',"main-right",'"'))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ud45c\uc2dc\ud560 \uc704\uce58."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L20"},"source")))))}m.isMDXComponent=!0}}]);