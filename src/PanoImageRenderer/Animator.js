import {IS_SAFARI_ON_DESKTOP} from "../utils/browser";

export default class Animator {
	constructor() {
		this._callback = null;
		this._context = window;
		this._rafId = -1;
		this._rafTimer = -1;
	}

	setCallback(callback) {
		this._callback = callback;
	}

	setContext(context) {
		this._context = context;
	}

	start() {
		const context = this._context;
		const callback = this._callback;

		// No context / callback set
		if (!context || !callback) return;
		// Animation already started
		if (this._rafId >= 0 || this._rafTimer >= 0) return;

		if (IS_SAFARI_ON_DESKTOP) {
			this._rafId = context.requestAnimationFrame(this._onLoopNextTick);
		} else {
			this._rafId = context.requestAnimationFrame(this._onLoop);
		}
	}

	stop() {
		if (this._rafId >= 0) {
			this._context.cancelAnimationFrame(this._rafId);
		}

		if (this._rafTimer >= 0) {
			clearTimeout(this._rafTimer);
		}

		this._rafId = -1;
		this._rafTimer = -1;
	}

	/**
	 * There can be more than 1 argument when we use XRSession's raf
	 */
	_onLoop = (...args) => {
		this._callback(...args);
		this._rafId = this._context.requestAnimationFrame(this._onLoop);
	}

	/**
	 * MacOS X Safari Bug Fix
	 * This code guarantees that rendering should be occurred.
	 *
	 * In MacOS X(10.14.2), Safari (12.0.2)
	 * The requestAnimationFrame(RAF) callback is called just after previous RAF callback without term
	 * only if requestAnimationFrame is called for next frame while updating frame is delayed (~over 2ms)
	 * So browser cannot render the frame and may be freezing.
	 */
	_onLoopNextTick = (...args) => {
		const before = performance.now();

		this._callback(...args);

		const diff = performance.now() - before;

		if (this._rafTimer >= 0) {
			clearTimeout(this._rafTimer);
			this._rafTimer = -1;
		}

		/** Use requestAnimationFrame only if current rendering could be possible over 60fps (1000/60) */
		if (diff < 16) {
			this._rafId = this._context.requestAnimationFrame(this._onLoop);
		} else {
			/** Otherwise, Call setTimeout instead of requestAnimationFrame to gaurantee renering should be occurred*/
			this._rafTimer = setTimeout(this._onLoop, 0);
		}
	}
}
