import { withPanoViewerMethods } from "@egjs/view360";

import PanoViewer from "./PanoViewer.svelte";

withPanoViewerMethods(PanoViewer.prototype, "vanillaPanoViewer");

export default PanoViewer;

