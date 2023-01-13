<script lang="ts">
  import {
    onMount,
    onDestroy,
    createEventDispatcher
  } from "svelte";
  import VanillaView360, {
    EVENTS,
    DEFAULT_CLASS
  } from "@egjs/view360";

  // @ts-ignore
  __DECLARE_PROPS__

  const dispatch = createEventDispatcher();
  const view360OptionNames = Object.getOwnPropertyNames(VanillaView360.prototype)
    .filter(name => {
      const descriptor = Object.getOwnPropertyDescriptor(VanillaView360.prototype, name);

      if (name.startsWith("_")) return false;
      if (descriptor?.value) return false;

      return true;
    });

  const view360SetterNames = view360OptionNames.filter(name => {
    const descriptor = Object.getOwnPropertyDescriptor(VanillaView360.prototype, name);

    return !!descriptor!.set;
  });

  export let canvasClass: string = "";
  export let view360: VanillaView360 | null = null;
  let containerEl: HTMLElement;
  let prevProps = getSetterProps();

  $: containerClass = `${DEFAULT_CLASS.CONTAINER} ${$$props.class ?? ""}`.trim();
  $: canvasClass = `${DEFAULT_CLASS.CANVAS} ${$$props.canvasClass ?? ""}`.trim();

  // On props change
  $: {
    if (view360) {
      view360SetterNames.forEach(name => {
        const oldProp = prevProps[name];
        const newProp = $$props[name];

        if (newProp !== oldProp) {
          view360![name] = newProp;
        }
      });
      prevProps = getSetterProps();
    }
  }

  onDestroy(() => {
    view360?.destroy();
  });

  onMount(() => {
    view360 = new VanillaView360(containerEl, $$props);

    Object.keys(EVENTS).forEach(key => {
      const eventName = EVENTS[key];

      view360!.on(eventName, e => {
        dispatch(eventName, e);
      });
    });
  });

  export function getElement() {
    return containerEl;
  }

  function getSetterProps() {
    return view360SetterNames.reduce((props, name) => {
      props[name] = $$props[name];

      return props;
    }, {});
  }
</script>

<svelte:options accessors={true} />
<div bind:this={containerEl} {...$$restProps} class={containerClass}>
  <canvas class={canvasClass}></canvas>
  <slot />
</div>
