/* eslint-disable @typescript-eslint/ban-types */
import { ComponentEvent } from "@egjs/component";
import { SpinViewer } from "src";

import PanoViewer from "../PanoViewer/PanoViewer";

/**
 * Events that is fired when PanoViewer is ready to go.
 * @ko PanoViewer 가 준비된 상태에 발생하는 이벤트
 * @name eg.view360.PanoViewer#ready
 * @event
 *
 * @example
 * ```
 * viewer.on({
 *   "ready" : function(evt) {
 *     // PanoViewer is ready to show image and handle user interaction.
 *   }
 * });
 * ```
 */
export type ReadyEvent<T extends PanoViewer = PanoViewer> = ComponentEvent<{}, "ready", T>;

/**
 * Events that is fired when direction or fov is changed.
 * @ko PanoViewer 에서 바라보고 있는 방향이나 FOV(화각)가 변경되었을때 발생하는 이벤트
 * @name eg.view360.PanoViewer#viewChange
 * @event
 * @param {object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
 * @param {number} param.yaw yaw<ko>yaw</ko>
 * @param {number} param.pitch pitch <ko>pitch</ko>
 * @param {number} param.fov Field of view (fov) <ko>화각</ko>
 * @example
 * ```
 * viewer.on({
 *   "viewChange" : function(evt) {
 *     //evt.yaw, evt.pitch, evt.fov is available.
 *   }
 * });
 * ```
 */
export interface ViewChangeEvent<T extends PanoViewer = PanoViewer> extends ComponentEvent<{}, "viewChange", T> {
  yaw: number;
  pitch: number;
  fov: number;
}

/**
 * Events that is fired when animation which is triggered by inertia is ended.
 * @ko 관성에 의한 애니메이션 동작이 완료되었을때 발생하는 이벤트
 * @name eg.view360.PanoViewer#animationEnd
 * @event
 * @param {object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
 * @param {number} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call<ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
 * @example
 * ```
 * viewer.on({
 *   "animationEnd" : function(evt) {
 *     // animation is ended.
 *   }
 * });
 * ```
 */
/**
 * This event is fired when animation ends.
 * @ko 에니메이션이 끝났을 때 발생하는 이벤트
 * @name eg.view360.SpinViewer#animationEnd
 * @event
 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
 * @param {Boolean} param.isTrusted true if an event was generated by the user action, or false if it was caused by a script or API call<ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
 *
 * @example
 *
 * viewer.on({
 *  animationEnd" : function(evt) {
 *    // evt.isTrusted === true or false
 *  }
 * });
 */
export interface AnimationEndEvent<T extends any> extends ComponentEvent<{}, "animationEnd", T> {
  isTrusted: boolean;
}

/**
 * Events that is fired when error occurs
 * @ko 에러 발생 시 발생하는 이벤트
 * @name eg.view360.PanoViewer#error
 * @event
 * @param {object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
 * @param {number} param.type Error type
 * 		10: INVALID_DEVICE: Unsupported device
 * 		11: NO_WEBGL: Webgl not support
 * 		12, FAIL_IMAGE_LOAD: Failed to load image
 * 		13: FAIL_BIND_TEXTURE: Failed to bind texture
 * 		14: INVALID_RESOURCE: Only one resource(image or video) should be specified
 * 		15: RENDERING_CONTEXT_LOST: WebGL context lost occurred
 * <ko>에러 종류
 * 		10: INVALID_DEVICE: 미지원 기기
 * 		11: NO_WEBGL: WEBGL 미지원
 * 		12, FAIL_IMAGE_LOAD: 이미지 로드 실패
 * 		13: FAIL_BIND_TEXTURE: 텍스쳐 바인딩 실패
 * 		14: INVALID_RESOURCE: 리소스 지정 오류 (image 혹은 video 중 하나만 지정되어야 함)
 * 		15: RENDERING_CONTEXT_LOST: WebGL context lost 발생
 * </ko>
 * @param {string} param.message Error message <ko>에러 메시지</ko>
 * @see {@link eg.view360.PanoViewer.ERROR_TYPE}
 * @example
 * ```
 * viewer.on({
 *   "error" : function(evt) {
 *     // evt.type === 13
 *     // evt.message === "failed to bind texture"
 * });
 *
 * // constant can be used
 * viewer.on({
 *   eg.view360.PanoViewer.EVENTS.ERROR : function(evt) {
 *   // evt.type === eg.view360.PanoViewer.ERROR_TYPE.FAIL_BIND_TEXTURE
 *   // evt.message === "failed to bind texture"
 * });
 * ```
 */
export interface ErrorEvent<T extends PanoViewer = PanoViewer> extends ComponentEvent<{}, "error", T> {
  type: number;
  message: string;
}

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
 * viewer.on({
 *  "load" : function(evt) {
 *    this.spinBy(360, {duration: 300});
 *  }
 * });
 */
export interface LoadEvent<T extends SpinViewer = SpinViewer> extends ComponentEvent<{}, "load", T> {
  target: HTMLElement;
  bgElement: HTMLDivElement;
}

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
 *  "imageError" : function(evt) {
 *    // Error handling
 *    console.log(e.imageUrl);
 *  }
 * });
 */
export interface ImageErrorEvent<T extends SpinViewer = SpinViewer> extends ComponentEvent<{}, "imageError", T> {
  imageUrl?: string;
}

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
 * viewer.on({
 *  "change" : function(evt) {
 *    console.log(event.frameIndex, event.colRow, event.angle);   // event.colRow = [0, 4] event.frameIndex = 4, event = 30
 *  }
 * });
 */
export interface ChangeEvent<T extends SpinViewer = SpinViewer> extends ComponentEvent<{}, "change", T> {
  colRow: number[];
  frameIndex: number;
  angle: number;
}
