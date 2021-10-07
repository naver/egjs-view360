<template>
  <div>
    <button @click="rerender">Force Rerender</button>
    <pano-viewer
      id="viewer"
      ref="pano"
      :tag="'div'"
      :video="'https://naver.github.io/egjs-view360/examples/img/equi.mp4'"
      @ready="updateVideo"
    >
      <div class="overlay" @click="play" :class="{ hidden: !overlay }">
        Click to play
      </div>
    </pano-viewer>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      overlay: true
    }
  },
  methods: {
    rerender() {
      this.$forceUpdate();

    },
    play() {
      this.$refs.pano.getVideo().play();

      this.overlay = false;
    },
    updateVideo() {
      const video = this.$refs.pano.getVideo();
      video.loop = true;
    }
  }
})
</script>
<style>
#viewer {
  width: 400px;
  height: 400px;
  position: absolute;
}
.overlay {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay.hidden {
  display: none;
}
</style>
