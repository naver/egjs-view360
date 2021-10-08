/* eslint-disable @typescript-eslint/ban-types */
import Vue, { CreateElement } from "vue";
import {
  PanoViewer as VanillaPanoViewer,
  PANOVIEWER_OPTIONS,
  PANOVIEWER_EVENTS,
  withPanoViewerMethods,
  updatePanoViewer,
  DEFAULT_CANVAS_CLASS
} from "@egjs/view360";

import { getProps } from "./utils";
import { PanoViewerProps } from "./types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const PropDefintion = Object.keys(PANOVIEWER_OPTIONS).reduce((props, optionName) => {
  props[optionName] = null;
  return props;
}, {}) as any;

export default Vue.extend<{
  _prevProps: PanoViewerProps;
  _vanillaPanoViewer: VanillaPanoViewer;
}, {}, {}, PanoViewerProps>({
  props: {
    ...PropDefintion,
    tag: {
      type: String,
      required: false,
      default: "div"
    }
  },
  mounted() {
    const props = getProps(this) as PanoViewerProps;

    this._vanillaPanoViewer = new VanillaPanoViewer(
      this.$refs.container as HTMLElement,
      props
    );

    withPanoViewerMethods(this, "_vanillaPanoViewer");
    this._prevProps = props;

    const panoViewer = this._vanillaPanoViewer;
    const events = Object.keys(PANOVIEWER_EVENTS).map(key => PANOVIEWER_EVENTS[key]);

    events.forEach(eventName => {
      panoViewer.on(eventName, (e: any) => {
        e.currentTarget = this;

        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  },
  beforeDestroy() {
    const panoViewer = this._vanillaPanoViewer;

    // Turn off video if it has one
    const video = panoViewer?.getVideo();
    if (video) {
      video.pause();
    }

    panoViewer?.destroy();
  },
  watch: {
    $props: {
      handler() {
        const panoViewer = this._vanillaPanoViewer;
        if (!panoViewer) return;

        const props = getProps(this) as PanoViewerProps;
        const prevProps = this._prevProps;

        updatePanoViewer(panoViewer, props, prevProps);

        this._prevProps = props;
      },
      deep: true,
      immediate: true
    }
  },
  render(h: CreateElement) {
    const canvasClass = this.canvasClass ?? DEFAULT_CANVAS_CLASS;

    return h(this.tag, { ref: "container" },
      [
        h("canvas", { staticClass: canvasClass }),
        this.$slots.default
      ]
    );
  }
});
