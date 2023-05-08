"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2200],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(a),u=n,k=d["".concat(l,".").concat(u)]||d[u]||m[u]||i;return a?r.createElement(k,o(o({ref:t},p),{},{components:a})):r.createElement(k,o({ref:t},p))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},575:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const i={custom_edit_url:null},o="PieViewOptions",s={unversionedId:"api/Plugin/Interface/PieViewOptions",id:"api/Plugin/Interface/PieViewOptions",title:"PieViewOptions",description:"source",source:"@site/docs/api/Plugin/Interface/PieViewOptions.mdx",sourceDirName:"api/Plugin/Interface",slug:"/api/Plugin/Interface/PieViewOptions",permalink:"/egjs-view360/docs/api/Plugin/Interface/PieViewOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"ControlBarOptions",permalink:"/egjs-view360/docs/api/Plugin/Interface/ControlBarOptions"},next:{title:"View360Plugin",permalink:"/egjs-view360/docs/api/Plugin/Interface/View360Plugin"}},l={},c=[{value:"Properties",id:"properties",level:2},{value:"order",id:"order",level:3},{value:"position",id:"position",level:3},{value:"resetCamera",id:"resetCamera",level:3}],p={toc:c};function m(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"pieviewoptions"},"PieViewOptions"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/plugin/ControlBar/PieView.ts#L19"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../ControlBar/PieView"},"PieView"))),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface PieViewOptions extends ControlBarItemOptions\n")),(0,n.kt)("h3",null,"Extends"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"ControlBarItemOptions"},"ControlBarItemOptions"))),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#order"},"order")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Order within the same position.",(0,n.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#position"},"position")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Position to display item."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#resetCamera"},"resetCamera")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Set rotation to reset camera to when PieView is clicked.",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," will disable this value, and ",(0,n.kt)("inlineCode",{parentName:"p"},"true")," will enable with default options.")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"order"},"order")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("span",{className:"badge badge--warning"},"inherited"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"order"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"number"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Order within the same position.",(0,n.kt)("br",{parentName:"p"}),"\n","The lowest one will be shown first."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L24"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"position"},"position")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("span",{className:"badge badge--warning"},"inherited"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"position"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,'"',"top-left",'"',"\xa0","|","\xa0",'"',"top-right",'"',"\xa0","|","\xa0",'"',"main-top",'"',"\xa0","|","\xa0",'"',"main-bottom",'"',"\xa0","|","\xa0",'"',"main-left",'"',"\xa0","|","\xa0",'"',"main-right",'"'))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Position to display item."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L20"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"resetCamera"},"resetCamera")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"resetCamera"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<","{","\xa0","duration:","\xa0","number;","\xa0","easing:","\xa0","((x:","\xa0","number)","\xa0","=",">","\xa0","number);","\xa0","pitch:","\xa0","number;","\xa0","yaw:","\xa0","number;","\xa0","zoom:","\xa0","number","\xa0","}",">"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Set rotation to reset camera to when PieView is clicked.",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," will disable this value, and ",(0,n.kt)("inlineCode",{parentName:"p"},"true")," will enable with default options."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/plugin/ControlBar/PieView.ts#L23"},"source")))))}m.isMDXComponent=!0}}]);