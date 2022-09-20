/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { EventKey, EventMap } from "./utils";

interface Emittable<T extends EventMap> {
  trigger<K extends EventKey<T>>(event: K, param: Omit<T[K], "target">): this;
}

export default Emittable;
