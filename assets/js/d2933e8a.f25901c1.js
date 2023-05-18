"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1913],{3905:(e,a,t)=>{t.d(a,{Zo:()=>d,kt:()=>u});var r=t(7294);function s(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function n(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){s(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function c(e,a){if(null==e)return{};var t,r,s=function(e,a){if(null==e)return{};var t,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||(s[t]=e[t]);return s}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=r.createContext({}),i=function(e){var a=r.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):n(n({},a),e)),t},d=function(e){var a=i(e.components);return r.createElement(l.Provider,{value:a},e.children)},m={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},p=r.forwardRef((function(e,a){var t=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=i(t),u=s,k=p["".concat(l,".").concat(u)]||p[u]||m[u]||o;return t?r.createElement(k,n(n({ref:a},d),{},{components:t})):r.createElement(k,n({ref:a},d))}));function u(e,a){var t=arguments,s=a&&a.mdxType;if("string"==typeof e||s){var o=t.length,n=new Array(o);n[0]=p;var c={};for(var l in a)hasOwnProperty.call(a,l)&&(c[l]=a[l]);c.originalType=e,c.mdxType="string"==typeof e?e:s,n[1]=c;for(var i=2;i<o;i++)n[i]=t[i];return r.createElement.apply(null,n)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},1805:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>n,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>i});var r=t(7462),s=(t(7294),t(3905));const o={custom_edit_url:null},n="CylindricalProjection",c={unversionedId:"api/Projection/Class/CylindricalProjection",id:"api/Projection/Class/CylindricalProjection",title:"CylindricalProjection",description:"Since version 4.0.0",source:"@site/docs/api/Projection/Class/CylindricalProjection.mdx",sourceDirName:"api/Projection/Class",slug:"/api/Projection/Class/CylindricalProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CylindricalProjection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"CubestripProjection",permalink:"/egjs-view360/docs/api/Projection/Class/CubestripProjection"},next:{title:"EquiangularProjection",permalink:"/egjs-view360/docs/api/Projection/Class/EquiangularProjection"}},l={},i=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3},{value:"Methods",id:"methods",level:2},{value:"createMesh",id:"createMesh",level:3},{value:"updateCamera",id:"updateCamera",level:3},{value:"updateControl",id:"updateControl",level:3}],d={toc:i};function m(e){let{components:a,...t}=e;return(0,s.kt)("wrapper",(0,r.Z)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"cylindricalprojection"},"CylindricalProjection"),(0,s.kt)("div",{className:"doc-side"},(0,s.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,s.kt)("div",{className:"doc-main-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/CylindricalProjection.ts#L43"},"source")))),(0,s.kt)("div",{className:"doc-subtitle"},(0,s.kt)("p",null,"Projection based on cylindrical projection.",(0,s.kt)("br",{parentName:"p"}),"\n","This can show panorama images taken from smartphones.")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"class CylindricalProjection extends Projection\n")),(0,s.kt)("h3",null,"Extends"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"Projection"},"Projection"))),(0,s.kt)("div",{className:"doc-summary doc-properties"},(0,s.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#src"},"src")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Source URL to panorama image/video."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#video"},"video")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Properties for the video element.",(0,s.kt)("br",{parentName:"p"}),"\n","Setting ",(0,s.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,s.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")))),(0,s.kt)("div",{className:"doc-summary doc-methods"},(0,s.kt)("h3",{className:"doc-summary-title"},"Methods"),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#createMesh"},"createMesh")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Generate triangle mesh from current projection."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#updateCamera"},"updateCamera")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Update camera to match projection's settings."))),(0,s.kt)("div",{className:"doc-summary-item"},(0,s.kt)("div",{className:"doc-summary-name"},(0,s.kt)("a",{href:"#updateControl"},"updateControl")),(0,s.kt)("div",{className:"doc-summary-desc"},(0,s.kt)("p",null,"Update control to match projection's settings.")))),(0,s.kt)("h2",{id:"constructor"},"Constructor"),(0,s.kt)("div",{className:"doc-member-subtitle"},"Create new instance."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"new CylindricalProjection(options: CylindricalProjectionOptions): CylindricalProjection\n")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"options"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../Interface/CylindricalProjectionOptions"},"CylindricalProjectionOptions")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Options "))),(0,s.kt)("h2",{id:"properties"},"Properties"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"src"},"src")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"src"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"string","\xa0","|","\xa0","HTMLElement","\xa0","|","\xa0","(string","\xa0","|","\xa0","HTMLElement)[]"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Source URL to panorama image/video."))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L41"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"video"},"video")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--secondary"},"readonly")," ",(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-property"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"video"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"undefined","\xa0","|","\xa0","boolean","\xa0","|","\xa0","Partial","<",(0,s.kt)("a",{parentName:"p",href:"../../Interface/VideoConfig"},"VideoConfig"),">"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Properties for the video element.",(0,s.kt)("br",{parentName:"p"}),"\n","Setting ",(0,s.kt)("inlineCode",{parentName:"p"},"false")," will treat panorama source as an image, ",(0,s.kt)("inlineCode",{parentName:"p"},"true")," will use default properties.")),(0,s.kt)("admonition",{title:"Example",type:"info"},(0,s.kt)("p",{parentName:"admonition"},"Default properties"),(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"autoplay: true\nmuted: true\nloop: false\nvolume: 1\n")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L56"},"source")))),(0,s.kt)("h2",{id:"methods"},"Methods"),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"createMesh"},"createMesh")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"createMesh"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"TriangleMesh","<","CommonProjectionUniforms",">"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"createMesh(ctx: WebGLContext, texture: Texture2D): TriangleMesh<CommonProjectionUniforms>\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Generate triangle mesh from current projection.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"ctx"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"WebGLContext"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Instance of the WebGLContext helper "))),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"texture"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,"Texture2D"))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"New texture to apply ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/CylindricalProjection.ts#L67"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"updateCamera"},"updateCamera")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"updateCamera"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"updateCamera(camera: Camera): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Update camera to match projection's settings.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"camera"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/Camera"},"Camera")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Instance of the camera to update ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/CylindricalProjection.ts#L100"},"source")))),(0,s.kt)("div",{className:"doc-header-hidden"},(0,s.kt)("h3",{id:"updateControl"},"updateControl")),(0,s.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,s.kt)("span",{className:"badge badge--warning"},"inherited"),(0,s.kt)("div",{className:"doc-entry"},(0,s.kt)("details",{open:!0,className:"doc-method"},(0,s.kt)("summary",{className:"doc-member"},(0,s.kt)("span",{className:"doc-name"},"updateControl"),(0,s.kt)("span",{className:"doc-type"},(0,s.kt)("p",null,"void"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"updateControl(control: PanoControl): void\n")),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Update control to match projection's settings.")),(0,s.kt)("h4",null,"Parameters"),(0,s.kt)("div",{className:"doc-param"},(0,s.kt)("div",{className:"doc-param-header"},(0,s.kt)("span",{className:"doc-name"},"control"),(0,s.kt)("div",{className:"doc-type"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"../../Class/PanoControl"},"PanoControl")))),(0,s.kt)("div",{className:"doc-desc"},(0,s.kt)("p",null,"Instance of the control to update ")))),(0,s.kt)("div",{className:"doc-source"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/efcb371/packages/view360/src/projection/Projection.ts#L98"},"source")))))}m.isMDXComponent=!0}}]);