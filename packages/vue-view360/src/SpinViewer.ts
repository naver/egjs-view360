/* eslint-disable @typescript-eslint/ban-types */
import Vue, { CreateElement } from "vue";
import {
  SpinViewer as VanillaSpinViewer,
  SPINVIEWER_EVENTS,
  SPINVIEWER_OPTIONS,
  withSpinViewerMethods
} from "~/index";

import { getProps } from "./utils";
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
    const props = getProps(this);

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
    return h(this.tag, { ref: "container" }, this.$slots.default);
  }
});
