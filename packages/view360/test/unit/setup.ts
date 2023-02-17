import { cleanup } from "./test-utils";

(window as any).instances = [];

afterEach(() => {
  (window as any).instances.forEach(view360 => {
    view360.destroy();
  });
  (window as any).instances = [];

  cleanup();
});

