/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import ProgressBar from "./ProgressBar";
import PlayButton from "./PlayButton";
import VolumeControl from "./VolumeControl";
import FullscreenButton from "./FullscreenButton";
import VideoTime from "./VideoTime";
import PieView, { PieViewOptions } from "./PieView";
import VRButton from "./VRButton";
import GyroButton from "./GyroButton";
import AutoHide, { AutoHideOptions } from "./AutoHide";
import VideoControl from "./VideoControl";
import View360, { View360Events } from "../../View360";
import View360Plugin from "../View360Plugin";
import { EVENTS } from "../../const/external";
import { createElement, findIndex, getObjectOption } from "../../utils";
import { ValueOf } from "../../type/utils";
import { StaticClickEvent } from "../../type/events";

/**
 * Options for {@link ControlBar}
 * @ko {@link ControlBar}용 옵션들
 * @category Plugin
 * @since 4.0.0
 */
export interface ControlBarOptions {
  /**
   * @copy ControlBar#autoHide
   */
  autoHide: boolean | Partial<AutoHideOptions>;
  /**
   * @copy ControlBar#showBackground
   */
  showBackground: boolean;
  /**
   * @copy ControlBar#clickToPlay
   */
  clickToPlay: boolean;
  /**
   * @copy ControlBar#keyboardControls
   */
  keyboardControls: boolean;
  /**
   * @copy ControlBar#progressBar
   */
  progressBar: boolean | Partial<ControlBarItemOptions>;
  /**
   * @copy ControlBar#playButton
   */
  playButton: boolean | Partial<ControlBarItemOptions>;
  /**
   * @copy ControlBar#volumeButton
   */
  volumeButton: boolean | Partial<ControlBarItemOptions>;
  /**
   * @copy ControlBar#fullscreenButton
   */
  fullscreenButton: boolean | Partial<ControlBarItemOptions>;
  /**
   * @copy ControlBar#videoTime
   */
  videoTime: boolean | Partial<ControlBarItemOptions>;
  /**
   * @copy ControlBar#pieView
   */
  pieView: boolean | Partial<PieViewOptions>;
  /**
   * @copy ControlBar#vrButton
   */
  vrButton: boolean | Partial<ControlBarItemOptions>;
  /**
   * @copy ControlBar#gyroButton
   */
  gyroButton: boolean | Partial<ControlBarItemOptions>;
  /**
   * @copy ControlBar#className
   */
  className: Partial<{ -readonly [key in keyof typeof ControlBar.DEFAULT_CLASS]: string }>;
  /**
   * @copy ControlBar#customItems
   */
  customItems: ControlBarItem[];
}

/**
 * A plugin that displays extra buttons & controls that controls {@link View360}.
 * @ko {@link View360}에 부가적인 버튼과 컨트롤을 추가해주는 플러그인.
 * @category Plugin
 * @since 4.0.0
 */
class ControlBar implements View360Plugin {
  /**
   * Default class names that ControlBar uses
   * @ko ControlBar가 사용하는 디폴트 클래스 이름들
   * @since 4.0.0
   */
  public static readonly DEFAULT_CLASS = {
    CONTROLS_ROOT: "view360-controls",
    CONTROLS_BG: "view360-controls-background",
    CONTROLS_MAIN: "view360-controls-main",
    CONTROLS_TOP: "view360-controls-top",
    CONTROLS_BOTTOM: "view360-controls-bottom",
    CONTROLS_MID: "view360-controls-mid",
    CONTROLS_LEFT: "view360-controls-left",
    CONTROLS_RIGHT: "view360-controls-right",
    CONTROLS_FLOAT_LEFT: "view360-controls-float-left",
    CONTROLS_FLOAT_RIGHT: "view360-controls-float-right",
    CONTROLS_BUTTON: "view360-controls-button",
    PROGRESS_ROOT: "view360-controls-progress",
    VOLUME_ROOT: "view360-controls-volume",
    RANGE_ROOT: "view360-range",
    RANGE_TRACK: "view360-range-track",
    RANGE_THUMB: "view360-range-thumb",
    RANGE_FILLER: "view360-range-filler",
    PLAY_BUTTON: "view360-controls-play",
    PAUSE_BUTTON: "view360-controls-pause",
    UNMUTED_BUTTON: "view360-controls-unmuted",
    MUTED_BUTTON: "view360-controls-muted",
    FULLSCREEN_BUTTON: "view360-controls-fullscreen",
    FULLSCREEN_EXIT_BUTTON: "view360-controls-fullscreen-exit",
    VR_BUTTON: "view360-controls-vr",
    GYRO_ENABLED: "view360-controls-gyro-enabled",
    GYRO_DISABLED: "view360-controls-gyro-disabled",
    VIDEO_TIME_DISPLAY: "view360-controls-time",
    PIEVIEW_ROOT: "view360-controls-pie",
    FIXED: "view360-controls-fixed",
    UNAVAILABLE: "view360-controls-unavailable",
    HIDDEN: "view360-controls-hidden"
  } as const;

  /**
   * Constants for {@link ControlBarItemOptions#position}
   * @ko {@link ControlBarItemOptions#position}에 사용 가능한 값들
   */
  public static readonly POSITION = {
    /**
     * Place control bar item floating at top-left corner
     * @ko 아이템을 왼쪽 위 구석에 표시합니다.
     * @since 4.0.0
     */
    TOP_LEFT: "top-left",
    /**
     * Place control bar item floating at top-right corner
     * @ko 아이템을 오른쪽 위 구석에 표시합니다.
     * @since 4.0.0
     */
    TOP_RIGHT: "top-right",
    /**
     * Place control bar item at upper block inside the bottom control bar.
     * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 위쪽 블럭에 표시합니다.
     * @since 4.0.0
     */
    MAIN_TOP: "main-top",
    /**
     * Place control bar item at lower block inside the bottom control bar.
     * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 하단 블럭에 표시합니다.
     * @since 4.0.0
     */
    MAIN_BOTTOM: "main-bottom",
    /**
     * Place control bar item at center-left block inside the bottom control bar.
     * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 중간 왼쪽 블럭에 표시합니다.
     * @since 4.0.0
     */
    MAIN_LEFT: "main-left",
    /**
     * Place control bar item at center-right block inside the bottom control bar.
     * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 중간 오른쪽 블럭에 표시합니다.
     * @since 4.0.0
     */
    MAIN_RIGHT: "main-right"
  } as const;

  /**
   * Automatically hide control bar on video plays.
   * `true` to enable with default values, `false` to disable.
   * @ko 비디오 재생시 자동으로 컨트롤바를 숨깁니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly autoHide?: ControlBarOptions["autoHide"];
  /**
   * Show background element.
   * @ko 배경 엘리먼트를 표시합니다.
   * @since 4.0.0
   */
  public readonly showBackground?: ControlBarOptions["showBackground"];
  /**
   * Whether to play / pause video on canvas click
   * @ko 캔버스 클릭시에 비디오를 재생 / 일시정지 토글합니다.
   * @since 4.0.0
   */
  public readonly clickToPlay: ControlBarOptions["clickToPlay"];
  /**
   * Enable keyboard controls for video.
   * Pressing up / down arrow will control video volume, and pressing left / right arrow will control video time.
   * @ko 비디오 키보드 컨트롤을 활성화합니다.
   * 위 / 아래 화살표키를 누를 시 비디오 볼륨을, 왼쪽 / 오른쪽 화살표키를 누를 시 비디오 시간을 조정합니다.
   * @since 4.0.0
   */
  public readonly keyboardControls: ControlBarOptions["keyboardControls"];
  /**
   * Show video progress bar.
   * `true` to enable with default values, `false` to disable.
   * @ko 비디오 프로그레스 바를 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly progressBar: ControlBarOptions["progressBar"];
  /**
   * Show video play / pause button.
   * `true` to enable with default values, `false` to disable.
   * @ko 비디오 재생 / 일시정지 버튼을 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly playButton: ControlBarOptions["playButton"];
  /**
   * Show video volume control button.
   * `true` to enable with default values, `false` to disable.
   * @ko 비디오 볼륨 조절 버튼을 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly volumeButton: ControlBarOptions["volumeButton"];
  /**
   * Show fullscreen button.
   * `true` to enable with default values, `false` to disable.
   * @ko 풀스크린 진입 / 해제 버튼을 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly fullscreenButton: ControlBarOptions["fullscreenButton"];
  /**
   * Show video current / total time
   * `true` to enable with default values, `false` to disable.
   * @ko 비디오의 현재 시간 / 총 시간을 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly videoTime: ControlBarOptions["videoTime"];
  /**
   * Show camera pie view.
   * `true` to enable with default values, `false` to disable.
   * @ko 현재 카메라가 가리키는 방향을 표시하는 파이 뷰를 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly pieView: ControlBarOptions["pieView"];
  /**
   * Show VR button.
   * `true` to enable with default values, `false` to disable.
   * @ko VR 진입버튼을 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly vrButton: ControlBarOptions["vrButton"];
  /**
   * Show gyroscope control enable / disable button.
   * `true` to enable with default values, `false` to disable.
   * @ko 자이로스코프 컨트롤을 활성화 / 비활성화하는 버튼을 표시합니다.
   * `true`일 경우 기본값을 적용하고, `false`일 경우 비활성화합니다.
   * @since 4.0.0
   */
  public readonly gyroButton: ControlBarOptions["gyroButton"];
  /**
   * Override default class names.
   * @ko 디폴트 클래스 이름들을 오버라이드합니다.
   * @since 4.0.0
   */
  public readonly className: Required<ControlBarOptions["className"]>;

  /**
   * Root element of the control bar
   * @ko 컨트롤바의 루트 엘리먼트
   * @since 4.0.0
   */
  public get rootEl() { return this._rootEl; }
  /**
   * Container element of the control bar
   * @ko 컨트롤바의 컨테이너 엘리먼트
   * @since 4.0.0
   */
  public get containerEl() { return this._containerEl; }
  /**
   * Background element of the control bar
   * @ko 컨트롤바의 배경 엘리먼트
   * @since 4.0.0
   */
  public get backgroundEl() { return this._bgEl; }
  /**
   * Control bar's default items created by {@link ControlBarOptions}
   * @ko 주어진 {@link ControlBarOptions}에 의해 생성된 디폴트 아이템들
   * @since 4.0.0
   */
  public get items() { return this._items; }
  /**
   * Custom control bar items
   * @ko 커스텀 컨트롤바 아이템들을 추가합니다.
   * @since 4.0.0
   */
  public get customItems() { return this._customItems; }

  private _rootEl: HTMLElement;
  private _containerEl: HTMLElement;
  private _bgEl: HTMLElement;
  private _wrapperEl: Record<ValueOf<typeof ControlBar.POSITION>, HTMLElement>;
  private _items: Record<ValueOf<typeof ControlBar.POSITION>, ControlBarItem[]>;
  private _customItems: ControlBarItem[];
  private _autoHider: AutoHide;
  private _videoControl: VideoControl;

  /**
   * Create new instance of ControlBar.
   * @ko ControlBar의 새 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    autoHide,
    showBackground,
    clickToPlay = true,
    keyboardControls = true,
    progressBar = true,
    playButton = true,
    volumeButton = true,
    fullscreenButton = true,
    videoTime = true,
    pieView = true,
    vrButton = true,
    gyroButton = true,
    className = {},
    customItems = []
  }: Partial<ControlBarOptions> = {}) {
    this.autoHide = autoHide;
    this.showBackground = showBackground;
    this.clickToPlay = clickToPlay;
    this.keyboardControls = keyboardControls;
    this.progressBar = progressBar;
    this.playButton = playButton;
    this.volumeButton = volumeButton;
    this.fullscreenButton = fullscreenButton;
    this.videoTime = videoTime;
    this.pieView = pieView;
    this.vrButton = vrButton;
    this.gyroButton = gyroButton;
    this.className = {
      ...ControlBar.DEFAULT_CLASS,
      ...className
    };

    const rootClass = className.CONTROLS_ROOT ?? ControlBar.DEFAULT_CLASS.CONTROLS_ROOT;

    this._rootEl = createElement(rootClass);
    this._createPositionWrappers();
    this._items = Object.keys(ControlBar.POSITION).reduce((items, key) => {
      items[ControlBar.POSITION[key]] = [];
      return items;
    }, {}) as Record<ValueOf<typeof ControlBar.POSITION>, ControlBarItem[]>;
    this._customItems = customItems;
    this._autoHider = new AutoHide(this, getObjectOption(autoHide));
    this._videoControl = new VideoControl();

    customItems.forEach(item => {
      this._items[item.position].push(item);
    });
  }

  public init(viewer: View360) {
    const panoRoot = viewer.root;
    const controlsRoot = this._rootEl;
    const defaultItems = this._createDefaultItems();

    this._updateBackground(viewer);
    this._updateAutoHide(viewer);
    this._updateKeyboardHandler(viewer);

    panoRoot.appendChild(controlsRoot);
    this._addItem(viewer, defaultItems);
    this._addItem(viewer, this._customItems);

    viewer.on(EVENTS.PROJECTION_CHANGE, this._onNewSrcLoad);
    viewer.on(EVENTS.STATIC_CLICK, this._onStaticClick);
  }

  public destroy(viewer: View360): void {
    // Remove controls root from pano root
    const panoRoot = viewer.root;
    const controlsRoot = this._rootEl;
    const items = this._items;

    if (controlsRoot.parentElement === panoRoot) {
      panoRoot.removeChild(controlsRoot);
    }

    Object.keys(items).forEach((key: ValueOf<typeof ControlBar.POSITION>) => {
      const category = items[key];

      category.forEach(item => {
        item.destroy(viewer, this);
      });

      items[key] = [];
    });

    this._clearItemElements();
    this._autoHider.disable(viewer);
    this._videoControl.disable(panoRoot);

    viewer.off(EVENTS.PROJECTION_CHANGE, this._onNewSrcLoad);
    viewer.off(EVENTS.STATIC_CLICK, this._onStaticClick);
  }

  private _addItem(viewer: View360, items: ControlBarItem[]) {
    for (const item of items) {
      const category = this._items[item.position];
      const wrapper = this._wrapperEl[item.position];

      const nextSiblingIndex = findIndex(category, sibling => sibling.order > item.order);

      if (nextSiblingIndex >= 0) {
        const nextSibling = category[nextSiblingIndex].element;
        category.splice(nextSiblingIndex, 0, item);
        wrapper.insertBefore(item.element, nextSibling);
      } else {
        category.push(item);
        wrapper.appendChild(item.element);
      }

      item.init(viewer, this);
    }
  }

  private _createPositionWrappers() {
    const className = {
      ...ControlBar.DEFAULT_CLASS,
      ...this.className
    };
    const rootEl = this._rootEl;

    // BG & FLOATING CONTROLS
    const backgroundEl = createElement(className.CONTROLS_BG);
    const floatLeftEl = createElement(className.CONTROLS_FLOAT_LEFT);
    const floatRightEl = createElement(className.CONTROLS_FLOAT_RIGHT);

    rootEl.appendChild(floatLeftEl);
    rootEl.appendChild(floatRightEl);

    // BOTTOM CONTROLS
    const container = createElement(className.CONTROLS_MAIN);
    const topWrapper = createElement(className.CONTROLS_TOP);
    const bottomWrapper = createElement(className.CONTROLS_BOTTOM);
    const midWrapper = createElement(className.CONTROLS_MID);
    const leftControlsWrapper = createElement(className.CONTROLS_LEFT);
    const rightControlsWrapper = createElement(className.CONTROLS_RIGHT);

    midWrapper.appendChild(leftControlsWrapper);
    midWrapper.appendChild(rightControlsWrapper);
    container.appendChild(backgroundEl);
    container.appendChild(topWrapper);
    container.appendChild(midWrapper);
    container.appendChild(bottomWrapper);
    rootEl.appendChild(container);

    this._bgEl = backgroundEl;
    this._containerEl = container;
    this._wrapperEl = {
      [ControlBar.POSITION.MAIN_TOP]: topWrapper,
      [ControlBar.POSITION.MAIN_LEFT]: leftControlsWrapper,
      [ControlBar.POSITION.MAIN_RIGHT]: rightControlsWrapper,
      [ControlBar.POSITION.MAIN_BOTTOM]: bottomWrapper,
      [ControlBar.POSITION.TOP_LEFT]: floatLeftEl,
      [ControlBar.POSITION.TOP_RIGHT]: floatRightEl
    };
  }

  private _clearItemElements() {
    const wrappers = Object.keys(ControlBar.POSITION).map(key => ControlBar.POSITION[key]);

    // Remove all elements inside wrappers
    wrappers.forEach(wrapper => {
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
    });
  }

  private _onStaticClick = ({ target: viewer, isTouch }: StaticClickEvent) => {
    const autoHider = this._autoHider;

    if (isTouch) {
      if (!autoHider.enabled) return;

      if (autoHider.hidden) {
        autoHider.showTemporaliy();
      } else {
        autoHider.hide();
      }
    } else {
      if (!this.clickToPlay) return;

      const video = viewer.projection?.getTexture();
      if (!video || !video.isVideo()) return;

      if (video.isPaused()) {
        video.source.play();
      } else {
        video.source.pause();
      }
    }
  };

  private _onNewSrcLoad = ({ target: viewer }: View360Events["projectionChange"]) => {
    const items = this._items;

    this._updateBackground(viewer);
    this._updateAutoHide(viewer);
    this._updateKeyboardHandler(viewer);

    Object.keys(items).forEach((key: ValueOf<typeof ControlBar.POSITION>) => {
      const category = items[key];

      category.forEach(item => {
        item.destroy(viewer, this);
        item.init(viewer, this);
      });
    });
  };

  private _updateAutoHide(viewer: View360) {
    const autoHide = this.autoHide;
    const autoHider = this._autoHider;

    if (autoHide != null) {
      if (autoHide) {
        autoHider.enable(viewer);
      } else {
        autoHider.disable(viewer);
      }
    } else {
      // Automatically choose whether to show background by content type
      const texture = viewer.projection?.getTexture();

      if (texture && texture.isVideo()) {
        // Enable auto hide when content type is video
        autoHider.enable(viewer);
      } else {
        autoHider.disable(viewer);
      }
    }
  }

  private _updateBackground(viewer: View360) {
    const background = this._bgEl;
    const showBackground = this.showBackground;
    const hiddenClass = this.className.HIDDEN ?? ControlBar.DEFAULT_CLASS.HIDDEN;

    if (showBackground != null) {
      if (showBackground) {
        background.classList.remove(hiddenClass);
      } else {
        background.classList.add(hiddenClass);
      }
    } else {
      // Automatically choose whether to show background by content type
      const texture = viewer.projection?.getTexture();

      if (texture && texture.isVideo()) {
        // Show bg when content type is video
        background.classList.remove(hiddenClass);
      } else {
        background.classList.add(hiddenClass);
      }
    }
  }

  private _updateKeyboardHandler(viewer: View360) {
    const panoRoot = viewer.root;
    const videoControl = this._videoControl;
    const texture = viewer.projection?.getTexture();

    if (this.keyboardControls && texture && texture.isVideo()) {
      videoControl.enable(panoRoot, texture);
    } else {
      videoControl.disable(panoRoot);
    }
  }

  private _createDefaultItems(): ControlBarItem[] {
    const items: ControlBarItem[] = [];

    if (this.progressBar) {
      items.push(new ProgressBar(getObjectOption(this.progressBar)));
    }

    if (this.playButton) {
      items.push(new PlayButton(getObjectOption(this.playButton)));
    }

    if (this.volumeButton) {
      items.push(new VolumeControl(getObjectOption(this.volumeButton)));
    }

    if (this.gyroButton) {
      items.push(new GyroButton(getObjectOption(this.gyroButton)));
    }

    if (this.vrButton) {
      items.push(new VRButton(getObjectOption(this.vrButton)));
    }

    if (this.fullscreenButton) {
      items.push(new FullscreenButton(getObjectOption(this.fullscreenButton)));
    }

    if (this.videoTime) {
      items.push(new VideoTime(getObjectOption(this.videoTime)));
    }

    if (this.pieView) {
      items.push(new PieView(getObjectOption(this.pieView)));
    }

    return items;
  }
}

export default ControlBar;
