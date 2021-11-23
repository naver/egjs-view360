<template>
  <div>
    <spin-viewer id="spin" ref="viewer"
      :imageUrl="'https://naver.github.io/egjs-view360/common/img/spinviewer/spin_demo.jpg'"
      :rowCount="47"
      :scale="1"
    />
      <button @click="spin">spin</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    spin() {
      this.$refs.viewer.spinBy(720, { duration: 500 });
    }
  }
})
</script>
<style>
#spin {
  max-width: 400px;
  position: relative;
}
.view360-image {
  left: 0;
}
</style>
