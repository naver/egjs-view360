"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7087],{3905:(e,a,t)=>{t.d(a,{Zo:()=>d,kt:()=>u});var s=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function n(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,s,r=function(e,a){if(null==e)return{};var t,s,r={},o=Object.keys(e);for(s=0;s<o.length;s++)t=o[s],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)t=o[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=s.createContext({}),i=function(e){var a=s.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):n(n({},a),e)),t},d=function(e){var a=i(e.components);return s.createElement(l.Provider,{value:a},e.children)},m={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=i(t),u=r,k=p["".concat(l,".").concat(u)]||p[u]||m[u]||o;return t?s.createElement(k,n(n({ref:a},d),{},{components:t})):s.createElement(k,n({ref:a},d))}));function u(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,n=new Array(o);n[0]=p;var c={};for(var l in a)hasOwnProperty.call(a,l)&&(c[l]=a[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,n[1]=c;for(var i=2;i<o;i++)n[i]=t[i];return s.createElement.apply(null,n)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},6346:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>n,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>i});var s=t(7462),r=(t(7294),t(3905));const o={custom_edit_url:null},n="CubemapProjection",c={unversionedId:"api/Projection/Class/CubemapProjection",id:"api/Projection/Class/CubemapProjection",title:"CubemapProjection",description:"Since version 4.0.0",source:"@site/docs/api/Projection/Class/CubemapProjection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/CubemapProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CubemapProjection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"View360Plugin",permalink:"/egjs-view360/docs/api/Plugin/Interface/View360Plugin"},next:{title:"CubestripProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CubestripProjection"}},l={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"createMesh",id:"createMesh",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],d={toc:i};function m(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,s.Z)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"cubemapprojection"},"CubemapProjection"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/CubemapProjection.ts#L46"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Projection based on cubemap images, accepts both multiple or single images.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class CubemapProjection extends Projection\n")),(0,r.kt)("h3",null,"Extends"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"Projection"},"Projection"))),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#src"},"src")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Source URL to panorama image/video."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#video"},"video")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Properties for the video element.",(0,r.kt)("br",{parentName:"p"}),"\n","Setting ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#createMesh"},"createMesh")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Generate triangle mesh from current projection."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Update camera to match projection's settings."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Update control to match projection's settings.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"Create new instance."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new CubemapProjection(options: CubemapProjectionOptions): CubemapProjection\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"options"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Interface/CubemapProjectionOptions"},"CubemapProjectionOptions")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Options "))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"src"},"src")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"src"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Source URL to panorama image/video."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L41"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"video"},"video")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"video"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Properties for the video element.",(0,r.kt)("br",{parentName:"p"}),"\n","Setting ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Default properties"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L56"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"createMesh"},"createMesh")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"createMesh"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"TriangleMesh","<","{","\xa0","uTexture:","\xa0","UniformCanvasCube","\xa0","|","\xa0","UniformTextureCube","\xa0","}",">"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"createMesh(ctx: WebGLContext, texture: Texture2D): TriangleMesh<{ uTexture: UniformCanvasCube | UniformTextureCube }>\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Generate triangle mesh from current projection.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"ctx"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"WebGLContext"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Instance of the WebGLContext helper "))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"texture"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"Texture2D"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"New texture to apply ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/CubemapProjection.ts#L67"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateCamera"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Update camera to match projection's settings.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Instance of the camera to update ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L87"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateControl"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Update control to match projection's settings.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"control"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Instance of the control to update ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L98"},"source")))))}m.isMDXComponent=!0}}]);