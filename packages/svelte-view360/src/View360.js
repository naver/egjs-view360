import { withMethods } from "@egjs/view360";

import View360 from "./View360.svelte";

if (View360.prototype) {
  withMethods(View360.prototype, "view360");
}

export default View360;
