"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5370],{3905:(e,a,t)=>{t.d(a,{Zo:()=>i,kt:()=>p});var s=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function n(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,s,r=function(e,a){if(null==e)return{};var t,s,r={},l=Object.keys(e);for(s=0;s<l.length;s++)t=l[s],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(s=0;s<l.length;s++)t=l[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=s.createContext({}),d=function(e){var a=s.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):n(n({},a),e)),t},i=function(e){var a=d(e.components);return s.createElement(o.Provider,{value:a},e.children)},m={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},u=s.forwardRef((function(e,a){var t=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),u=d(t),p=r,k=u["".concat(o,".").concat(p)]||u[p]||m[p]||l;return t?s.createElement(k,n(n({ref:a},i),{},{components:t})):s.createElement(k,n({ref:a},i))}));function p(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var l=t.length,n=new Array(l);n[0]=u;var c={};for(var o in a)hasOwnProperty.call(a,o)&&(c[o]=a[o]);c.originalType=e,c.mdxType="string"==typeof e?e:r,n[1]=c;for(var d=2;d<l;d++)n[d]=t[d];return s.createElement.apply(null,n)}return s.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8586:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>n,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var s=t(7462),r=(t(7294),t(3905));const l={custom_edit_url:null},n="AutoResizer",c={unversionedId:"api/Class/AutoResizer",id:"api/Class/AutoResizer",title:"AutoResizer",description:"source",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Class/AutoResizer.mdx",sourceDirName:"api/Class",slug:"/api/Class/AutoResizer",permalink:"/egjs-view360/ko/docs/api/Class/AutoResizer",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",next:{title:"Autoplay",permalink:"/egjs-view360/ko/docs/api/Class/Autoplay"}},o={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"enabled",id:"enabled",level:3},{value:"useResizeObserver",id:"useResizeObserver",level:3},{value:"Methods",id:"methods",level:2},{value:"disable",id:"disable",level:3},{value:"enable",id:"enable",level:3}],i={toc:d};function m(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,s.Z)({},i,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"autoresizer"},"AutoResizer"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/AutoResizer.ts#L10"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Automatic resizer that uses both ResizeObserver and window resize event")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class AutoResizer\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#enabled"},"enabled")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Returns whether AutoResizer is enabled"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#useResizeObserver"},"useResizeObserver")),(0,r.kt)("div",{className:"doc-summary-desc"}))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#disable"},"disable")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Disable resizer"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#enable"},"enable")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Enable resizer")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new AutoResizer(useResizeObserver: boolean, onResize: (() => any)): AutoResizer\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"useResizeObserver"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"boolean")))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"onResize"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"(()","\xa0","=",">","\xa0","any)")))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"enabled"},"enabled")),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"enabled"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Returns whether AutoResizer is enabled"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/AutoResizer.ts#L21"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"useResizeObserver"},"useResizeObserver")),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"useResizeObserver"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/AutoResizer.ts#L16"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"disable"},"disable")),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"disable"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"AutoResizer"},"AutoResizer")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"disable(): AutoResizer\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Disable resizer"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/AutoResizer.ts#L61"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"enable"},"enable")),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"enable"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"AutoResizer"},"AutoResizer")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"enable(element: HTMLElement): AutoResizer\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Enable resizer")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"element"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"HTMLElement"))))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/AutoResizer.ts#L35"},"source")))))}m.isMDXComponent=!0}}]);