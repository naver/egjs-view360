import {util} from "../../../src/utils/math-util";

describe("mathUtil", function() {
	describe("util", function() {
		it("#isPowerOfTwo", () => {
            // Given & When & Then
            expect(util.isPowerOfTwo(256)).to.be.equal(true);
            expect(util.isPowerOfTwo(512)).to.be.equal(true);
            expect(util.isPowerOfTwo(1024)).to.be.equal(true);
            expect(util.isPowerOfTwo(2048)).to.be.equal(true);
            expect(util.isPowerOfTwo(2048)).to.be.equal(true);
            expect(util.isPowerOfTwo(4096)).to.be.equal(true);
            expect(util.isPowerOfTwo(1000)).to.be.equal(false);
        });

        it.skip("#extractPitchFromQuat", () => {
            // Given & When & Then
        });
    });
});
