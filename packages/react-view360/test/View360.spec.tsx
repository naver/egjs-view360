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
});
