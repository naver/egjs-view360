

### Installation

#### npm
In case using npm,

```bash
npm install @egjs/view360 --save
```

#### script tag
In case using script tag,
Download the latest version of view360.js and include using the script tag

```html
{% capture distFile %}{{ site.data.egjs.subComponents[1].distPath }}{{ site.data.egjs.subComponents[1].dists[1].filename }}{% endcapture %}
<!--script src="/path/to/js/{{ distFile }}"></script-->
<script src="//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ distFile }}"></script>
```

[Download link](//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ distFile }})

### Usage 

#### 1. Set up your Container Element

Your container element's dimensions should be defined.

```html
<div id="mySpinViewer"></div>
```

#### 2. Import Module

##### ES5
```js
// Or use global namespace
var SpinViewer = eg.view360.SpinViewer;
```

##### ES6+
```js
// Use es6 import
import {SpinViewer} from "@egjs/view360";
```

#### 3. Initialize SpinViewer
```js
// create SpinViewer with option
var spinViewer = new SpinViewer(
  document.getElementById("mySpinViewer"), {
    imageUrl: "/path/to/image/image.jpg", /*required */
    rowCount: 24 /* If count of sprite row/col is lager than 1, this field is required */
  }
);
```

For more information about API, please visit the **[link](//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/release/latest/doc/eg.view360.SpinViewer.html)**.