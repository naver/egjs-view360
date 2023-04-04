/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "../core/Camera";
import PanoControl from "../control/PanoControl";
import TriangleMesh from "../core/TriangleMesh";
import Texture from "../texture/Texture";
import WebGLContext from "../core/WebGLContext";
import { VideoConfig } from "../type/external";

/**
 * Common option for {@link Projection}s
 * @ko {@link Projection}을 위한 공통 옵션들
 * @category Projection
 * @since 4.0.0
 */
export interface ProjectionOptions {
  /**
   * @copy Projection#src
   */
  src: string | HTMLElement | Array<string | HTMLElement>;
  /**
   * @copy Projection#video
   */
  video?: boolean | Partial<VideoConfig>;
}

/**
 * Base class for projections.
 * @ko 프로젝션 베이스 클래스.
 * @category Projection
 * @since 4.0.0
 */
abstract class Projection {
  /**
   * Source URL to panorama image/video.
   * @ko 파노라마 이미지/비디오의 URL
   * @since 4.0.0
   */
  public readonly src: ProjectionOptions["src"];
  /**
   * Properties for the video element.
   * Setting `false` will treat panorama source as an image, `true` will use default properties.
   * @ko 비디오 엘리먼트에 설정할 프로퍼티를 담는 객체.
   * @since 4.0.0
   * @example
   * Default properties
   * ```ts
   * autoplay: true
   * muted: true
   * loop: false
   * volume: 1
   * ```
   */
  public readonly video: ProjectionOptions["video"];

  /**
   * Create new instance
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    src,
    video = false
  }: ProjectionOptions) {
    this.src = src;
    this.video = video;
  }

  /**
   * Generate triangle mesh from current projection.
   * @ko 현재 프로젝션으로부터 TriangleMesh의 인스턴스를 생성합니다.
   * @param ctx - Instance of the WebGLContext helper {@ko WebGL context 헬퍼의 인스턴스}
   * @param texture - New texture to apply {@ko 새로 적용할 텍스쳐}
   * @internal
   * @since 4.0.0
   */
  public abstract createMesh(ctx: WebGLContext, texture: Texture): TriangleMesh;

  /**
   * Update camera to match projection's settings.
   * @ko 현재 프로젝션의 세팅으로 카메라를 업데이트합니다.
   * @param camera - Instance of the camera to update {@ko 업데이트할 카메라의 인스턴스}
   * @since 4.0.0
   */
  public updateCamera(camera: Camera) {
    // Use default mode & no view restriction
    camera.resetRange();
  }

  /**
   * Update control to match projection's settings.
   * @ko 현재 프로젝션의 세팅으로 컨트롤을 업데이트합니다.
   * @param control - Instance of the control to update {@ko 업데이트할 컨트롤의 인스턴스}
   * @since 4.0.0
   */
  public updateControl(control: PanoControl) {
    control.ignoreZoomScale = false;
  }
}

export default Projection;
