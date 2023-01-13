/// <reference types="svelte" />

import { SvelteComponentTyped } from "svelte";
import VanillaView360, { View360Options, View360Events } from "@egjs/view360";

// @ts-ignore
interface View360Props extends Partial<View360Options>, svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  canvasClass?: string;
}

declare class View360 extends SvelteComponentTyped<
  View360Props,
  View360Events,
  { default: {}; }
> {}

interface View360 extends VanillaView360 {}

export default View360;
