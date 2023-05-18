"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[853],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var r=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function n(e,t){if(null==e)return{};var a,r,s=function(e,t){if(null==e)return{};var a,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var c=r.createContext({}),i=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,s=e.mdxType,o=e.originalType,c=e.parentName,d=n(e,["components","mdxType","originalType","parentName"]),p=i(a),u=s,k=p["".concat(c,".").concat(u)]||p[u]||m[u]||o;return a?r.createElement(k,l(l({ref:t},d),{},{components:a})):r.createElement(k,l({ref:t},d))}));function u(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=a.length,l=new Array(o);l[0]=p;var n={};for(var c in t)hasOwnProperty.call(t,c)&&(n[c]=t[c]);n.originalType=e,n.mdxType="string"==typeof e?e:s,l[1]=n;for(var i=2;i<o;i++)l[i]=a[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},1714:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>n,toc:()=>i});var r=a(7462),s=(a(7294),a(3905));const o={custom_edit_url:null},l="VolumeControl",n={unversionedId:"api/Plugin/ControlBar/VolumeControl",id:"api/Plugin/ControlBar/VolumeControl",title:"VolumeControl",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Plugin/ControlBar/VolumeControl.mdx",sourceDirName:"api/Plugin/ControlBar",slug:"/api/Plugin/ControlBar/VolumeControl",permalink:"/egjs-view360/ko/docs/api/Plugin/ControlBar/VolumeControl",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"VideoTime",permalink:"/egjs-view360/ko/docs/api/Plugin/ControlBar/VideoTime"},next:{title:"AutoHideOptions",permalink:"/egjs-view360/ko/docs/api/Plugin/Interface/AutoHideOptions"}},c={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"order",id:"order",level:3},{value:"position",id:"position",level:3},{value:"element",id:"element",level:3},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"init",id:"init",level:3}],d={toc:i};function m(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,r.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"volumecontrol"},"VolumeControl"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L22"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"\ube44\ub514\uc624 \ubcfc\ub968 \uc870\uc808 \ubc84\ud2bc\uc744 \ud45c\uc2dc\ud569\ub2c8\ub2e4.")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"class VolumeControl extends ControlBarItem\n")),(0,s.kt)("h3",null,"Extends"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"ControlBarItem"},"ControlBarItem"))),(0,s.kt)("div",{className:"doc-summary doc-properties"},(0,s.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#order"},"order")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\ub3d9\uc77c\ud55c position \ub0b4\uc5d0\uc11c\uc758 \uc21c\uc11c, \uc791\uc744\uc218\ub85d \uba3c\uc800 \ud45c\uc2dc\ub429\ub2c8\ub2e4."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#position"},"position")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ud45c\uc2dc\ud560 \uc704\uce58."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#element"},"element")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc758 \uc5d8\ub9ac\uba3c\ud2b8")))),(0,s.kt)("div",{className:"doc-summary doc-methods"},(0,s.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#destroy"},"destroy")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \uc81c\uac70\ud558\uace0 \ud560\ub2f9\ub41c \ubaa8\ub4e0 \ub9ac\uc18c\uc2a4 \ubc0f \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec\ub97c \uc81c\uac70\ud569\ub2c8\ub2e4."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#init"},"init")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ucd08\uae30\ud654\ud569\ub2c8\ub2e4.")))),(0,s.kt)("h2",{id:"constructor"},"Constructor"),(0,s.kt)("div",{className:"doc-member-subtitle"},"\uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"new VolumeControl(options: Partial<ControlBarItemOptions>): VolumeControl\n")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"options"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"Partial","<",(0,s.kt)("a",{parentName:"p",href:"../Interface/ControlBarItemOptions"},"ControlBarItemOptions"),">")),(0,s.kt)("div",{className:"doc-default",title:"Default Value"},(0,s.kt)("p",null,"{}"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc635\uc158\ub4e4"))),(0,s.kt)("h2",{id:"properties"},"Properties"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"order"},"order")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"order"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"number"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\ub3d9\uc77c\ud55c position \ub0b4\uc5d0\uc11c\uc758 \uc21c\uc11c, \uc791\uc744\uc218\ub85d \uba3c\uc800 \ud45c\uc2dc\ub429\ub2c8\ub2e4."))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L54"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"position"},"position")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"position"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,'"',"top-left",'"',"\xa0","|","\xa0",'"',"top-right",'"',"\xa0","|","\xa0",'"',"main-top",'"',"\xa0","|","\xa0",'"',"main-bottom",'"',"\xa0","|","\xa0",'"',"main-left",'"',"\xa0","|","\xa0",'"',"main-right",'"'))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ud45c\uc2dc\ud560 \uc704\uce58."))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/ControlBarItem.ts#L47"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"element"},"element")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"element"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"HTMLButtonElement"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc758 \uc5d8\ub9ac\uba3c\ud2b8"))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L23"},"source")))),(0,s.kt)("h2",{id:"methods"},"Methods"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"destroy"},"destroy")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"destroy"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(viewer: View360): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \uc81c\uac70\ud558\uace0 \ud560\ub2f9\ub41c \ubaa8\ub4e0 \ub9ac\uc18c\uc2a4 \ubc0f \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec\ub97c \uc81c\uac70\ud569\ub2c8\ub2e4.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"viewer"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/View360"},"View360")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ub5bc\uc5b4 \ub0bc \ubdf0\uc5b4\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L95"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"init"},"init")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"init"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"init(viewer: View360, controlBar: ControlBar): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ucd08\uae30\ud654\ud569\ub2c8\ub2e4.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"viewer"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/View360"},"View360")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ubd80\ucc29\ud560 \ubdf0\uc5b4\uc758 \uc778\uc2a4\ud134\uc2a4"))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"controlBar"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Class/ControlBar"},"ControlBar")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"\uc544\uc774\ud15c\uc744 \ubd80\ucc29\ud560 \ucee8\ud2b8\ub864\ubc14\uc758 \uc778\uc2a4\ud134\uc2a4")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/plugin/ControlBar/VolumeControl.ts#L52"},"source")))))}m.isMDXComponent=!0}}]);