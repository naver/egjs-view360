<script lang="ts">
import View360, { EquirectProjection, Projection } from "../src";
import "@egjs/view360/css/view360.css";

let projection: Projection = new EquirectProjection({
  src: "https://iili.io/HGJXXr7.jpg"
});

let view360: View360;

function changeProjection() {
  projection = new EquirectProjection({
    src: "https://iili.io/HGJXlmG.jpg"
  })
}
</script>

<View360 bind:this={view360} class="is-16by9" projection={projection} />
<button on:click={changeProjection}>CHANGE</button>
