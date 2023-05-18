"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5895],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var r=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,r,o=function(e,t){if(null==e)return{};var a,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=r.createContext({}),i=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):n(n({},t),e)),a},d=function(e){var t=i(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,o=e.mdxType,s=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=i(a),u=o,k=p["".concat(l,".").concat(u)]||p[u]||m[u]||s;return a?r.createElement(k,n(n({ref:t},d),{},{components:a})):r.createElement(k,n({ref:t},d))}));function u(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=a.length,n=new Array(s);n[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,n[1]=c;for(var i=2;i<s;i++)n[i]=a[i];return r.createElement.apply(null,n)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},8090:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>n,default:()=>m,frontMatter:()=>s,metadata:()=>c,toc:()=>i});var r=a(7462),o=(a(7294),a(3905));const s={custom_edit_url:null},n="LittlePlanetProjection",c={unversionedId:"api/Projection/Class/LittlePlanetProjection",id:"api/Projection/Class/LittlePlanetProjection",title:"LittlePlanetProjection",description:"Since version 4.0.0",source:"@site/docs/api/Projection/Class/LittlePlanetProjection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/LittlePlanetProjection",permalink:"/egjs-view360/docs/api/Projection/Class/LittlePlanetProjection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"EquirectProjection",permalink:"/egjs-view360/docs/api/Projection/Class/EquirectProjection"},next:{title:"Projection",permalink:"/egjs-view360/docs/api/Projection/Class/Projection"}},l={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"createMesh",id:"createMesh",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],d={toc:i};function m(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,r.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"littleplanetprojection"},"LittlePlanetProjection"),(0,o.kt)("div",{className:"doc-side"},(0,o.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,o.kt)("div",{className:"doc-main-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/LittlePlanetProjection.ts#L34"},"source")))),(0,o.kt)("div",{className:"doc-subtitle"},(0,o.kt)("p",null,'Projection based on so-called "Little planet" or "Tiny planet" effect.')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class LittlePlanetProjection extends Projection\n")),(0,o.kt)("h3",null,"Extends"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"Projection"},"Projection"))),(0,o.kt)("div",{className:"doc-summary doc-properties"},(0,o.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#src"},"src")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Source URL to panorama image/video."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#video"},"video")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Properties for the video element.",(0,o.kt)("br",{parentName:"p"}),"\n","Setting ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")))),(0,o.kt)("div",{className:"doc-summary doc-methods"},(0,o.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#createMesh"},"createMesh")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Generate triangle mesh from current projection."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Update camera to match projection's settings."))),(0,o.kt)("div",{className:"doc-summary-item"},(0,o.kt)("div",{className:"doc-summary-name"},(0,o.kt)("a",{href:"#updateControl"},"updateControl")),(0,o.kt)("div",{className:"doc-summary-desc"},(0,o.kt)("p",null,"Update control to match projection's settings.")))),(0,o.kt)("h2",{id:"constructor"},"Constructor"),(0,o.kt)("div",{className:"doc-member-subtitle"},"Create new instance"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new LittlePlanetProjection(options: LittlePlanetProjectionOptions): LittlePlanetProjection\n")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"options"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../Interface/LittlePlanetProjectionOptions"},"LittlePlanetProjectionOptions")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Options "))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"src"},"src")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"src"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Source URL to panorama image/video."))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L41"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"video"},"video")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-property"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"video"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,o.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Properties for the video element.",(0,o.kt)("br",{parentName:"p"}),"\n","Setting ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")),(0,o.kt)("admonition",{title:"Example",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Default properties"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L56"},"source")))),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"createMesh"},"createMesh")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"createMesh"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"TriangleMesh","<","{","\xa0","uPitch:","\xa0","UniformFloat;","\xa0","\xa0","\xa0","uTexture:","\xa0","UniformTexture2D;","\xa0","\xa0","\xa0","uYaw:","\xa0","UniformFloat;","\xa0","\xa0","\xa0","uZoom:","\xa0","UniformFloat","\xa0","}",">"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"createMesh(ctx: WebGLContext, texture: Texture2D): TriangleMesh<{ uPitch: UniformFloat; uTexture: UniformTexture2D; uYaw: UniformFloat; uZoom: UniformFloat }>\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Generate triangle mesh from current projection.")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"ctx"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"WebGLContext"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Instance of the WebGLContext helper "))),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"texture"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,"Texture2D"))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"New texture to apply ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/LittlePlanetProjection.ts#L44"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("span",{className:"badge badge--warning"},"inherited"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"updateCamera"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Update camera to match projection's settings.")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"camera"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Instance of the camera to update ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L87"},"source")))),(0,o.kt)("div",{className:"doc-header-hidden"},(0,o.kt)("h3",{id:"updateControl"},"updateControl")),(0,o.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,o.kt)("div",{className:"doc-entry"},(0,o.kt)("details",{open:!0,className:"doc-method"},(0,o.kt)("summary",{className:"doc-member"},(0,o.kt)("span",{className:"doc-name"},"updateControl"),(0,o.kt)("span",{className:"doc-type"},(0,o.kt)("p",null,"void"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Update control to match projection's settings.")),(0,o.kt)("h4",null,"Parameters"),(0,o.kt)("div",{className:"doc-param"},(0,o.kt)("div",{className:"doc-param-header"},(0,o.kt)("span",{className:"doc-name"},"control"),(0,o.kt)("div",{className:"doc-type"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,o.kt)("div",{className:"doc-desc"},(0,o.kt)("p",null,"Instance of the control to update ")))),(0,o.kt)("div",{className:"doc-source"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/LittlePlanetProjection.ts#L77"},"source")))))}m.isMDXComponent=!0}}]);