import Component, { ComponentEvent } from "@egjs/component";
import Axes, { PanInput } from "@egjs/axes";

import { VERSION } from "../version";
import { AnimationEndEvent, ChangeEvent, ImageErrorEvent, LoadEvent } from "../types/event";

import SpriteImage from "./SpriteImage";

const DEFAULT_PAN_SCALE = 0.21;

export interface SpinViewerEvent {
  load: LoadEvent;
  imageError: ImageErrorEvent;
  change: ChangeEvent;
  animationEnd: AnimationEndEvent<SpinViewer>;
}

export interface SpinViewerOptions {
  imageUrl: string;
  rowCount: number;
  colCount: number;
  width: number | string;
  height: number | string;
  autoHeight: boolean;
  colRow: number[];
  scale: number;
  frameIndex: number;
  wrapperClass: string;
  imageClass: string;
}

/**
 * @memberof eg.view360
 * @extends eg.Component
 * SpinViewer
 */
class SpinViewer extends Component<SpinViewerEvent> {
  /**
   * Version info string
   * @ko 버전정보 문자열
   * @static
   * @example
   * eg.view360.SpinViewer.VERSION;  // ex) 3.0.1
   * @memberof eg.view360.SpinViewer
   */
  public static VERSION = VERSION;

  private _el: HTMLElement;
  private _sprites: SpriteImage;
  private _axes: Axes;
  private _panInput: PanInput;

  private _scale: number;
  private _panScale: number;
  private _frameCount: number;

  /**
   * @classdesc A module used to displays each image sequentially according to the direction of the user's touch movement (left / right) of the sprite image that is collected by rotating the object.
   * @ko 물체 주위를 회전하여 촬영한 이미지들을 모은 스프라이트 이미지를 사용자의 터치 이동 방향(좌 / 우) 에 따라 각 이미지들을 순차적으로 보여주는 컴포넌트입니다.
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
   * @param {Number} [options.frameIndex] The frameIndex of the frame to be shown in the sprite image<ko>스프라이트 이미지 중 보여질 프레임의 frameIndex 값</ko>
   * @param {String} [options.wrapperClass="view360-wrapper"] A class name for the parent element of the image element inside the container element. SpinViewer will use the element that has this class instead of creating one if it exists<ko>이미지 엘리먼트의 부모 엘리먼트의 클래스 이름. SpinViewer는 해당 클래스를 갖는 엘리먼트가 콘테이너 엘리먼트 내부에 존재할 경우, 새로 생성하는 대신 그 엘리먼트를 사용할 것입니다</ko>
   * @param {String} [options.imageClass="view360-image"] A class name for the image element inside the container element. SpinViewer will use the image element that has this class instead of creating one if it exists<ko>콘테이너 엘리먼트 내부의 이미지 엘리먼트의 클래스 이름. SpinViewer는 해당 클래스를 갖는 이미지 엘리먼트가 콘테이너 엘리먼트 내부에 존재할 경우, 새로 생성하는 대신 그 엘리먼트를 사용할 것입니다</ko>
   * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   * @example
   * ```
   * // Initialize SpinViewer
   * var el = document.getElementById("product-360");
   * var viewer = new eg.view360.SpinViewer(el, {
   * 	imageUrl: "/img/bag360.jpg", // required
   * 	rowCount: 24 //required
   * });
   * ```
   */
  public constructor(element: HTMLElement, options: Partial<SpinViewerOptions> = {}) {
    super();

    this._el = element;

    const opt = {...options};
    const colCount = opt.colCount || 1;
    const rowCount = opt.rowCount || 1;

    this._scale = (opt.scale || 1);
    this._panScale = this._scale * DEFAULT_PAN_SCALE;

    this._frameCount = colCount * rowCount;

    // Init SpriteImage
    this._sprites = new SpriteImage(element, opt).on({
      "load": evt => {
        this.trigger(new ComponentEvent("load", evt));
      },
      "imageError": evt => {
        this.trigger(new ComponentEvent("imageError", {
          imageUrl: evt.imageUrl
        }));
      }
    });

    // Init Axes
    this._panInput = new PanInput(this._el, {
      scale: [this._panScale, this._panScale]
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

        this.trigger(new ComponentEvent("change", {
          frameIndex,
          colRow: this._sprites.getColRow(),
          angle: evt.pos.angle
        }));
      },
      "animationEnd": evt => {
        this.trigger(new ComponentEvent("animationEnd", {
          isTrusted: evt.isTrusted
        }));
      }
    });

    this._axes.connect("angle", this._panInput);
  }

  /**
   * Set spin scale
   * @ko scale 을 조정할 수 있는 함수
   * @param {Number} scale Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
   *
   * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
   *
   * @example
   * viewer.setScale(2);// It moves twice as much.
   */
  public setScale(scale: number) {
    if (isNaN(scale) || scale < 0) {
      return this;
    }

    this._scale = scale;
    this._panScale = scale * DEFAULT_PAN_SCALE;
    this._panInput.options.scale = [this._panScale, this._panScale];

    return this;
  }

  /**
   * Get spin scale
   * @ko scale 값을 반환한다.
   *
   * @return {Number} Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
   *
   * @example
   * viewer.getScale();// It returns number
   */
  public getScale() {
    return this._scale;
  }

  /**
   * It gives the effect of rotating for a certain duration by the specified angle based on the current rotation angle.
   * @ko 현재 회전 각도를 기준으로 지정된 각도(angle)만큼 일정 시간동안(duration) 회전하는 효과를 준다.
   * @param {Number} [angle = 0] angle<ko>상대적 회전 각도</ko>
   * @param {Object} param The parameter object<ko>파라미터 객체</ko>
   * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
   *
   * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
   *
   * @example
   * viewer.spinBy(720, {duration: 500});
   */
  public spinBy(angle = 0, param = {duration: 0}) {
    this._axes.setBy({angle}, param.duration);
    return this;
  }

  /**
   * It gives the effect of rotating for a certain duration (duration) by the specified angle (angle).
   * @ko 지정된 각도(angle)만큼 일정 시간동안(duration) 회전하는 효과를 준다.
   * @param {Number} [angle = 0] angle<ko>회전 각도</ko>
   * @param {Object} param The parameter object<ko>파라미터 객체</ko>
   * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
   *
   * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
   *
   * @example
   * viewer.spinTo(30, {duration:100});
   */
  public spinTo(angle = 0, param = {duration: 0}) {
    this._axes.setTo({angle}, param.duration);
    return this;
  }

  /**
   * Returns current angles
   * @ko 현재 각도를 반환한다.
   *
   * @return {Number} Current angle <ko>현재 각도</ko>
   */
  public getAngle() {
    return this._axes.get().angle || 0;
  }
}

export default SpinViewer;
