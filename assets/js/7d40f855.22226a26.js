"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1759],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var o=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function n(e,t){if(null==e)return{};var a,o,r=function(e,t){if(null==e)return{};var a,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)a=s[o],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)a=s[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=o.createContext({}),c=function(e){var t=o.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=c(e.components);return o.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,d=n(e,["components","mdxType","originalType","parentName"]),p=c(a),u=r,k=p["".concat(i,".").concat(u)]||p[u]||m[u]||s;return a?o.createElement(k,l(l({ref:t},d),{},{components:a})):o.createElement(k,l({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,l=new Array(s);l[0]=p;var n={};for(var i in t)hasOwnProperty.call(t,i)&&(n[i]=t[i]);n.originalType=e,n.mdxType="string"==typeof e?e:r,l[1]=n;for(var c=2;c<s;c++)l[c]=a[c];return o.createElement.apply(null,l)}return o.createElement.apply(null,a)}p.displayName="MDXCreateElement"},2619:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>s,metadata:()=>n,toc:()=>c});var o=a(7462),r=(a(7294),a(3905));const s={custom_edit_url:null},l="VolumeControl",n={unversionedId:"api/Plugin/ControlBar/VolumeControl",id:"api/Plugin/ControlBar/VolumeControl",title:"VolumeControl",description:"Since version 4.0.0",source:"@site/docs/api/Plugin/ControlBar/VolumeControl.mdx",sourceDirName:"api/Plugin/ControlBar",slug:"/api/Plugin/ControlBar/VolumeControl",permalink:"/egjs-view360/docs/api/Plugin/ControlBar/VolumeControl",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"VideoTime",permalink:"/egjs-view360/docs/api/Plugin/ControlBar/VideoTime"},next:{title:"AutoHideOptions",permalink:"/egjs-view360/docs/api/Plugin/Interface/AutoHideOptions"}},i={},c=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"order",id:"order",level:3},{value:"position",id:"position",level:3},{value:"element",id:"element",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"init",id:"init",level:3}],d={toc:c};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,o.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"volumecontrol"},"VolumeControl"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L22"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Show video volume control.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class VolumeControl extends ControlBarItem\n")),(0,r.kt)("h3",null,"Extends"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"ControlBarItem"},"ControlBarItem"))),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#order"},"order")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Order within the same position.",(0,r.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#position"},"position")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Position to display item."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#element"},"element")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Element of the item.")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#destroy"},"destroy")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Destroy item and release all resources & event handlers."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#init"},"init")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Initialize item.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"Create a new instance."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new VolumeControl(options: Partial<ControlBarItemOptions>): VolumeControl\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"options"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"Partial","<",(0,r.kt)("a",{parentName:"p",href:"../Interface/ControlBarItemOptions"},"ControlBarItemOptions"),">")),(0,r.kt)("div",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"{}"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Options "))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"order"},"order")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"order"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Order within the same position.",(0,r.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L54"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"position"},"position")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"position"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,'"',"top-left",'"',"\xa0","|","\xa0",'"',"top-right",'"',"\xa0","|","\xa0",'"',"main-top",'"',"\xa0","|","\xa0",'"',"main-bottom",'"',"\xa0","|","\xa0",'"',"main-left",'"',"\xa0","|","\xa0",'"',"main-right",'"'))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Position to display item."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L47"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"element"},"element")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"element"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"HTMLButtonElement"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Element of the item."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L23"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"destroy"},"destroy")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"destroy"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(viewer: View360): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Destroy item and release all resources & event handlers.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"viewer"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/View360"},"View360")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"A instance of viewer to detach item ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L95"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"init"},"init")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"init"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"init(viewer: View360, controlBar: ControlBar): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Initialize item.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"viewer"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/View360"},"View360")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"A instance of viewer to attach item "))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"controlBar"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/ControlBar"},"ControlBar")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"A instance of control bar to attach item ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L52"},"source")))))}m.isMDXComponent=!0}}]);