"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3630],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var s=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,s,r=function(e,t){if(null==e)return{};var a,s,r={},o=Object.keys(e);for(s=0;s<o.length;s++)a=o[s],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)a=o[s],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=s.createContext({}),c=function(e){var t=s.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):n(n({},t),e)),a},d=function(e){var t=c(e.components);return s.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},p=s.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(a),u=r,k=p["".concat(i,".").concat(u)]||p[u]||m[u]||o;return a?s.createElement(k,n(n({ref:t},d),{},{components:a})):s.createElement(k,n({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,n=new Array(o);n[0]=p;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,n[1]=l;for(var c=2;c<o;c++)n[c]=a[c];return s.createElement.apply(null,n)}return s.createElement.apply(null,a)}p.displayName="MDXCreateElement"},6219:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>n,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var s=a(7462),r=(a(7294),a(3905));const o={custom_edit_url:null},n="PlayButton",l={unversionedId:"api/Plugin/ControlBar/PlayButton",id:"api/Plugin/ControlBar/PlayButton",title:"PlayButton",description:"Since version 4.0.0",source:"@site/docs/api/Plugin/ControlBar/PlayButton.mdx",sourceDirName:"api/Plugin/ControlBar",slug:"/api/Plugin/ControlBar/PlayButton",permalink:"/egjs-view360/docs/api/Plugin/ControlBar/PlayButton",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"PieView",permalink:"/egjs-view360/docs/api/Plugin/ControlBar/PieView"},next:{title:"ProgressBar",permalink:"/egjs-view360/docs/api/Plugin/ControlBar/ProgressBar"}},i={},c=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"element",id:"element",level:3},{value:"order",id:"order",level:3},{value:"position",id:"position",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"init",id:"init",level:3}],d={toc:c};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,s.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"playbutton"},"PlayButton"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/plugin/ControlBar/PlayButton.ts#L19"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Show video play / pause button.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class PlayButton extends ControlBarItem\n")),(0,r.kt)("h3",null,"Extends"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"ControlBarItem"},"ControlBarItem"))),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#element"},"element")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Element of the item."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#order"},"order")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Order within the same position.",(0,r.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#position"},"position")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Position to display item.")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#destroy"},"destroy")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Destroy item and release all resources & event handlers."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#init"},"init")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Initialize item.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"Create a new instance."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new PlayButton(options: Partial<ControlBarItemOptions>): PlayButton\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"options"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"Partial","<",(0,r.kt)("a",{parentName:"p",href:"../Interface/ControlBarItemOptions"},"ControlBarItemOptions"),">")),(0,r.kt)("div",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"{}"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Options "))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"element"},"element")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"element"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"HTMLElement"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Element of the item."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/plugin/ControlBar/PlayButton.ts#L20"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"order"},"order")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"order"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Order within the same position.",(0,r.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L54"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"position"},"position")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"position"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,'"',"top-left",'"',"\xa0","|","\xa0",'"',"top-right",'"',"\xa0","|","\xa0",'"',"main-top",'"',"\xa0","|","\xa0",'"',"main-bottom",'"',"\xa0","|","\xa0",'"',"main-left",'"',"\xa0","|","\xa0",'"',"main-right",'"'))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Position to display item."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L47"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"destroy"},"destroy")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"destroy"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Destroy item and release all resources & event handlers."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/plugin/ControlBar/PlayButton.ts#L76"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"init"},"init")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"init"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"init(viewer: View360, controlBar: ControlBar): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Initialize item.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"viewer"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/View360"},"View360")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"A instance of viewer to attach item "))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"controlBar"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/ControlBar"},"ControlBar")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"A instance of control bar to attach item ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/2a9566c/packages/view360/src/plugin/ControlBar/PlayButton.ts#L46"},"source")))))}m.isMDXComponent=!0}}]);