/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ControlBar from "./ControlBar";
import View360 from "../../View360";

/**
 * Common options for {@link ControlBarItem}
 * @ko {@link ControlBarItem}의 공통 옵션들
 * @category Plugin
 * @since 4.0.0
 */
export interface ControlBarItemOptions {
  /**
   * @copy ControlBarItem#position
   */
  position: typeof ControlBar.POSITION[keyof typeof ControlBar.POSITION];
  /**
   * @copy ControlBarItem#order
   */
  order: number;
}

/**
 * Interface of the ControlBar items
 * @ko 컨트롤바 아이템의 인터페이스
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
abstract class ControlBarItem {
  /**
   * Element of the item.
   * @ko 아이템의 엘리먼트
   * @since 4.0.0
   */
  public abstract element: HTMLElement;

  /**
   * Position to display item.
   * @ko 아이템을 표시할 위치.
   * @since 4.0.0
   */
  public position: ControlBarItemOptions["position"];
  /**
   * Order within the same position.
   * The lowest one will be shown first.
   * @ko 동일한 position 내에서의 순서, 작을수록 먼저 표시됩니다.
   * @since 4.0.0
   */
  public order: ControlBarItemOptions["order"];

  /**
   * Create new instance of the ControlBarItem
   * @ko ControlBarItem의 새로운 인스턴스를 생성합니다.
   * @param options Options {@ko 옵션들}
   */
  public constructor(options: ControlBarItemOptions) {
    this.position = options.position;
    this.order = options.order;
  }

  /**
   * Initialize item.
   * @ko 아이템을 초기화합니다.
   * @param viewer - A instance of viewer to attach item {@ko 아이템을 부착할 뷰어의 인스턴스}
   * @param controlBar - A instance of control bar to attach item {@ko 아이템을 부착할 컨트롤바의 인스턴스}
   * @since 4.0.0
   */
  public abstract init(viewer: View360, controlBar: ControlBar): any;
  /**
   * Destroy item and release all resources & event handlers.
   * @ko 아이템을 제거하고 할당된 모든 리소스 및 이벤트 핸들러를 제거합니다.
   * @param viewer - A instance of viewer to detach item {@ko 아이템을 떼어 낼 뷰어의 인스턴스}
   * @param controlBar - A instance of control bar to detach item {@ko 아이템을 떼어 낼 컨트롤바의 인스턴스}
   * @since 4.0.0
   */
  public abstract destroy(viewer: View360, controlBar: ControlBar): any;
}

export default ControlBarItem;
