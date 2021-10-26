<script lang="ts">
import { PanoViewer } from "../../src";

let counter = 0;
let image = 1;
let pano: PanoViewer;

$: src = `https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube${image}.jpg`;

function rerender() {
  counter += 1;
}
function toggleImage() {
  image = image === 1 ? 2 : 1;
}
function fullscreen() {
  pano.getElement().requestFullscreen();
}
</script>

<button on:click={rerender}>Force Rerender</button>
<button on:click={toggleImage}>Change Image</button>
<button on:click={fullscreen}>Fullscreen</button>
<PanoViewer
  class="viewer"
  bind:this={pano}
  image={src}
  useZoom={false}
  projectionType="cubemap"
  cubemapConfig={{ tileConfig: { flipHorizontal: true, rotation: 0 } }}
  canvasClass="some-other-canvas"
/>
<span>{counter}</span>
