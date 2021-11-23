/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { defineComponent, PropType, h } from "vue";
import {
  PanoViewer as VanillaPanoViewer,
  PanoViewerOptions,
  PANOVIEWER_OPTIONS,
  PANOVIEWER_EVENTS,
  withPanoViewerMethods,
  updatePanoViewer,
  getValidProps,
  generateCanvasKey,
  DEFAULT_CANVAS_CLASS
} from "@egjs/view360";
import Component from "@egjs/component";

import { PanoViewerProps } from "./types";

type PropTypes = {
  [key in keyof PanoViewerOptions]: {
    type: PropType<PanoViewerOptions[key]>;
  }
};

const panoOptions = Object.keys(PANOVIEWER_OPTIONS).reduce((propObj, optionName) => {
  propObj[optionName] = null;
  return propObj;
}, {} as {[key: string]: any}) as PropTypes;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PanoViewer = defineComponent({
  props: {
    ...panoOptions,
    tag: {
      type: String,
      required: false,
      default: "div"
    }
  },
  data() {
    return {
      canvasKey: -1
    } as {
      canvasKey: number;
      prevProps: PanoViewerProps;
      vanillaPanoViewer: VanillaPanoViewer;
      updateEmitter: Component<{ updated: void }>;
    };
  },
  mounted() {
    const props = getValidProps(this.$props) as PanoViewerProps;

    this.updateEmitter = new Component();
    this.vanillaPanoViewer = new VanillaPanoViewer(
      this.$refs.container as HTMLElement,
      props
    );

    withPanoViewerMethods(this, "vanillaPanoViewer");
    this.prevProps = props;

    const panoViewer = this.vanillaPanoViewer;
    const events = (Object.keys(PANOVIEWER_EVENTS) as Array<keyof typeof PANOVIEWER_EVENTS>)
      .map(key => PANOVIEWER_EVENTS[key]);

    events.forEach(eventName => {
      panoViewer.on(eventName, (e: any) => {
        e.currentTarget = this;

        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  },
  beforeDestroy() {
    const panoViewer = this.vanillaPanoViewer;

    panoViewer?.destroy();
  },
  updated() {
    this.updateEmitter.trigger("updated");
  },
  watch: {
    $props: {
      handler() {
        const panoViewer = this.vanillaPanoViewer as VanillaPanoViewer;
        if (!panoViewer) return;

        const nextProps = getValidProps(this.$props) as PanoViewerProps;
        const prevProps = this.prevProps;

        if ((nextProps.image != null && nextProps.image !== prevProps.image)
          || (nextProps.video != null && nextProps.video !== prevProps.video)) {
          this.canvasKey = generateCanvasKey(this.canvasKey);
          this.$forceUpdate();

          // Update after render
          this.updateEmitter.once("updated", () => {
            updatePanoViewer(panoViewer, nextProps, prevProps);
          });
        } else {
          // Update immediately
          updatePanoViewer(panoViewer, nextProps, prevProps);
        }

        this.prevProps = nextProps;
      },
      deep: true,
      immediate: true
    }
  },
  render() {
    const canvasClass = this.canvasClass ?? DEFAULT_CANVAS_CLASS;

    return h(this.tag, { ref: "container" },
      [
        h("canvas", { class: canvasClass, key: this.canvasKey }),
        this.$slots.default?.()
      ]
    );
  }
});

export default PanoViewer;
