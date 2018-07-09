export default class Renderer {
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
	static getDimension(pixelSource) {
		const width = pixelSource.naturalWidth || pixelSource.videoWidth;
		const height = pixelSource.naturalHeight || pixelSource.videoHeight;

		return {width, height};
	}
}
