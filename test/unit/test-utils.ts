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

  const view3D = new View360(container, restOptions);

  (window as any).instances.push(view3D);

  if (!view3D.autoInit || !view3D.projection) return view3D;

  return new Promise(resolve => {
    view3D.once(EVENTS.READY, () => {
      resolve(view3D);
    });
  });
};

export const wait = (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

