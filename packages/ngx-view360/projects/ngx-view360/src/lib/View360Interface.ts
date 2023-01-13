import View360, { withMethods } from "@egjs/view360";

export default class View360Interface {
  @withMethods protected _view360: View360 | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface View360Interface extends View360 { }
