import Component from "@egjs/component";
import Agent from "@egjs/agent";

const agent = Agent();
const isIE11 = agent.browser.name === "ie" && agent.browser.version === "11.0";

const EVENTS = {
	ERROR: "error"
};

/**
 *
 * Extends Component for firing errors occurs internally.
 */
export default class Renderer extends Component {
	static EVENTS = EVENTS;
	constructor() {
		super();

		this._pixelCanvas = null;
		this._pixelContext = null;
	}
	// Define interface for Renderers
	/**
	 * Following MUST BE DEFINED on Child of Renderer
	 *
	 * DATA
	 *
	 *  - getVertexPositionData
	 *  - getIndexData
	 *  - getTextureCoordData
	 *
	 * SOURCE
	 *
	 *  - getVertexShaderSource
	 *  - getFragmentShaderSource
	 *
	 * TEXTURE
	 *
	 *  - bindTexture
	 */
	getDimension(pixelSource) {
		const width = pixelSource.naturalWidth || pixelSource.videoWidth;
		const height = pixelSource.naturalHeight || pixelSource.videoHeight;

		return {width, height};
	}

	_initPixelSource(image) {
		if (!isIE11 || !(image instanceof HTMLVideoElement)) {
			return;
		}

		const {width, height} = this.getDimension(image);

		this._pixelCanvas = document.createElement("canvas");
		this._pixelCanvas.width = width;
		this._pixelCanvas.height = height;
		this._pixelContext = this._pixelCanvas.getContext("2d");
	}

	_getPixelSource(image) {
		if (!this._pixelCanvas) {
			return image;
		}

		/**
		 * IE11 && Video
		 */
		const {width, height} = this.getDimension(image);

		if (this._pixelCanvas.width !== width) {
			this._pixelCanvas.width = width;
		}

		if (this._pixelCanvas.height !== height) {
			this._pixelCanvas.height = height;
		}

		this._pixelContext.drawImage(image, 0, 0);

		return this._pixelCanvas;
	}

	_extractTileConfig(imageConfig) {
		let tileConfig =
			Array.isArray(imageConfig.tileConfig) ?
				imageConfig.tileConfig : Array(...Array(6)).map(() => imageConfig.tileConfig);

		tileConfig = tileConfig.map(
			config => Object.assign({
				flipHorizontal: false,
				rotation: 0
			}, config)
		);

		return tileConfig;
	}

	_triggerError(error) {
		/* eslint-disable no-console */
		console.error("Renderer Error:", error);
		/* eslint-enable no-console */

		this.trigger(EVENTS.ERROR, {
			message: typeof error === "string" ? error : error.message
		});
	}
}
