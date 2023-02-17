import { render } from "@testing-library/vue";
import { View360Options } from "@egjs/view360";
import VueView360 from "../../src/View360";

export const createView360 = async (options: Partial<View360Options & { children: HTMLElement[] }> = {}) => {
  const result = render(VueView360, {
    props: options
  });

  console.log(result);

  return result;
};
