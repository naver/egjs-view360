/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4 } from "gl-matrix";
import WebGLRenderer from "../renderer/WebGLRenderer";
import Renderable from "../type/Renderable";

/**
 *
 */
class Entity implements Renderable {
  private _parent: Entity | null;
  private _children: Entity[];
  private _localMatrix: mat4;
  private _worldMatrix: mat4;

  public constructor() {
    this._parent = null;
    this._children = [];
    this._localMatrix = mat4.create();
    this._worldMatrix = mat4.create();
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

  public render(renderer: WebGLRenderer) {
    this._children.forEach(child => {
      child.render(renderer);
    });
  }
}

export default Entity;
