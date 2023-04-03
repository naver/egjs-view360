/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { mat4, quat, vec3 } from "gl-matrix";
import { OBJECT_3D_EVENTS } from "../const/internal";
import Camera from "./Camera";

/**
 * Context interface used for object update
 * @internal
 */
interface ObjectUpdateContext {
  camera: Camera;
}

/**
 * Base class for 3D objects
 * @ko 3D 오브젝트의 베이스 클래스
 * @since 4.0.0
 * @internal
 */
class Object3D extends Component<{
  [OBJECT_3D_EVENTS.UPDATE]: {
    camera: Camera
  };
}> {
  /**
   * Local matrix of the object
   * @ko 오브젝트의 local matrix
   * @since 4.0.0
   */
  public matrix: mat4;
  /**
   * Rotation quaternion
   * @ko 현재 오브젝트의 회전을 나타내는 사원수 값
   * @since 4.0.0
   */
  public rotation: quat;
  /**
   * Position of the object
   * @ko 오브젝트의 위치
   * @since 4.0.0
   */
  public position: vec3;
  /**
   * A scale vector of the object
   * @ko 오브젝트가 각 축으로 확대된 정도를 나타내는 벡터
   * @since 4.0.0
   */
  public scale: vec3;

  /**
   * Create new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   */
  public constructor() {
    super();

    this.matrix = mat4.create();
    this.rotation = quat.create();
    this.position = vec3.fromValues(0, 0, 0);
    this.scale = vec3.fromValues(1, 1, 1);
  }

  /**
   * Update local matrix of the object.
   * @ko 오브젝트의 local matrix를 갱신합니다.
   * @since 4.0.0
   */
  public updateMatrix() {
    mat4.fromRotationTranslationScale(this.matrix, this.rotation, this.position, this.scale);
  }

  public update(ctx: ObjectUpdateContext) {
    this.trigger(OBJECT_3D_EVENTS.UPDATE, ctx);
  }
}

export default Object3D;
