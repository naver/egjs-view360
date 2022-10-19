/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4 } from "gl-matrix";
import Camera from "./Camera";
import WebGLRenderer from "../renderer/WebGLRenderer";
import { Renderable } from "../type/internal";
import { findIndex } from "../utils";

/**
 * Base class for 3D objects
 */
class Entity implements Renderable {
  public localMatrix: mat4;
  public worldMatrix: mat4;
  public parent: Entity | null;
  public children: Entity[];

  public constructor() {
    this.localMatrix = mat4.create();
    this.worldMatrix = mat4.create();

    this.parent = null;
    this.children = [];
  }

  public destroy() {
    this.parent = null;
    this.children = [];
  }

  public add(...childs: Entity[]) {
    this.children.push(...childs);

    for (const child of childs) {
      child.parent = this;
    }
  }

  public remove(...childs: Entity[]) {
    const children = this.children;

    for (const child of childs) {
      const childIdx = findIndex(children, val => val === child);

      if (childIdx >= 0) {
        children.splice(childIdx, 1);
      }

      child.parent = null;
    }
  }

  public render(renderer: WebGLRenderer, camera: Camera) {
    this.children.forEach(child => {
      child.render(renderer, camera);
    });
  }
}

export default Entity;
