/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4, quat, vec3 } from "gl-matrix";

/**
 * Base class for 3D objects
 * @ko 3D 오브젝트의 베이스 클래스
 * @since 4.0.0
 * @internal
 */
class Object3D {
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
}

export default Object3D;
