"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1142],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>u});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(r),u=a,v=m["".concat(i,".").concat(u)]||m[u]||d[u]||s;return r?n.createElement(v,o(o({ref:t},p),{},{components:r})):n.createElement(v,o({ref:t},p))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<s;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},958:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const s={custom_edit_url:null},o="RenderEvent",c={unversionedId:"api/Event/RenderEvent",id:"api/Event/RenderEvent",title:"RenderEvent",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Event/RenderEvent.mdx",sourceDirName:"api/Event",slug:"/api/Event/RenderEvent",permalink:"/egjs-view360/ko/docs/api/Event/RenderEvent",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"ReadyEvent",permalink:"/egjs-view360/ko/docs/api/Event/ReadyEvent"},next:{title:"ResizeEvent",permalink:"/egjs-view360/ko/docs/api/Event/ResizeEvent"}},i={},l=[{value:"Properties",id:"properties",level:2},{value:"target",id:"target",level:3},{value:"type",id:"type",level:3}],p={toc:l};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"renderevent"},"RenderEvent"),(0,a.kt)("div",{className:"doc-side"},(0,a.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,a.kt)("div",{className:"doc-main-source"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L190"},"source")))),(0,a.kt)("div",{className:"doc-subtitle"},(0,a.kt)("p",null,"\uc0c8\ub85c\uc6b4 \ud504\ub808\uc784 \ub80c\ub354 \uc9c1\ud6c4\uc5d0 \ubc1c\uc0dd\ud558\ub294 \uc774\ubca4\ud2b8")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"interface RenderEvent\n")),(0,a.kt)("div",{className:"doc-summary doc-properties"},(0,a.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,a.kt)("div",{className:"doc-summary-item"},(0,a.kt)("div",{className:"doc-summary-name"},(0,a.kt)("a",{href:"#target"},"target")),(0,a.kt)("div",{className:"doc-summary-desc"},(0,a.kt)("p",null,"\uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a8 \ucef4\ud3ec\ub10c\ud2b8\uc758 \uc778\uc2a4\ud134\uc2a4."))),(0,a.kt)("div",{className:"doc-summary-item"},(0,a.kt)("div",{className:"doc-summary-name"},(0,a.kt)("a",{href:"#type"},"type")),(0,a.kt)("div",{className:"doc-summary-desc"},(0,a.kt)("p",null,"\uc774\ubca4\ud2b8 \ud0c0\uc785.",(0,a.kt)("br",{parentName:"p"}),"\n","\uc774\ubca4\ud2b8 \uc774\ub984\uacfc \uac12\uc774 \uac19\uc2b5\ub2c8\ub2e4.")))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("div",{className:"doc-header-hidden"},(0,a.kt)("h3",{id:"target"},"target")),(0,a.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,a.kt)("div",{className:"doc-entry"},(0,a.kt)("details",{open:!0,className:"doc-property"},(0,a.kt)("summary",{className:"doc-member"},(0,a.kt)("span",{className:"doc-name"},"target"),(0,a.kt)("span",{className:"doc-type"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"../Class/View360"},"View360")))),(0,a.kt)("div",{className:"doc-desc"},(0,a.kt)("p",null,"\uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a8 \ucef4\ud3ec\ub10c\ud2b8\uc758 \uc778\uc2a4\ud134\uc2a4.")),(0,a.kt)("admonition",{title:"Example",type:"info"},(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.target); // = viewer\n});\n')))),(0,a.kt)("div",{className:"doc-source"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L198"},"source")))),(0,a.kt)("div",{className:"doc-header-hidden"},(0,a.kt)("h3",{id:"type"},"type")),(0,a.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,a.kt)("div",{className:"doc-entry"},(0,a.kt)("details",{open:!0,className:"doc-property"},(0,a.kt)("summary",{className:"doc-member"},(0,a.kt)("span",{className:"doc-name"},"type"),(0,a.kt)("span",{className:"doc-type"},(0,a.kt)("p",null,"string"))),(0,a.kt)("div",{className:"doc-desc"},(0,a.kt)("p",null,"\uc774\ubca4\ud2b8 \ud0c0\uc785.",(0,a.kt)("br",{parentName:"p"}),"\n","\uc774\ubca4\ud2b8 \uc774\ub984\uacfc \uac12\uc774 \uac19\uc2b5\ub2c8\ub2e4.")),(0,a.kt)("admonition",{title:"Example",type:"info"},(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.type); // "ready"\n});\n')))),(0,a.kt)("div",{className:"doc-source"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L194"},"source")))))}d.isMDXComponent=!0}}]);