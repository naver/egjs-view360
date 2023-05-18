"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7088],{3905:(e,a,t)=>{t.d(a,{Zo:()=>l,kt:()=>k});var s=t(7294);function c(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function m(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){c(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function n(e,a){if(null==e)return{};var t,s,c=function(e,a){if(null==e)return{};var t,s,c={},r=Object.keys(e);for(s=0;s<r.length;s++)t=r[s],a.indexOf(t)>=0||(c[t]=e[t]);return c}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)t=r[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}var d=s.createContext({}),o=function(e){var a=s.useContext(d),t=a;return e&&(t="function"==typeof e?e(a):m(m({},a),e)),t},l=function(e){var a=o(e.components);return s.createElement(d.Provider,{value:a},e.children)},i={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,c=e.mdxType,r=e.originalType,d=e.parentName,l=n(e,["components","mdxType","originalType","parentName"]),p=o(t),k=c,u=p["".concat(d,".").concat(k)]||p[k]||i[k]||r;return t?s.createElement(u,m(m({ref:a},l),{},{components:t})):s.createElement(u,m({ref:a},l))}));function k(e,a){var t=arguments,c=a&&a.mdxType;if("string"==typeof e||c){var r=t.length,m=new Array(r);m[0]=p;var n={};for(var d in a)hasOwnProperty.call(a,d)&&(n[d]=a[d]);n.originalType=e,n.mdxType="string"==typeof e?e:c,m[1]=n;for(var o=2;o<r;o++)m[o]=t[o];return s.createElement.apply(null,m)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},1629:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>d,contentTitle:()=>m,default:()=>i,frontMatter:()=>r,metadata:()=>n,toc:()=>o});var s=t(7462),c=(t(7294),t(3905));const r={custom_edit_url:null},m="Object3D",n={unversionedId:"api/Class/Object3D",id:"api/Class/Object3D",title:"Object3D",description:"Since version 4.0.0",source:"@site/docs/api/Class/Object3D.mdx",sourceDirName:"api/Class",slug:"/api/Class/Object3D",permalink:"/egjs-view360/docs/api/Class/Object3D",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Motion",permalink:"/egjs-view360/docs/api/Class/Motion"},next:{title:"PanoControl",permalink:"/egjs-view360/docs/api/Class/PanoControl"}},d={},o=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"matrix",id:"matrix",level:3},{value:"position",id:"position",level:3},{value:"rotation",id:"rotation",level:3},{value:"scale",id:"scale",level:3},{value:"Methods",id:"methods",level:2},{value:"hasOn",id:"hasOn",level:3},{value:"off",id:"off",level:3},{value:"on",id:"on",level:3},{value:"once",id:"once",level:3},{value:"trigger",id:"trigger",level:3},{value:"update",id:"update",level:3},{value:"updateMatrix",id:"updateMatrix",level:3}],l={toc:o};function i(e){let{components:a,...t}=e;return(0,c.kt)("wrapper",(0,s.Z)({},l,t,{components:a,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"object3d"},"Object3D"),(0,c.kt)("div",{className:"doc-side"},(0,c.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,c.kt)("div",{className:"doc-main-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/core/Object3D.ts#L24"},"source")))),(0,c.kt)("div",{className:"doc-subtitle"},(0,c.kt)("p",null,"Base class for 3D objects")),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"class Object3D extends Component<{\n  update: {\n    camera: Camera\n  }\n}>\n")),(0,c.kt)("h3",null,"Extends"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://naver.github.io/egjs-component/"},"Component"),"<","{",(0,c.kt)("br",{parentName:"li"}),"","\xa0","update:","\xa0","{",(0,c.kt)("br",{parentName:"li"}),"","\xa0","\xa0","\xa0","camera:","\xa0",(0,c.kt)("a",{parentName:"li",href:"Camera"},"Camera"),(0,c.kt)("br",{parentName:"li"}),"","\xa0","}",(0,c.kt)("br",{parentName:"li"}),"}",">")),(0,c.kt)("div",{className:"doc-summary doc-properties"},(0,c.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#matrix"},"matrix")),(0,c.kt)("div",{className:"doc-summary-desc"},(0,c.kt)("p",null,"Local matrix of the object"))),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#position"},"position")),(0,c.kt)("div",{className:"doc-summary-desc"},(0,c.kt)("p",null,"Position of the object"))),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#rotation"},"rotation")),(0,c.kt)("div",{className:"doc-summary-desc"},(0,c.kt)("p",null,"Rotation quaternion"))),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#scale"},"scale")),(0,c.kt)("div",{className:"doc-summary-desc"},(0,c.kt)("p",null,"A scale vector of the object")))),(0,c.kt)("div",{className:"doc-summary doc-methods"},(0,c.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#hasOn"},"hasOn")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#off"},"off")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#on"},"on")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#once"},"once")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#trigger"},"trigger")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#update"},"update")),(0,c.kt)("div",{className:"doc-summary-desc"})),(0,c.kt)("div",{className:"doc-summary-item"},(0,c.kt)("div",{className:"doc-summary-name"},(0,c.kt)("a",{href:"#updateMatrix"},"updateMatrix")),(0,c.kt)("div",{className:"doc-summary-desc"},(0,c.kt)("p",null,"Update local matrix of the object.")))),(0,c.kt)("h2",{id:"constructor"},"Constructor"),(0,c.kt)("div",{className:"doc-member-subtitle"},"Create new instance."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"new Object3D(): Object3D\n")),(0,c.kt)("h2",{id:"properties"},"Properties"),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"matrix"},"matrix")),(0,c.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"matrix"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,"mat4"))),(0,c.kt)("div",{className:"doc-desc"},(0,c.kt)("p",null,"Local matrix of the object"))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/core/Object3D.ts#L34"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"position"},"position")),(0,c.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"position"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,"vec3"))),(0,c.kt)("div",{className:"doc-desc"},(0,c.kt)("p",null,"Position of the object"))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/core/Object3D.ts#L46"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"rotation"},"rotation")),(0,c.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"rotation"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,"quat"))),(0,c.kt)("div",{className:"doc-desc"},(0,c.kt)("p",null,"Rotation quaternion"))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/core/Object3D.ts#L40"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"scale"},"scale")),(0,c.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-property"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"scale"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,"vec3"))),(0,c.kt)("div",{className:"doc-desc"},(0,c.kt)("p",null,"A scale vector of the object"))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/core/Object3D.ts#L52"},"source")))),(0,c.kt)("h2",{id:"methods"},"Methods"),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"hasOn"},"hasOn")),(0,c.kt)("span",{className:"badge badge--warning"},"inherited"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-method"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"hasOn"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,"boolean"))),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"hasOn<K>(eventName: K): boolean\n")),(0,c.kt)("h4",null,"Parameters"),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"eventName"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"K")))))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"off"},"off")),(0,c.kt)("span",{className:"badge badge--warning"},"inherited"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-method"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"off"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"Object3D"},"Object3D")))),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"off<K>(eventName: K, handlerToDetach: EventCallback<{ update: { camera: Camera } }, K, Object3D>): Object3D\n")),(0,c.kt)("h4",null,"Parameters"),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"eventName"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"K")))),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"handlerToDetach"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"EventCallback","<","{","\xa0","update:","\xa0","{","\xa0","camera:","\xa0",(0,c.kt)("a",{parentName:"p",href:"Camera"},"Camera"),"\xa0","}","\xa0","},","\xa0","K,","\xa0",(0,c.kt)("a",{parentName:"p",href:"Object3D"},"Object3D"),">")))))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"on"},"on")),(0,c.kt)("span",{className:"badge badge--warning"},"inherited"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-method"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"on"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"Object3D"},"Object3D")))),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"on(eventHash: Partial<{ update: ((event: { camera: Camera }) => any) }>): Object3D\n")),(0,c.kt)("h4",null,"Parameters"),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"eventHash"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"Partial","<","{","\xa0","update:","\xa0","((event:","\xa0","{","\xa0","camera:","\xa0",(0,c.kt)("a",{parentName:"p",href:"Camera"},"Camera"),"\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"once"},"once")),(0,c.kt)("span",{className:"badge badge--warning"},"inherited"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-method"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"once"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"Object3D"},"Object3D")))),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"once(eventHash: Partial<{ update: ((event: { camera: Camera }) => any) }>): Object3D\n")),(0,c.kt)("h4",null,"Parameters"),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"eventHash"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"Partial","<","{","\xa0","update:","\xa0","((event:","\xa0","{","\xa0","camera:","\xa0",(0,c.kt)("a",{parentName:"p",href:"Camera"},"Camera"),"\xa0","})","\xa0","=",">","\xa0","any)","\xa0","}",">")))))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"trigger"},"trigger")),(0,c.kt)("span",{className:"badge badge--warning"},"inherited"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-method"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"trigger"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"Object3D"},"Object3D")))),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"trigger<K>(event: K, ...params: EventTriggerParams<{ update: { camera: Camera } }, K>): Object3D\n")),(0,c.kt)("h4",null,"Parameters"),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"event"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"K")))),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"params"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"EventTriggerParams","<","{","\xa0","update:","\xa0","{","\xa0","camera:","\xa0",(0,c.kt)("a",{parentName:"p",href:"Camera"},"Camera"),"\xa0","}","\xa0","},","\xa0","K",">")))))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"update"},"update")),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-method"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"update"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,"void"))),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"update(ctx: ObjectUpdateContext): void\n")),(0,c.kt)("h4",null,"Parameters"),(0,c.kt)("div",{className:"doc-param"},(0,c.kt)("div",{className:"doc-param-header"},(0,c.kt)("span",{className:"doc-name"},"ctx"),(0,c.kt)("div",{className:"doc-type"},(0,c.kt)("p",null,"ObjectUpdateContext"))))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/core/Object3D.ts#L76"},"source")))),(0,c.kt)("div",{className:"doc-header-hidden"},(0,c.kt)("h3",{id:"updateMatrix"},"updateMatrix")),(0,c.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,c.kt)("div",{className:"doc-entry"},(0,c.kt)("details",{open:!0,className:"doc-method"},(0,c.kt)("summary",{className:"doc-member"},(0,c.kt)("span",{className:"doc-name"},"updateMatrix"),(0,c.kt)("span",{className:"doc-type"},(0,c.kt)("p",null,"void"))),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"updateMatrix(): void\n")),(0,c.kt)("div",{className:"doc-desc"},(0,c.kt)("p",null,"Update local matrix of the object."))),(0,c.kt)("div",{className:"doc-source"},(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/core/Object3D.ts#L72"},"source")))))}i.isMDXComponent=!0}}]);