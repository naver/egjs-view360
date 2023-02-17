import React from "react";
import renderer from "react-test-renderer";
import { View360Options } from "@egjs/view360";
import ReactView360 from "../src/View360";

export const createView360 = async (options: Partial<View360Options & { children: HTMLElement[] }> = {}): Promise<ReactView360> => {
  const component = renderer.create(
    <ReactView360 {...options} />,
    {
      createNodeMock: () => {
        const container = document.createElement("div");
        const canvas = document.createElement("canvas");

        container.classList.add("view360-container");
        canvas.classList.add("view360-canvas");
        container.appendChild(canvas);

        return container;
      }
    }
  );

  return component.getInstance();
};
