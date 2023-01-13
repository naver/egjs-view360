/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { quat } from "gl-matrix";
import Camera from "./Camera";
import Motion from "./Motion";
import { DEFAULT_ANIMATION_DURATION, DEFAULT_EASING } from "../const/internal";
import { lerp } from "../utils";

type CameraPose = {
  rotation: quat;
  zoom: number;
}

/**
 * Animation of the {@link Camera}
 * @internal
 * @ko {@link Camera}의 애니메이션
 * @since 4.0.0
 */
class CameraAnimation {
  // Options
  private _camera: Camera;
  private _from: CameraPose;
  private _to: CameraPose;

  // Internal values
  private _motion: Motion;
  private _finishPromise: Promise<void>;
  private _finish: () => void;

  /**
   * Duration of the animation
   * @ko 애니메이션 재생시간
   * @since 4.0.0
   */
  public get duration() { return this._motion.duration; }
  public set duration(val: number) { this._motion.duration = val; }
  /**
   * Easing function of the animation
   * @ko 애니메이션의 easing function
   * @since 4.0.0
   */
  public get easing() { return this._motion.easing; }
  public set easing(val: (x: number) => number) { this._motion.easing = val; }

  /**
   * Create new instance
   * @ko 새로운 인스턴스를 생성합니다.
   * @param camera - Camera to animate {@ko 애니메이션을 적용할 카메라}
   * @param from - Start pose {@ko 애니메이션이 시작 시점의 카메라의 회전 및 줌}
   * @param to - End pose {@ko 애니메이션이 끝났을 때 카메라의 회전 및 줌}
   * @param options - Options {@ko 옵션들}
   * @param options.duration - Animation duration {@ko 애니메이션 재생 시간}
   * @param options.easing - Animation easing function {@ko 애니메이션 easing function}
   */
  public constructor(camera: Camera, from: CameraPose, to: CameraPose, {
    duration = DEFAULT_ANIMATION_DURATION,
    easing = DEFAULT_EASING
  } = {}) {
    this._camera = camera;
    this._motion = new Motion({ duration, easing, range: { min: 0, max: 1 } });
    this._from = from;
    this._to = to;
    this._finishPromise = new Promise(resolve => {
      this._finish = resolve as () => void;
    });

    // Enable motion
    this._motion.setNewEndByDelta(1);
  }

  /**
   * Return a promise that resolved on animation end.
   * @ko 애니메이션 재생이 끝났을 때 resolve되는 Promise를 반환합니다.
   * @since 4.0.0
   */
  public getFinishPromise() {
    return this._finishPromise;
  }

  /**
   * Update animation by given deltaTime.
   * @ko 주어진 시간만큼 애니메이션을 업데이트합니다.
   * @param deltaTime Number of milisec to update {@ko 업데이트할 시간, 밀리초 단위}
   * @since 4.0.0
   */
  public update(deltaTime: number): void {
    const camera = this._camera;
    const from = this._from;
    const to = this._to;
    const motion = this._motion;
    motion.update(deltaTime);

    // Progress that easing is applied
    const progress = motion.val;
    const rotation = quat.create();
    const zoom = lerp(from.zoom, to.zoom, progress);

    quat.slerp(rotation, from.rotation, to.rotation, progress);
    camera.rotate(rotation, zoom);

    if (progress >= 1) {
      this._finish();
    }
  }
}

export default CameraAnimation;
