import SpinViewerElement from "../SpinViewerElement";

customElements.define("spin-viewer", SpinViewerElement);

declare global {
  interface HTMLElementTagNameMap {
    "spin-viewer": SpinViewerElement;
  }
}
