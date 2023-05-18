"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[147],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>u});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=o.createContext({}),l=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return o.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(r),u=n,v=d["".concat(s,".").concat(u)]||d[u]||m[u]||a;return r?o.createElement(v,i(i({ref:t},p),{},{components:r})):o.createElement(v,i({ref:t},p))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9758:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var o=r(7462),n=(r(7294),r(3905));const a={custom_edit_url:null},i="ProjectionOptions",c={unversionedId:"api/Projection/Interface/ProjectionOptions",id:"api/Projection/Interface/ProjectionOptions",title:"ProjectionOptions",description:"Since version 4.0.0",source:"@site/docs/api/Projection/Interface/ProjectionOptions.mdx",sourceDirName:"api/Projection/Interface",slug:"/api/Projection/Interface/ProjectionOptions",permalink:"/egjs-view360/docs/api/Projection/Interface/ProjectionOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"LittlePlanetProjectionOptions",permalink:"/egjs-view360/docs/api/Projection/Interface/LittlePlanetProjectionOptions"},next:{title:"StereoEquiProjectionOptions",permalink:"/egjs-view360/docs/api/Projection/Interface/StereoEquiProjectionOptions"}},s={},l=[{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3}],p={toc:l};function m(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"projectionoptions"},"ProjectionOptions"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L18"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,"Common option for ",(0,n.kt)("a",{parentName:"p",href:"../Class/Projection"},"Projection"),"s")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface ProjectionOptions\n")),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#src"},"src")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Source URL to panorama image/video."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#video"},"video")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Properties for the video element.",(0,n.kt)("br",{parentName:"p"}),"\n","Setting ",(0,n.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,n.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"src"},"src")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"src"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Source URL to panorama image/video."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L22"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"video"},"video")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"video"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,n.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Properties for the video element.",(0,n.kt)("br",{parentName:"p"}),"\n","Setting ",(0,n.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,n.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")),(0,n.kt)("admonition",{title:"Example",type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Default properties"),(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L26"},"source")))))}m.isMDXComponent=!0}}]);