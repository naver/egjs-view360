"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8116],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>u});var r=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,s=function(e,t){if(null==e)return{};var a,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var c=r.createContext({}),i=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):n(n({},t),e)),a},m=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,s=e.mdxType,o=e.originalType,c=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),p=i(a),u=s,k=p["".concat(c,".").concat(u)]||p[u]||d[u]||o;return a?r.createElement(k,n(n({ref:t},m),{},{components:a})):r.createElement(k,n({ref:t},m))}));function u(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=a.length,n=new Array(o);n[0]=p;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:s,n[1]=l;for(var i=2;i<o;i++)n[i]=a[i];return r.createElement.apply(null,n)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},3948:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>n,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var r=a(7462),s=(a(7294),a(3905));const o={custom_edit_url:null},n="ControlBarItem",l={unversionedId:"api/Plugin/ControlBar/ControlBarItem",id:"api/Plugin/ControlBar/ControlBarItem",title:"ControlBarItem",description:"Since version 4.0.0",source:"@site/docs/api/Plugin/ControlBar/ControlBarItem.mdx",sourceDirName:"api/Plugin/ControlBar",slug:"/api/Plugin/ControlBar/ControlBarItem",permalink:"/egjs-view360/docs/api/Plugin/ControlBar/ControlBarItem",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"LoadingSpinner",permalink:"/egjs-view360/docs/api/Plugin/Class/LoadingSpinner"},next:{title:"FullscreenButton",permalink:"/egjs-view360/docs/api/Plugin/ControlBar/FullscreenButton"}},c={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"element",id:"element",level:3},{value:"order",id:"order",level:3},{value:"position",id:"position",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"init",id:"init",level:3}],m={toc:i};function d(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"controlbaritem"},"ControlBarItem"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L34"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"Interface of the ControlBar items")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"abstract class ControlBarItem\n")),(0,s.kt)("div",{className:"doc-summary doc-properties"},(0,s.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#element"},"element")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Element of the item."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#order"},"order")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Order within the same position.",(0,s.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#position"},"position")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Position to display item.")))),(0,s.kt)("div",{className:"doc-summary doc-methods"},(0,s.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#destroy"},"destroy")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Destroy item and release all resources & event handlers."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#init"},"init")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Initialize item.")))),(0,s.kt)("h2",{id:"constructor"},"Constructor"),(0,s.kt)("div",{className:"doc-member-subtitle"},"Create new instance of the ControlBarItem"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"new ControlBarItem(options: ControlBarItemOptions): ControlBarItem\n")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"options"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Interface/ControlBarItemOptions"},"ControlBarItemOptions")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Options "))),(0,s.kt)("h2",{id:"properties"},"Properties"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"element"},"element")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--success"},"abstract"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"element"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"HTMLElement"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Element of the item."))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L40"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"order"},"order")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"order"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"number"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Order within the same position.",(0,s.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L54"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"position"},"position")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"position"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,'"',"top-left",'"',"\xa0","|","\xa0",'"',"top-right",'"',"\xa0","|","\xa0",'"',"main-top",'"',"\xa0","|","\xa0",'"',"main-bottom",'"',"\xa0","|","\xa0",'"',"main-left",'"',"\xa0","|","\xa0",'"',"main-right",'"'))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Position to display item."))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L47"},"source")))),(0,s.kt)("h2",{id:"methods"},"Methods"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"destroy"},"destroy")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--success"},"abstract"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"destroy"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"any"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(viewer: View360, controlBar: ControlBar): any\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Destroy item and release all resources & event handlers.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"viewer"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/View360"},"View360")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"A instance of viewer to detach item "))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"controlBar"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Class/ControlBar"},"ControlBar")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"A instance of control bar to detach item ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L81"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"init"},"init")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--success"},"abstract"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"init"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"any"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"init(viewer: View360, controlBar: ControlBar): any\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Initialize item.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"viewer"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/View360"},"View360")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"A instance of viewer to attach item "))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"controlBar"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Class/ControlBar"},"ControlBar")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"A instance of control bar to attach item ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L73"},"source")))))}d.isMDXComponent=!0}}]);