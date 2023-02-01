import React from "react";
import renderer from "react-test-renderer";
import { JSDOM } from "jsdom";
import { View360Options } from "@egjs/view360";
import ReactView360 from "../src/View360";

export const createView360 = async (options: Partial<View360Options & { children: HTMLElement[] }> = {}): Promise<ReactView360> => {
  const component = renderer.create(
    <ReactView360 {...options} />,
    {
      createNodeMock: () => {
        return new JSDOM(`
          <div className="view360-container">
            <canvas className="view360-canvas" />
          </div>
        `);
      }
    }
  );

  return component;
};
