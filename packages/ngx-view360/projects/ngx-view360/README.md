<h1 align=center>
  @egjs/ngx-view360
</h1>

<p align=center>
  <a href="https://www.npmjs.com/package/@egjs/ngx-view360" target="_blank">
    <img src="https://img.shields.io/npm/v/@egjs/ngx-view360.svg?style=flat-square&color=dd0031&label=version&logo=NPM">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/ngx-view360" target="_blank">
    <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@egjs/ngx-view360.svg?style=flat-square&label=%F0%9F%92%BE%20gzipped&color=007acc">
  </a>
  <a href="https://github.com/naver/egjs-view360/graphs/commit-activity">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/naver/egjs-view360.svg?style=flat-square&label=%E2%AC%86%20commits&color=08CE5D">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/ngx-view360" target="_blank">
    <img src="https://img.shields.io/npm/dm/@egjs/ngx-view360.svg?style=flat-square&label=%E2%AC%87%20downloads&color=08CE5D" alt="npm downloads per month">
  </a>
  <a href="https://github.com/naver/egjs-view360/graphs/contributors" target="_blank">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/naver/egjs-view360.svg?label=%F0%9F%91%A5%20contributors&style=flat-square&color=08CE5D"></a>
  <a href="https://github.com/naver/egjs-view360/blob/master/LICENSE" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/github/license/naver/egjs-view360.svg?style=flat-square&label=%F0%9F%93%9C%20license&color=08CE5D">
  </a>
</p>

<p align=center>
  Angular wrapper of <a href="https://github.com/naver/egjs-view360">@egjs/view360</a>
</p>

<p align=center>
  <a href="https://naver.github.io/egjs-view360/">Demo</a> / <a href="https://naver.github.io/egjs-view360/release/latest/doc/">Documentation</a> / <a href="https://naver.github.io/egjs/">Other components</a>
</p>

## ⚙️ Installation
```sh
npm install --save @egjs/ngx-view360
```

## 🏃 Quick Start
### Module definition
```diff
+import { NgxPanoViewerModule, NgxSpinViewerModule } from '@egjs/ngx-view360';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
+   /* Add in imports */
+   NgxPanoViewerModule 
+   NgxSpinViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } /* Your app */
```

### Template & Script
```ts
@Component({
  selector: 'view360-demo',
  template: `
  <div>
    <ngx-pano-viewer
      [image]="PATH_TO_YOUR_PANORAMA_IMAGE"
      [useZoom]="false"
      (viewChange)="onViewChange($event)"
    />
    <ngx-spin-viewer
      [imageUrl]="PATH_TO_YOUR_SPRITE_IMAGE"
      [rowCount]="42"
      [scale]="1"
    />
  </div>
  `
})
export class View360Demo {
  onViewChange(e) {
    // DO_SOMETHING
  }
}
```

## 🙌 Contributing
See [CONTRIBUTING.md](https://github.com/naver/egjs-view360/blob/master/CONTRIBUTING.md).

## 📝 Feedback
Please file an [Issue](https://github.com/naver/egjs-view360/issues)

## 📜 License
egjs-view360 is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2017-present NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<p align=center>
  <a href="https://naver.github.io/egjs/"><img height="50" src="https://naver.github.io/egjs/img/logotype1_black.svg" ></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/naver"><img height="50" src="https://naver.github.io/OpenSourceGuide/book/assets/naver_logo.png" /></a>
</p>
