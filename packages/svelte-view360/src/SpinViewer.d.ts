/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { SpinViewer as VanillaSpinViewer, SpinViewerOptions, SpinViewerEvent } from "@egjs/view360";

interface SpinViewerProps extends Partial<SpinViewerOptions>, Omit<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]>, "width" | "height"> {}

declare class SpinViewer extends SvelteComponentTyped<
  SpinViewerProps,
  SpinViewerEvent,
  { default: {}; }
> {}

interface SpinViewer extends VanillaSpinViewer {}

export default SpinViewer;
