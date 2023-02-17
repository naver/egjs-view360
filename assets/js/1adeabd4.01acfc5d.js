"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7643],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),c=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(o.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(t),d=a,f=u["".concat(o,".").concat(d)]||u[d]||m[d]||s;return t?r.createElement(f,l(l({ref:n},p),{},{components:t})):r.createElement(f,l({ref:n},p))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var s=t.length,l=new Array(s);l[0]=u;var i={};for(var o in n)hasOwnProperty.call(n,o)&&(i[o]=n[o]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var c=2;c<s;c++)l[c]=t[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},4801:(e,n,t)=>{t.d(n,{Z:()=>d});var r=t(6010),a=t(7294);const s="container_KAvi",l="tags_yIZ0",i="tag_NTEP",o="dark_QuFp",c="info_Tfvv",p="warning_OxPl",m="success_OgfR",u="link_PhWZ",d=e=>{let{type:n,defaultVal:t,added:d}=e;return a.createElement("div",{className:s},n&&a.createElement("div",{className:l},a.createElement("span",{className:(0,r.Z)(i,o)},"Type"),a.createElement("span",{className:(0,r.Z)(i,c)},n)),t&&a.createElement("div",{className:l},a.createElement("span",{className:(0,r.Z)(i,o)},"Default"),a.createElement("span",{className:(0,r.Z)(i,p)},t)),d&&a.createElement("div",{className:l},a.createElement("span",{className:(0,r.Z)(i,o)},"Added in"),a.createElement("a",{className:u,href:"https://github.com/naver/egjs-view360/releases/tag/"+d,target:"_blank",rel:"noopener noreferrer"},a.createElement("span",{className:(0,r.Z)(i,m)},"v",d))))}},300:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var r=t(7462),a=(t(7294),t(3905)),s=t(4801);const l={},i=void 0,o={unversionedId:"plugins/LoadingSpinner/className",id:"plugins/LoadingSpinner/className",title:"className",description:'" defaultVal="{}" added="4.0.0" />',source:"@site/docs/plugins/LoadingSpinner/className.mdx",sourceDirName:"plugins/LoadingSpinner",slug:"/plugins/LoadingSpinner/className",permalink:"/egjs-view360/docs/plugins/LoadingSpinner/className",draft:!1,editUrl:"https://github.com/naver/egjs-view360/edit/master/demo/docs/plugins/LoadingSpinner/className.mdx",tags:[],version:"current",frontMatter:{},sidebar:"plugins",previous:{title:"LoadingSpinner",permalink:"/egjs-view360/docs/plugins/LoadingSpinner/"},next:{title:"ControlBar",permalink:"/egjs-view360/docs/plugins/ControlBar/"}},c={},p=[{value:"Example",id:"example",level:2}],m={toc:p};function u(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)(s.Z,{type:"Record<string, string>",defaultVal:"{}",added:"4.0.0",mdxType:"OptionDescriptor"}),(0,a.kt)("p",null,"Override default class names.",(0,a.kt)("br",{parentName:"p"}),"\n","You can use it to set a different class name for the control bar element."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"Below is an example of changing the class of the container element (",(0,a.kt)("inlineCode",{parentName:"p"},".view360-spinner"),")."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { LoadingSpinner } from "@egjs/view360";\n\nnew LoadingSpinner({\n  className: {\n    CONTAINER: "new-container-classname"\n  }\n})\n')))}u.isMDXComponent=!0}}]);