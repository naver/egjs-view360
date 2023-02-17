"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5305],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),i=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=i(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=i(n),d=r,v=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return n?a.createElement(v,s(s({ref:t},p),{},{components:n})):a.createElement(v,s({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var i=2;i<o;i++)s[i]=n[i];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4801:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(6010),r=n(7294);const o="container_KAvi",s="tags_yIZ0",c="tag_NTEP",l="dark_QuFp",i="info_Tfvv",p="warning_OxPl",m="success_OgfR",u="link_PhWZ",d=e=>{let{type:t,defaultVal:n,added:d}=e;return r.createElement("div",{className:o},t&&r.createElement("div",{className:s},r.createElement("span",{className:(0,a.Z)(c,l)},"Type"),r.createElement("span",{className:(0,a.Z)(c,i)},t)),n&&r.createElement("div",{className:s},r.createElement("span",{className:(0,a.Z)(c,l)},"Default"),r.createElement("span",{className:(0,a.Z)(c,p)},n)),d&&r.createElement("div",{className:s},r.createElement("span",{className:(0,a.Z)(c,l)},"Added in"),r.createElement("a",{className:u,href:"https://github.com/naver/egjs-view360/releases/tag/"+d,target:"_blank",rel:"noopener noreferrer"},r.createElement("span",{className:(0,a.Z)(c,m)},"v",d))))}},9013:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905)),o=n(4801);const s={},c=void 0,l={unversionedId:"options/miscellaneous/canvasSelector",id:"options/miscellaneous/canvasSelector",title:"canvasSelector",description:"CSS selector for the canvas element to render panorama image/video.",source:"@site/docs/options/miscellaneous/canvasSelector.mdx",sourceDirName:"options/miscellaneous",slug:"/options/miscellaneous/canvasSelector",permalink:"/egjs-view360/docs/options/miscellaneous/canvasSelector",draft:!1,editUrl:"https://github.com/naver/egjs-view360/edit/master/demo/docs/options/miscellaneous/canvasSelector.mdx",tags:[],version:"current",frontMatter:{},sidebar:"options",previous:{title:"autoplay",permalink:"/egjs-view360/docs/options/miscellaneous/autoplay"},next:{title:"debug",permalink:"/egjs-view360/docs/options/miscellaneous/debug"}},i={},p=[{value:"Example",id:"example",level:2}],m={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(o.Z,{type:"string",defaultVal:'"canvas"',added:"4.0.0",mdxType:"OptionDescriptor"}),(0,r.kt)("p",null,"CSS selector for the canvas element to render panorama image/video.",(0,r.kt)("br",{parentName:"p"}),"\n","The canvas element must be inside the root element. It does not have to be a direct child element of the root element."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<div class="view360-container">\n  <canvas id="not_this_one"></canvas>\n  \x3c!-- The canvas only needs to be inside the view360-container. --\x3e\n  <div>\n    \x3c!-- This element is selected. --\x3e\n    <canvas id="canvas_to_select"></canvas>\n  </div>\n</div>\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const viewer = new View360("#el_id", {\n  canvasSelector: "#canvas_to_select"\n});\n')))}u.isMDXComponent=!0}}]);