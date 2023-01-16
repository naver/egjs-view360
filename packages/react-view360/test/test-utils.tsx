import React from "react";
import renderer from "react-test-renderer";
import ReactView360 from "../src/View360";
import { View360Options } from "@egjs/view360";

export const createView360 = async (options: Partial<View360Options & { children: HTMLElement[] }> = {}): Promise<View360> => {
  const component = renderer.create(
    <ReactView360 {...options} />,
  );

  return component;
};
