import Component from "@egjs/component";
import View360 from "../View360";

/**
 * @hidden
 */
const withMethods = (prototype: any, attr: string) => {
  [Component.prototype, View360.prototype].forEach(proto => {
    Object.getOwnPropertyNames(proto)
      .filter(name => name.charAt(0) !== "_" && name !== "constructor")
      .forEach((name: string) => {
        const descriptor = Object.getOwnPropertyDescriptor(proto, name)!;

        if (descriptor.value) {
          // Public Function
          Object.defineProperty(prototype, name, {
            value: function(...args) {
              return descriptor.value.call(this[attr], ...args);
            }
          });
        } else {
          const getterDescriptor: { get?: () => any; set?: (val: any) => void } = {};
          if (descriptor.get) {
            getterDescriptor.get = function() {
              return this[attr] && descriptor.get?.call(this[attr]);
            };
          }
          if (descriptor.set) {
            getterDescriptor.set = function(...args) {
              return descriptor.set?.call(this[attr], ...args);
            };
          }

          Object.defineProperty(prototype, name, getterDescriptor);
        }
      });
  });
};

export default withMethods;
