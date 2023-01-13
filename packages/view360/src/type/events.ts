/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360 from "../View360";
import Projection, { ProjectionOptions } from "../projection/Projection";

/**
 * An event that fires when the component is initialized.
 * This will be called once after {@link View360#init init()} is called.
 * @ko 컴포넌트 초기화시 발생하는 이벤트
 * 이 이벤트는 {@link View360#init init()}가 호출된 이후 단 1회만 호출됩니다.
 * @eventName ready
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface ReadyEvent {
  /**
   * A type of the event.
   * This value is equal to event's name.
   * @ko 이벤트 타입.
   * 이벤트 이름과 값이 같습니다.
   * @since 4.0.0
   * @example
   * ```ts
   * viewer.on("ready", evt => {
   *   console.log(evt.type); // "ready"
   * });
   * ```
   */
  type: string;
  /**
   * An instance of the component that triggered this event.
   * @ko 이벤트를 발생시킨 컴포넌트의 인스턴스.
   * @since 4.0.0
   * @example
   * ```ts
   * viewer.on("ready", evt => {
   *   console.log(evt.target); // = viewer
   * });
   * ```
   */
  target: View360;
}

/**
 * An event that fires before loading the content.
 * @ko 콘텐츠 로드를 시작하기 전에 발생하는 이벤트.
 * @eventName loadStart
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface LoadStartEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * Source URL / HTMLElement to load
   * @ko 로드할 콘텐츠의 URL / HTMLElement
   * @since 4.0.0
   * @see ProjectionOptions#src
   */
  src: ProjectionOptions["src"];
  /**
   * Source's video option
   * @ko 로드할 콘텐츠의 비디오 옵션
   * @since 4.0.0
   * @see ProjectionOptions#video
   */
  video: ProjectionOptions["video"];
}

/**
 * An event that fires right after the content is loaded & before showing it.
 * @ko 콘텐츠가 로드된 직후 발생하는 이벤트.
 * @eventName load
 * @eventOf View360
 * @since 4.0.0
 * @group Event
 */
export interface LoadEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * @copy LoadStartEvent#src
   */
  src: ProjectionOptions["src"];
  /**
   * @copy LoadStartEvent#video
   */
  video: ProjectionOptions["video"];
}

/**
 * An event that fires after projection changes
 * @ko 프로젝션이 변경되었을 때 발생하는 이벤트
 * @eventName projectionChange
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface ProjectionChangeEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * An instance of new projection applied
   * @ko 새로 적용된 프로젝션의 인스턴스
   * @since 4.0.0
   */
  projection: Projection;
}

/**
 * An event that fires when {@link View360#resize} is called.
 * @ko {@link View360#resize}가 호출되었을 때 발생하는 이벤트
 * @eventName resize
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface ResizeEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * New width of the canvas. (=`canvas.clientWidth`)
   * @ko 변경된 캔버스의 너비. (=`canvas.clientWidth`)
   * @since 4.0.0
   */
  width: number;
  /**
   * New height of the canvas. (=`canvas.clientHeight`)
   * @ko 변경된 캔버스의 높이. (=`canvas.clientHeight`)
   * @since 4.0.0
   */
  height: number;
}

/**
 * An event that fires before rendering a frame.
 * @ko 새로운 프레임 렌더 직전에 발생하는 이벤트
 * @eventName beforeRender
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface BeforeRenderEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
}

/**
 * An event that fires after rendering a frame.
 * @ko 새로운 프레임 렌더 직후에 발생하는 이벤트
 * @eventName render
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface RenderEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
}

/**
 * An event that fires on input start.
 * @ko 사용자 입력 시작 시점에 발생하는 이벤트.
 * @eventName inputStart
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface InputStartEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * Source {@link https://developer.mozilla.org/en-US/docs/Web/API/Event Event} of the input.
   * @ko 사용자 입력의 {@link https://developer.mozilla.org/en-US/docs/Web/API/Event Event} 인스턴스.
   * @since 4.0.0
   */
  srcEvent: MouseEvent | TouchEvent | KeyboardEvent;
  /**
   * Type of the input.
   * @ko 사용자 입력의 종류.
   * @since 4.0.0
   */
  inputType: "rotate" | "zoom";
  /**
   * Whether the input was touch.
   * @ko 사용자 입력이 터치를 통한 것이었는지 여부를 나타내는 값.
   * @since 4.0.0
   */
  isTouch: boolean;
  /**
   * Whether the input was keyboard.
   * @ko 사용자 입력이 키보드를 통한 것이었는지 여부를 나타내는 값.
   * @since 4.0.0
   */
  isKeyboard: boolean;
}

/**
 * An event that fires on input end.
 * @ko 사용자 입력이 끝날 때 발생하는 이벤트.
 * @eventName inputEnd
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface InputEndEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * @copy InputStartEvent#inputType
   */
  inputType: "rotate" | "zoom";
  /**
   * @copy InputStartEvent#isTouch
   */
  isTouch: boolean;
  /**
   * @copy InputStartEvent#isKeyboard
   */
  isKeyboard: boolean;
  /**
   * Whether the page scroll triggered during the input on the touch devices.
   * When the page has scrolled, input itself is blocked so you can ignore the input sequence when this value is `true`.
   * @ko 터치 디바이스에서 입력 도중 스크롤이 발생하였는지 여부.
   * 이 경우 실제로 카메라 회전은 블락되어 일어나지 않기 때문에, 해당 입력 시퀀스는 무시해도 좋습니다.
   * @since 4.0.0
   */
  scrolling: boolean;
}

/**
 * An event that fires on camera view direction change.
 * This is triggered only on frame render.
 * In other words, even if the actual camera orientation changes several times between frame renderings, the actual event is triggered only with the camera's direction at the time the screen is updated.
 * @ko 카메라가 보는 방향이 변경되었을 때 발생하는 이벤트.
 * 이 이벤트는 프레임이 렌더링되었을때만 발생합니다.
 * 즉, 프레임 렌더 사이에 실제 카메라 방향이 여러번 변경되더라도 실제 이벤트는 화면 갱신이 이루어지는 시점에 바라보는 값으로만 트리거됩니다.
 * @eventName viewChange
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface ViewChangeEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * Camera's new yaw value.
   * @ko 갱신된 카메라의 yaw 값.
   * @since 4.0.0
   */
  yaw: number;
  /**
   * Camera's new pitch value.
   * @ko 갱신된 카메라의 pitch 값.
   * @since 4.0.0
   */
  pitch: number;
  /**
   * Camera's new zoom value.
   * @ko 갱신된 카메라의 zoom 값.
   * @since 4.0.0
   */
  zoom: number;
  /**
   * Camera's new quaternion value. (x, y, z, w)
   * @ko 갱신된 카메라의 회전 quaternion 값. (x, y, z, w)
   * @since 4.0.0
   */
  quaternion: number[];
}

/**
 * An event that fires after clicking on canvas element without dragging.
 * @ko 캔버스 엘리먼트를 드래그하지 않고 클릭했을 때 발생하는 이벤트.
 * @eventName staticClick
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface StaticClickEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
  /**
   * @copy InputStartEvent#isTouch
   */
  isTouch: boolean;
}

/**
 * An event that fires after entering VR mode
 * @ko VR 세션에 진입한 직후에 발생하는 이벤트
 * @eventName vrStart
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface VRStartEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
}

/**
 * An event that fires after exiting VR mode
 * @ko VR 세션이 끝난 이후에 발생하는 이벤트
 * @eventName vrEnd
 * @eventOf View360
 * @group Event
 * @since 4.0.0
 */
export interface VREndEvent {
  /**
   * @copy ReadyEvent#type
   */
  type: string;
  /**
   * @copy ReadyEvent#target
   */
  target: View360;
}
