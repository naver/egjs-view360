import { VIEW360_METHODS, EVENTS } from "@egjs/view360";
import { VueView360Events } from "./types";

export const VUE_VIEW360_METHODS = VIEW360_METHODS.reduce((methods, name) => {
  methods[name] = function (this: any, ...args: any[]) {
    return this.view360[name](...args);
  };

  return methods;
}, {} as Record<string, any>);

export const VUE_VIEW360_EVENTS = Object.keys(EVENTS).reduce((events, evtKey) => {
  const evtName = EVENTS[evtKey as keyof typeof EVENTS];
  const kebabEvtName = evtName.replace(/([A-Z])/g, "-$1").toLowerCase();

  (events as any)[kebabEvtName] = function () {
    return true;
  };

  return events;
}, {} as VueView360Events);
