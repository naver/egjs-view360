"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6330],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var o=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,o,r=function(e,t){if(null==e)return{};var a,o,r={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=o.createContext({}),i=function(e){var t=o.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=i(e.components);return o.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=i(a),u=r,k=d["".concat(c,".").concat(u)]||d[u]||m[u]||n;return a?o.createElement(k,s(s({ref:t},p),{},{components:a})):o.createElement(k,s({ref:t},p))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,s=new Array(n);s[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var i=2;i<n;i++)s[i]=a[i];return o.createElement.apply(null,s)}return o.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7885:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>n,metadata:()=>l,toc:()=>i});var o=a(7462),r=(a(7294),a(3905));const n={custom_edit_url:null},s="PanoControlOptions",l={unversionedId:"api/Interface/PanoControlOptions",id:"api/Interface/PanoControlOptions",title:"PanoControlOptions",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Interface/PanoControlOptions.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/PanoControlOptions",permalink:"/egjs-view360/ko/docs/api/Interface/PanoControlOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"HotspotOptions",permalink:"/egjs-view360/ko/docs/api/Interface/HotspotOptions"},next:{title:"RotateControlOptions",permalink:"/egjs-view360/ko/docs/api/Interface/RotateControlOptions"}},c={},i=[{value:"Properties",id:"properties",level:2},{value:"disableContextMenu",id:"disableContextMenu",level:3},{value:"gyro",id:"gyro",level:3},{value:"rotate",id:"rotate",level:3},{value:"scrollable",id:"scrollable",level:3},{value:"useGrabCursor",id:"useGrabCursor",level:3},{value:"wheelScrollable",id:"wheelScrollable",level:3},{value:"zoom",id:"zoom",level:3}],p={toc:i};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,o.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"panocontroloptions"},"PanoControlOptions"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L21"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/PanoControl"},"PanoControl"),"\uc6a9 \uc635\uc158\ub4e4")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface PanoControlOptions\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#disableContextMenu"},"disableContextMenu")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ub9c8\uc6b0\uc2a4 \uc6b0\ud074\ub9ad\uc2dc \ud45c\uc2dc\ub418\ub294 \ucee8\ud14d\uc2a4\ud2b8 \uba54\ub274\ub97c \ube44\ud65c\uc131\ud654\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#gyro"},"gyro")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/GyroControl"},"GyroControl"),"\uc6a9 \uc635\uc158\ub4e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\uc77c \uacbd\uc6b0 \uc790\uc774\ub85c\uc2a4\ucf54\ud504\ub97c \ud1b5\ud55c \ucee8\ud2b8\ub864\uc774 \ube44\ud65c\uc131\ud654\ub429\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#rotate"},"rotate")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/RotateControl"},"RotateControl"),"\uc6a9 \uc635\uc158\ub4e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\uc77c \uacbd\uc6b0 \ud68c\uc804\uc774 \ube44\ud65c\uc131\ud654\ub429\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#scrollable"},"scrollable")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"true"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0, \ubaa8\ubc14\uc77c(\ud130\uce58) \ud658\uacbd\uc758 \uce94\ubc84\uc2a4 \uc601\uc5ed \ub0b4\uc5d0\uc11c \uc2a4\ud06c\ub864\uc744 \uac00\ub2a5\ud558\uac8c \ud569\ub2c8\ub2e4."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 \ud65c\uc131\ud654\ud560 \uacbd\uc6b0, \uc0ac\uc6a9\uc790\uac00 \uce74\uba54\ub77c \ubdf0\ub97c \uc704/\uc544\ub798\ub85c \ubc14\uafb8\uae30 \uc704\ud574\uc11c\ub294 \uba3c\uc800 \uac00\ub85c\ub85c \uc2a4\uc640\uc774\ud504\ud55c \uc774\ud6c4\uc5d0 \uc138\ub85c\ub85c \uc2a4\uc640\uc774\ud504\ud574\uc57c\ub9cc \ud569\ub2c8\ub2e4.")))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#useGrabCursor"},"useGrabCursor")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\ub9c8\uc6b0\uc2a4 \uc0ac\uc6a9\uc2dc CSS ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"},"cursor"),"\uac12\uc744 \uc790\ub3d9\uc73c\ub85c \ubcc0\uacbd\ud560\uc9c0 \uc5ec\ubd80.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \uae30\ubcf8 \uc0c1\ud0dc\uc5d0\uc11c ",(0,r.kt)("inlineCode",{parentName:"p"},'cursor: "grab"'),"\uc744, \uc785\ub825 \ub3c4\uc911\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"p"},'cursor: "grabbing"'),"\uc744 \uce94\ubc84\uc2a4\uc5d0 \uc801\uc6a9\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#wheelScrollable"},"wheelScrollable")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"true"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0, \uce94\ubc84\uc2a4 \uc601\uc5ed \ub0b4\uc5d0\uc11c \ub9c8\uc6b0\uc2a4 \ud720\uc744 \uc774\uc6a9\ud55c \ud398\uc774\uc9c0 \uc2a4\ud06c\ub864\uc774 \uac00\ub2a5\ud574\uc9d1\ub2c8\ub2e4."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 \ud65c\uc131\ud654\ud560 \uacbd\uc6b0, \ub9c8\uc6b0\uc2a4 \ud720\uc744 \ud1b5\ud55c \uc90c\uc774 \ubd88\uac00\ub2a5\ud558\uac8c \ub429\ub2c8\ub2e4.")))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#zoom"},"zoom")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/ZoomControl"},"ZoomControl"),"\uc6a9 \uc635\uc158\ub4e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\uc77c \uacbd\uc6b0 \uc90c\uc774 \ube44\ud65c\uc131\ud654\ub429\ub2c8\ub2e4.")))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"disableContextMenu"},"disableContextMenu")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"disableContextMenu"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean")),(0,r.kt)("span",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"false"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ub9c8\uc6b0\uc2a4 \uc6b0\ud074\ub9ad\uc2dc \ud45c\uc2dc\ub418\ub294 \ucee8\ud14d\uc2a4\ud2b8 \uba54\ub274\ub97c \ube44\ud65c\uc131\ud654\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L37"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"gyro"},"gyro")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"gyro"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"GyroControlOptions"},"GyroControlOptions"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/GyroControl"},"GyroControl"),"\uc6a9 \uc635\uc158\ub4e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\uc77c \uacbd\uc6b0 \uc790\uc774\ub85c\uc2a4\ucf54\ud504\ub97c \ud1b5\ud55c \ucee8\ud2b8\ub864\uc774 \ube44\ud65c\uc131\ud654\ub429\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L61"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"rotate"},"rotate")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"rotate"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"RotateControlOptions"},"RotateControlOptions"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/RotateControl"},"RotateControl"),"\uc6a9 \uc635\uc158\ub4e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\uc77c \uacbd\uc6b0 \ud68c\uc804\uc774 \ube44\ud65c\uc131\ud654\ub429\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L45"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"scrollable"},"scrollable")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"scrollable"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean")),(0,r.kt)("span",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"true"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"true"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0, \ubaa8\ubc14\uc77c(\ud130\uce58) \ud658\uacbd\uc758 \uce94\ubc84\uc2a4 \uc601\uc5ed \ub0b4\uc5d0\uc11c \uc2a4\ud06c\ub864\uc744 \uac00\ub2a5\ud558\uac8c \ud569\ub2c8\ub2e4."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 \ud65c\uc131\ud654\ud560 \uacbd\uc6b0, \uc0ac\uc6a9\uc790\uac00 \uce74\uba54\ub77c \ubdf0\ub97c \uc704/\uc544\ub798\ub85c \ubc14\uafb8\uae30 \uc704\ud574\uc11c\ub294 \uba3c\uc800 \uac00\ub85c\ub85c \uc2a4\uc640\uc774\ud504\ud55c \uc774\ud6c4\uc5d0 \uc138\ub85c\ub85c \uc2a4\uc640\uc774\ud504\ud574\uc57c\ub9cc \ud569\ub2c8\ub2e4.")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L29"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"useGrabCursor"},"useGrabCursor")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"useGrabCursor"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean")),(0,r.kt)("span",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"true"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\ub9c8\uc6b0\uc2a4 \uc0ac\uc6a9\uc2dc CSS ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"},"cursor"),"\uac12\uc744 \uc790\ub3d9\uc73c\ub85c \ubcc0\uacbd\ud560\uc9c0 \uc5ec\ubd80.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \uae30\ubcf8 \uc0c1\ud0dc\uc5d0\uc11c ",(0,r.kt)("inlineCode",{parentName:"p"},'cursor: "grab"'),"\uc744, \uc785\ub825 \ub3c4\uc911\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"p"},'cursor: "grabbing"'),"\uc744 \uce94\ubc84\uc2a4\uc5d0 \uc801\uc6a9\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L25"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"wheelScrollable"},"wheelScrollable")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"wheelScrollable"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean")),(0,r.kt)("span",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"false"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"true"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0, \uce94\ubc84\uc2a4 \uc601\uc5ed \ub0b4\uc5d0\uc11c \ub9c8\uc6b0\uc2a4 \ud720\uc744 \uc774\uc6a9\ud55c \ud398\uc774\uc9c0 \uc2a4\ud06c\ub864\uc774 \uac00\ub2a5\ud574\uc9d1\ub2c8\ub2e4."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 \ud65c\uc131\ud654\ud560 \uacbd\uc6b0, \ub9c8\uc6b0\uc2a4 \ud720\uc744 \ud1b5\ud55c \uc90c\uc774 \ubd88\uac00\ub2a5\ud558\uac8c \ub429\ub2c8\ub2e4.")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L33"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"zoom"},"zoom")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"zoom"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"ZoomControlOptions"},"ZoomControlOptions"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Class/ZoomControl"},"ZoomControl"),"\uc6a9 \uc635\uc158\ub4e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\uc77c \uacbd\uc6b0 \uc90c\uc774 \ube44\ud65c\uc131\ud654\ub429\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L53"},"source")))))}m.isMDXComponent=!0}}]);