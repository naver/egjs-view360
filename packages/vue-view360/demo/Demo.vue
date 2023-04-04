<template>
  <div class="wrapper">
    <View360
      ref="view360"
      class="is-1by1"
      :projection="projection"
      :plugins="plugins"
    />
  </div>
</template>
<script>
import { View360, EquirectProjection, ControlBar } from "../src";
import "@egjs/view360/css/view360.min.css";

export default {
  data() {
    return {
      projection: new EquirectProjection({
        src: "https://iili.io/HGJXXr7.jpg",
      }),
      plugins: [new ControlBar()],
    };
  },
  components: {
    View360,
  },
};
</script>
<style scoped>
.wrapper {
  width: 400px;
}
.inv {
  display: none;
}
</style>
