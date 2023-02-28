<template>
  <div>
    <View360 :projection="projection" />
  </div>
</template>
<script>
import { View360, EquirectProjection } from "../src/index";

export default {
  created() {
    this.projection = new EquirectProjection({
      src: "https://iili.io/HGJXXr7.jpg"
    });
  },
  components: {
    View360
  }
}
</script>
