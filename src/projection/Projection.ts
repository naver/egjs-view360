/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ShaderProgram from "../core/ShaderProgram";
import Camera from "../core/Camera";
import Entity from "../core/Entity";
import WebGLRenderer from "../renderer/WebGLRenderer";
import VertexArrayObject from "../core/VertexArrayObject";

/** */
class Projection extends Entity {
  protected _uniforms: Record<string, any>;
  protected _vao: VertexArrayObject;
  protected _program: ShaderProgram;

  public constructor(vao: VertexArrayObject, program: ShaderProgram) {
    super();

    this._vao = vao;
    this._program = program;
  }

  public render(renderer: WebGLRenderer, camera: Camera) {
    const ctx = renderer.ctx;

    ctx.useProgram(this._program);
    ctx.updateCommonUniforms(this, camera, this._program);
    ctx.updateUniforms(this, camera, this._program);
    ctx.drawVAO(this._vao);

    super.render(renderer, camera);
  }
}

export default Projection;
