import Rerender from "./pano/Rerender.vue";
import Video from "./pano/Video.vue";
import Spin from "./spin/Spin.vue";

export default {
  routes: [
    {
      path: "/rerender",
      name: "Rerender",
      component: Rerender
    },
    {
      path: "/video",
      name: "Video",
      component: Video
    },
    {
      path: "/spin",
      name: "Spin",
      component: Spin
    }
  ]
};
