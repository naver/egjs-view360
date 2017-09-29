import Component from "@egjs/component";
import {toAxis} from "../utils";

export default class WheelInput extends Component {
	constructor(el, options) {
		super();
		this.element = el;

		this.options = Object.assign({
			scale: 1,
			threshold: 0,
		}, options);

		this._onWheel = this._onWheel.bind(this);
	}
	mapAxes(axes) {
		this.axes = axes;
	}
	connect(observer) {
		if (this.observer) {
			return this;
		}
		this.observer = observer;
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
	_onWheel(event) {
		event.preventDefault();

		if (event.deltaY === 0) {
			return;
		}

		this.observer.change(this, event, toAxis(this.axes, [
			(event.deltaY < 0 ? -1 : 1) * this.options.scale
		]));
	}
	_attachEvent() {
		this.element.addEventListener("wheel", this._onWheel, false);
	}
	_dettachEvent() {
		this.element.removeEventListener("wheel", this._onWheel, false);
	}
}
