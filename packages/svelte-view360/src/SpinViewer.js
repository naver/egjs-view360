import { withSpinViewerMethods } from "@egjs/view360";

import SpinViewer from "./SpinViewer.svelte";

withSpinViewerMethods(SpinViewer.prototype, "vanillaSpinViewer");

export default SpinViewer;

