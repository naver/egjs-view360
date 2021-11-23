/* eslint-disable @typescript-eslint/ban-types */
import Vue, { CreateElement } from "vue";
import {
  SpinViewer as VanillaSpinViewer,
  SPINVIEWER_EVENTS,
  SPINVIEWER_OPTIONS,
  withSpinViewerMethods,
  getValidProps,
  DEFAULT_WRAPPER_CLASS,
  DEFAULT_IMAGE_CLASS
} from "@egjs/view360";

import { SpinViewerProps } from "./types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const PropDefintion = Object.keys(SPINVIEWER_OPTIONS).reduce((props, optionName) => {
  props[optionName] = null;
  return props;
}, {}) as any;

export default Vue.extend<{
  _vanillaSpinViewer: VanillaSpinViewer;
}, {}, {}, SpinViewerProps>({
  props: {
    ...PropDefintion,
    tag: {
      type: String,
      required: false,
      default: "div"
    }
  },
  mounted() {
    const props = getValidProps(this.$props);

    this._vanillaSpinViewer = new VanillaSpinViewer(
      this.$refs.container as HTMLElement,
      props
    );

    withSpinViewerMethods(this, "_vanillaSpinViewer");

    const spinViewer = this._vanillaSpinViewer;
    const events = Object.keys(SPINVIEWER_EVENTS).map(key => SPINVIEWER_EVENTS[key]);

    events.forEach(eventName => {
      spinViewer.on(eventName, (e: any) => {
        e.currentTarget = this;

        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  },
  watch: {
    scale(newVal) {
      this._vanillaSpinViewer?.setScale(newVal);
    }
  },
  render(h: CreateElement) {
    const wrapperClass = this.wrapperClass ?? DEFAULT_WRAPPER_CLASS;
    const imageClass = this.imageClass ?? DEFAULT_IMAGE_CLASS;

    return h(this.tag, { ref: "container" }, [
      h("div", { staticClass: wrapperClass }, [
        h("img", { staticClass: imageClass })
      ]),
      this.$slots.default
    ]);
  }
});
