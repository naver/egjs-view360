"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1149],{3905:(e,a,t)=>{t.d(a,{Zo:()=>i,kt:()=>u});var s=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function c(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function n(e,a){if(null==e)return{};var t,s,r=function(e,a){if(null==e)return{};var t,s,r={},o=Object.keys(e);for(s=0;s<o.length;s++)t=o[s],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)t=o[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=s.createContext({}),d=function(e){var a=s.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):c(c({},a),e)),t},i=function(e){var a=d(e.components);return s.createElement(l.Provider,{value:a},e.children)},m={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},p=s.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,i=n(e,["components","mdxType","originalType","parentName"]),p=d(t),u=r,k=p["".concat(l,".").concat(u)]||p[u]||m[u]||o;return t?s.createElement(k,c(c({ref:a},i),{},{components:t})):s.createElement(k,c({ref:a},i))}));function u(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,c=new Array(o);c[0]=p;var n={};for(var l in a)hasOwnProperty.call(a,l)&&(n[l]=a[l]);n.originalType=e,n.mdxType="string"==typeof e?e:r,c[1]=n;for(var d=2;d<o;d++)c[d]=t[d];return s.createElement.apply(null,c)}return s.createElement.apply(null,t)}p.displayName="MDXCreateElement"},2279:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>o,metadata:()=>n,toc:()=>d});var s=t(7462),r=(t(7294),t(3905));const o={custom_edit_url:null},c="CubestripProjection",n={unversionedId:"api/Projection/Class/CubestripProjection",id:"api/Projection/Class/CubestripProjection",title:"CubestripProjection",description:"Since version 4.0.0",source:"@site/docs/api/Projection/Class/CubestripProjection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/CubestripProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CubestripProjection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"CubemapProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CubemapProjection"},next:{title:"CylindricalProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CylindricalProjection"}},l={},d=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"applyTexture",id:"applyTexture",level:3},{value:"getMesh",id:"getMesh",level:3},{value:"getTexture",id:"getTexture",level:3},{value:"releaseAllResources",id:"releaseAllResources",level:3},{value:"update",id:"update",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],i={toc:d};function m(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,s.Z)({},i,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"cubestripprojection"},"CubestripProjection"),(0,r.kt)("div",{className:"doc-side"},(0,r.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,r.kt)("div",{className:"doc-main-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/CubestripProjection.ts#L42"},"source")))),(0,r.kt)("div",{className:"doc-subtitle"},(0,r.kt)("p",null,"Projection based on cubemap strip.",(0,r.kt)("br",{parentName:"p"}),"\n","Slightly more efficient than ",(0,r.kt)("a",{parentName:"p",href:"CubemapProjection"},"CubemapProjection")," as it doesn't copy cubemap image to canvas while rendering.",(0,r.kt)("br",{parentName:"p"}),"\n","Accepts only single image.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class CubestripProjection extends Projection<{\n  uTexture: UniformTexture2D\n}>\n")),(0,r.kt)("h3",null,"Extends"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"Projection"},"Projection"),"<","{",(0,r.kt)("br",{parentName:"li"}),"","\xa0","uTexture:","\xa0","UniformTexture2D",(0,r.kt)("br",{parentName:"li"}),"}",">")),(0,r.kt)("div",{className:"doc-summary doc-properties"},(0,r.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#src"},"src")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Source URL to panorama image/video."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#video"},"video")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Properties for the video element.",(0,r.kt)("br",{parentName:"p"}),"\n","Setting ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")))),(0,r.kt)("div",{className:"doc-summary doc-methods"},(0,r.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#applyTexture"},"applyTexture")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Apply texture to current projection."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#getMesh"},"getMesh")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"A 3D triangle mesh for projection. It's ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," until loading the ",(0,r.kt)("inlineCode",{parentName:"p"},"src"),"."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#getTexture"},"getTexture")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Return active texture."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#releaseAllResources"},"releaseAllResources")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Release all resources projection has.",(0,r.kt)("br",{parentName:"p"}),"\n","This is automatically called on projection change & View360's destroy call"))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#update"},"update")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Update projection."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Update camera to match projection's settings."))),(0,r.kt)("div",{className:"doc-summary-item"},(0,r.kt)("div",{className:"doc-summary-name"},(0,r.kt)("a",{href:"#updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-summary-desc"},(0,r.kt)("p",null,"Update control to match projection's settings.")))),(0,r.kt)("h2",{id:"constructor"},"Constructor"),(0,r.kt)("div",{className:"doc-member-subtitle"},"Create new instance."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new CubestripProjection(options: CubestripProjectionOptions): CubestripProjection\n")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"options"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Interface/CubestripProjectionOptions"},"CubestripProjectionOptions")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Options "))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"src"},"src")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"src"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Source URL to panorama image/video."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L48"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"video"},"video")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-property"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"video"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,r.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Properties for the video element.",(0,r.kt)("br",{parentName:"p"}),"\n","Setting ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Default properties"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L63"},"source")))),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"applyTexture"},"applyTexture")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"applyTexture"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"applyTexture(ctx: WebGLContext, texture: Texture2D): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Apply texture to current projection.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"ctx"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"WebGLContext"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Instance of the WebGLContext helper "))),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"texture"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"Texture2D"))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"New texture to apply ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/CubestripProjection.ts#L65"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"getMesh"},"getMesh")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"getMesh"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"null","\xa0","|","\xa0","TriangleMesh","<","{","\xa0","uTexture:","\xa0","UniformTexture2D","\xa0","}",">"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"getMesh(): null | TriangleMesh<{ uTexture: UniformTexture2D }>\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"A 3D triangle mesh for projection. It's ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," until loading the ",(0,r.kt)("inlineCode",{parentName:"p"},"src"),"."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L148"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"getTexture"},"getTexture")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"getTexture"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"null","\xa0","|","\xa0","Texture2D","\xa0","|","\xa0","TextureCube"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"getTexture(): null | Texture2D | TextureCube\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Return active texture."))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L137"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"releaseAllResources"},"releaseAllResources")),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"releaseAllResources"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"releaseAllResources(ctx: WebGLContext): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Release all resources projection has.",(0,r.kt)("br",{parentName:"p"}),"\n","This is automatically called on projection change & View360's destroy call")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"ctx"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,"WebGLContext"))))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L98"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"update"},"update")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"update"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"update(camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Update projection.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Instance of the camera to reference ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L129"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateCamera"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Update camera to match projection's settings.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"camera"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Instance of the camera to update ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L108"},"source")))),(0,r.kt)("div",{className:"doc-header-hidden"},(0,r.kt)("h3",{id:"updateControl"},"updateControl")),(0,r.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,r.kt)("span",{className:"badge badge--warning"},"inherited"),(0,r.kt)("div",{className:"doc-entry"},(0,r.kt)("details",{open:!0,className:"doc-method"},(0,r.kt)("summary",{className:"doc-member"},(0,r.kt)("span",{className:"doc-name"},"updateControl"),(0,r.kt)("span",{className:"doc-type"},(0,r.kt)("p",null,"void"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Update control to match projection's settings.")),(0,r.kt)("h4",null,"Parameters"),(0,r.kt)("div",{className:"doc-param"},(0,r.kt)("div",{className:"doc-param-header"},(0,r.kt)("span",{className:"doc-name"},"control"),(0,r.kt)("div",{className:"doc-type"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,r.kt)("div",{className:"doc-desc"},(0,r.kt)("p",null,"Instance of the control to update ")))),(0,r.kt)("div",{className:"doc-source"},(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/85b1d142/packages/view360/src/projection/Projection.ts#L119"},"source")))))}m.isMDXComponent=!0}}]);