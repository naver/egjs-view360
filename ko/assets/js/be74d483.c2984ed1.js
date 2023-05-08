"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9401],{3905:(e,a,t)=>{t.d(a,{Zo:()=>l,kt:()=>u});var s=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function n(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?n(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,s,r=function(e,a){if(null==e)return{};var t,s,r={},n=Object.keys(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)t=n[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=s.createContext({}),m=function(e){var a=s.useContext(i),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},l=function(e){var a=m(e.components);return s.createElement(i.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,r=e.mdxType,n=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=m(t),u=r,k=p["".concat(i,".").concat(u)]||p[u]||d[u]||n;return t?s.createElement(k,o(o({ref:a},l),{},{components:t})):s.createElement(k,o({ref:a},l))}));function u(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var n=t.length,o=new Array(n);o[0]=p;var c={};for(var i in a)hasOwnProperty.call(a,i)&&(c[i]=a[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var m=2;m<n;m++)o[m]=t[m];return s.createElement.apply(null,o)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},5958:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>c,toc:()=>m});var s=t(7462),r=(t(7294),t(3905));const n={custom_edit_url:null},o="CameraAnimation",c={unversionedId:"api/Class/CameraAnimation",id:"api/Class/CameraAnimation",title:"CameraAnimation",description:"Since version 4.0.0",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/api/Class/CameraAnimation.mdx",sourceDirName:"api/Class",slug:"/api/Class/CameraAnimation",permalink:"/egjs-view360/ko/docs/api/Class/CameraAnimation",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Camera",permalink:"/egjs-view360/ko/docs/api/Class/Camera"},next:{title:"GyroControl",permalink:"/egjs-view360/ko/docs/api/Class/GyroControl"}},i={},m=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"duration",id:"duration",level:3},{value:"easing",id:"easing",level:3},{value:"Methods",id:"methods",level:2},{value:"getFinishPromise",id:"getFinishPromise",level:3},{value:"update",id:"update",level:3}],l={toc:m};function d(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,s.Z)({},l,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"cameraanimation"},"CameraAnimation"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/core/CameraAnimation.ts#L22"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"Camera"},"Camera"),"\uc758 \uc560\ub2c8\uba54\uc774\uc158")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class CameraAnimation\n")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#duration"},"duration")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158 \uc7ac\uc0dd\uc2dc\uac04"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#easing"},"easing")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158\uc758 easing function")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#getFinishPromise"},"getFinishPromise")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158 \uc7ac\uc0dd\uc774 \ub05d\ub0ac\uc744 \ub54c resolve\ub418\ub294 Promise\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#update"},"update")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"\uc8fc\uc5b4\uc9c4 \uc2dc\uac04\ub9cc\ud07c \uc560\ub2c8\uba54\uc774\uc158\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"\uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new CameraAnimation(camera: Camera, from: CameraPose, to: CameraPose, options: { duration: undefined | number; easing: undefined | ((x: number) => number) }): CameraAnimation\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158\uc744 \uc801\uc6a9\ud560 \uce74\uba54\ub77c"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"from"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"CameraPose"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158\uc774 \uc2dc\uc791 \uc2dc\uc810\uc758 \uce74\uba54\ub77c\uc758 \ud68c\uc804 \ubc0f \uc90c"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"to"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"CameraPose"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158\uc774 \ub05d\ub0ac\uc744 \ub54c \uce74\uba54\ub77c\uc758 \ud68c\uc804 \ubc0f \uc90c"))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"options"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"{","\xa0","duration:","\xa0","undefined","\xa0","|","\xa0","number;","\xa0","easing:","\xa0","undefined","\xa0","|","\xa0","((x:","\xa0","number)","\xa0","=",">","\xa0","number)","\xa0","}")),(0,r.kt)("div",{className:"doc-default",title:"Default Value"},(0,r.kt)("p",null,"{}"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc635\uc158\ub4e4")),(0,r.kt)("div",{className:"doc-sub-param"},(0,r.kt)("span",{className:"doc-name"},"options.duration"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"undefined","\xa0","|","\xa0","number")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158 \uc7ac\uc0dd \uc2dc\uac04"))),(0,r.kt)("div",{className:"doc-sub-param"},(0,r.kt)("span",{className:"doc-name"},"options.easing"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"undefined","\xa0","|","\xa0","Function")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158 easing function")))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"duration"},"duration")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"duration"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158 \uc7ac\uc0dd\uc2dc\uac04"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/core/CameraAnimation.ts#L38"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"easing"},"easing")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"easing"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158\uc758 easing function"))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/core/CameraAnimation.ts#L45"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"getFinishPromise"},"getFinishPromise")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"getFinishPromise"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"Promise","<","void",">"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"getFinishPromise(): Promise<void>\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc560\ub2c8\uba54\uc774\uc158 \uc7ac\uc0dd\uc774 \ub05d\ub0ac\uc744 \ub54c resolve\ub418\ub294 Promise\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/core/CameraAnimation.ts#L79"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"update"},"update")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"update"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"update(deltaTime: number): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc8fc\uc5b4\uc9c4 \uc2dc\uac04\ub9cc\ud07c \uc560\ub2c8\uba54\uc774\uc158\uc744 \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"deltaTime"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"number"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"\uc5c5\ub370\uc774\ud2b8\ud560 \uc2dc\uac04, \ubc00\ub9ac\ucd08 \ub2e8\uc704")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/8a95762a/packages/view360/src/core/CameraAnimation.ts#L89"},"source")))))}d.isMDXComponent=!0}}]);