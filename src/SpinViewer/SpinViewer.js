import Component from "@egjs/component";
import Axes, {PanInput} from "@egjs/axes";
import SpriteImage from "./SpriteImage";

const DEFAULT_PAN_SCALE = 0.21;

/**
 * @class eg.view360.SpinViewer
 * @classdesc A module used to displays each image sequentially according to the direction of the user's touch movement (left / right) of the sprite image that is collected by rotating the object.
 * @ko 물체 주위를 회전하여 촬영한 이미지들을 모은 스프라이트 이미지를 사용자의 터치 이동 방향(좌 / 우) 에 따라 각 이미지들을 순차적으로 보여주는 컴포넌트입니다.
 * @extends eg.Component
 *
 * @param {HTMLElement} element The element to show the image <ko>이미지를 보여줄 대상 요소</ko>
 * @param {Object} options The option object<ko>파라미터 객체</ko>
 * @param {String} options.imageUrl The url of the sprite image <ko>스프라이트 이미지의 url</ko>
 * @param {Number} [options.rowCount=1] Number of horizontal frames in the sprite image <ko>스프라이트 이미지의 가로 프레임 갯수</ko>
 * @param {Number} [options.colCount=1] Number of vertical frames in the sprite image <ko>스프라이트 이미지의 세로 프레임 갯수</ko>
 * @param {Number|String} [options.width="auto"] The width of the target element to show the image <ko>이미지를 보여줄 대상 요소의 너비</ko>
 * @param {Number|String} [options.height="auto"] The height of the target element to show the image <ko>이미지를 보여줄 대상 요소의 높이</ko>
 * @param {Boolean} [options.autoHeight=true] Whether to automatically set the height of the image area to match the original image's proportion <ko>원본 이미지 비율에 맞게 이미지 영역의 높이를 자동으로 설정할지 여부</ko>
 * @param {Number[]} [options.colRow=[0, 0]] The column, row coordinates of the first frame of the sprite image (based on 0 index) <ko> 스프라이트 이미지 중 처음 보여줄 프레임의 (column, row) 좌표 (0 index 기반)</ko>
 * @param {Number} [options.scale=1] Spin scale (The larger the spin, the more).<ko>Spin 배율 (클 수록 더 많이 움직임)</ko>
 * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 *
 * // Initialize SpinViewer
 * var el = document.getElementById("product-360");
 * var viewer = new eg.view360.SpinViewer(el, {
 * 	imageUrl: "/img/bag360.jpg", // required
 * 	rowCount: 24 //required
 * });
 */
export default class SpinViewer extends Component {
	constructor(element, options) {
		super();

		this._el = element;

		const opt = options || {};
		const colCount = opt.colCount || 1;
		const rowCount = opt.rowCount || 1;

		this._scale = (opt.scale || 1) * DEFAULT_PAN_SCALE;

		this._frameCount = colCount * rowCount;

		// Init SpriteImage
		this._sprites = new SpriteImage(element, opt).on({
			"load": evt => {
				/**
				 * Events that occur when component loading is complete
				 * @ko 컴포넌트 로딩이 완료되면 발생하는 이벤트
				 * @name eg.view360.SpinViewer#load
				 * @event
				 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
				 * @param {HTMLElement} param.target The target element for which to display the image <ko>이미지를 보여줄 대상 엘리먼트</ko>
				 * @param {HTMLElement} param.bgElement Generated background image element <ko>생성된 background 이미지 엘리먼트</ko>
				 *
				 * @example
				 *
				 * viwer.on({
				 *	"load" : function(evt) {
				 *		this.spinBy({angle: 360, duration: 300});
				 *	}
				 * });
				 */
				this.trigger("load", evt);
			},
			"imageError": evt => {
				/**
				 * An event that occurs when the image index is changed by the user's left / right panning
				 * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
				 * @name eg.view360.SpinViewer#imageError
				 * @event
				 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
				 * @param {String} param.imageUrl User-specified image URL <ko>사용자가 지정한 이미지 URL</ko>
				 *
				 * @example
				 *
				 * viewer.on({
				 *	"imageError" : function(evt) {
				 *		// Error handling
				 *		console.log(e.imageUrl);
				 *	}
				 * });
				 */
				this.trigger("imageError", {
					imageUrl: evt.imageUrl
				});
			}
		});

		// Init Axes
		this._panInput = new PanInput(this._el, {
			scale: [this._scale, this._scale]
		});
		this._axes = new Axes({
			angle: {
				range: [0, 359],
				circular: true
			}
		}).on({
			"change": evt => {
				const curr = Math.floor(evt.pos.angle / (360 / this._frameCount));
				const frameIndex = this._frameCount - curr - 1;

				this._sprites.setFrameIndex(frameIndex);

				/**
				 * An event that occurs when the image index is changed by the user's left / right panning
				 * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
				 * @name eg.view360.SpinViewer#change
				 * @event
				 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
				 * @param {Number[]} param.colRow Column, row of the frame in the sprite image <ko>스프라이트 이미지 내 프레임의 column, row</ko>
				 * @param {Number} param.frameIndex Index value that is sequentially appended in Z direction based on col and row.<ko>col, row 를 기반으로 Z 방향으로 순차적으로 붙여지는 index 값</ko>
				 * @param {Number} param.angle The angle that is currently internally held at an angle between 0 and 359. (not a real product angle) <ko>0 ~ 359 범위의 각도로 현재 내부적으로 유지하고 있는 각도 (실제 이미지의 각도가 아님)</ko>
				 *
				 * @example
				 *
				 * viwer.on({
				 *	"change" : function(evt) {
				 *		console.log(event.frameIndex, event.colRow, event.angle);   // event.colRow = [0, 4] event.frameIndex = 4, event = 30
				 *	}
				 * });
				 */
				this.trigger("change", {
					frameIndex,
					colRow: this._sprites.getColRow(),
					angle: evt.pos.angle
				});
			}
		});

		this._axes.connect("angle", this._panInput);
	}

	/**
	 * Set spin scale
	 * @ko scale 을 조정할 수 있는 함수
	 * @method eg.view360.SpinViewer#setScale
	 * @param {Number} scale Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
	 *
	 * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
	 *
	 * @example
	 *
	 * viewer.setScale(2);// It moves twice as much.
	 */
	setScale(scale) {
		if (isNaN(scale) || scale < 0) {
			return this;
		}

		this._scale = scale * DEFAULT_PAN_SCALE;
		this._panInput.options.scale = [this._scale, this._scale];

		return this;
	}

	/**
	 * It gives the effect of rotating at a specified angle for a certain period of time(duration).
	 * @ko 지정된 각도(angle)로 일정 시간동안(duration) 회전하는 효과를 준다.
	 * @method eg.view360.SpinViewer#spinBy
	 * @param {Object} param The parameter object<ko>파라미터 객체</ko>
	 * @param {Number} [param.angle=0] angle<ko>회전 각도</ko>
	 * @param {Number} [param.duration=400] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
	 *
	 * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
	 *
	 * @example
	 *
	 * viewer.spinBy({angle: 720, duration: 500});
	 */
	spinBy({angle = 0, duration = 400}) {
		this._axes.setBy({angle}, duration);

		return this;
	}
}
