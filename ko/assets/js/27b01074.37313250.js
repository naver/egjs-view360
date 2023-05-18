"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[673],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),l=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=l(e.components);return r.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=l(a),u=n,v=m["".concat(o,".").concat(u)]||m[u]||d[u]||s;return a?r.createElement(v,c(c({ref:t},p),{},{components:a})):r.createElement(v,c({ref:t},p))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=a.length,c=new Array(s);c[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var l=2;l<s;l++)c[l]=a[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9656:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=a(7462),n=(a(7294),a(3905));const s={custom_edit_url:null},c="StaticClickEvent",i={unversionedId:"api/Event/StaticClickEvent",id:"api/Event/StaticClickEvent",title:"StaticClickEvent",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Event/StaticClickEvent.mdx",sourceDirName:"api/Event",slug:"/api/Event/StaticClickEvent",permalink:"/egjs-view360/ko/docs/api/Event/StaticClickEvent",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"ResizeEvent",permalink:"/egjs-view360/ko/docs/api/Event/ResizeEvent"},next:{title:"VREndEvent",permalink:"/egjs-view360/ko/docs/api/Event/VREndEvent"}},o={},l=[{value:"Properties",id:"properties",level:2},{value:"isTouch",id:"isTouch",level:3},{value:"target",id:"target",level:3},{value:"type",id:"type",level:3}],p={toc:l};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"staticclickevent"},"StaticClickEvent"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/type/events.ts#L338"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,"\uce94\ubc84\uc2a4 \uc5d8\ub9ac\uba3c\ud2b8\ub97c \ub4dc\ub798\uadf8\ud558\uc9c0 \uc54a\uace0 \ud074\ub9ad\ud588\uc744 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc774\ubca4\ud2b8.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface StaticClickEvent\n")),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#isTouch"},"isTouch")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uc0ac\uc6a9\uc790 \uc785\ub825\uc774 \ud130\uce58\ub97c \ud1b5\ud55c \uac83\uc774\uc5c8\ub294\uc9c0 \uc5ec\ubd80\ub97c \ub098\ud0c0\ub0b4\ub294 \uac12."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#target"},"target")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a8 \ucef4\ud3ec\ub10c\ud2b8\uc758 \uc778\uc2a4\ud134\uc2a4."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#type"},"type")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8 \ud0c0\uc785.",(0,n.kt)("br",{parentName:"p"}),"\n","\uc774\ubca4\ud2b8 \uc774\ub984\uacfc \uac12\uc774 \uac19\uc2b5\ub2c8\ub2e4.")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"isTouch"},"isTouch")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"isTouch"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uc0ac\uc6a9\uc790 \uc785\ub825\uc774 \ud130\uce58\ub97c \ud1b5\ud55c \uac83\uc774\uc5c8\ub294\uc9c0 \uc5ec\ubd80\ub97c \ub098\ud0c0\ub0b4\ub294 \uac12."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/type/events.ts#L350"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"target"},"target")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"target"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"../Class/View360"},"View360")))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a8 \ucef4\ud3ec\ub10c\ud2b8\uc758 \uc778\uc2a4\ud134\uc2a4.")),(0,n.kt)("admonition",{title:"Example",type:"info"},(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.target); // = viewer\n});\n')))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/type/events.ts#L346"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"type"},"type")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"type"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"string"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8 \ud0c0\uc785.",(0,n.kt)("br",{parentName:"p"}),"\n","\uc774\ubca4\ud2b8 \uc774\ub984\uacfc \uac12\uc774 \uac19\uc2b5\ub2c8\ub2e4.")),(0,n.kt)("admonition",{title:"Example",type:"info"},(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.type); // "ready"\n});\n')))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/type/events.ts#L342"},"source")))))}d.isMDXComponent=!0}}]);