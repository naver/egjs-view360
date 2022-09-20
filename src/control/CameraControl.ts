/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "../core/Camera";

/**
 * @interface
 * @internal
 */
interface CameraControl {
  readonly enabled: boolean;
  readonly animating: boolean;
  destroy(): void;
  resize(size: { width: number; height: number }): void;
  update(camera: Camera, delta: number): void;
  enable(element: HTMLElement): void;
  disable(): void;
  sync(camera: Camera): void;
}

export default CameraControl;
