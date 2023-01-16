<template>
  <div>
    <View360 :projection="projection" />
  </div>
</template>
<script>
import { View360, CubemapProjection } from "../src/index";

export default {
  created() {
    this.projection = new CubemapProjection({
      src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
    });
  },
  components: {
    View360
  }
}
</script>
