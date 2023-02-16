<script lang="ts">
import { EquirectProjection, Projection, ReadyEvent } from "@egjs/view360";
import { defineComponent, onMounted, ref } from "vue";
import { View360, CubemapProjection } from "../src/index";

export default defineComponent({
  setup() {
    const view360 = ref<View360>();
    const projection = ref<Projection>(new CubemapProjection({
      src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
    }));

    onMounted(() => {
      console.log(view360.value!.initialized);
    });

    function changeProjection() {
      projection.value = new EquirectProjection({
        src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
      })
    }

    function onReady(evt: ReadyEvent) {
      console.log("ready", evt.target.fov);
    }

    return {
      view360,
      projection,
      changeProjection,
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
    <button @click="changeProjection">CLICK ME</button>
  </div>
</template>
