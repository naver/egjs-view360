<script lang="ts">
let viewer: SpinViewer;
let scale = 1;

function spin() {
  viewer.spinBy(720, { duration: 500 });
}

function changeScale() {
  scale = scale === 1 ? 5 : 1;
}
</script>
<SpinViewer
  id="spin"
  bind:this={viewer}
  imageUrl="https://naver.github.io/egjs-view360/common/img/spinviewer/spin_demo.jpg"
  rowCount={47}
  wrapperClass="im-wrapper"
  imageClass="im-image"
  scale={scale}
/>
<button on:click={spin}>spin</button>
<button on:click={changeScale}>change scale</button>
