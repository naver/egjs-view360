export const CONTROL_BAR_DEFAULT_CLASS = {
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

export const CONTROL_BAR_ITEM_POSITION = {
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
