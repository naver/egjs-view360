/* eslint-disable @typescript-eslint/ban-types */
import { defineComponent, PropType, h } from "vue";
import {
  SpinViewer as VanillaSpinViewer,
  SpinViewerOptions,
  SPINVIEWER_EVENTS,
  SPINVIEWER_OPTIONS,
  withSpinViewerMethods,
  getValidProps,
  DEFAULT_WRAPPER_CLASS,
  DEFAULT_IMAGE_CLASS
} from "@egjs/view360";

type PropTypes = {
  [key in keyof SpinViewerOptions]: {
    type: PropType<SpinViewerOptions[key]>;
  }
};

const spinOptions = Object.keys(SPINVIEWER_OPTIONS).reduce((propObj, optionName) => {
  propObj[optionName] = null;
  return propObj;
}, {} as {[key: string]: any}) as PropTypes;

export default defineComponent({
  props: {
    ...spinOptions,
    tag: {
      type: String,
      required: false,
      default: "div"
    }
  },
  data() {
    return {} as {
      vanillaSpinViewer: VanillaSpinViewer;
    };
  },
  mounted() {
    const props = getValidProps(this);

    this.vanillaSpinViewer = new VanillaSpinViewer(
      this.$refs.container as HTMLElement,
      props
    );

    withSpinViewerMethods(this, "vanillaSpinViewer");

    const spinViewer = this.vanillaSpinViewer;
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
      this.vanillaSpinViewer?.setScale(newVal);
    }
  },
  render() {
    const wrapperClass = this.wrapperClass ?? DEFAULT_WRAPPER_CLASS;
    const imageClass = this.imageClass ?? DEFAULT_IMAGE_CLASS;

    return h(this.tag, { ref: "container" }, [
      h("div", { class: wrapperClass }, [
        h("img", { class: imageClass })
      ]),
      this.$slots.default?.()
    ]);
  }
});
