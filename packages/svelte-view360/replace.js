import View360 from "@egjs/view360";

const options = Object.getOwnPropertyNames(View360.prototype)
  .filter(name => {
    const descriptor = Object.getOwnPropertyDescriptor(View360.prototype, name);

    if (name.startsWith("_")) return false;
    if (descriptor?.value) return false;

    return true;
  });

export default [
  ["__DECLARE_PROPS__", options.map(opt => `export let ${opt} = undefined;`).join("\n")]
];
