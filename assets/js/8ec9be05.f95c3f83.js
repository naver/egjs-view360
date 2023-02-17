"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8719],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),p=c(n),u=o,h=p["".concat(s,".").concat(u)]||p[u]||d[u]||a;return n?r.createElement(h,l(l({ref:t},m),{},{components:n})):r.createElement(h,l({ref:t},m))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=p;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4801:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(6010),o=n(7294);const a="container_KAvi",l="tags_yIZ0",i="tag_NTEP",s="dark_QuFp",c="info_Tfvv",m="warning_OxPl",d="success_OgfR",p="link_PhWZ",u=e=>{let{type:t,defaultVal:n,added:u}=e;return o.createElement("div",{className:a},t&&o.createElement("div",{className:l},o.createElement("span",{className:(0,r.Z)(i,s)},"Type"),o.createElement("span",{className:(0,r.Z)(i,c)},t)),n&&o.createElement("div",{className:l},o.createElement("span",{className:(0,r.Z)(i,s)},"Default"),o.createElement("span",{className:(0,r.Z)(i,m)},n)),u&&o.createElement("div",{className:l},o.createElement("span",{className:(0,r.Z)(i,s)},"Added in"),o.createElement("a",{className:p,href:"https://github.com/naver/egjs-view360/releases/tag/"+u,target:"_blank",rel:"noopener noreferrer"},o.createElement("span",{className:(0,r.Z)(i,d)},"v",u))))}},6793:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>m});var r=n(7462),o=(n(7294),n(3905)),a=n(4801);const l={},i=void 0,s={unversionedId:"plugins/ControlBar/customItems",id:"plugins/ControlBar/customItems",title:"customItems",description:"Add custom control bar items.",source:"@site/docs/plugins/ControlBar/customItems.mdx",sourceDirName:"plugins/ControlBar",slug:"/plugins/ControlBar/customItems",permalink:"/egjs-view360/docs/plugins/ControlBar/customItems",draft:!1,editUrl:"https://github.com/naver/egjs-view360/edit/master/demo/docs/plugins/ControlBar/customItems.mdx",tags:[],version:"current",frontMatter:{},sidebar:"plugins",previous:{title:"clickToPlay",permalink:"/egjs-view360/docs/plugins/ControlBar/clickToPlay"},next:{title:"fullscreenButton",permalink:"/egjs-view360/docs/plugins/ControlBar/fullscreenButton"}},c={},m=[{value:"Example",id:"example",level:2}],d={toc:m};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)(a.Z,{type:"ControlBarItem[]",defaultVal:"[]",added:"4.0.0",mdxType:"OptionDescriptor"}),(0,o.kt)("p",null,"Add custom control bar items."),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("p",null,"On the View 360 demo page, we are using ControlBar with custom buttons.",(0,o.kt)("br",{parentName:"p"}),"\n",'One of them is to add the "View original image" button, which is displayed in the lower right corner of the ControlBar.'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import View360, { ControlBar, ControlBarItem, ControlBarItemOptions, View360Options } from "@egjs/view360";\n\nclass OriginalImageButton extends ControlBarItem {\n  public readonly element: HTMLElement;\n\n  private _modalEl: HTMLElement;\n  private _viewer: View360 | null;\n\n  public constructor({\n    position = ControlBar.POSITION.RIGHT,\n    order = 0\n  }: Partial<ControlBarItemOptions> = {}) {\n    super({\n      position,\n      order\n    });\n\n    this.element = document.createElement("button");\n    this.element.classList.add("demo-controls-orig-image");\n\n    this._modalEl = document.createElement("div");\n    this._modalEl.classList.add("demo-controls-orig-image-modal");\n    this._modalEl.addEventListener("click", this._toggleModal);\n\n    this._viewer = null;\n  }\n\n  public init(viewer: View360, controlBar: ControlBar) {\n    const element = this.element;\n    const btnClass = controlBar.className.CONTROLS_BUTTON;\n\n    element.classList.add(btnClass);\n    element.addEventListener("click", this._toggleModal);\n    this._attachModal(viewer.rootEl);\n\n    this._viewer = viewer;\n  }\n\n  public destroy(viewer: View360, controlBar: ControlBar) {\n    const element = this.element;\n    const btnClass = controlBar.className.CONTROLS_BUTTON;\n\n    element.classList.remove(btnClass);\n    element.removeEventListener("click", this._toggleModal);\n    this._detachModal(viewer.rootEl);\n    this._clearModal();\n\n    this._viewer = null;\n  }\n\n  private _toggleModal = () => {\n    const viewer = this._viewer;\n    const modal = this._modalEl;\n    modal.classList.toggle("visible");\n\n    if (!viewer || !viewer.projection) return;\n\n    const visible = modal.classList.contains("visible");\n\n    if (!visible) {\n      return this._clearModal();\n    }\n\n    const src = viewer.projection.src as string | string[];\n    const srcArr = Array.isArray(src) ? src : [src];\n    const isVideo = !!viewer.projection.video;\n\n    srcArr.forEach(url => {\n      const contentEl = isVideo\n        ? document.createElement("video")\n        : document.createElement("img");\n      contentEl.classList.add("content");\n      contentEl.src = url;\n\n      if (isVideo) {\n        contentEl.addEventListener("click", evt => {\n          evt.stopPropagation();\n        });\n        (contentEl as HTMLVideoElement).controls = true;\n      }\n\n      modal.appendChild(contentEl);\n    });\n  };\n\n  private _clearModal = () => {\n    const modal = this._modalEl;\n\n    while (modal.firstChild) {\n      if (modal.firstChild instanceof HTMLVideoElement) {\n        const video = modal.firstChild;\n\n        video.pause();\n        video.removeAttribute("src");\n        video.load();\n      }\n\n      modal.removeChild(modal.firstChild);\n    }\n  }\n\n  private _attachModal(element: HTMLElement) {\n    element.appendChild(this._modalEl);\n  }\n\n  private _detachModal(element: HTMLElement) {\n    element.removeChild(this._modalEl);\n  }\n}\n\nexport default OriginalImageButton;\n')),(0,o.kt)("p",null,"That's a long source code! But you don't need to check the detailed code.",(0,o.kt)("br",{parentName:"p"}),"\n","You just need to check the following key details."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Custom item classes must inherit ",(0,o.kt)("inlineCode",{parentName:"li"},"ControlBarItem"),".")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class OriginalImageButton extends ControlBarItem\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"It should receive two essential options at the constructor (you can add more) and hand them over to ",(0,o.kt)("inlineCode",{parentName:"li"},"ControlBarItem")," through a ",(0,o.kt)("inlineCode",{parentName:"li"},"super")," call.")),(0,o.kt)("p",null,"In the example below, check that the default position is displayed on the right side of the lower bar (",(0,o.kt)("inlineCode",{parentName:"p"},"POSITION.RIGHT"),") and in the fastest order possible (",(0,o.kt)("inlineCode",{parentName:"p"},"order: 0"),").",(0,o.kt)("br",{parentName:"p"}),"\n","Please note that all basic items included in ",(0,o.kt)("inlineCode",{parentName:"p"},"ControlBar")," use ",(0,o.kt)("inlineCode",{parentName:"p"},"order: 9999")," as the default."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"constructor({\n  position = ControlBar.POSITION.MAIN_RIGHT,\n  order = 0\n}: Partial<ControlBarItemOptions> = {}) {\n  super({\n    position,\n    order\n  });\n}\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"An element is required to display custom items. After creating it, assign it to ",(0,o.kt)("inlineCode",{parentName:"li"},"this.element"),".")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'this.element = document.createElement("button");\nthis.element.classList.add("demo-controls-orig-image");\n')),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Let's implement the actual behavior of the item.")),(0,o.kt)("p",null,"You can implement each action when it is added and removed.",(0,o.kt)("br",{parentName:"p"}),"\n","The parameters that each method receives are instances of View360 and ControlBar."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"public init(viewer: View360, controlBar: ControlBar) {\n  // Behavior when an item is added\n}\n\npublic destroy(viewer: View360, controlBar: ControlBar) {\n  // Behavior when an item is removed\n}\n")),(0,o.kt)("p",null,"After making it like this, you can add it to the ",(0,o.kt)("inlineCode",{parentName:"p"},"customItems")," item in ControlBar and use it as follows."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"new ControlBar({\n  customItems: [new OriginalImageButton()]\n});\n")))}p.isMDXComponent=!0}}]);