"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8829],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>u});var n=t(7294);function i(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){i(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,i=function(e,a){if(null==e)return{};var t,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(i[t]=e[t]);return i}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=n.createContext({}),c=function(e){var a=n.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},m=function(e){var a=c(e.components);return n.createElement(l.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},p=n.forwardRef((function(e,a){var t=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=c(t),u=i,k=p["".concat(l,".").concat(u)]||p[u]||d[u]||r;return t?n.createElement(k,o(o({ref:a},m),{},{components:t})):n.createElement(k,o({ref:a},m))}));function u(e,a){var t=arguments,i=a&&a.mdxType;if("string"==typeof e||i){var r=t.length,o=new Array(r);o[0]=p;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=t[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}p.displayName="MDXCreateElement"},8229:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var n=t(7462),i=(t(7294),t(3905));const r={custom_edit_url:null},o="CameraOptions",s={unversionedId:"api/Interface/CameraOptions",id:"api/Interface/CameraOptions",title:"CameraOptions",description:"Since version 4.0.0",source:"@site/docs/api/Interface/CameraOptions.mdx",sourceDirName:"api/Interface",slug:"/api/Interface/CameraOptions",permalink:"/egjs-view360/docs/api/Interface/CameraOptions",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"CameraEvents",permalink:"/egjs-view360/docs/api/Interface/CameraEvents"},next:{title:"GyroControlOptions",permalink:"/egjs-view360/docs/api/Interface/GyroControlOptions"}},l={},c=[{value:"Properties",id:"properties",level:2},{value:"fov",id:"fov",level:3},{value:"initialPitch",id:"initialPitch",level:3},{value:"initialYaw",id:"initialYaw",level:3},{value:"initialZoom",id:"initialZoom",level:3},{value:"pitchRange",id:"pitchRange",level:3},{value:"yawRange",id:"yawRange",level:3},{value:"zoomRange",id:"zoomRange",level:3}],m={toc:c};function d(e){let{components:a,...t}=e;return(0,i.kt)("wrapper",(0,n.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"cameraoptions"},"CameraOptions"),(0,i.kt)("div",{className:"doc-side"},(0,i.kt)("div",{className:"doc-version"},"Since version 4.0.0"),(0,i.kt)("div",{className:"doc-main-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L50"},"source")))),(0,i.kt)("div",{className:"doc-subtitle"},(0,i.kt)("p",null,"Options for ",(0,i.kt)("a",{parentName:"p",href:"../Class/Camera"},"Camera"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"interface CameraOptions\n")),(0,i.kt)("div",{className:"doc-summary doc-properties"},(0,i.kt)("h3",{className:"doc-summary-title"},"Properties"),(0,i.kt)("div",{className:"doc-summary-item"},(0,i.kt)("div",{className:"doc-summary-name"},(0,i.kt)("a",{href:"#fov"},"fov")),(0,i.kt)("div",{className:"doc-summary-desc"},(0,i.kt)("p",null,"Camera's horizontal FOV(Field of View). (in degrees, \xb0)"))),(0,i.kt)("div",{className:"doc-summary-item"},(0,i.kt)("div",{className:"doc-summary-name"},(0,i.kt)("a",{href:"#initialPitch"},"initialPitch")),(0,i.kt)("div",{className:"doc-summary-desc"},(0,i.kt)("p",null,"Initial pitch (x-axis rotation) value for camera. (in degrees, \xb0)",(0,i.kt)("br",{parentName:"p"}),"\n","As View360 uses right-handed coordinate system internally, positive value will make camera to look upside, while negative value will look down."))),(0,i.kt)("div",{className:"doc-summary-item"},(0,i.kt)("div",{className:"doc-summary-name"},(0,i.kt)("a",{href:"#initialYaw"},"initialYaw")),(0,i.kt)("div",{className:"doc-summary-desc"},(0,i.kt)("p",null,"Initial yaw (y-axis rotation) value for camera. (in degrees, \xb0)",(0,i.kt)("br",{parentName:"p"}),"\n","As View360 uses right-handed coordinate system internally, camera will rotate counter-clockwise by this value."))),(0,i.kt)("div",{className:"doc-summary-item"},(0,i.kt)("div",{className:"doc-summary-name"},(0,i.kt)("a",{href:"#initialZoom"},"initialZoom")),(0,i.kt)("div",{className:"doc-summary-desc"},(0,i.kt)("p",null,"Initial zoom value for camera.",(0,i.kt)("br",{parentName:"p"}),"\n","Setting this value to ",(0,i.kt)("inlineCode",{parentName:"p"},"2")," will enlarge panorama 200% by width."))),(0,i.kt)("div",{className:"doc-summary-item"},(0,i.kt)("div",{className:"doc-summary-name"},(0,i.kt)("a",{href:"#pitchRange"},"pitchRange")),(0,i.kt)("div",{className:"doc-summary-desc"},(0,i.kt)("p",null,"Restrict pitch(x-axis rotation) range. (in degrees, \xb0)"))),(0,i.kt)("div",{className:"doc-summary-item"},(0,i.kt)("div",{className:"doc-summary-name"},(0,i.kt)("a",{href:"#yawRange"},"yawRange")),(0,i.kt)("div",{className:"doc-summary-desc"},(0,i.kt)("p",null,"Restrict yaw(y-axis rotation) range. (in degrees, \xb0)"))),(0,i.kt)("div",{className:"doc-summary-item"},(0,i.kt)("div",{className:"doc-summary-name"},(0,i.kt)("a",{href:"#zoomRange"},"zoomRange")),(0,i.kt)("div",{className:"doc-summary-desc"},(0,i.kt)("p",null,"Restrict camera zoom range.",(0,i.kt)("br",{parentName:"p"}),"\n","If ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),", a default zoom range from ",(0,i.kt)("inlineCode",{parentName:"p"},"0.6")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"10")," will be used.")))),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("div",{className:"doc-header-hidden"},(0,i.kt)("h3",{id:"fov"},"fov")),(0,i.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,i.kt)("div",{className:"doc-entry"},(0,i.kt)("details",{open:!0,className:"doc-property"},(0,i.kt)("summary",{className:"doc-member"},(0,i.kt)("span",{className:"doc-name"},"fov"),(0,i.kt)("span",{className:"doc-type"},(0,i.kt)("p",null,"number")),(0,i.kt)("span",{className:"doc-default",title:"Default Value"},(0,i.kt)("p",null,"90"))),(0,i.kt)("div",{className:"doc-desc"},(0,i.kt)("p",null,"Camera's horizontal FOV(Field of View). (in degrees, \xb0)")),(0,i.kt)("admonition",{title:"Example",type:"info"},(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// Init with fov: 120\nconst viewer = new View360("#el_id", { fov: 120 });\n\n// Back to 90\nviewer.fov = 90;\n')))),(0,i.kt)("div",{className:"doc-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L78"},"source")))),(0,i.kt)("div",{className:"doc-header-hidden"},(0,i.kt)("h3",{id:"initialPitch"},"initialPitch")),(0,i.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,i.kt)("div",{className:"doc-entry"},(0,i.kt)("details",{open:!0,className:"doc-property"},(0,i.kt)("summary",{className:"doc-member"},(0,i.kt)("span",{className:"doc-name"},"initialPitch"),(0,i.kt)("span",{className:"doc-type"},(0,i.kt)("p",null,"number")),(0,i.kt)("span",{className:"doc-default",title:"Default Value"},(0,i.kt)("p",null,"0"))),(0,i.kt)("div",{className:"doc-desc"},(0,i.kt)("p",null,"Initial pitch (x-axis rotation) value for camera. (in degrees, \xb0)",(0,i.kt)("br",{parentName:"p"}),"\n","As View360 uses right-handed coordinate system internally, positive value will make camera to look upside, while negative value will look down.")),(0,i.kt)("admonition",{title:"Example",type:"info"},(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'const viewer = new View360("#el_id", {\n  initialPitch: 60\n});\n\nviewer.on("ready", () => {\n  console.log(viewer.camera.pitch); // 60\n});\n')))),(0,i.kt)("div",{className:"doc-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L58"},"source")))),(0,i.kt)("div",{className:"doc-header-hidden"},(0,i.kt)("h3",{id:"initialYaw"},"initialYaw")),(0,i.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,i.kt)("div",{className:"doc-entry"},(0,i.kt)("details",{open:!0,className:"doc-property"},(0,i.kt)("summary",{className:"doc-member"},(0,i.kt)("span",{className:"doc-name"},"initialYaw"),(0,i.kt)("span",{className:"doc-type"},(0,i.kt)("p",null,"number")),(0,i.kt)("span",{className:"doc-default",title:"Default Value"},(0,i.kt)("p",null,"0"))),(0,i.kt)("div",{className:"doc-desc"},(0,i.kt)("p",null,"Initial yaw (y-axis rotation) value for camera. (in degrees, \xb0)",(0,i.kt)("br",{parentName:"p"}),"\n","As View360 uses right-handed coordinate system internally, camera will rotate counter-clockwise by this value.")),(0,i.kt)("admonition",{title:"Example",type:"info"},(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'const viewer = new View360("#el_id", {\n  initialYaw: 30\n});\n\nviewer.on("ready", () => {\n  console.log(viewer.camera.yaw); // 30\n});\n')))),(0,i.kt)("div",{className:"doc-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L54"},"source")))),(0,i.kt)("div",{className:"doc-header-hidden"},(0,i.kt)("h3",{id:"initialZoom"},"initialZoom")),(0,i.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,i.kt)("div",{className:"doc-entry"},(0,i.kt)("details",{open:!0,className:"doc-property"},(0,i.kt)("summary",{className:"doc-member"},(0,i.kt)("span",{className:"doc-name"},"initialZoom"),(0,i.kt)("span",{className:"doc-type"},(0,i.kt)("p",null,"number")),(0,i.kt)("span",{className:"doc-default",title:"Default Value"},(0,i.kt)("p",null,"1"))),(0,i.kt)("div",{className:"doc-desc"},(0,i.kt)("p",null,"Initial zoom value for camera.",(0,i.kt)("br",{parentName:"p"}),"\n","Setting this value to ",(0,i.kt)("inlineCode",{parentName:"p"},"2")," will enlarge panorama 200% by width.")),(0,i.kt)("admonition",{title:"Example",type:"info"},(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'const viewer = new View360("#el_id", {\n  initialZoom: 2\n});\n\nviewer.on("ready", () => {\n  console.log(viewer.camera.zoom); // 2\n});\n')))),(0,i.kt)("div",{className:"doc-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L62"},"source")))),(0,i.kt)("div",{className:"doc-header-hidden"},(0,i.kt)("h3",{id:"pitchRange"},"pitchRange")),(0,i.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,i.kt)("div",{className:"doc-entry"},(0,i.kt)("details",{open:!0,className:"doc-property"},(0,i.kt)("summary",{className:"doc-member"},(0,i.kt)("span",{className:"doc-name"},"pitchRange"),(0,i.kt)("span",{className:"doc-type"},(0,i.kt)("p",null,"null","\xa0","|","\xa0","Range")),(0,i.kt)("span",{className:"doc-default",title:"Default Value"},(0,i.kt)("p",null,"null"))),(0,i.kt)("div",{className:"doc-desc"},(0,i.kt)("p",null,"Restrict pitch(x-axis rotation) range. (in degrees, \xb0)")),(0,i.kt)("admonition",{title:"Example",type:"info"},(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'const viewer = new View360("#el_id", {\n  pitchRange: [-45, 45]\n});\n\nviewer.on("ready", () => {\n  console.log(viewer.camera.pitch); // 0\n  viewer.camera.lookAt({ pitch: 60  });\n  console.log(viewer.camera.pitch); // 45\n});\n')))),(0,i.kt)("div",{className:"doc-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L70"},"source")))),(0,i.kt)("div",{className:"doc-header-hidden"},(0,i.kt)("h3",{id:"yawRange"},"yawRange")),(0,i.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,i.kt)("div",{className:"doc-entry"},(0,i.kt)("details",{open:!0,className:"doc-property"},(0,i.kt)("summary",{className:"doc-member"},(0,i.kt)("span",{className:"doc-name"},"yawRange"),(0,i.kt)("span",{className:"doc-type"},(0,i.kt)("p",null,"null","\xa0","|","\xa0","Range"))),(0,i.kt)("div",{className:"doc-desc"},(0,i.kt)("p",null,"Restrict yaw(y-axis rotation) range. (in degrees, \xb0)")),(0,i.kt)("admonition",{title:"Example",type:"info"},(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'const viewer = new View360("#el_id", {\n  yawRange: [-30, 30]\n});\n\nviewer.on("ready", () => {\n  console.log(viewer.camera.yaw); // 0\n  viewer.camera.lookAt({ yaw: 60  });\n  console.log(viewer.camera.yaw); // 30\n});\n')))),(0,i.kt)("div",{className:"doc-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L66"},"source")))),(0,i.kt)("div",{className:"doc-header-hidden"},(0,i.kt)("h3",{id:"zoomRange"},"zoomRange")),(0,i.kt)("div",{className:"doc-entry-version",title:"Supported Version"},">=4.0.0"),(0,i.kt)("div",{className:"doc-entry"},(0,i.kt)("details",{open:!0,className:"doc-property"},(0,i.kt)("summary",{className:"doc-member"},(0,i.kt)("span",{className:"doc-name"},"zoomRange"),(0,i.kt)("span",{className:"doc-type"},(0,i.kt)("p",null,"null","\xa0","|","\xa0","Range")),(0,i.kt)("span",{className:"doc-default",title:"Default Value"},(0,i.kt)("p",null,"null"))),(0,i.kt)("div",{className:"doc-desc"},(0,i.kt)("p",null,"Restrict camera zoom range.",(0,i.kt)("br",{parentName:"p"}),"\n","If ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),", a default zoom range from ",(0,i.kt)("inlineCode",{parentName:"p"},"0.6")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"10")," will be used.")),(0,i.kt)("admonition",{title:"Example",type:"info"},(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'const viewer = new View360("#el_id", {\n  zoomRange: [0.5, 4]\n});\n\nviewer.on("ready", () => {\n  console.log(viewer.camera.zoom); // 1\n  viewer.camera.lookAt({ zoom: 6  });\n  console.log(viewer.camera.zoom); // 4\n});\n')))),(0,i.kt)("div",{className:"doc-source"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-view360/blob/64d704dd/packages/view360/src/core/Camera.ts#L74"},"source")))))}d.isMDXComponent=!0}}]);