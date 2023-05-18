"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1149],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var r=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,r,s=function(e,t){if(null==e)return{};var a,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var i=r.createContext({}),l=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):n(n({},t),e)),a},d=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,s=e.mdxType,o=e.originalType,i=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=l(a),u=s,k=p["".concat(i,".").concat(u)]||p[u]||m[u]||o;return a?r.createElement(k,n(n({ref:t},d),{},{components:a})):r.createElement(k,n({ref:t},d))}));function u(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=a.length,n=new Array(o);n[0]=p;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:s,n[1]=c;for(var l=2;l<o;l++)n[l]=a[l];return r.createElement.apply(null,n)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},2279:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>n,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var r=a(7462),s=(a(7294),a(3905));const o={custom_edit_url:null},n="CubestripProjection",c={unversionedId:"api/Projection/Class/CubestripProjection",id:"api/Projection/Class/CubestripProjection",title:"CubestripProjection",description:"Since version 4.0.0",source:"@site/docs/api/Projection/Class/CubestripProjection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/CubestripProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CubestripProjection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"CubemapProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CubemapProjection"},next:{title:"CylindricalProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CylindricalProjection"}},i={},l=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"createMesh",id:"createMesh",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],d={toc:l};function m(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,r.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"cubestripprojection"},"CubestripProjection"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/projection/CubestripProjection.ts#L42"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"Projection based on cubemap strip.",(0,s.kt)("br",{parentName:"p"}),"\n","Slightly more efficient than ",(0,s.kt)("a",{parentName:"p",href:"CubemapProjection"},"CubemapProjection")," as it doesn't copy cubemap image to canvas while rendering.",(0,s.kt)("br",{parentName:"p"}),"\n","Accepts only single image.")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"class CubestripProjection extends Projection\n")),(0,s.kt)("h3",null,"Extends"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"Projection"},"Projection"))),(0,s.kt)("div",{className:"doc-summary doc-properties"},(0,s.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#src"},"src")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Source URL to panorama image/video."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#video"},"video")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Properties for the video element.",(0,s.kt)("br",{parentName:"p"}),"\n","Setting ",(0,s.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,s.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")))),(0,s.kt)("div",{className:"doc-summary doc-methods"},(0,s.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#createMesh"},"createMesh")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Generate triangle mesh from current projection."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Update camera to match projection's settings."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#updateControl"},"updateControl")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Update control to match projection's settings.")))),(0,s.kt)("h2",{id:"constructor"},"Constructor"),(0,s.kt)("div",{className:"doc-member-subtitle"},"Create new instance."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"new CubestripProjection(options: CubestripProjectionOptions): CubestripProjection\n")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"options"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Interface/CubestripProjectionOptions"},"CubestripProjectionOptions")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Options "))),(0,s.kt)("h2",{id:"properties"},"Properties"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"src"},"src")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"src"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Source URL to panorama image/video."))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/projection/Projection.ts#L41"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"video"},"video")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"video"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,s.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Properties for the video element.",(0,s.kt)("br",{parentName:"p"}),"\n","Setting ",(0,s.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,s.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")),(0,s.kt)("admonition",{title:"Example",type:"info"},(0,s.kt)("p",{parentName:"admonition"},"Default properties"),(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/projection/Projection.ts#L56"},"source")))),(0,s.kt)("h2",{id:"methods"},"Methods"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"createMesh"},"createMesh")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"createMesh"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"TriangleMesh","<","{","\xa0","uTexture:","\xa0","UniformTexture2D","\xa0","}",">"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"createMesh(ctx: WebGLContext, texture: Texture2D): TriangleMesh<{ uTexture: UniformTexture2D }>\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Generate triangle mesh from current projection.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"ctx"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"WebGLContext"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Instance of the WebGLContext helper "))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"texture"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"Texture2D"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"New texture to apply ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/projection/CubestripProjection.ts#L63"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"updateCamera"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Update camera to match projection's settings.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"camera"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Instance of the camera to update ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/projection/Projection.ts#L87"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"updateControl"},"updateControl")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"updateControl"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Update control to match projection's settings.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"control"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Instance of the control to update ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/e62f92b/packages/view360/src/projection/Projection.ts#L98"},"source")))))}m.isMDXComponent=!0}}]);