import PanoViewerElement from "../PanoViewerElement";

customElements.define("pano-viewer", PanoViewerElement);

declare global {
  interface HTMLElementTagNameMap {
    "pano-viewer": PanoViewerElement;
  }
}
