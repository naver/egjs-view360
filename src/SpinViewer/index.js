import SpinViewer from "./SpinViewer";
import SpriteImage from "./SpriteImage";

const VERSION = "#__VERSION__#";

export {
	SpinViewer,
	SpriteImage,
	VERSION
};

/**
 * Version info string
 * @ko 버전정보 문자열
 * @name VERSION
 * @static
 * @type {String}
 * @example
 * eg.view360.SpinViewer.VERSION;  // ex) 3.0.1
 * @memberof eg.view360.SpinViewer
 */
SpinViewer.VERSION = VERSION;
SpriteImage.VERSION = VERSION;
