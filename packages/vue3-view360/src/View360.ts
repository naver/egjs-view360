/**
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { defineComponent, h } from "vue";
import VanillaView360, {
  DEFAULT_CLASS,
  EVENTS,
  getValidProps,
  withMethods
} from "@egjs/view360";

import { View360Props } from "./types";
import { VUE_VIEW360_EVENTS, VUE_VIEW360_METHODS } from "./const";

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
}, {}) as Omit<View360Props, "tag" | "canvasClass">;

const view360SetterNames = view360OptionNames.filter(name => {
  const descriptor = Object.getOwnPropertyDescriptor(VanillaView360.prototype, name);

  return !!descriptor!.set;
});

const View360 = defineComponent({
  props: {
    ...view360Options,
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
  data() {
    return {
      view360: null
    } as {
      view360: VanillaView360 | null;
    };
  },
  methods: {
    ...VUE_VIEW360_METHODS
  },
  created() {
    withMethods(this, "view360");
  },
  mounted() {
    const props = getValidProps(this.$props);

    this.view360 = new VanillaView360(
      this.$refs.container as HTMLElement,
      props
    );
    const events = Object.keys(EVENTS).map(key => (EVENTS as any)[key]);

    events.forEach(eventName => {
      this.view360!.on(eventName, (e: any) => {
        e.target = this;

        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  },
  beforeUnmount() {
    this.view360?.destroy();
  },
  emits: {
    ...VUE_VIEW360_EVENTS
  },
  render() {
    const canvasClass = this.canvasClass ?? "";
    const canvasClassName = `${DEFAULT_CLASS.CANVAS} ${canvasClass}`.trim();

    return h(this.tag, {
      ref: "container",
      class: DEFAULT_CLASS.CONTAINER
    }, [
      h("canvas", { class: canvasClassName }),
      this.$slots.default?.()
    ]);
  },
  watch: {
    ...view360SetterNames.reduce((setters, name) => {
      setters[`$props.${name}`] = {
        handler(newVal: any) {
          if (!this.view360) return;
          this.view360[name] = newVal;
        },
        deep: true
      };
      return setters;
    }, {} as Record<string, any>)
  }
});

interface View360 extends VanillaView360 {}

export default View360;
