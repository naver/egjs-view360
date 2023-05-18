"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5997],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var o=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,o,n=function(e,t){if(null==e)return{};var a,o,n={},r=Object.keys(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=o.createContext({}),i=function(e){var t=o.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=i(e.components);return o.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=i(a),u=n,k=d["".concat(c,".").concat(u)]||d[u]||m[u]||r;return a?o.createElement(k,s(s({ref:t},p),{},{components:a})):o.createElement(k,s({ref:t},p))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,s=new Array(r);s[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,s[1]=l;for(var i=2;i<r;i++)s[i]=a[i];return o.createElement.apply(null,s)}return o.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8613:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>i});var o=a(7462),n=(a(7294),a(3905));const r={custom_edit_url:null},s="PanoControlOptions",l={unversionedId:"api/Interface/PanoControlOptions",id:"api/Interface/PanoControlOptions",title:"PanoControlOptions",description:"Since version 4.0.0",source:"@site/docs/api/Interface/PanoControlOptions.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/PanoControlOptions",permalink:"/egjs-view360/docs/api/Interface/PanoControlOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"HotspotOptions",permalink:"/egjs-view360/docs/api/Interface/HotspotOptions"},next:{title:"RotateControlOptions",permalink:"/egjs-view360/docs/api/Interface/RotateControlOptions"}},c={},i=[{value:"Properties",id:"properties",level:2},{value:"disableContextMenu",id:"disableContextMenu",level:3},{value:"gyro",id:"gyro",level:3},{value:"rotate",id:"rotate",level:3},{value:"scrollable",id:"scrollable",level:3},{value:"useGrabCursor",id:"useGrabCursor",level:3},{value:"wheelScrollable",id:"wheelScrollable",level:3},{value:"zoom",id:"zoom",level:3}],p={toc:i};function m(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"panocontroloptions"},"PanoControlOptions"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L21"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../Class/PanoControl"},"PanoControl"))),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface PanoControlOptions\n")),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#disableContextMenu"},"disableContextMenu")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#gyro"},"gyro")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../Class/GyroControl"},"GyroControl"),".",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," to disable gyroscope control."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#rotate"},"rotate")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../Class/RotateControl"},"RotateControl"),".",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," to disable rotation."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#scrollable"},"scrollable")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"If ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll on mobile(touch) devices on canvas."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"When this option is enabled, users must swipe horizontally first then vertically to change view up or down.")))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#useGrabCursor"},"useGrabCursor")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Apply CSS ",(0,n.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"},"cursor")," by current state of input when using mouse.",(0,n.kt)("br",{parentName:"p"}),"\n","If ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),", this will add CSS style to canvas element. It'll apply ",(0,n.kt)("inlineCode",{parentName:"p"},'cursor: "grab"')," by default and ",(0,n.kt)("inlineCode",{parentName:"p"},'cursor: "grabbing"')," when holding the mouse button."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#wheelScrollable"},"wheelScrollable")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"If ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll by mouse wheel on canvas."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"When this option is enabled, zoom by mouse wheel will be disabled.")))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#zoom"},"zoom")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../Class/ZoomControl"},"ZoomControl"),".",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," to disable zoom.")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"disableContextMenu"},"disableContextMenu")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"disableContextMenu"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean")),(0,n.kt)("span",{className:"doc-default",title:"Default Value"},(0,n.kt)("p",null,"false"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Disable context menu which pops up on mouse right click."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L37"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"gyro"},"gyro")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"gyro"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,n.kt)("a",{parentName:"p",href:"GyroControlOptions"},"GyroControlOptions"),">"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../Class/GyroControl"},"GyroControl"),".",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," to disable gyroscope control."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L61"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"rotate"},"rotate")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"rotate"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,n.kt)("a",{parentName:"p",href:"RotateControlOptions"},"RotateControlOptions"),">"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../Class/RotateControl"},"RotateControl"),".",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," to disable rotation."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L45"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"scrollable"},"scrollable")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"scrollable"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean")),(0,n.kt)("span",{className:"doc-default",title:"Default Value"},(0,n.kt)("p",null,"true"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"If ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll on mobile(touch) devices on canvas."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"When this option is enabled, users must swipe horizontally first then vertically to change view up or down.")))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L29"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"useGrabCursor"},"useGrabCursor")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"useGrabCursor"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean")),(0,n.kt)("span",{className:"doc-default",title:"Default Value"},(0,n.kt)("p",null,"true"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Apply CSS ",(0,n.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"},"cursor")," by current state of input when using mouse.",(0,n.kt)("br",{parentName:"p"}),"\n","If ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),", this will add CSS style to canvas element. It'll apply ",(0,n.kt)("inlineCode",{parentName:"p"},'cursor: "grab"')," by default and ",(0,n.kt)("inlineCode",{parentName:"p"},'cursor: "grabbing"')," when holding the mouse button."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L25"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"wheelScrollable"},"wheelScrollable")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"wheelScrollable"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean")),(0,n.kt)("span",{className:"doc-default",title:"Default Value"},(0,n.kt)("p",null,"false"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"If ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),", enables scroll by mouse wheel on canvas."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"When this option is enabled, zoom by mouse wheel will be disabled.")))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L33"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"zoom"},"zoom")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"zoom"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean","\xa0","|","\xa0","Partial","<",(0,n.kt)("a",{parentName:"p",href:"ZoomControlOptions"},"ZoomControlOptions"),">"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"Options for ",(0,n.kt)("a",{parentName:"p",href:"../Class/ZoomControl"},"ZoomControl"),".",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("inlineCode",{parentName:"p"},"false")," to disable zoom."))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/PanoControl.ts#L53"},"source")))))}m.isMDXComponent=!0}}]);