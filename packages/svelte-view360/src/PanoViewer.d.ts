/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { PanoViewer as VanillaPanoViewer, PanoViewerOptions, PanoViewerEvent } from "@egjs/view360";

interface PanoViewerProps extends Partial<PanoViewerOptions>, Omit<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]>, "width" | "height"> {}

declare class PanoViewer extends SvelteComponentTyped<
  PanoViewerProps,
  PanoViewerEvent,
  { default: {}; }
> {}

interface PanoViewer extends VanillaPanoViewer {}

export default PanoViewer;
