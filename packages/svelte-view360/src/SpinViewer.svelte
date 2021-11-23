<script lang="ts">
  import {
    onMount,
    createEventDispatcher
  } from "svelte";
  import {
    SpinViewer as VanillaSpinViewer,
    SpinViewerOptions,
    SPINVIEWER_EVENTS,
    SPINVIEWER_OPTIONS,
    DEFAULT_WRAPPER_CLASS,
    DEFAULT_IMAGE_CLASS
  } from "@egjs/view360";

  // @ts-ignore
  __DECLARE_SPIN_PROPS__

  $: {
    // @ts-ignore
    vanillaSpinViewer?.setScale(scale);
  }

  const dispatch = createEventDispatcher();

  export let vanillaSpinViewer: VanillaSpinViewer | null = null;
  let containerEl: HTMLElement;

  $: wrapperClass = $$props.wrapperClass ?? DEFAULT_WRAPPER_CLASS;
  $: imageClass = $$props.imageClass ?? DEFAULT_IMAGE_CLASS;

  onMount(() => {
    const options = getProps();

    vanillaSpinViewer = new VanillaSpinViewer(containerEl, options);

    Object.keys(SPINVIEWER_EVENTS).forEach(key => {
      const eventName = SPINVIEWER_EVENTS[key];

      vanillaSpinViewer!.on(eventName, e => {
        dispatch(eventName, e);
      });
    });
  });

  function getProps() {
    return Object.keys($$props).reduce((options, propName) => {
      if (propName in SPINVIEWER_OPTIONS) {
        options[propName] = $$props[propName];
      }

      return options;
    }, {} as SpinViewerOptions);
  }
</script>

<svelte:options accessors={true} />
<div bind:this={containerEl} {...$$restProps}>
  <div class={wrapperClass}>
    <img class={imageClass} />
  </div>
  <slot />
</div>
