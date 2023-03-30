"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8180],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var o=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,o,n=function(e,t){if(null==e)return{};var a,o,n={},r=Object.keys(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=o.createContext({}),p=function(e){var t=o.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(a),u=n,k=m["".concat(l,".").concat(u)]||m[u]||d[u]||r;return a?o.createElement(k,i(i({ref:t},c),{},{components:a})):o.createElement(k,i({ref:t},c))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,i=new Array(r);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var p=2;p<r;p++)i[p]=a[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7605:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var o=a(7462),n=(a(7294),a(3905));const r={custom_edit_url:null},i="VideoConfig",s={unversionedId:"api/Interface/VideoConfig",id:"api/Interface/VideoConfig",title:"VideoConfig",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Interface/VideoConfig.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/VideoConfig",permalink:"/egjs-view360/ko/docs/api/Interface/VideoConfig",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"RotateControlOptions",permalink:"/egjs-view360/ko/docs/api/Interface/RotateControlOptions"},next:{title:"View360Events",permalink:"/egjs-view360/ko/docs/api/Interface/View360Events"}},l={},p=[{value:"Properties",id:"properties",level:2},{value:"autoplay",id:"autoplay",level:3},{value:"loop",id:"loop",level:3},{value:"muted",id:"muted",level:3},{value:"volume",id:"volume",level:3}],c={toc:p};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"videoconfig"},"VideoConfig"),(0,n.kt)("div",{className:"doc-side"},(0,n.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,n.kt)("div",{className:"doc-main-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/external.ts#L13"},"source")))),(0,n.kt)("div",{className:"doc-subtitle"},(0,n.kt)("p",null,"\ube44\ub514\uc624 \ud0c0\uc785\uc758 \ud30c\ub178\ub77c\ub9c8 \uc18c\uc2a4\uc5d0 \uc801\uc6a9\ud560 \uc635\uc158, \ub300\ubd80\ubd84 \ube44\ub514\uc624 \uc5d8\ub9ac\uba3c\ud2b8\uc758 \uc5b4\ud2b8\ub9ac\ubdf0\ud2b8\uc5d0 \uc801\uc6a9\ud560 \uac12\ub4e4\uc785\ub2c8\ub2e4.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"interface VideoConfig\n")),(0,n.kt)("admonition",{title:"See",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes"},"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes"))),(0,n.kt)("div",{className:"doc-summary doc-properties"},(0,n.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#autoplay"},"autoplay")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0, \ubdf0\uc5b4\uac00 \ub85c\ub529\ub41c \ub2e4\uc74c\uc5d0 \ubc14\ub85c \ube44\ub514\uc624\ub97c \uc7ac\uc0dd\ud569\ub2c8\ub2e4."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"muted\uac00 ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\uc5ec\uc57c\ub9cc \uc0ac\uc6a9 \uac00\ub2a5\ud569\ub2c8\ub2e4.")))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#loop"},"loop")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \ube44\ub514\uc624\uac00 \ub05d\ub0a0 \ub54c \uc790\ub3d9\uc73c\ub85c \ucc98\uc74c\ubd80\ud130 \ub2e4\uc2dc \uc7ac\uc0dd\ud569\ub2c8\ub2e4."))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#muted"},"muted")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\ube44\ub514\uc624\ub97c \uc74c\uc18c\uac70\ud55c \uc0c1\ud0dc\ub85c \uc7ac\uc0dd\uc744 \uc2dc\uc791\ud560\uc9c0 \uc5ec\ubd80."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"autoplay\ub97c \uc0ac\uc6a9\ud558\uae30 \uc704\ud574\uc11c\ub294 \ubc18\ub4dc\uc2dc ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\ub85c \uc124\uc815\ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4.")))),(0,n.kt)("div",{className:"doc-summary-item"},(0,n.kt)("div",{className:"doc-summary-name"},(0,n.kt)("a",{href:"#volume"},"volume")),(0,n.kt)("div",{className:"doc-summary-desc"},(0,n.kt)("p",null,"\ube44\ub514\uc624 \ucd08\uae30\ud654\uc2dc \uc801\uc6a9\ud560 \ubcfc\ub968\uac12. (0~1)")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"autoplay"},"autoplay")),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"autoplay"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0, \ubdf0\uc5b4\uac00 \ub85c\ub529\ub41c \ub2e4\uc74c\uc5d0 \ubc14\ub85c \ube44\ub514\uc624\ub97c \uc7ac\uc0dd\ud569\ub2c8\ub2e4."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"muted\uac00 ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\uc5ec\uc57c\ub9cc \uc0ac\uc6a9 \uac00\ub2a5\ud569\ub2c8\ub2e4."))),(0,n.kt)("admonition",{title:"See",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-autoplay"},"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-autoplay")))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/external.ts#L45"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"loop"},"loop")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"loop"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \ube44\ub514\uc624\uac00 \ub05d\ub0a0 \ub54c \uc790\ub3d9\uc73c\ub85c \ucc98\uc74c\ubd80\ud130 \ub2e4\uc2dc \uc7ac\uc0dd\ud569\ub2c8\ub2e4.")),(0,n.kt)("admonition",{title:"See",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-loop"},"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-loop")))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/external.ts#L33"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"muted"},"muted")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"muted"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"boolean"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\ube44\ub514\uc624\ub97c \uc74c\uc18c\uac70\ud55c \uc0c1\ud0dc\ub85c \uc7ac\uc0dd\uc744 \uc2dc\uc791\ud560\uc9c0 \uc5ec\ubd80."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"autoplay\ub97c \uc0ac\uc6a9\ud558\uae30 \uc704\ud574\uc11c\ub294 \ubc18\ub4dc\uc2dc ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),"\ub85c \uc124\uc815\ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4."))),(0,n.kt)("admonition",{title:"See",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-muted"},"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-muted")))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/external.ts#L26"},"source")))),(0,n.kt)("div",{className:"doc-header-hidden"},(0,n.kt)("h3",{id:"volume"},"volume")),(0,n.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,n.kt)("div",{className:"doc-entry"},(0,n.kt)("details",{open:!0,className:"doc-property"},(0,n.kt)("summary",{className:"doc-member"},(0,n.kt)("span",{className:"doc-name"},"volume"),(0,n.kt)("span",{className:"doc-type"},(0,n.kt)("p",null,"number"))),(0,n.kt)("div",{className:"doc-desc"},(0,n.kt)("p",null,"\ube44\ub514\uc624 \ucd08\uae30\ud654\uc2dc \uc801\uc6a9\ud560 \ubcfc\ub968\uac12. (0~1)")),(0,n.kt)("admonition",{title:"See",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume"},"https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume")))),(0,n.kt)("div",{className:"doc-source"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/type/external.ts#L52"},"source")))))}d.isMDXComponent=!0}}]);