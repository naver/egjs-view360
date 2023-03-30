"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6863],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>v});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=l(n),v=a,u=m["".concat(c,".").concat(v)]||m[v]||d[v]||s;return n?r.createElement(u,o(o({ref:t},p),{},{components:n})):r.createElement(u,o({ref:t},p))}));function v(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var l=2;l<s;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},93:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const s={custom_edit_url:null},o="RenderEvent",i={unversionedId:"api/Event/RenderEvent",id:"api/Event/RenderEvent",title:"RenderEvent",description:"Since version 4.0.0",source:"@site/docs/api/Event/RenderEvent.mdx",sourceDirName:"api/Event",slug:"/api/Event/RenderEvent",permalink:"/egjs-view360/docs/api/Event/RenderEvent",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"ReadyEvent",permalink:"/egjs-view360/docs/api/Event/ReadyEvent"},next:{title:"ResizeEvent",permalink:"/egjs-view360/docs/api/Event/ResizeEvent"}},c={},l=[{value:"Properties",id:"properties",level:2},{value:"target",id:"target",level:3},{value:"type",id:"type",level:3}],p={toc:l};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"renderevent"},"RenderEvent"),(0,a.kt)("div",{className:"doc-side"},(0,a.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,a.kt)("div",{className:"doc-main-source"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/events.ts#L190"},"source")))),(0,a.kt)("div",{className:"doc-subtitle"},(0,a.kt)("p",null,"An event that fires after rendering a frame.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"interface RenderEvent\n")),(0,a.kt)("div",{className:"doc-summary doc-properties"},(0,a.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,a.kt)("div",{className:"doc-summary-item"},(0,a.kt)("div",{className:"doc-summary-name"},(0,a.kt)("a",{href:"#target"},"target")),(0,a.kt)("div",{className:"doc-summary-desc"},(0,a.kt)("p",null,"An instance of the component that triggered this event."))),(0,a.kt)("div",{className:"doc-summary-item"},(0,a.kt)("div",{className:"doc-summary-name"},(0,a.kt)("a",{href:"#type"},"type")),(0,a.kt)("div",{className:"doc-summary-desc"},(0,a.kt)("p",null,"A type of the event.",(0,a.kt)("br",{parentName:"p"}),"\n","This value is equal to event's name.")))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("div",{className:"doc-header-hidden"},(0,a.kt)("h3",{id:"target"},"target")),(0,a.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,a.kt)("div",{className:"doc-entry"},(0,a.kt)("details",{open:!0,className:"doc-property"},(0,a.kt)("summary",{className:"doc-member"},(0,a.kt)("span",{className:"doc-name"},"target"),(0,a.kt)("span",{className:"doc-type"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"../Class/View360"},"View360")))),(0,a.kt)("div",{className:"doc-desc"},(0,a.kt)("p",null,"An instance of the component that triggered this event.")),(0,a.kt)("admonition",{title:"Example",type:"info"},(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.target); // = viewer\n});\n')))),(0,a.kt)("div",{className:"doc-source"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/events.ts#L198"},"source")))),(0,a.kt)("div",{className:"doc-header-hidden"},(0,a.kt)("h3",{id:"type"},"type")),(0,a.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,a.kt)("div",{className:"doc-entry"},(0,a.kt)("details",{open:!0,className:"doc-property"},(0,a.kt)("summary",{className:"doc-member"},(0,a.kt)("span",{className:"doc-name"},"type"),(0,a.kt)("span",{className:"doc-type"},(0,a.kt)("p",null,"string"))),(0,a.kt)("div",{className:"doc-desc"},(0,a.kt)("p",null,"A type of the event.",(0,a.kt)("br",{parentName:"p"}),"\n","This value is equal to event's name.")),(0,a.kt)("admonition",{title:"Example",type:"info"},(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.type); // "ready"\n});\n')))),(0,a.kt)("div",{className:"doc-source"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/events.ts#L194"},"source")))))}d.isMDXComponent=!0}}]);