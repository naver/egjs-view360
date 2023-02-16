<script lang="ts">
import { onMount } from "svelte";
import View360, { CubemapProjection, EquirectProjection, Projection } from "../src";
import "@egjs/view360/css/view360.css";

let projection: Projection = new CubemapProjection({
  src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
});

let view360: View360;

function changeProjection() {
  projection = new EquirectProjection({
    src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
  })
}
</script>

<View360 bind:this={view360} class="is-16by9" projection={projection} />
<button on:click={changeProjection}></button>
