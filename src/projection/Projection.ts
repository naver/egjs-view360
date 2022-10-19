/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ShaderProgram from "../core/ShaderProgram";
import Camera from "../core/Camera";
import Entity from "../core/Entity";
import VertexArrayObject from "../core/VertexArrayObject";
import WebGLRenderer from "../renderer/WebGLRenderer";
import Uniform from "../uniform/Uniform";

/** */
class Projection<T extends Record<string, Uniform> = Record<string, Uniform>> extends Entity {
  protected _vao: VertexArrayObject;
  protected _program: ShaderProgram<T>;

  public constructor(vao: VertexArrayObject, program: ShaderProgram<T>) {
    super();

    this._vao = vao;
    this._program = program;
  }

  public render(renderer: WebGLRenderer, camera: Camera) {
    const ctx = renderer.ctx;

    ctx.useProgram(this._program);
    ctx.updateCommonUniforms(this, camera, this._program);
    ctx.updateUniforms(this._program);
    ctx.drawVAO(this._vao);

    super.render(renderer, camera);
  }
}

export default Projection;
