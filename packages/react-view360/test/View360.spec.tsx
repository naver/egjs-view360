import { EquirectProjection } from "../src";
import { createView360 } from "./test-utils";

describe("React-View360", () => {
  it("can be created", async () => {
    try {
      await createView360();
    } catch (err) {
      console.error(err);
      expect("should not reach here").toEqual(true);
    }
  });

  it("should have the given projection as its property", async () => {
    const projection = new EquirectProjection({ src: "SOME_URL" });
    const view360 = await createView360({ projection, autoInit: false });

    expect(view360.projection).toEqual(projection);
  });
});
