/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Camera } from "../core";

/**
 * @interface
 * @internal
 */
interface CameraControl {
  readonly enabled: boolean;
  readonly animating: boolean;
  destroy(): void;
  sync(camera: Camera): void;
  update(delta: number): void;
  enable(element: HTMLElement): void;
  disable(): void;
}

export default CameraControl;
