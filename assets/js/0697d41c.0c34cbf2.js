"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5931],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>v});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),l=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=l(a),v=r,u=m["".concat(c,".").concat(v)]||m[v]||p[v]||s;return a?n.createElement(u,o(o({ref:t},d),{},{components:a})):n.createElement(u,o({ref:t},d))}));function v(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,o=new Array(s);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var l=2;l<s;l++)o[l]=a[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5650:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var n=a(7462),r=(a(7294),a(3905));const s={custom_edit_url:null},o="LoadEvent",i={unversionedId:"api/Event/LoadEvent",id:"api/Event/LoadEvent",title:"LoadEvent",description:"Since version 4.0.0",source:"@site/docs/api/Event/LoadEvent.mdx",sourceDirName:"api/Event",slug:"/api/Event/LoadEvent",permalink:"/egjs-view360/docs/api/Event/LoadEvent",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"InputStartEvent",permalink:"/egjs-view360/docs/api/Event/InputStartEvent"},next:{title:"LoadStartEvent",permalink:"/egjs-view360/docs/api/Event/LoadStartEvent"}},c={},l=[{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"target",id:"target",level:3},{value:"type",id:"type",level:3},{value:"video",id:"video",level:3}],d={toc:l};function p(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"loadevent"},"LoadEvent"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L88"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"An event that fires right after the content is loaded & before showing it.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface LoadEvent\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#src"},"src")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Source URL / HTMLElement to load"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#target"},"target")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"An instance of the component that triggered this event."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#type"},"type")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"A type of the event.",(0,r.kt)("br",{parentName:"p"}),"\n","This value is equal to event's name."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#video"},"video")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Source's video option")))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"src"},"src")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"src"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Source URL / HTMLElement to load")),(0,r.kt)("admonition",{title:"See",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"../Projection/Interface/ProjectionOptions#src"},"ProjectionOptions#src")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L100"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"target"},"target")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"target"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/View360"},"View360")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"An instance of the component that triggered this event.")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.target); // = viewer\n});\n')))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L96"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"type"},"type")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"type"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"string"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"A type of the event.",(0,r.kt)("br",{parentName:"p"}),"\n","This value is equal to event's name.")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'viewer.on("ready", evt => {\n  console.log(evt.type); // "ready"\n});\n')))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L92"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"video"},"video")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"video"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"../Interface/VideoConfig"},"VideoConfig"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Source's video option")),(0,r.kt)("admonition",{title:"See",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"../Projection/Interface/ProjectionOptions#video"},"ProjectionOptions#video")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/type/events.ts#L104"},"source")))))}p.isMDXComponent=!0}}]);