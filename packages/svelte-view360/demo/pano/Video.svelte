<script lang="ts">
  import PanoViewer from "../../src/PanoViewer";

  let pano: PanoViewer;
  let overlay = true;
  let children = [0, 1, 2, 3, 4];

  function addChild() {
    const last = children[children.length - 1];
    children = [...children, last + 1, last + 2];
  }

  function play() {
    pano.getVideo().play();

    overlay = false;
  }
</script>

<button on:click={addChild}>Increase Children</button>
<PanoViewer
  class="viewer"
  bind:this={pano}
  video="https://naver.github.io/egjs-view360/examples/img/equi.mp4"
>
  <div class="overlay" on:click={play} class:hidden={ !overlay }>
    Click to play
  </div>
  {#each children as item, index}
    <li>{index + 1}: {item}</li>
  {/each}
</PanoViewer>
