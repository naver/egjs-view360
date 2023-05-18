"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5092],{3905:(e,a,t)=>{t.d(a,{Zo:()=>d,kt:()=>u});var s=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,s,o=function(e,a){if(null==e)return{};var t,s,o={},r=Object.keys(e);for(s=0;s<r.length;s++)t=r[s],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)t=r[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var n=s.createContext({}),i=function(e){var a=s.useContext(n),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},d=function(e){var a=i(e.components);return s.createElement(n.Provider,{value:a},e.children)},m={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,o=e.mdxType,r=e.originalType,n=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=i(t),u=o,k=p["".concat(n,".").concat(u)]||p[u]||m[u]||r;return t?s.createElement(k,l(l({ref:a},d),{},{components:t})):s.createElement(k,l({ref:a},d))}));function u(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var r=t.length,l=new Array(r);l[0]=p;var c={};for(var n in a)hasOwnProperty.call(a,n)&&(c[n]=a[n]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var i=2;i<r;i++)l[i]=t[i];return s.createElement.apply(null,l)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},5569:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>n,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>c,toc:()=>i});var s=t(7462),o=(t(7294),t(3905));const r={custom_edit_url:null},l="RotateControlOptions",c={unversionedId:"api/Interface/RotateControlOptions",id:"api/Interface/RotateControlOptions",title:"RotateControlOptions",description:"Since version 4.0.0",source:"@site/docs/api/Interface/RotateControlOptions.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/RotateControlOptions",permalink:"/egjs-view360/docs/api/Interface/RotateControlOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"PanoControlOptions",permalink:"/egjs-view360/docs/api/Interface/PanoControlOptions"},next:{title:"VideoConfig",permalink:"/egjs-view360/docs/api/Interface/VideoConfig"}},n={},i=[{value:"Properties",id:"properties",level:2},{value:"disableKeyboard",id:"disableKeyboard",level:3},{value:"disablePitch",id:"disablePitch",level:3},{value:"disableYaw",id:"disableYaw",level:3},{value:"duration",id:"duration",level:3},{value:"easing",id:"easing",level:3},{value:"keyboardScale",id:"keyboardScale",level:3},{value:"pointerScale",id:"pointerScale",level:3}],d={toc:i};function m(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,s.Z)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"rotatecontroloptions"},"RotateControlOptions"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L21"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,"Options for ",(0,o.kt)("a",{parentName:"p",href:"../Class/RotateControl"},"RotateControl"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"interface RotateControlOptions\n")),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disableKeyboard"},"disableKeyboard")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable rotation by keyboard."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disablePitch"},"disablePitch")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable X-axis(pitch) rotation."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#disableYaw"},"disableYaw")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Disable Y-axis(yaw) rotation."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#duration"},"duration")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Duration of the input animation (ms)"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#easing"},"easing")),(0,o.kt)("div",{className:"doc-summary-desc"})),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#keyboardScale"},"keyboardScale")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Scale factor for keyboard rotation"))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#pointerScale"},"pointerScale")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Scale factor for mouse/touch rotation")))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disableKeyboard"},"disableKeyboard")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disableKeyboard"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"false"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable rotation by keyboard."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L49"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disablePitch"},"disablePitch")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disablePitch"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"false"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable X-axis(pitch) rotation."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L41"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"disableYaw"},"disableYaw")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"disableYaw"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"boolean")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"false"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Disable Y-axis(yaw) rotation."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L45"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"duration"},"duration")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"duration"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"number")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"300"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Duration of the input animation (ms)"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L33"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"easing"},"easing")),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"easing"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"((x:","\xa0","number)","\xa0","=",">","\xa0","number)")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L37"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"keyboardScale"},"keyboardScale")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"keyboardScale"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"[number,number]")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"[1, 1]"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Scale factor for keyboard rotation"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L29"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"pointerScale"},"pointerScale")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"pointerScale"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"[number,number]")),(0,o.kt)("span",{className:"doc-default",title:"Default Value"},(0,o.kt)("p",null,"[1, 1]"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Scale factor for mouse/touch rotation"))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/control/RotateControl.ts#L25"},"source")))))}m.isMDXComponent=!0}}]);