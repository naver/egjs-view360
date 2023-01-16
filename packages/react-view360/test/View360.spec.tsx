import renderer from "react-test-renderer";
import { createView360 } from "./test-utils";

describe("React-View360", () => {
  it("can be created", async () => {
    try {
      await createView360();
    } catch (err) {
      expect(err, "should not reach here").to.be.true;
    }
  });
});
