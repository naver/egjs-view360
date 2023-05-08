"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2706],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(r),m=o,y=d["".concat(s,".").concat(m)]||d[m]||u[m]||a;return r?n.createElement(y,i(i({ref:t},p),{},{components:r})):n.createElement(y,i({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},624:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={custom_edit_url:null},i="GyroControlOptions",l={unversionedId:"api/Interface/GyroControlOptions",id:"api/Interface/GyroControlOptions",title:"GyroControlOptions",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Interface/GyroControlOptions.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/GyroControlOptions",permalink:"/egjs-view360/ko/docs/api/Interface/GyroControlOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"CameraOptions",permalink:"/egjs-view360/ko/docs/api/Interface/CameraOptions"},next:{title:"HotspotOptions",permalink:"/egjs-view360/ko/docs/api/Interface/HotspotOptions"}},s={},c=[{value:"Properties",id:"properties",level:2},{value:"ignoreRoll",id:"ignoreRoll",level:3}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"gyrocontroloptions"},"GyroControlOptions"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/control/GyroControl.ts#L20"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../Class/GyroControl"},"GyroControl"),"\uc6a9 \uc635\uc158\ub4e4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"interface GyroControlOptions\n")),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#ignoreRoll"},"ignoreRoll")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \uc790\uc774\ub85c\uc2a4\ucf54\ud504 \uc785\ub825\uc758 roll(z\ucd95 \ud68c\uc804)\uac12\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0 \uce74\uba54\ub77c \ubc94\uc704 \uc81c\uc57d\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","yawRange, pitchRange\uc640 \uac19\uc740 \uac12\uc740 \ubb34\uc2dc\ub418\uba70, CylinderProjection \uc0ac\uc6a9\uc2dc\uc5d0\ub3c4 \ubc94\uc704\ub97c \ubc97\uc5b4\ub0a0 \uc218 \uc788\uc2b5\ub2c8\ub2e4."))))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"ignoreRoll"},"ignoreRoll")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"ignoreRoll"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"true"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \uc790\uc774\ub85c\uc2a4\ucf54\ud504 \uc785\ub825\uc758 roll(z\ucd95 \ud68c\uc804)\uac12\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0 \uce74\uba54\ub77c \ubc94\uc704 \uc81c\uc57d\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","yawRange, pitchRange\uc640 \uac19\uc740 \uac12\uc740 \ubb34\uc2dc\ub418\uba70, CylinderProjection \uc0ac\uc6a9\uc2dc\uc5d0\ub3c4 \ubc94\uc704\ub97c \ubc97\uc5b4\ub0a0 \uc218 \uc788\uc2b5\ub2c8\ub2e4.")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/control/GyroControl.ts#L24"},"source")))))}u.isMDXComponent=!0}}]);