/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Vue, { CreateElement, isProxy } from "vue";
import VanillaView360, {
  DEFAULT_CLASS,
  EVENTS,
  getValidProps,
  withMethods
} from "@egjs/view360";

import { View360Props } from "./types";

const view360OptionNames = Object.getOwnPropertyNames(VanillaView360.prototype)
  .filter(name => {
    const descriptor = Object.getOwnPropertyDescriptor(VanillaView360.prototype, name);

    if (name.startsWith("_")) return false;
    if (descriptor?.value) return false;

    return true;
  });

const view360Options = view360OptionNames.reduce((props, name) => {
  return {
    ...props,
    [name]: null
  };
}, {});

const view360SetterNames = view360OptionNames.filter(name => {
  const descriptor = Object.getOwnPropertyDescriptor(VanillaView360.prototype, name);

  return !!descriptor!.set;
});

export default Vue.extend<{
  _view360: VanillaView360;
}, {}, {}, View360Props>({
  props: {
    ...view360Options as any,
    tag: {
      type: String,
      required: false,
      default: "div"
    },
    canvasClass: {
      type: String,
      required: false,
      default: ""
    }
  },
  created() {
    withMethods(this, "_view360");
  },
  mounted() {
    const props = getValidProps(this.$props);

    if (props.projection && isProxy(props.projection)) {
      // props.projection = Object.assign({}, props.projection);
      console.log(props.projection);
    }

    this._view360 = new VanillaView360(
      this.$refs.container as HTMLElement,
      props
    );
    const events = Object.keys(EVENTS).map(key => EVENTS[key]);

    events.forEach(eventName => {
      this._view360.on(eventName, (e: any) => {
        e.target = this;

        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  },
  beforeDestroy() {
    this._view360?.destroy();
  },
  render(h: CreateElement) {
    const canvasClass = this.canvasClass ?? "";
    const canvasClassName = `${DEFAULT_CLASS.CANVAS} ${canvasClass}`.trim();

    return h(this.tag, {
      ref: "container",
      staticClass: DEFAULT_CLASS.CONTAINER
    }, [
      h("canvas", { staticClass: canvasClassName }),
      this.$slots.default
    ]);
  },
  watch: {
    ...view360SetterNames.reduce((setters, name) => {
      setters[`$props.${name}`] = {
        handler(newVal: any) {
          if (!this._view360) return;
          this._view360[name] = newVal;
        },
        deep: true
      };
      return setters;
    }, {} as Record<string, any>)
  }
});
