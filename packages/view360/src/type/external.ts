/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export * from "./events";

/**
 * Config for the video source, mainly standard attributes for the video element.
 * @ko 비디오 타입의 파노라마 소스에 적용할 옵션, 대부분 비디오 엘리먼트의 어트리뷰트에 적용할 값들입니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes
 * @since 4.0.0
 */
export interface VideoConfig {
  /**
   * Whether to initially set video silenced.
   * :::caution
   * This should be `true` to enable {@link VideoConfig#autoplay}.
   * :::
   * @ko 비디오를 음소거한 상태로 재생을 시작할지 여부.
   * :::caution
   * {@link VideoConfig#autoplay}를 사용하기 위해서는 반드시 `true`로 설정되어야 합니다.
   * :::
   * @since 4.0.0
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-muted
   */
  muted: boolean;
  /**
   * If `true`, the browser will automatically seek back to the start upon reaching the end of the video.
   * @ko `true`일 경우 비디오가 끝날 때 자동으로 처음부터 다시 재생합니다.
   * @since 4.0.0
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-loop
   */
  loop: boolean;
  /**
   * If `true`, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.
   * :::caution
   * {@link VideoConfig#muted} should be `true` to enable this option.
   * :::
   * @ko `true`일 경우, 뷰어가 로딩된 다음에 바로 비디오를 재생합니다.
   * :::caution
   * {@link VideoConfig#muted}가 `true`여야만 사용 가능합니다.
   * :::
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-autoplay
   */
  autoplay: boolean;
  /**
   * Initial volume. (0~1)
   * @ko 비디오 초기화시 적용할 볼륨값. (0~1)
   * @since 4.0.0
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume
   */
  volume: number;
}
