"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1496],{3905:(e,a,s)=>{s.d(a,{Zo:()=>o,kt:()=>N});var t=s(7294);function c(e,a,s){return a in e?Object.defineProperty(e,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[a]=s,e}function r(e,a){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),s.push.apply(s,t)}return s}function d(e){for(var a=1;a<arguments.length;a++){var s=null!=arguments[a]?arguments[a]:{};a%2?r(Object(s),!0).forEach((function(a){c(e,a,s[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(s,a))}))}return e}function m(e,a){if(null==e)return{};var s,t,c=function(e,a){if(null==e)return{};var s,t,c={},r=Object.keys(e);for(t=0;t<r.length;t++)s=r[t],a.indexOf(s)>=0||(c[s]=e[s]);return c}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)s=r[t],a.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(c[s]=e[s])}return c}var n=t.createContext({}),l=function(e){var a=t.useContext(n),s=a;return e&&(s="function"==typeof e?e(a):d(d({},a),e)),s},o=function(e){var a=l(e.components);return t.createElement(n.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},p=t.forwardRef((function(e,a){var s=e.components,c=e.mdxType,r=e.originalType,n=e.parentName,o=m(e,["components","mdxType","originalType","parentName"]),p=l(s),N=c,k=p["".concat(n,".").concat(N)]||p[N]||i[N]||r;return s?t.createElement(k,d(d({ref:a},o),{},{components:s})):t.createElement(k,d({ref:a},o))}));function N(e,a){var s=arguments,c=a&&a.mdxType;if("string"==typeof e||c){var r=s.length,d=new Array(r);d[0]=p;var m={};for(var n in a)hasOwnProperty.call(a,n)&&(m[n]=a[n]);m.originalType=e,m.mdxType="string"==typeof e?e:c,d[1]=m;for(var l=2;l<r;l++)d[l]=s[l];return t.createElement.apply(null,d)}return t.createElement.apply(null,s)}p.displayName="MDXCreateElement"},2215:(e,a,s)=>{s.r(a),s.d(a,{assets:()=>n,contentTitle:()=>d,default:()=>i,frontMatter:()=>r,metadata:()=>m,toc:()=>l});var t=s(7462),c=(s(7294),s(3905));const r={custom_edit_url:null},d="EVENTS",m={unversionedId:"api/Variables/EVENTS",id:"api/Variables/EVENTS",title:"EVENTS",description:"Since version 4.0.0",source:"@site/docs/api/Variables/EVENTS.mdx",sourceDirName:"api/Variables",slug:"/api/Variables/EVENTS",permalink:"/egjs-view360/docs/api/Variables/EVENTS",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"ERROR_CODES",permalink:"/egjs-view360/docs/api/Variables/ERROR_CODES"},next:{title:"VIEW360_METHODS",permalink:"/egjs-view360/docs/api/Variables/VIEW360_METHODS"}},n={},l=[{value:"Properties",id:"properties",level:2},{value:"BEFORE_RENDER",id:"BEFORE_RENDER",level:3},{value:"INPUT_END",id:"INPUT_END",level:3},{value:"INPUT_START",id:"INPUT_START",level:3},{value:"LOAD",id:"LOAD",level:3},{value:"LOAD_START",id:"LOAD_START",level:3},{value:"PROJECTION_CHANGE",id:"PROJECTION_CHANGE",level:3},{value:"READY",id:"READY",level:3},{value:"RENDER",id:"RENDER",level:3},{value:"RESIZE",id:"RESIZE",level:3},{value:"STATIC_CLICK",id:"STATIC_CLICK",level:3},{value:"VIEW_CHANGE",id:"VIEW_CHANGE",level:3},{value:"VR_END",id:"VR_END",level:3},{value:"VR_START",id:"VR_START",level:3}],o={toc:l};function i(e){let{components:a,...s}=e;return(0,c.kt)("wrapper",(0,t.Z)({},o,s,{components:a,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"events"},"EVENTS"),(0,c.kt)("div",{className:"doc-side"},(0,c.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,c.kt)("div",{className:"doc-main-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L39"},"source")))),(0,c.kt)("div",{className:"doc-subtitle"},(0,c.kt)("p",null,"Event names")),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},'const EVENTS: {\n  BEFORE_RENDER: "beforeRender";\n  INPUT_END: "inputEnd";\n  INPUT_START: "inputStart";\n  LOAD: "load";\n  LOAD_START: "loadStart";\n  PROJECTION_CHANGE: "projectionChange";\n  READY: "ready";\n  RENDER: "render";\n  RESIZE: "resize";\n  STATIC_CLICK: "staticClick";\n  VIEW_CHANGE: "viewChange";\n  VR_END: "vrEnd";\n  VR_START: "vrStart"\n}\n')),(0,c.kt)("admonition",{title:"Example",type:"info"},(0,c.kt)("pre",{parentName:"admonition"},(0,c.kt)("code",{parentName:"pre",className:"language-ts"},'import View360, { EVENTS } from "@egjs/view360";\n\nconst viewer = new View360("#el_id");\n\nviewer.on(EVENTS.READY, evt => {\n  console.log("View360 is ready!");\n});\n'))),(0,c.kt)("div",{className:"doc-summary doc-properties"},(0,c.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#BEFORE_RENDER"},"BEFORE_RENDER")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#INPUT_END"},"INPUT_END")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#INPUT_START"},"INPUT_START")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#LOAD"},"LOAD")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#LOAD_START"},"LOAD_START")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#PROJECTION_CHANGE"},"PROJECTION_CHANGE")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#READY"},"READY")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#RENDER"},"RENDER")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#RESIZE"},"RESIZE")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#STATIC_CLICK"},"STATIC_CLICK")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#VIEW_CHANGE"},"VIEW_CHANGE")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#VR_END"},"VR_END")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#VR_START"},"VR_START")),(0,c.kt)("div",{className:"doc-summary-desc"}))),(0,c.kt)("h2",{id:"properties"},"Properties"),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"BEFORE_RENDER"},"BEFORE_RENDER")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"BEFORE_RENDER"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"beforeRender",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L45"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"INPUT_END"},"INPUT_END")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"INPUT_END"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"inputEnd",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L48"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"INPUT_START"},"INPUT_START")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"INPUT_START"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"inputStart",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L47"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"LOAD"},"LOAD")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"LOAD"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"load",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L42"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"LOAD_START"},"LOAD_START")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"LOAD_START"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"loadStart",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L41"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"PROJECTION_CHANGE"},"PROJECTION_CHANGE")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"PROJECTION_CHANGE"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"projectionChange",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L43"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"READY"},"READY")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"READY"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"ready",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L40"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"RENDER"},"RENDER")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"RENDER"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"render",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L46"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"RESIZE"},"RESIZE")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"RESIZE"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"resize",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L44"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"STATIC_CLICK"},"STATIC_CLICK")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"STATIC_CLICK"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"staticClick",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L50"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"VIEW_CHANGE"},"VIEW_CHANGE")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"VIEW_CHANGE"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"viewChange",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L49"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"VR_END"},"VR_END")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"VR_END"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"vrEnd",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L52"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"VR_START"},"VR_START")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"VR_START"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,'"',"vrStart",'"')))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/const/external.ts#L51"},"source")))))}i.isMDXComponent=!0}}]);