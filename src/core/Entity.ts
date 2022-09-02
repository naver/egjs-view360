/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4 } from "gl-matrix";
import Camera from "./Camera";
import WebGLRenderer from "../renderer/WebGLRenderer";
import Renderable from "../type/Renderable";

/**
 *
 */
class Entity implements Renderable {
  public localMatrix: mat4;
  public worldMatrix: mat4;

  private _parent: Entity | null;
  private _children: Entity[];

  public constructor() {
    this.localMatrix = mat4.create();
    this.worldMatrix = mat4.create();

    this._parent = null;
    this._children = [];
  }

  public destroy() {
    this._parent = null;
    this._children = [];
  }

  public add(...childs: Entity[]) {
    this._children.push(...childs);

    childs.forEach(child => {
      child._parent = this;
    });
  }

  public render(renderer: WebGLRenderer, camera: Camera) {
    this._children.forEach(child => {
      child.render(renderer, camera);
    });
  }
}

export default Entity;
