/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360 from "../View360";

/**
 * A plugin interface for {@link View360}
 * @ko {@link View360}의 플러그인 인터페이스
 * @since 4.0.0
 * @category Plugin
 */
interface View360Plugin {
  /**
   * Initialize plugin.
   * @ko 플러그인을 초기화합니다.
   * @param viewer - A instance of viewer to attach plugin {@ko 플러그인을 부착할 뷰어의 인스턴스}
   * @since 4.0.0
   */
  init(viewer: View360): void;
  /**
   * Destroy plugin and release all resources & event handlers.
   * @ko 플러그인을 제거하고 할당된 모든 리소스 및 이벤트 핸들러를 제거합니다.
   * @param viewer - A instance of viewer to detach plugin {@ko 플러그인을 떼어 낼 뷰어의 인스턴스}
   * @since 4.0.0
   */
  destroy(viewer: View360): void;
}

export default View360Plugin;
