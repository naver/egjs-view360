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
{% capture distFile %}{{ site.data.egjs.subComponents[0].distPath }}{{ site.data.egjs.subComponents[0].dists[1].filename }}{% endcapture %}
<!--script src="/path/to/js/{{ site.data.egjs.subComponents[0].distPath }}{{ distFile }}"></script-->
<script src="//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ distFile }}"></script>
```

[Download link](//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ distFile }})

### Usage 

#### 1. Set up your Container Element

Your container element's dimensions should be defined.

``` html
<div id="myPanoViewer"></div>
```

#### 2. Import Module

##### ES5

```js
// Use global namespace
var PanoViewer = eg.view360.PanoViewer;
```

##### ES6+

```js
// Or use es6 import
import {PanoViewer} from "@egjs/view360";
```

#### 3. Initialize PanoViewer
```js

// create PanoViewer with option
const panoViewer = new PanoViewer(
  document.getElementById("myPanoViewer"),
  {
    image: "/path/to/image/image.jpg"
  }
);
```

For more information about API, please visit the **[link](//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/release/latest/doc/eg.view360.PanoViewer.html)**.