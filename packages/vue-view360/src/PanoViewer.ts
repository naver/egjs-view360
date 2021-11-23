/* eslint-disable @typescript-eslint/ban-types */
import Vue, { CreateElement } from "vue";
import {
  PanoViewer as VanillaPanoViewer,
  PANOVIEWER_OPTIONS,
  PANOVIEWER_EVENTS,
  withPanoViewerMethods,
  updatePanoViewer,
  getValidProps,
  generateCanvasKey,
  DEFAULT_CANVAS_CLASS
} from "@egjs/view360";

import { PanoViewerProps } from "./types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const PropDefintion = Object.keys(PANOVIEWER_OPTIONS).reduce((props, optionName) => {
  props[optionName] = null;
  return props;
}, {}) as any;

export default Vue.extend<{
  _prevProps: PanoViewerProps;
  _vanillaPanoViewer: VanillaPanoViewer;
  _canvasKey: number;
}, {}, {}, PanoViewerProps>({
  props: {
    ...PropDefintion,
    tag: {
      type: String,
      required: false,
      default: "div"
    }
  },
  created() {
    this._canvasKey = -1;
  },
  mounted() {
    const props = getValidProps(this.$props) as PanoViewerProps;

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

    panoViewer?.destroy();
  },
  updated() {
    this.$emit("updated");
  },
  watch: {
    $props: {
      handler() {
        const panoViewer = this._vanillaPanoViewer;
        if (!panoViewer) return;

        const nextProps = getValidProps(this.$props) as PanoViewerProps;
        const prevProps = this._prevProps;

        if ((nextProps.image != null && nextProps.image !== prevProps.image)
          || (nextProps.video != null && nextProps.video !== prevProps.video)) {
          this._canvasKey = generateCanvasKey(this._canvasKey);
          this.$forceUpdate();

          // Update after render
          this.$once("updated", () => {
            updatePanoViewer(panoViewer, nextProps, prevProps);
          });
        } else {
          // Update immediately
          updatePanoViewer(panoViewer, nextProps, prevProps);
        }

        this._prevProps = nextProps;
      },
      deep: true,
      immediate: true
    }
  },
  render(h: CreateElement) {
    const canvasClass = this.canvasClass ?? DEFAULT_CANVAS_CLASS;

    return h(this.tag, { ref: "container" },
      [
        h("canvas", { staticClass: canvasClass, key: this._canvasKey }),
        this.$slots.default
      ]
    );
  }
});
