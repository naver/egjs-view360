import { cleanup } from "./test-utils";

(window as any).instances = [];

afterEach(() => {
  (window as any).instances.forEach(view3D => {
    view3D.destroy();
  });
  (window as any).instances = [];

  cleanup();
});

