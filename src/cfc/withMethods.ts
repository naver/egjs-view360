import Component from "@egjs/component";

const withMethods = (component: any, prototype: any, vanillaInstance: string) => {
  [Component.prototype, component.prototype].forEach(proto => {
    Object.getOwnPropertyNames(proto).filter(name => !prototype[name] && !name.startsWith("_") && name !== "constructor")
      .forEach((name: string) => {
        const descriptor = Object.getOwnPropertyDescriptor(proto, name)!;

        if (descriptor.value) {
          // Public Function
          Object.defineProperty(prototype, name, {
            value: function(...args) {
              return descriptor.value.call(this[vanillaInstance], ...args);
            }
          });
        } else {
          const getterDescriptor: { get?: () => any; set?: (val: any) => void } = {};
          if (descriptor.get) {
            getterDescriptor.get = function() {
              return descriptor.get?.call(this[vanillaInstance]);
            };
          }
          if (descriptor.set) {
            getterDescriptor.set = function(...args) {
              return descriptor.set?.call(this[vanillaInstance], ...args);
            };
          }

          Object.defineProperty(prototype, name, getterDescriptor);
        }
      });
  });
};

export default withMethods;
