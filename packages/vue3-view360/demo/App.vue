<script lang="ts">
import { ReadyEvent } from "@egjs/view360";
import { defineComponent, onMounted, ref } from "vue";
import { View360, CubemapProjection } from "../src/index";

export default defineComponent({
  setup() {
    const view360 = ref<View360>();
    const projection = new CubemapProjection({
      src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
    });

    onMounted(() => {
      console.log(view360.value!.initialized);
    });

    function onReady(evt: ReadyEvent) {
      console.log("ready", evt.target.fov);
    }

    return {
      view360,
      projection,
      onReady
    }
  },
  components: {
    View360
  }
})
</script>

<template>
  <div>
    <View360 :tab-index="1" :projection="projection" ref="view360" @ready="onReady"/>
  </div>
</template>
