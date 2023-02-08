import { createView360 } from "./test-utils";

describe("Vue-View360", () => {
  it("can be created", async () => {
    try {
      await createView360();
    } catch (err) {
      console.error(err);
      chai.expect("should not reach here").to.be.true;
    }
  });
});
