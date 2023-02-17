"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2908],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=r.createContext({}),l=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(a),u=n,v=m["".concat(i,".").concat(u)]||m[u]||d[u]||o;return a?r.createElement(v,s(s({ref:t},p),{},{components:a})):r.createElement(v,s({ref:t},p))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,s=new Array(o);s[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,s[1]=c;for(var l=2;l<o;l++)s[l]=a[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7828:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var r=a(7462),n=(a(7294),a(3905));const o={custom_edit_url:null},s="ProjectionChangeEvent",c={unversionedId:"api/Event/ProjectionChangeEvent",id:"api/Event/ProjectionChangeEvent",title:"ProjectionChangeEvent",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Event/ProjectionChangeEvent.mdx",sourceDirName:"api/Event",slug:"/api/Event/ProjectionChangeEvent",permalink:"/egjs-view360/ko/docs/api/Event/ProjectionChangeEvent",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"LoadStartEvent",permalink:"/egjs-view360/ko/docs/api/Event/LoadStartEvent"},next:{title:"ReadyEvent",permalink:"/egjs-view360/ko/docs/api/Event/ReadyEvent"}},i={},l=[{value:"Properties",id:"properties",level:2},{value:"projection",id:"projection",level:3},{value:"target",id:"target",level:3},{value:"type",id:"type",level:3}],p={toc:l};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"projectionchangeevent"},"ProjectionChangeEvent"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/type/events.ts#L115"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,"\ud504\ub85c\uc81d\uc158\uc774 \ubcc0\uacbd\ub418\uc5c8\uc744 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc774\ubca4\ud2b8")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface ProjectionChangeEvent\n")),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#projection"},"projection")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uc0c8\ub85c \uc801\uc6a9\ub41c \ud504\ub85c\uc81d\uc158\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#target"},"target")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a8 \ucef4\ud3ec\ub10c\ud2b8\uc758 \uc778\uc2a4\ud134\uc2a4."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#type"},"type")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8 \ud0c0\uc785.",(0,n.kt)("br",{parentName:"p"}),"\n","\uc774\ubca4\ud2b8 \uc774\ub984\uacfc \uac12\uc774 \uac19\uc2b5\ub2c8\ub2e4.")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"projection"},"projection")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"projection"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"../Projection/Class/Projection"},"Projection"),"<","CommonProjectionUniforms",">"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uc0c8\ub85c \uc801\uc6a9\ub41c \ud504\ub85c\uc81d\uc158\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/type/events.ts#L129"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"target"},"target")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"target"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"../Class/View360"},"View360")))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a8 \ucef4\ud3ec\ub10c\ud2b8\uc758 \uc778\uc2a4\ud134\uc2a4.")),(0,n.kt)("admonition",{title:"Example",type:"info"},(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.target); // = viewer\n});\n')))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/type/events.ts#L123"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"type"},"type")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"type"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"string"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\uc774\ubca4\ud2b8 \ud0c0\uc785.",(0,n.kt)("br",{parentName:"p"}),"\n","\uc774\ubca4\ud2b8 \uc774\ub984\uacfc \uac12\uc774 \uac19\uc2b5\ub2c8\ub2e4.")),(0,n.kt)("admonition",{title:"Example",type:"info"},(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.type); // "ready"\n});\n')))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/type/events.ts#L119"},"source")))))}d.isMDXComponent=!0}}]);