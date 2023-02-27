"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>v});var n=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var o=n.createContext({}),l=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=l(e.components);return n.createElement(o.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,r=e.originalType,o=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),m=l(a),v=s,u=m["".concat(o,".").concat(v)]||m[v]||p[v]||r;return a?n.createElement(u,i(i({ref:t},d),{},{components:a})):n.createElement(u,i({ref:t},d))}));function v(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=a.length,i=new Array(r);i[0]=m;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:s,i[1]=c;for(var l=2;l<r;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},333:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var n=a(7462),s=(a(7294),a(3905));const r={custom_edit_url:null},i="ResizeEvent",c={unversionedId:"api/Event/ResizeEvent",id:"api/Event/ResizeEvent",title:"ResizeEvent",description:"Since version 4.0.0",source:"@site/docs/api/Event/ResizeEvent.mdx",sourceDirName:"api/Event",slug:"/api/Event/ResizeEvent",permalink:"/egjs-view360/docs/api/Event/ResizeEvent",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"RenderEvent",permalink:"/egjs-view360/docs/api/Event/RenderEvent"},next:{title:"StaticClickEvent",permalink:"/egjs-view360/docs/api/Event/StaticClickEvent"}},o={},l=[{value:"Properties",id:"properties",level:2},{value:"height",id:"height",level:3},{value:"target",id:"target",level:3},{value:"type",id:"type",level:3},{value:"width",id:"width",level:3}],d={toc:l};function p(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"resizeevent"},"ResizeEvent"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/type/events.ts#L140"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"An event that fires when ",(0,s.kt)("a",{parentName:"p",href:"../Class/View360#resize"},"View360#resize")," is called.")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"interface ResizeEvent\n")),(0,s.kt)("div",{className:"doc-summary doc-properties"},(0,s.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#height"},"height")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"New height of the canvas. (=",(0,s.kt)("inlineCode",{parentName:"p"},"canvas.clientHeight"),")"))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#target"},"target")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"An instance of the component that triggered this event."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#type"},"type")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"A type of the event.",(0,s.kt)("br",{parentName:"p"}),"\n","This value is equal to event's name."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#width"},"width")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"New width of the canvas. (=",(0,s.kt)("inlineCode",{parentName:"p"},"canvas.clientWidth"),")")))),(0,s.kt)("h2",{id:"properties"},"Properties"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"height"},"height")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"height"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"number"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"New height of the canvas. (=",(0,s.kt)("inlineCode",{parentName:"p"},"canvas.clientHeight"),")"))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/type/events.ts#L160"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"target"},"target")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"target"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Class/View360"},"View360")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"An instance of the component that triggered this event.")),(0,s.kt)("admonition",{title:"Example",type:"info"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.target); // = viewer\n});\n')))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/type/events.ts#L148"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"type"},"type")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"type"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"string"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"A type of the event.",(0,s.kt)("br",{parentName:"p"}),"\n","This value is equal to event's name.")),(0,s.kt)("admonition",{title:"Example",type:"info"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.type); // "ready"\n});\n')))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/type/events.ts#L144"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"width"},"width")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"width"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"number"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"New width of the canvas. (=",(0,s.kt)("inlineCode",{parentName:"p"},"canvas.clientWidth"),")"))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/type/events.ts#L154"},"source")))))}p.isMDXComponent=!0}}]);