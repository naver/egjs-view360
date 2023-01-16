import View360 from "@egjs/view360";

export const optionNames = Object.getOwnPropertyNames(View360.prototype)
  .filter(name => {
    const descriptor = Object.getOwnPropertyDescriptor(View360.prototype, name);

    if (name.startsWith("_")) return false;
    if (name === "constructor") return false;
    if (descriptor?.value) return false;

    return true;
  });

export const setterNames = optionNames
  .filter(name => {
    const descriptor = Object.getOwnPropertyDescriptor(View360.prototype, name);

    return !!descriptor!.set;
  });
