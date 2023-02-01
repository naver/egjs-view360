import View360, { View360Options } from "~/View360";
import { EVENTS } from "~/const/external";

export const createSandbox = (id: string = ""): HTMLElement => {
  const tmp = document.createElement("div");

  tmp.className = "_tempSandbox_";
  tmp.id = id;

  document.body.appendChild(tmp);

  return tmp;
};

export const cleanup = () => {
  const elements: HTMLElement[] = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode!.removeChild(v);
  });
};

export const wait = (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

export const createView360 = async (options: Partial<View360Options & { children: HTMLElement[] }> = {}): Promise<View360> => {
  const sandbox = createSandbox(`${Date.now()}`);
  const container = document.createElement("div");
  const canvas = document.createElement("canvas");

  container.classList.add("view360-container");
  canvas.classList.add("view360-canvas");

  container.appendChild(canvas);
  sandbox.appendChild(container);

  const { children = [], ...restOptions } = options;

  children.forEach(el => {
    container.appendChild(el);
  });

  const view360 = new View360(container, restOptions);

  (window as any).instances.push(view360);

  if (!view360.autoInit || !view360.projection) return view360;

  return new Promise(resolve => {
    view360.once(EVENTS.READY, () => {
      resolve(view360);
    });
  });
};

