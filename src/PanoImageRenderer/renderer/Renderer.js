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
class Renderer extends Component {
	static EVENTS = EVENTS;

	constructor() {
		super();

		this._forceDimension = null;
		this._pixelCanvas = null;
		this._pixelContext = null;
	}

	render({gl, shaderProgram, indexBuffer, mvMatrix, pMatrix}) {
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

		if (indexBuffer) {
			gl.drawElements(gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}
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

	/**
	 * Update data used by shader
	 * 	-
	 *
	 *
	 * @param {*} param
	 */
	updateShaderData(param) {
		/*
		* Update following data in implementation layer.
		* If the data is not changed, it does not need to implement this function.
		*
		* - _VERTEX_POSITION_DATA
		* - _TEXTURE_COORD_DATA
		* - _INDEX_DATA
		*/
	}

	/**
	 *
	 * @param {HTMLImageElement | HTMLVideoElement} image
	 * @param {Object = {width, height}} forceDimension Forced dimension to resize
	 */
	_initPixelSource(image, forceDimension) {
		const isIE11Video = isIE11 && (image instanceof HTMLVideoElement);

		if (isIE11Video || forceDimension) {
			const {width, height} = forceDimension || this.getDimension(image);

			this._pixelCanvas = document.createElement("canvas");
			this._pixelCanvas.width = width;
			this._pixelCanvas.height = height;
			this._pixelContext = this._pixelCanvas.getContext("2d");
		}
		this._forceDimension = forceDimension;
	}

	_getPixelSource(image) {
		if (!this._pixelCanvas) {
			return image;
		}

		/**
		 * IE11 && Video
		 * or
		 * Dimension is forced (Image is larger than texture size.)
		 */
		const contentDimension = this.getDimension(image);
		const textureDimension = this._forceDimension || contentDimension;

		if (this._pixelCanvas.width !== textureDimension.width) {
			this._pixelCanvas.width = textureDimension.width;
		}

		if (this._pixelCanvas.height !== textureDimension.height) {
			this._pixelCanvas.height = textureDimension.height;
		}

		if (this._forceDimension) {
			this._pixelContext.drawImage(image,
				0, 0, contentDimension.width, contentDimension.height,
				0, 0, textureDimension.width, textureDimension.height);
		} else {
			this._pixelContext.drawImage(image, 0, 0);
		}

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

export default Renderer;
