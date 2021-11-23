<script lang="ts">
  import {
    onMount,
    onDestroy,
    afterUpdate,
    createEventDispatcher
  } from "svelte";
  import {
    PanoViewer as VanillaPanoViewer,
    PanoViewerOptions,
    PANOVIEWER_OPTIONS,
    PANOVIEWER_EVENTS,
    updatePanoViewer,
    DEFAULT_CANVAS_CLASS
  } from "@egjs/view360";
  import Component from "@egjs/component";

  // @ts-ignore
  __DECLARE_PANO_PROPS__

  const dispatch = createEventDispatcher();
  const updateEmitter = new Component<{ updated: void }>();

  export let vanillaPanoViewer: VanillaPanoViewer | null = null;
  let containerEl: HTMLElement;
  let prevProps: Partial<PanoViewerOptions>;
  let canvasKey = -1;

  $: canvasClass = $$props.canvasClass ?? DEFAULT_CANVAS_CLASS

  // On props change
  $: {
    if (vanillaPanoViewer) {
      // @ts-ignore
      const nextProps = __GET_PANO_PROPS__;

      if ((nextProps.image != null && nextProps.image !== prevProps.image)
        || (nextProps.video != null && nextProps.video !== prevProps.video)) {
        generateCanvasKey();

        updateEmitter.once("updated", () => {
          updatePanoViewer(vanillaPanoViewer!, nextProps, prevProps);
          prevProps = nextProps;
        });
      } else {
        updatePanoViewer(vanillaPanoViewer!, nextProps, prevProps);
        prevProps = nextProps;
      }
    }
  }

  onDestroy(() => {
    vanillaPanoViewer?.destroy();
  });

  onMount(() => {
    const options = getProps();

    prevProps = options;
    vanillaPanoViewer = new VanillaPanoViewer(containerEl, options);

    Object.keys(PANOVIEWER_EVENTS).forEach(key => {
      const eventName = PANOVIEWER_EVENTS[key];

      vanillaPanoViewer!.on(eventName, e => {
        dispatch(eventName, e);
      });
    });
  });

  afterUpdate(() => {
    updateEmitter.trigger("updated");
  });

  export function getElement() {
    return containerEl;
  }

  function getProps() {
    return Object.keys($$props).reduce((options, propName) => {
      if (propName in PANOVIEWER_OPTIONS) {
        options[propName] = $$props[propName];
      }

      return options;
    }, {} as PanoViewerOptions);
  }

  function generateCanvasKey() {
    const oldKey = canvasKey;
    let newKey: number;

    do {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      newKey = array[0];
    } while (newKey === oldKey);

    canvasKey = newKey;
  };
</script>

<svelte:options accessors={true} />
<div bind:this={containerEl} {...$$restProps}>
  {#key canvasKey}
    <canvas class={canvasClass}></canvas>
  {/key}
  <slot />
</div>
