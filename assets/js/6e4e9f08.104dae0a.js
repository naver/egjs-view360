"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[397],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(n),k=o,d=m["".concat(p,".").concat(k)]||m[k]||u[k]||r;return n?a.createElement(d,i(i({ref:t},s),{},{components:n})):a.createElement(d,i({ref:t},s))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4881:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const r={title:"Migration Guide (v3 \u2192 v4)",sidebar_position:1},i=void 0,l={unversionedId:"tutorials/Migration/v4",id:"tutorials/Migration/v4",title:"Migration Guide (v3 \u2192 v4)",description:"A lot of things changed as the major version went up to v4.",source:"@site/docs/tutorials/Migration/v4.mdx",sourceDirName:"tutorials/Migration",slug:"/tutorials/Migration/v4",permalink:"/egjs-view360/docs/tutorials/Migration/v4",draft:!1,editUrl:"https://github.com/naver/egjs-view360/edit/master/demo/docs/tutorials/Migration/v4.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Migration Guide (v3 \u2192 v4)",sidebar_position:1},sidebar:"docs",previous:{title:"Having Troubles?",permalink:"/egjs-view360/docs/troubleshooting"}},p={},c=[{value:"SpinViewer (deprecated)",id:"spinviewer-deprecated",level:2},{value:"HTML structure",id:"html-structure",level:2},{value:"Changed options",id:"changed-options",level:2},{value:"image &amp; video",id:"image--video",level:3},{value:"projectionType",id:"projectiontype",level:3},{value:"projectionType: panorama",id:"projectiontype-panorama",level:3},{value:"cubemapConfig",id:"cubemapconfig",level:3},{value:"width &amp; height",id:"width--height",level:3},{value:"yaw &amp; pitch",id:"yaw--pitch",level:3},{value:"showPolePoint",id:"showpolepoint",level:3},{value:"useZoom",id:"usezoom",level:3},{value:"useKeyboard",id:"usekeyboard",level:3},{value:"gyroMode",id:"gyromode",level:3},{value:"fovRange",id:"fovrange",level:3},{value:"touchDirection",id:"touchdirection",level:3},{value:"canvasClass",id:"canvasclass",level:3},{value:"(static) PanoViewer.isGyroSensorAvailable",id:"static-panoviewerisgyrosensoravailable",level:3},{value:"enableSensor &amp; disableSensor",id:"enablesensor--disablesensor",level:3},{value:"enterVR &amp; exitVR",id:"entervr--exitvr",level:3},{value:"getYaw, getPitch, getFov",id:"getyaw-getpitch-getfov",level:3},{value:"getYawRange, getPitchRange, getFovRange",id:"getyawrange-getpitchrange-getfovrange",level:3},{value:"getProjectionType",id:"getprojectiontype",level:3},{value:"getTouchDirection",id:"gettouchdirection",level:3},{value:"getImage, getVideo",id:"getimage-getvideo",level:3},{value:"keepUpdate",id:"keepupdate",level:3},{value:"lookAt",id:"lookat",level:3},{value:"setImage &amp; setVideo",id:"setimage--setvideo",level:3},{value:"Other option setters",id:"other-option-setters",level:3},{value:"updateViewportDimensions",id:"updateviewportdimensions",level:3},{value:"Events",id:"events",level:2},{value:"error",id:"error",level:3},{value:"animationEnd",id:"animationend",level:3}],s={toc:c};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"A lot of things changed as the major version went up to v4."),(0,o.kt)("p",null,"In this guide, we will guide you through the changes so that those who used the previous major version can move on to v4."),(0,o.kt)("h2",{id:"spinviewer-deprecated"},"SpinViewer (deprecated)"),(0,o.kt)("admonition",{type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"SpinViewer is no longer available from v4. View360 now offers only PanoViewer.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"PanoViewer renamed to View360."),(0,o.kt)("li",{parentName:"ul"},"If you're using SpinViewer, you can still use v3.")),(0,o.kt)("h2",{id:"html-structure"},"HTML structure"),(0,o.kt)("p",null,"Traditionally, View360 required only one container element.",(0,o.kt)("br",{parentName:"p"}),"\n","A canvas was added inside the container and the style was force-injected.",(0,o.kt)("br",{parentName:"p"}),"\n","This method has the advantage of being a little more convenient, but it has the disadvantage of being difficult to predict the style after the PanoViewer is mounted."),(0,o.kt)("p",null,"In the new version, both the container element and the canvas element must be given to mount View360.",(0,o.kt)("br",{parentName:"p"}),"\n","In addition, we're providing a separate CSS file without directly injecting the default style.",(0,o.kt)("br",{parentName:"p"}),"\n","This makes it easy to predict the size of the displayed area even if View360 is not mounted, and makes it easy to adjust the viewer ratio through helper classes."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<div class="viewer" id="myPanoViewer"></div>\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<head>\n  \x3c!-- CSS file is now provided. --\x3e\n  <link rel="stylesheet" href="https://naver.github.io/egjs-view360/release/latest/css/view360.min.css">\n</head>\n<body>\n  \x3c!-- You need to add a class view360-container. --\x3e\n  \x3c!-- In addition, you can easily change the viewer\'s ratio through a ratio helper class (such as is-16by9). --\x3e\n  <div class="view360-container is-16by9" id="myPanoViewer">\n    \x3c!-- You must add a canvas element inside. --\x3e\n    <canvas class="view360-canvas">\n  </div>\n</body>\n')),(0,o.kt)("h2",{id:"changed-options"},"Changed options"),(0,o.kt)("h3",{id:"image--video"},"image & video"),(0,o.kt)("p",null,"Integrated into Projection's option, ",(0,o.kt)("a",{parentName:"p",href:"../../api/Projection/Interface/ProjectionOptions#src"},"src"),"."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  image: "/path/to/image/image.jpg"\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360, { EquirectProjection } from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  projection: new EquirectProjection({\n    src: "/path/to/image/image.jpg", // image & video is integrated into src.\n    video: false // For video-related options, use the "video".\n  })\n});\n')),(0,o.kt)("h3",{id:"projectiontype"},"projectionType"),(0,o.kt)("p",null,"Each projection type is separated into classes for tree-shaking.",(0,o.kt)("br",{parentName:"p"}),"\n","You can now use ",(0,o.kt)("inlineCode",{parentName:"p"},"projection")," instead of ",(0,o.kt)("inlineCode",{parentName:"p"},"projectionType")," by importing the projection class."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  projectionType: "equirectangular"\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360, { EquirectProjection } from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  projection: new EquirectProjection({\n    ...some_options // options for the projection\n  })\n});\n')),(0,o.kt)("h3",{id:"projectiontype-panorama"},"projectionType: panorama"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Changed to ",(0,o.kt)("strong",{parentName:"li"},"CylindricalProjection")),(0,o.kt)("li",{parentName:"ul"},"It won't automatically detect whether it covers all 360 degrees horizontally by the proportion of the user's image.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Please use the option ",(0,o.kt)("strong",{parentName:"li"},"partial"),".")))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  projectionType: "panorama"\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360, { CylindricalProjection } from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  projection: new CylindricalProjection({\n    ...some_options // options for the projection\n  })\n});\n')),(0,o.kt)("h3",{id:"cubemapconfig"},"cubemapConfig"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Separated as an option for ",(0,o.kt)("inlineCode",{parentName:"li"},"CubemapProjection")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"CubestripProjection"),".",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"order: Renamed to ",(0,o.kt)("inlineCode",{parentName:"li"},"cubemapOrder"),"."),(0,o.kt)("li",{parentName:"ul"},"tileConfig: Deleted, some features are available with ",(0,o.kt)("inlineCode",{parentName:"li"},"cubemapFlipX"),".")))),(0,o.kt)("h3",{id:"width--height"},"width & height"),(0,o.kt)("p",null,"Deleted. You can now resize the container elements directly through the CSS."),(0,o.kt)("h3",{id:"yaw--pitch"},"yaw & pitch"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Changed to ",(0,o.kt)("inlineCode",{parentName:"li"},"initialYaw")," & ",(0,o.kt)("inlineCode",{parentName:"li"},"initialPitch")," respectively.")),(0,o.kt)("h3",{id:"showpolepoint"},"showPolePoint"),(0,o.kt)("p",null,"Deleted."),(0,o.kt)("h3",{id:"usezoom"},"useZoom"),(0,o.kt)("p",null,"It can be used in the same way with the option ",(0,o.kt)("inlineCode",{parentName:"p"},"zoom")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  useZoom: false\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360 from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  zoom: false\n});\n')),(0,o.kt)("h3",{id:"usekeyboard"},"useKeyboard"),(0,o.kt)("p",null,"It can be used in the same way with the option ",(0,o.kt)("inlineCode",{parentName:"p"},"rotate.disableKeyboard"),"."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  useKeyboard: false\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360 from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  rotate: { disableKeyboard: true }\n});\n')),(0,o.kt)("h3",{id:"gyromode"},"gyroMode"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"GYRO_MODE.NONE: It can be replaced by ",(0,o.kt)("inlineCode",{parentName:"li"},"gyro: false"),"."),(0,o.kt)("li",{parentName:"ul"},"GYRO_MODE.YAWPITCH: It can be replaced by ",(0,o.kt)("inlineCode",{parentName:"li"},"gyro: true"),"."),(0,o.kt)("li",{parentName:"ul"},"GYRO_MODE.VR: It can be replaced by ",(0,o.kt)("inlineCode",{parentName:"li"},"gyro: { ignoreRoll: false }"),".")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  gyroMode: "VR"\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360 from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  gyro: { ignoreRoll: false }\n});\n')),(0,o.kt)("h3",{id:"fovrange"},"fovRange"),(0,o.kt)("p",null,"We changed it to zoomRange for easier use.",(0,o.kt)("br",{parentName:"p"}),"\n","Try ",(0,o.kt)("a",{parentName:"p",href:"../../api/Class/Camera#fovToZoom"},"Camera#fovToZoom")," to convert the fov value to the zoom value."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  fovRange: [15, 90]\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360 from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  zoomRange: [1, 5] // You can zoom in from 100% to 500%.\n});\n')),(0,o.kt)("h3",{id:"touchdirection"},"touchDirection"),(0,o.kt)("p",null,"Deleted and can be replaced with ",(0,o.kt)("inlineCode",{parentName:"p"},"rotate.disablePitch")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"rotate.disableYaw"),"."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { PanoViewer } from "@egjs/view360";\n\nconst panoViewer = new PanoViewer(container, {\n  touchDirection: TOUCH_DIRECTION.YAW\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import View360 from "@egjs/view360";\n\nconst viewer = new View360(container, {\n  rotate: { disablePitch: true }\n});\n')),(0,o.kt)("h3",{id:"canvasclass"},"canvasClass"),(0,o.kt)("p",null,"Deleted. Canvas elements are not automatically created, so you can set class name yourself!"),(0,o.kt)("h3",{id:"static-panoviewerisgyrosensoravailable"},"(static) PanoViewer.isGyroSensorAvailable"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Moved to GyroControl's static metho' ",(0,o.kt)("inlineCode",{parentName:"li"},"isAvailable"),"."),(0,o.kt)("li",{parentName:"ul"},"Instead of receiving a callback, it will now return a Promise with availability.")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"PanoViewer.isGyroSensorAvailable(available => {\n  console.log(available);\n});\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { GyroControl } from "@egjs/view360";\n\nconst available = await GyroControl.isAvailable();\n')),(0,o.kt)("h3",{id:"enablesensor--disablesensor"},"enableSensor & disableSensor"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Moved to ",(0,o.kt)("inlineCode",{parentName:"li"},"enable")," & ",(0,o.kt)("inlineCode",{parentName:"li"},"disable")," of GyroControl, which can be accessed by ",(0,o.kt)("inlineCode",{parentName:"li"},"view360.gyro"),".")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"viewer.enableSensor();\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"viewer.control.gyro.enable();\n")),(0,o.kt)("h3",{id:"entervr--exitvr"},"enterVR & exitVR"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Moved to ",(0,o.kt)("inlineCode",{parentName:"li"},"enter & exit")," of ",(0,o.kt)("inlineCode",{parentName:"li"},"view360.vr"),".")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"viewer.enterVR();\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"viewer.vr.enter();\n")),(0,o.kt)("h3",{id:"getyaw-getpitch-getfov"},"getYaw, getPitch, getFov"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Changed to properties of ",(0,o.kt)("inlineCode",{parentName:"li"},"view360.camera"),".")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const currentYaw = viewer.getYaw();\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const currentYaw = viewer.camera.yaw;\n")),(0,o.kt)("h3",{id:"getyawrange-getpitchrange-getfovrange"},"getYawRange, getPitchRange, getFovRange"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Changed to ",(0,o.kt)("inlineCode",{parentName:"li"},"view360.camera")," method and properties."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"getFovRange")," has been changed to ",(0,o.kt)("inlineCode",{parentName:"li"},"getZoomRange"),".")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const [min, max] = viewer.getYawRange();\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// Same to the option "yawRange"\nconst { min, max } = viewer.camera.yawRange;\n\n// Actual yaw range considering current zoom value\nconst { min, max } = viewer.camera.getYawRange(viewer.camera.zoom);\n')),(0,o.kt)("h3",{id:"getprojectiontype"},"getProjectionType"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Deleted."),(0,o.kt)("li",{parentName:"ul"},"Instead, you can access the current projection instance with ",(0,o.kt)("inlineCode",{parentName:"li"},"viewer.projection"),".")),(0,o.kt)("h3",{id:"gettouchdirection"},"getTouchDirection"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Deleted.")),(0,o.kt)("h3",{id:"getimage-getvideo"},"getImage, getVideo"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"It can be replaced by ",(0,o.kt)("inlineCode",{parentName:"li"},"getTexture()")," of View360.mesh.")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const image = viewer.getImage();\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const image = viewer.mesh.getTexture().source;\n")),(0,o.kt)("h3",{id:"keepupdate"},"keepUpdate"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Deleted. View360 now controls whether to render or not.")),(0,o.kt)("h3",{id:"lookat"},"lookAt"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"It can be replaced with ",(0,o.kt)("inlineCode",{parentName:"li"},"view360.camera.lookAt")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"view360.camera.animateTo"),".")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"viewer.lookAt({ yaw, pitch, fov }, duration);\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// If you want to change cam direction immediately\nviewer.camera.lookAt({\n  yaw,\n  pitch,\n  zoom\n});\n\n// When applying animation\nviewer.camera.animateTo({\n  yaw,\n  pitch,\n  zoom,\n  duration\n});\n\n// If you need immediate reflection, you have to call this.\nviewer.renderFrame(0);\n")),(0,o.kt)("h3",{id:"setimage--setvideo"},"setImage & setVideo"),(0,o.kt)("p",null,"It can be replaced with ",(0,o.kt)("inlineCode",{parentName:"p"},"view360.load"),"."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'panoViewer.setImage("/path/to/image/image.png", {\n  projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP\n});\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'view360.load(new CubemapProjection({\n  src: "/path/to/image/image.png"\n}));\n')),(0,o.kt)("h3",{id:"other-option-setters"},"Other option setters"),(0,o.kt)("p",null,"You can change the value directly only for the options that can be changed."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"panoViewer.setUseKeyboard(false);\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"view360.rotate.disableKeyboard = true;\n")),(0,o.kt)("h3",{id:"updateviewportdimensions"},"updateViewportDimensions"),(0,o.kt)("p",null,"You can change the size of the container yourself."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v3v")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"panoViewer.updateViewportDimensions({ width: 250, height: 250 });\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"v4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const container = viewer.rootEl;\n\ncontainer.style.width = "250px";\ncontainer.style.height = "250px";\n')),(0,o.kt)("h2",{id:"events"},"Events"),(0,o.kt)("h3",{id:"error"},"error"),(0,o.kt)("p",null,"Deleted. View360Error is now throwed instead."),(0,o.kt)("h3",{id:"animationend"},"animationEnd"),(0,o.kt)("p",null,"Deleted. You can now use ",(0,o.kt)("inlineCode",{parentName:"p"},"inputStart")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"inputEnd")," events instead."))}u.isMDXComponent=!0}}]);