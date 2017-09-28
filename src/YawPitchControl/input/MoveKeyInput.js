import Component from "@egjs/component";
import {KEYMAP} from "../consts";
import {toAxis} from "../utils";

export default class MoveKeyInput extends Component {
	constructor(el, options) {
		super();
		this.element = el;

		this.options = Object.assign({
			scale: [1, 1],
			threshold: 0,
		}, options);

		this._onKeydown = this._onKeydown.bind(this);
	}
	mapAxes(axes) {
		this.axes = axes;
	}
	connect(observer) {
		if (this.observer) {
			return this;
		}
		this.observer = observer;

		// add tabindex="0" to the container for making it focusable
		if (this.element.getAttribute("tabindex") !== "0") {
			this.element.setAttribute("tabindex", "0");
		}

		this._attachEvent();
		return this;
	}
	disconnect() {
		if (!this.observer) {
			return this;
		}
		this.observer = null;
		this._dettachEvent();
		return this;
	}
	destroy() {
		this.disconnect();
		this.element = null;
		this.options = null;
		this.axes = null;
	}
	_onKeydown(event) {
		let handled = true;
		let offsets;
		const e = event;

		switch (e.keyCode) {
			case KEYMAP.LEFT_ARROW:
			case KEYMAP.A:
				offsets = [-this.options.scale[0], 0];
				break;
			case KEYMAP.RIGHT_ARROW:
			case KEYMAP.D:
				offsets = [this.options.scale[0], 0];
				break;
			case KEYMAP.UP_ARROW:
			case KEYMAP.W:
				offsets = [0, this.options.scale[1]];
				break;
			case KEYMAP.DOWN_ARROW:
			case KEYMAP.S:
				offsets = [0, -this.options.scale[1]];
				break;
			default:
				handled = false;
		}

		if (handled) {
			this.observer.change(this, event, toAxis(this.axes, offsets));
			// Suppress "double action" if event handled
			e.preventDefault();
		}
	}
	_attachEvent() {
		this.element.addEventListener("keydown", this._onKeydown, false);
	}
	_dettachEvent() {
		this.element.removeEventListener("keydown", this._onKeydown, false);
	}
}
