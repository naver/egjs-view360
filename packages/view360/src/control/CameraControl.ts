/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "../core/Camera";

/**
 * Interface for camera control
 * @ko 카메라 컨트롤의 인터페이스
 */
interface CameraControl {
  /**
   * Whether this control is enabled or not
   * @ko 컨트롤이 활성화되었는지 여부를 나타내는 값
   * @readonly
   * @since 4.0.0
   */
  readonly enabled: boolean;
  /**
   * Whether this control is animating the camera
   * @ko 현재 컨트롤이 동작중인지를 나타내는 값
   * @readonly
   * @since 4.0.0
   */
  readonly animating: boolean;
  /**
   * Destroy the instance and remove all event listeners attached.
   * @ko 인스턴스를 삭제하고 부착된 모든 이벤트 리스너를 제거합니다.
   * @since 4.0.0
   */
  destroy(): void;
  /**
   * Synchronize this control's state to current camera state
   * @ko 컨트롤을 카메라의 현재 상태와 동기화합니다.
   * @param camera - Camera's instance {@ko 카메라 인스턴스}
   * @since 4.0.0
   */
  sync(camera: Camera): void;
  /**
   * Enable this control and add event listeners.
   * @ko 컨트롤을 활성화하고 이벤트 리스너들을 추가합니다.
   * @since 4.0.0
   */
  enable(): void;
  /**
   * Disable this control and remove all event listeners
   * @ko 컨트롤을 비활성화하고 모든 이벤트 리스너들을 제거합니다.
   * @since 4.0.0
   */
  disable(): void;
}

export default CameraControl;
