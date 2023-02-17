"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3829],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>m});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=o.createContext({}),p=function(e){var n=o.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=p(e.components);return o.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},d=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(t),m=r,v=d["".concat(c,".").concat(m)]||d[m]||u[m]||i;return t?o.createElement(v,a(a({ref:n},l),{},{components:t})):o.createElement(v,a({ref:n},l))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=d;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var p=2;p<i;p++)a[p]=t[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4673:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var o=t(7462),r=(t(7294),t(3905));const i={title:"How To - Projections",sidebar_position:1,id:"projections-basics",slug:"/projections"},a=void 0,s={unversionedId:"projections/projections-basics",id:"projections/projections-basics",title:"How To - Projections",description:"Projection represents how you display your 360 image/video.",source:"@site/docs/projections/Basics.mdx",sourceDirName:"projections",slug:"/projections",permalink:"/egjs-view360/docs/projections",draft:!1,editUrl:"https://github.com/naver/egjs-view360/edit/master/demo/docs/projections/Basics.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"How To - Projections",sidebar_position:1,id:"projections-basics",slug:"/projections"},sidebar:"projections",next:{title:"EquirectProjection",permalink:"/egjs-view360/docs/projections/equirect"}},c={},p=[{value:"Using Projections",id:"using-projections",level:2},{value:"Common Options",id:"common-options",level:2},{value:"src",id:"src",level:3},{value:"video",id:"video",level:3}],l={toc:p};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,o.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Projection represents how you display your 360 image/video.",(0,r.kt)("br",{parentName:"p"}),"\n","View360 currently supports only a few projection types, and will gradually support a number of additional projection types."),(0,r.kt)("h2",{id:"using-projections"},"Using Projections"),(0,r.kt)("p",null,"To reduce the user's final bundle size (for tree-shaking), the projections are exported separately within the ",(0,r.kt)("inlineCode",{parentName:"p"},"@egjs/view360")," package.",(0,r.kt)("br",{parentName:"p"}),"\n","Therefore, you should import the projection you want as follows and use it."),(0,r.kt)("p",null,"For example, below is an example of using EquirectProjection."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'import View360, { EquirectProjection } from "@egjs/view360";\n\nconst viewer = new View360("#el_id", {\n  projection: new EquirectProjection({\n    src: "URL_TO_360_SOURCE"\n  })\n});\n')),(0,r.kt)("p",null,"Check the left sidebar for a list of available projections."),(0,r.kt)("h2",{id:"common-options"},"Common Options"),(0,r.kt)("p",null,"Projections share two common options, and each projection can has its own option.",(0,r.kt)("br",{parentName:"p"}),"\n","The two common options are as follows."),(0,r.kt)("h3",{id:"src"},"src"),(0,r.kt)("p",null,"src means the source of 360 image/video to be displayed using the projection."),(0,r.kt)("p",null,"You can use it in two ways.",(0,r.kt)("br",{parentName:"p"}),"\n","First, you can use the URL string that points to the 360 image/video."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const viewer = new View360("#el_id", {\n  projection: new EquirectProjection({\n    // This is an example that we\'re using in our demo.\n    src: "/pano/equirect/equi.jpg"\n  })\n});\n')),(0,r.kt)("p",null,"If you use multiple images, such as Cubemap, you can also use a URL array."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const viewer = new View360("#el_id", {\n  projection: new CubemapProjection({\n    // The default order is +X, -X, +Y, -Y, +Z, -Z.\n    // You can also change the order with the \'cubemapOrder\' option in CubemapProjection.\n    src: [\n      "/pano/cube/FishermansBastion/posx.jpg",\n      "/pano/cube/FishermansBastion/negx.jpg",\n      "/pano/cube/FishermansBastion/posy.jpg",\n      "/pano/cube/FishermansBastion/negy.jpg",\n      "/pano/cube/FishermansBastion/posz.jpg",\n      "/pano/cube/FishermansBastion/negz.jpg"\n    ]\n  })\n});\n')),(0,r.kt)("p",null,"Alternatively, you can use HTMLImageElement or HTMLVideoElement directly as follows:",(0,r.kt)("br",{parentName:"p"}),"\n","This is useful when used with other video player libraries, such as ",(0,r.kt)("a",{parentName:"p",href:"https://videojs.com/"},"Video.js"),")."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"HTML")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<-- This is an example that we use in our video.js demo. --\x3e\n<div id="container" data-vjs-player>\n  <video id="video" class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered vjs-controls-enabled" data-setup=\'{"controls": true, "autoplay": true}\'>\n    <source src="/pano/equirect/seven.mp4" type="video/mp4" />\n    <source src="/pano/equirect/seven.webm" type="video/webm" />\n  </video>\n  <canvas class="view360-canvas"></canvas>\n</div>\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Javascript")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const container = document.querySelector("#container");\nconst video = document.querySelector("#video");\n\nvideojs(video).ready(() => {\n  // Mount View360 after video.js initialization.\n  const viewer = new View360(container, {\n    projection: new EquirectProjection({\n      src: video,\n      video: true\n    })\n  });\n});\n')),(0,r.kt)("h3",{id:"video"},"video"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"video")," can specify whether 360 content is a video.",(0,r.kt)("br",{parentName:"p"}),"\n","By default, you can use Boolean values, as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'// If it\'s not video\nconst viewer = new View360("#el_id", {\n  projection: new EquirectProjection({\n    src: "/pano/equirect/equi.jpg",\n    // The src above is an image, not a video, so use "false" here.\n    // The default value for "video" is false, so you can omit it.\n    video: false\n  })\n});\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'// If it\'s video\nconst viewer = new View360("#el_id", {\n  projection: new EquirectProjection({\n    src: "/pano/equirect/burano.mp4",\n    // Use "true" because the "src" above is a video!\n    video: true\n  })\n});\n')),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"video")," can receive not only Boolean values but also objects.",(0,r.kt)("br",{parentName:"p"}),"\n","This allows you to assign some attributes to HTMLVideoElement.",(0,r.kt)("br",{parentName:"p"}),"\n","For example, you can use it like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'// If it\'s video\nconst viewer = new View360("#el_id", {\n  projection: new EquirectProjection({\n    src: "/pano/equirect/burano.mp4",\n    // It automatically starts the video muted, and does not loop after the video ends.\n    video: {\n      autoplay: true,\n      muted: true,\n      loop: false\n    }\n  })\n});\n')),(0,r.kt)("p",null,"Check ",(0,r.kt)("a",{parentName:"p",href:"./api/Interface/VideoConfig"},"VideoConfig")," for the available options."))}u.isMDXComponent=!0}}]);