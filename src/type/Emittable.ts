import { EventKey } from "./utils";

interface Emittable<T> {
  trigger<K extends EventKey<T>>(event: K, param: Omit<T[K], "target">): this;
}

export default Emittable;
