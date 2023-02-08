import { createView360 } from "test-utils";
import { EquirectProjection } from "~/projection";

describe("View360", () => {
  it("can be created", async () => {
    try {
      await createView360();
    } catch (err) {
      expect(err, "should not reach here").to.be.true;
    }
  });

  describe("Default Options", () => {
    const expectDefaultVal = (option: string, val: any) => {
      describe(option, () => {
        it(`should use ${val} as the default value`, async () => {
          expect((await createView360())[option]).to.equal(val);
        });
      });
    };

    expectDefaultVal("projection", null);
    expectDefaultVal("autoInit", true);
    expectDefaultVal("autoResize", true);
    expectDefaultVal("canvasSelector", "canvas");
    expectDefaultVal("useResizeObserver", true);
    expectDefaultVal("tabIndex", 0);
    expectDefaultVal("maxDeltaTime", 1 / 30);
    expectDefaultVal("debug", false);

    // Camera options
    expectDefaultVal("initialYaw", 0);
    expectDefaultVal("initialPitch", 0);
    expectDefaultVal("initialZoom", 1);
    expectDefaultVal("yawRange", null);
    expectDefaultVal("pitchRange", null);
    expectDefaultVal("zoomRange", null);
    expectDefaultVal("fov", 90);

    // Control options
    expectDefaultVal("useGrabCursor", true);
    expectDefaultVal("scrollable", true);
    expectDefaultVal("wheelScrollable", false);
    expectDefaultVal("disableContextMenu", false);
  });

  describe("Methods", () => {
    describe("resize", () => {
      it("should trigger 'resize' event", async () => {
        const view360 = await createView360({
          // Can't resize before init
          projection: new EquirectProjection({
            src: "/pano/equirect/equi.jpg"
          })
        });
        const resizeSpy = sinon.spy();

        view360.on("resize", resizeSpy);
        view360.resize();

        expect(resizeSpy.calledOnce).to.be.true;
      });
    });
  });
});
