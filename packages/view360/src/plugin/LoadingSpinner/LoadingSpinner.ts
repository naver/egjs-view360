/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360Plugin from "../View360Plugin";
import View360 from "../../View360";
import { EVENTS } from "../../const/external";
import { createElement } from "../../utils";
import { LoadStartEvent } from "../../type/events";

/**
 * Options for {@link LoadingSpinner}
 * @ko {@link LoadingSpinner}용 옵션들
 * @since 4.0.0
 * @category Plugin
 */
export interface LoadingSpinnerOptions {
  /**
   * Override default class names.
   * @ko 디폴트 클래스 이름들을 오버라이드합니다.
   * @since 4.0.0
   */
  className: Partial<{ -readonly [key in keyof typeof LoadingSpinner.DEFAULT_CLASS]: string }>;
}

/**
 * A plugin that displays loading spinner while loading the projection.
 * @ko 프로젝션 로딩중에 로딩 스피너를 보여주는 플러그인
 * @since 4.0.0
 * @category Plugin
 */
class LoadingSpinner implements View360Plugin {
  /**
   * Default class names that LoadingSpinner uses
   * @ko LoadingSpinner가 사용하는 디폴트 클래스 이름
   * @since 4.0.0
   */
  public static readonly DEFAULT_CLASS = {
    /**
     * A class name for the container element
     * @ko 컨테이너 엘리먼트의 클래스 이름
     * @since 4.0.0
     */
    CONTAINER: "view360-spinner",
    /**
     * A class name for the spinning ring element
     * @ko 돌아가는 링 엘리먼트의 클래스 이름
     * @since 4.0.0
     */
    RING: "view360-spinner-ring"
  } as const;

  /**
   * A class names overriding
   * @ko 현재 오버라이드 중인 클래스 이름
   * @since 4.0.0
   */
  public readonly className: LoadingSpinnerOptions["className"];

  private _container: HTMLElement;

  /**
   * Create a new instance of LoadingSpinner. {@ko LoadingSpinner의 새 인스턴스를 생성합니다.}
   * @param options Options {@ko 옵션들}
   */
  public constructor({
    className = {}
  }: Partial<LoadingSpinnerOptions> = {}) {
    this.className = className;
    this._container = this._createElements();
  }

  public init(viewer: View360) {
    viewer.on(EVENTS.LOAD_START, this._startLoading);
  }

  public destroy(viewer: View360): void {
    viewer.off(EVENTS.LOAD_START, this._startLoading);
    this._detachElements({ target: viewer });
  }

  private _startLoading = ({ target: viewer }: LoadStartEvent) => {
    viewer.root.appendChild(this._container);

    if (viewer.initialized) {
      viewer.once(EVENTS.LOAD, this._detachElements);
    } else {
      viewer.once(EVENTS.READY, this._detachElements);
    }
  };

  private _detachElements = ({ target: viewer }: { target: View360 }) => {
    const container = this._container;
    if (!container) return;

    if (container.parentElement === viewer.root) {
      viewer.root.removeChild(container);
    }
  };

  private _createElements() {
    const className = {
      ...this.className,
      ...LoadingSpinner.DEFAULT_CLASS
    };

    const container = createElement(className.CONTAINER);
    const ring = createElement(className.RING);

    container.appendChild(ring);

    return container;
  }
}

export default LoadingSpinner;
