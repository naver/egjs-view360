import { PANOVIEWER_OPTIONS, SPINVIEWER_OPTIONS } from "@egjs/view360";

export default [
  ["__DECLARE_PANO_PROPS__", Object.keys(PANOVIEWER_OPTIONS).map(opt => `export let ${opt} = undefined;`).join("\n")],
  ["__GET_PANO_PROPS__", `{ ${Object.keys(PANOVIEWER_OPTIONS).join(", ")} }`],
  ["__DECLARE_SPIN_PROPS__", Object.keys(SPINVIEWER_OPTIONS).map(opt => `export let ${opt} = undefined;`).join("\n")]
];
