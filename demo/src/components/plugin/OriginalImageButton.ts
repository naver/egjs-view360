/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360, { ControlBar, ControlBarItem, ControlBarItemOptions } from "../../../../packages/view360/src";

class OriginalImageButton extends ControlBarItem {
  public readonly element: HTMLElement;

  private _modalEl: HTMLElement;
  private _viewer: View360 | null;

  /** */
  public constructor({
    position = ControlBar.POSITION.MAIN_RIGHT,
    order = 0
  }: Partial<ControlBarItemOptions> = {}) {
    super({
      position,
      order
    });


    this.element = document.createElement("button");
    this.element.classList.add("demo-controls-orig-image");
    this.element.title = "Show original image/video";

    this._modalEl = document.createElement("div");
    this._modalEl.classList.add("demo-viewer-modal");
    this._modalEl.addEventListener("click", this._toggleModal);

    this._viewer = null;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const element = this.element;
    const btnClass = controlBar.className.CONTROLS_BUTTON;

    element.classList.add(btnClass);
    element.addEventListener("click", this._toggleModal);
    this._attachModal(viewer.root);

    this._viewer = viewer;
  }

  public destroy(viewer: View360, controlBar: ControlBar) {
    const element = this.element;
    const btnClass = controlBar.className.CONTROLS_BUTTON;

    element.classList.remove(btnClass);
    element.removeEventListener("click", this._toggleModal);
    this._detachModal(viewer.root);
    this._clearModal();

    this._viewer = null;
  }

  private _toggleModal = () => {
    const viewer = this._viewer;
    const modal = this._modalEl;
    modal.classList.toggle("visible");

    if (!viewer || !viewer.projection) return;

    const visible = modal.classList.contains("visible");

    if (!visible) {
      return this._clearModal();
    }

    const src = viewer.projection.src as string | string[];
    const srcArr = Array.isArray(src) ? src : [src];
    const isVideo = !!viewer.projection.video;

    srcArr.forEach(url => {
      const contentEl = isVideo
        ? document.createElement("video")
        : document.createElement("img");
      contentEl.classList.add("content");
      contentEl.src = url;

      if (isVideo) {
        contentEl.addEventListener("click", evt => {
          evt.stopPropagation();
        });
        (contentEl as HTMLVideoElement).controls = true;
      }

      modal.appendChild(contentEl);
    });
  };

  private _clearModal = () => {
    const modal = this._modalEl;

    while (modal.firstChild) {
      if (modal.firstChild instanceof HTMLVideoElement) {
        const video = modal.firstChild;

        video.pause();
        video.removeAttribute("src");
        video.load();
      }

      modal.removeChild(modal.firstChild);
    }
  }

  private _attachModal(element: HTMLElement) {
    element.appendChild(this._modalEl);
  }

  private _detachModal(element: HTMLElement) {
    if (this._modalEl.parentElement === element) {
      element.removeChild(this._modalEl);
    }
  }
}

export default OriginalImageButton;
