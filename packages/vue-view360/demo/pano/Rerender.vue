<template>
  <div>
    <button @click="rerender">Force Rerender</button>
    <button @click="toggleImage">Change Image</button>
    <button @click="fullscreen">Fullscreen</button>
    <pano-viewer
      id="viewer"
      ref="pano"
      :tag="'div'"
      :image="src"
      :useZoom="false"
      :projectionType="'cubemap'"
      :cubemapConfig="{ tileConfig: { flipHorizontal: true, rotation: 0 } }"
      :canvasClass="'some-other-canvas'"
      />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      image: 1
    }
  },
  computed: {
    src() {
      return `https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube${this.image}.jpg`;
    }
  },
  methods: {
    rerender() {
      this.$forceUpdate();
    },
    toggleImage() {
      this.image = this.image === 1 ? 2 : 1;
    },
    fullscreen() {
      this.$refs.pano.$el.requestFullscreen();
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
</style>
