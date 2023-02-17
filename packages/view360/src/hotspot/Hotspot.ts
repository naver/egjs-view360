/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { vec3 } from "gl-matrix";

/**
 * Hotspot data
 * @ko 핫스팟 데이터
 * @since 4.0.0
 */
class Hotspot {
  /**
   * HTMLElement of the hotspot
   * @ko 핫스팟의 HTMLElement
   * @since 4.0.0
   */
  public readonly element: HTMLElement;
  /**
   * Position to render hotspot
   * @ko 핫스팟을 렌더링할 위치
   * @since 4.0.0
   */
  public readonly position: vec3;

  public constructor(element: HTMLElement, position: vec3) {
    this.element = element;
    this.position = position;
  }
}

export default Hotspot;
