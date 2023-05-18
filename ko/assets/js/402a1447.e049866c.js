"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8667],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>k});var s=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function n(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?n(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function r(e,a){if(null==e)return{};var t,s,o=function(e,a){if(null==e)return{};var t,s,o={},n=Object.keys(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=s.createContext({}),d=function(e){var a=s.useContext(c),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},m=function(e){var a=d(e.components);return s.createElement(c.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,o=e.mdxType,n=e.originalType,c=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),p=d(t),k=o,u=p["".concat(c,".").concat(k)]||p[k]||i[k]||n;return t?s.createElement(u,l(l({ref:a},m),{},{components:t})):s.createElement(u,l({ref:a},m))}));function k(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var n=t.length,l=new Array(n);l[0]=p;var r={};for(var c in a)hasOwnProperty.call(a,c)&&(r[c]=a[c]);r.originalType=e,r.mdxType="string"==typeof e?e:o,l[1]=r;for(var d=2;d<n;d++)l[d]=t[d];return s.createElement.apply(null,l)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},1361:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>c,contentTitle:()=>l,default:()=>i,frontMatter:()=>n,metadata:()=>r,toc:()=>d});var s=t(7462),o=(t(7294),t(3905));const n={custom_edit_url:null},l="GyroControl",r={unversionedId:"api/Class/GyroControl",id:"api/Class/GyroControl",title:"GyroControl",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Class/GyroControl.mdx",sourceDirName:"api/Class",slug:"/api/Class/GyroControl",permalink:"/egjs-view360/ko/docs/api/Class/GyroControl",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"CameraAnimation",permalink:"/egjs-view360/ko/docs/api/Class/CameraAnimation"},next:{title:"Hotspot",permalink:"/egjs-view360/ko/docs/api/Class/Hotspot"}},c={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"animating",id:"animating",level:3},{value:"enabled",id:"enabled",level:3},{value:"ignoreRoll",id:"ignoreRoll",level:3},{value:"Methods",id:"methods",level:2},{value:"isAvailable",id:"isAvailable",level:3},{value:"requestSensorPermission",id:"requestSensorPermission",level:3},{value:"destroy",id:"destroy",level:3},{value:"disable",id:"disable",level:3},{value:"enable",id:"enable",level:3},{value:"hasOn",id:"hasOn",level:3},{value:"off",id:"off",level:3},{value:"on",id:"on",level:3},{value:"once",id:"once",level:3},{value:"sync",id:"sync",level:3},{value:"trigger",id:"trigger",level:3}],m={toc:d};function i(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,s.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"gyrocontrol"},"GyroControl"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L34"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,"\uc790\uc774\ub85c\uc2a4\ucf54\ud504\ub97c \uc774\uc6a9\ud55c \ud68c\uc804 \ucee8\ud2b8\ub864")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class GyroControl extends Component<GyroControlEvents> implements CameraControl\n")),(0,o.kt)("h3",null,"Extends"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://naver.github.io/egjs-component/"},"Component"),"<","GyroControlEvents",">")),(0,o.kt)("h3",null,"Implements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"../Interface/CameraControl"},"CameraControl"))),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#animating"},"animating")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ud604\uc7ac \ucee8\ud2b8\ub864\uc774 \ub3d9\uc791\uc911\uc778\uc9c0\ub97c \ub098\ud0c0\ub0b4\ub294 \uac12"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enabled"},"enabled")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\ucee8\ud2b8\ub864\uc774 \ud65c\uc131\ud654\ub418\uc5c8\ub294\uc9c0 \uc5ec\ubd80\ub97c \ub098\ud0c0\ub0b4\ub294 \uac12"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#ignoreRoll"},"ignoreRoll")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \uc790\uc774\ub85c\uc2a4\ucf54\ud504 \uc785\ub825\uc758 roll(z\ucd95 \ud68c\uc804)\uac12\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0 \uce74\uba54\ub77c \ubc94\uc704 \uc81c\uc57d\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","yawRange, pitchRange\uc640 \uac19\uc740 \uac12\uc740 \ubb34\uc2dc\ub418\uba70, CylinderProjection \uc0ac\uc6a9\uc2dc\uc5d0\ub3c4 \ubc94\uc704\ub97c \ubc97\uc5b4\ub0a0 \uc218 \uc788\uc2b5\ub2c8\ub2e4."))))),(0,o.kt)("div",{className:"doc-summary doc-methods"},(0,o.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#isAvailable"},"isAvailable")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\uc790\uc774\ub85c\uc2a4\ucf54\ud504 \uc0ac\uc6a9 \uac00\ub2a5 \uc5ec\ubd80\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"iOS\uc640 \uac19\uc774 GyroScope \uc0ac\uc6a9\uc2dc \uc0ac\uc6a9\uc790 Permission\uc744 \uc694\uad6c\ud558\ub294 \ud658\uacbd\uc5d0\uc11c\ub294 \uc0ac\uc6a9\uc790 Permission\uc744 \ubc1b\uae30 \uc804\uae4c\uc9c0 \ud56d\uc0c1 ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\uc785\ub2c8\ub2e4.")))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#requestSensorPermission"},"requestSensorPermission")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"\uc0ac\uc6a9\uc790\uc758 sensor permission \ucde8\ub4dd\uc744 \uc694\uccad\ud569\ub2c8\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","iOS\uc640 \uac19\uc774 gyroscope \uc0ac\uc6a9\uc2dc \uc0ac\uc6a9\uc790 Permission\uc744 \uc694\uad6c\ud558\ub294 \ud658\uacbd\uc5d0\uc11c \uc0ac\uc6a9 \uac00\ub2a5\ud569\ub2c8\ub2e4."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#destroy"},"destroy")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disable"},"disable")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#enable"},"enable")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#hasOn"},"hasOn")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#off"},"off")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#on"},"on")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#once"},"once")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#sync"},"sync")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#trigger"},"trigger")),(0,o.kt)("div",{className:"doc-summary-desc"}))),(0,o.kt)("h2",{id:"constructor"},"Constructor"),(0,o.kt)("div",{className:"doc-member-subtitle"},"GyroControl\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new GyroControl(enableBlocked: boolean, options: Partial<GyroControlOptions>): GyroControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"enableBlocked"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ucd08\uae30\ud654 \uacfc\uc815\uc5d0\uc11c \ucee8\ud2b8\ub864 \ud65c\uc131\ud654 \uc5ec\ubd80"))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"options"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<",(0,o.kt)("a",{parentName:"p",href:"../Interface/GyroControlOptions"},"GyroControlOptions"),">")),(0,o.kt)("div",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"{}"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ucee8\ud2b8\ub864 \uc635\uc158\ub4e4"))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"animating"},"animating")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"animating"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ud604\uc7ac \ucee8\ud2b8\ub864\uc774 \ub3d9\uc791\uc911\uc778\uc9c0\ub97c \ub098\ud0c0\ub0b4\ub294 \uac12"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L53"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enabled"},"enabled")),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enabled"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\ucee8\ud2b8\ub864\uc774 \ud65c\uc131\ud654\ub418\uc5c8\ub294\uc9c0 \uc5ec\ubd80\ub97c \ub098\ud0c0\ub0b4\ub294 \uac12"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L45"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"ignoreRoll"},"ignoreRoll")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"ignoreRoll"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"true"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"true"),"\uc77c \uacbd\uc6b0 \uc790\uc774\ub85c\uc2a4\ucf54\ud504 \uc785\ub825\uc758 roll(z\ucd95 \ud68c\uc804)\uac12\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"\uc774 \uac12\uc744 ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\ub85c \uc124\uc815\ud560 \uacbd\uc6b0 \uce74\uba54\ub77c \ubc94\uc704 \uc81c\uc57d\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","yawRange, pitchRange\uc640 \uac19\uc740 \uac12\uc740 \ubb34\uc2dc\ub418\uba70, CylinderProjection \uc0ac\uc6a9\uc2dc\uc5d0\ub3c4 \ubc94\uc704\ub97c \ubc97\uc5b4\ub0a0 \uc218 \uc788\uc2b5\ub2c8\ub2e4.")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L71"},"source")))),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"isAvailable"},"isAvailable")),(0,o.kt)("span",{className:"badge badge--info"},"static"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"isAvailable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"Promise","<","boolean",">"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"isAvailable(): Promise<boolean>\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\uc790\uc774\ub85c\uc2a4\ucf54\ud504 \uc0ac\uc6a9 \uac00\ub2a5 \uc5ec\ubd80\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"iOS\uc640 \uac19\uc774 GyroScope \uc0ac\uc6a9\uc2dc \uc0ac\uc6a9\uc790 Permission\uc744 \uc694\uad6c\ud558\ub294 \ud658\uacbd\uc5d0\uc11c\ub294 \uc0ac\uc6a9\uc790 Permission\uc744 \ubc1b\uae30 \uc804\uae4c\uc9c0 \ud56d\uc0c1 ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\uc785\ub2c8\ub2e4."))),(0,o.kt)("admonition",{title:"Example",type:"info"},(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"const gyroAvailable = await GyroControl.isAvailable();\n")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L88"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"requestSensorPermission"},"requestSensorPermission")),(0,o.kt)("span",{className:"badge badge--info"},"static"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"requestSensorPermission"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"Promise","<","boolean",">"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"requestSensorPermission(): Promise<boolean>\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"\uc0ac\uc6a9\uc790\uc758 sensor permission \ucde8\ub4dd\uc744 \uc694\uccad\ud569\ub2c8\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","iOS\uc640 \uac19\uc774 gyroscope \uc0ac\uc6a9\uc2dc \uc0ac\uc6a9\uc790 Permission\uc744 \uc694\uad6c\ud558\ub294 \ud658\uacbd\uc5d0\uc11c \uc0ac\uc6a9 \uac00\ub2a5\ud569\ub2c8\ub2e4.")),(0,o.kt)("h4",{className:"doc-comment-title"},"Returns"),(0,o.kt)("p",null,"\uc0ac\uc6a9\uc790 permission \ucde8\ub4dd \uc5ec\ubd80")),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L122"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"destroy"},"destroy")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"destroy"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"destroy(): void\n")),(0,o.kt)("div",{className:"doc-desc"})),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L154"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disable"},"disable")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"disable(): void\n")),(0,o.kt)("div",{className:"doc-desc"})),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L185"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"enable"},"enable")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"enable"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"enable(): void\n")),(0,o.kt)("div",{className:"doc-desc"})),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L174"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"hasOn"},"hasOn")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"hasOn"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"hasOn<K>(eventName: K): boolean\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventName"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"off"},"off")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"off"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"GyroControl"},"GyroControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"off<K>(eventName: K, handlerToDetach: EventCallback<GyroControlEvents, K, GyroControl>): GyroControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventName"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"handlerToDetach"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"EventCallback","<","GyroControlEvents,","\xa0","K,","\xa0",(0,o.kt)("a",{parentName:"p",href:"GyroControl"},"GyroControl"),">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"on"},"on")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"on"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"GyroControl"},"GyroControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'on(eventHash: Partial<{ change: ((event: { delta: void; isKeyboard: boolean; isTouch: boolean }) => any); disable: ((event: { updateCursor: boolean }) => any); enable: ((event: { control: CameraControl; updateCursor: boolean }) => any); inputEnd: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; scrolling: boolean }) => any); inputStart: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; srcEvent: MouseEvent | TouchEvent | KeyboardEvent }) => any); staticClick: ((event: { isTouch: boolean }) => any) }>): GyroControl\n')),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventHash"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<","{","\xa0","change:","\xa0","((event:","\xa0","{","\xa0","delta:","\xa0","void;","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","disable:","\xa0","((event:","\xa0","{","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","enable:","\xa0","((event:","\xa0","{","\xa0","control:","\xa0",(0,o.kt)("a",{parentName:"p",href:"../Interface/CameraControl"},"CameraControl"),";","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputEnd:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","scrolling:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputStart:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","srcEvent:","\xa0","MouseEvent","\xa0","|","\xa0","TouchEvent","\xa0","|","\xa0","KeyboardEvent","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","staticClick:","\xa0","((event:","\xa0","{","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"once"},"once")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"once"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"GyroControl"},"GyroControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'once(eventHash: Partial<{ change: ((event: { delta: void; isKeyboard: boolean; isTouch: boolean }) => any); disable: ((event: { updateCursor: boolean }) => any); enable: ((event: { control: CameraControl; updateCursor: boolean }) => any); inputEnd: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; scrolling: boolean }) => any); inputStart: ((event: { inputType: "zoom" | "rotate" } & { isKeyboard: boolean; isTouch: boolean; srcEvent: MouseEvent | TouchEvent | KeyboardEvent }) => any); staticClick: ((event: { isTouch: boolean }) => any) }>): GyroControl\n')),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"eventHash"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Partial","<","{","\xa0","change:","\xa0","((event:","\xa0","{","\xa0","delta:","\xa0","void;","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","disable:","\xa0","((event:","\xa0","{","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","enable:","\xa0","((event:","\xa0","{","\xa0","control:","\xa0",(0,o.kt)("a",{parentName:"p",href:"../Interface/CameraControl"},"CameraControl"),";","\xa0","updateCursor:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputEnd:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","scrolling:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","inputStart:","\xa0","((event:","\xa0","{","\xa0","inputType:","\xa0",'"',"zoom",'"',"\xa0","|","\xa0",'"',"rotate",'"',"\xa0","}","\xa0","&","\xa0","{","\xa0","isKeyboard:","\xa0","boolean;","\xa0","isTouch:","\xa0","boolean;","\xa0","srcEvent:","\xa0","MouseEvent","\xa0","|","\xa0","TouchEvent","\xa0","|","\xa0","KeyboardEvent","\xa0","})","\xa0","=",">","\xa0","any);","\xa0","staticClick:","\xa0","((event:","\xa0","{","\xa0","isTouch:","\xa0","boolean","\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"sync"},"sync")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"sync"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"sync(): void\n")),(0,o.kt)("div",{className:"doc-desc"})),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/control/GyroControl.ts#L195"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"trigger"},"trigger")),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"trigger"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"GyroControl"},"GyroControl")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"trigger<K>(event: K, ...params: EventTriggerParams<GyroControlEvents, K>): GyroControl\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"event"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"K")))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"params"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"EventTriggerParams","<","GyroControlEvents,","\xa0","K",">")))))))}i.isMDXComponent=!0}}]);