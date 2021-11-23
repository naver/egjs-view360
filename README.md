# egjs-view360
<p>
  <a href="https://badge.fury.io/js/%40egjs%2Fview360" target="_blank"><img alt="npm version" src="https://badge.fury.io/js/%40egjs%2Fview360.svg" /></a>
  <a href="https://travis-ci.org/naver/egjs-view360" target="_blank"><img alt="Build Status" src="https://travis-ci.org/naver/egjs-view360.svg?branch=master" /></a>
  <a href="https://coveralls.io/github/naver/egjs-view360?branch=master" target="_blank"><img alt="Coverage Status" src="https://coveralls.io/repos/github/naver/egjs-view360/badge.svg?branch=master" /></a>
  <a href="https://github.com/naver/egjs-view360/blob/master/packages/ngx-view360/README.md" target="_blank"><img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&logo=Angular&color=dd0031" /></a>
  <a href="https://github.com/naver/egjs-view360/blob/master/packages/react-view360/README.md" target="_blank"><img alt="React" src="https://img.shields.io/static/v1.svg?label=&message=React&style=flat-square&logo=React&logoColor=white&color=61dafb" /></a>
  <a href="https://github.com/naver/egjs-view360/blob/master/packages/vue-view360/README.md" target="_blank"><img alt="Vue" src="https://img.shields.io/static/v1.svg?label=&message=Vue&style=flat-square&logo=Vue.js&logoColor=white&color=42b883" /></a>
  <img src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript" />
</p>

egjs-view360 is a 360 integrated viewing solution from **inside-out view** to **outside-in view**. It provides user-friendly service by rotating 360 degrees through various user interaction such as motion sensor and touch.

## User Guide
- [Getting Started and Demos Website](https://naver.github.io/egjs-view360)
- [API documentation](https://naver.github.io/egjs-view360/release/latest/doc/)
- [Wiki Guide](https://github.com/naver/egjs-view360/wiki)

## What view360 can do?

  1. Play various (Image / Video) **360 contents**
     - Smartphone Panorama pictures
     - Equirectangular (Stereoscopic Also)
     - Cubemap with user custom setting
       - Also support YouTube **EAC** (Cubemap) Format
     - Sprite image captured around target object.
  1. Control with various input type
     - Motion control with device gyro sensor
     - Touch (Panning, Pinch-Zoom)
     - Mouse Move, Wheel
     - Keyboard (Arrow key, AWDS Key)


## Components
egjs-view360 provides the following components.

|  |PanoViewer|SpinViewer|
|---|---|---|
|View|Inside-out|Outside-in|
|Example| <img width="412" src="https://raw.githubusercontent.com/naver/egjs-view360/master/demo/assets/img/panoviewer_thumbnail.gif">|<img width="300" src="https://raw.githubusercontent.com/naver/egjs-view360/master/demo/assets/img/basic_spinview_thumb.gif">|

### [PanoViewer](https://naver.github.io/egjs-view360/panoviewer.html) ([Wiki Doc](https://github.com/naver/egjs-view360/wiki/PanoViewer-3.0-User-Guide))

> Following movie was recorded on iPhone 6+(It's REAL!)

![](https://user-images.githubusercontent.com/3903575/38671092-6a4494a0-3e85-11e8-9eca-9619a2545801.gif)

It is a component that supports the **inside-out viewing** method in which observer becomes the center of the world and looks around. Full 360 photos & videos taken with a 360-degree camera, as well as panoramic photos taken with a mobile phone. Touch, mouse, and keyboard, as well as sophisticated customized motion sensing support, provide immersive immersion in virtual reality.


### [SpinViewer](https://naver.github.io/egjs-view360/spinviewer.html) ([Wiki Doc](https://github.com/naver/egjs-view360/wiki/SpinViewer-3-User-Guide))

![](https://raw.githubusercontent.com/naver/egjs-view360/master/demo/assets/img/basic_spinview_thumb.gif)

It is a component that supports the **outside-in viewing** method in which the object is centered and the observer can turn around and observe the object. All you need to do is create a sprite image of objects from multiple angles. By giving images to components, we'll give you the experience of turning things around as if they were in your hands.

## Download and Installation

In addition to the integrated version of PanoViewer and SpinViewer, we have released a separate version. Here we describe the integrated version. If you want to reduce the size of the library through the use of individual modules, please refer to the [PanoViewer guide](https://naver.github.io/egjs-view360/panoviewer.html) or the [SpinViewer guide](https://naver.github.io/egjs-view360/spinviewer.html)

Download dist files from repo directly or install it via npm.

### For development (Uncompressed)

You can download the uncompressed files for development

- Latest : https://naver.github.io/egjs-view360/release/latest/dist/view360.js
- Specific version : https://naver.github.io/egjs-view360/release/[VERSION]/dist/view360.js

### For production (Compressed)

You can download the compressed files for production

- Latest : https://naver.github.io/egjs-view360/release/latest/dist/view360.min.js
- Specific version : https://naver.github.io/egjs-view360/release/[VERSION]/dist/view360.min.js

### Packaged version (with Dependencies)
> Packaged version is not an official distribution.
> Is just to provide for ease use of 'egjs-view360' with dependency.

 - **Latest**
    - https://naver.github.io/egjs-view360/release/latest/dist/view360.pkgd.js
    - https://naver.github.io/egjs-view360/release/latest/dist/view360.pkgd.min.js

 - **Specific version**
    - https://naver.github.io/egjs-view360/release/[VERSION]/dist/view360.pkgd.js
    - https://naver.github.io/egjs-view360/release/[VERSION]/dist/view360.pkgd.min.js

### Installation with npm

The following command shows how to install egjs-view360 using npm.

```bash
$ npm install @egjs/view360
```


## Supported Browsers
The following are the supported browsers.

### PanoViewer
|Internet Explorer|Edge|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|---|
|11+|latest|latest|latest|latest|9+|5.0+|

### SpinViewer
|Internet Explorer|Edge|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|---|
|9+|latest|latest|latest|latest|7+|2.3+(except 3.x)|

## Dependency

egjs-view360 has the dependencies for the following libraries:

|[eg.Component](http://github.com/naver/egjs-component)|[eg.Axes](http://github.com/naver/egjs-axes)|[eg.Agent](http://github.com/naver/egjs-agent)|[promise-polyfill](https://github.com/taylorhakes/promise-polyfill)|[webvr-polyfill](https://github.com/googlevr/webvr-polyfill)|
|----|----|---|---|---|
|2.0.0+|2.3.0+|2.1.1+|4.1.1|0.9.16|

## 📦 Packages
|Package|Version|Description|
|:-----:|:-----:|:-----:|
|[**@egjs/ngx-view360**](https://github.com/naver/egjs-view360/blob/master/packages/ngx-view360/README.md)|<a href="https://www.npmjs.com/package/@egjs/ngx-view360" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/ngx-view360.svg?style=flat-square&color=dd0031&label=%F0%9F%94%96" alt="version" /></a>|[Angular](https://angular.io/) port of @egjs/view360|
|[**@egjs/react-view360**](https://github.com/naver/egjs-view360/blob/master/packages/react-view360/README.md)|<a href="https://www.npmjs.com/package/@egjs/react-view360" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/react-view360.svg?style=flat-square&color=00d8ff&label=%F0%9F%94%96" alt="version" /></a>|[React](https://reactjs.org/) port of @egjs/view360|
|[**@egjs/vue-view360**](https://github.com/naver/egjs-view360/blob/master/packages/vue-view360/README.md)|<a href="https://www.npmjs.com/package/@egjs/vue-view360" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/vue-view360.svg?style=flat-square&color=42b883&label=%F0%9F%94%96" alt="version" /></a>|[Vue.js@2](https://vuejs.org/v2/guide/index.html) port of @egjs/view360|
|[**@egjs/vue3-view360**](https://github.com/naver/egjs-view360/blob/master/packages/vue3-view360/README.md)|<a href="https://www.npmjs.com/package/@egjs/vue3-view360" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/vue3-view360.svg?style=flat-square&color=42b883&label=%F0%9F%94%96" alt="version" /></a>|[Vue.js@3](https://v3.vuejs.org/) port of @egjs/view360|
|[**@egjs/svelte-view360**](https://github.com/naver/egjs-view360/blob/master/packages/svelte-view360/README.md)|<a href="https://www.npmjs.com/package/@egjs/svelte-view360" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/svelte-view360.svg?style=flat-square&color=FF3E00&label=%F0%9F%94%96" alt="version" /></a>|[Svelte](https://svelte.dev/) port of @egjs/view360|

## How to start developing egjs-view360?

For anyone interested to develop egjs-view360, follow the instructions below.

### Development Environment

#### 1. Clone the repository

Clone the egjs-view360 repository and install the dependency modules.

```bash
# Clone the repository.
$ git clone https://github.com/naver/egjs-view360.git
```

#### 2. Install dependencies
`npm` is supported.

```
# Install the dependency modules.
$ npm install
```

#### 3. Build

Use npm script to build eg.view360

```bash
# Run webpack-dev-server for development
$ npm start

# Build
$ npm run build

# Generate jsdoc
$ npm run jsdoc
```

Two folders will be created after complete build is completed.

- **dist** folder: Includes the **view360.js** and **view360.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

### Linting

To keep the same code style, we adopted [ESLint](http://eslint.org/) to maintain our code quality. The [rules](https://github.com/naver/eslint-config-naver/tree/master/rules) are modified version based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
Setup your editor for check or run below command for linting.

```bash
$ npm run lint
```

### Test

Once you created a branch and done with development, you must perform a test running `npm run test` command before you push code to a remote repository.

```bash
$ npm run test
```
Running a `npm run test` command will start [Mocha](https://mochajs.org/) tests via [Karma-runner](https://karma-runner.github.io/).


## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-view360/issues) page on GitHub.


## License
egjs-view360 is released under the [MIT license](https://github.com/naver/egjs-view360/blob/master/LICENSE).


```
Copyright (c) 2017 NAVER Corp.

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
