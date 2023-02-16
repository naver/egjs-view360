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
import UniformCanvasCube from "../uniform/UniformCanvasCube";
import UniformTexture2D from "../uniform/UniformTexture2D";
import UniformTextureCube from "../uniform/UniformTextureCube";

type CommonProjectionUniforms = {
  uTexture: UniformTexture2D | UniformTextureCube | UniformCanvasCube;
}

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
abstract class Projection<T extends CommonProjectionUniforms = CommonProjectionUniforms> {
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

  protected _mesh: TriangleMesh<T> | null;

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
    this._mesh = null;
  }

  /**
   * Apply texture to current projection.
   * @ko 주어진 텍스쳐를 현재 프로젝션에 적용합니다.
   * @param ctx - Instance of the WebGLContext helper {@ko WebGL context 헬퍼의 인스턴스}
   * @param texture - New texture to apply {@ko 새로 적용할 텍스쳐}
   * @internal
   * @since 4.0.0
   */
  public abstract applyTexture(ctx: WebGLContext, texture: Texture): void;

  /**
   * Release all resources projection has.
   * This is automatically called on projection change & View360's destroy call
   * @ko 현재 갖고 있는 모든 리소스를 반환합니다.
   * 이 메소드는 프로젝션 변경 및 View360의 destroy 호출 시 자동으로 호출됩니다.
   * @param ctx
   */
  public releaseAllResources(ctx: WebGLContext) {
    this._mesh?.destroy(ctx);
  }

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

  /**
   * Update projection.
   * @ko 현재 프로젝션 정보를 갱신합니다.
   * @param camera - Instance of the camera to reference {@ko 참조할 카메라의 인스턴스}
   * @since 4.0.0
   */
  public update(camera: Camera) {} // eslint-disable-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars

  /**
   * Return active texture.
   * @ko 현재 활성화된 텍스쳐를 반환합니다.
   * @internal
   * @since 4.0.0
   */
  public getTexture() {
    if (!this._mesh) return null;

    return this._mesh.program.uniforms.uTexture.texture;
  }

  /**
   * A 3D triangle mesh for projection. It's `null` until loading the `src`.
   * @ko Projection을 표시하기 위한 Mesh, src를 로드하기 전까지는 `null`입니다.
   * @since 4.0.0
   */
  public getMesh(): TriangleMesh<T> | null {
    return this._mesh;
  }
}

export default Projection;
