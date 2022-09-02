/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ShaderProgram from "../core/ShaderProgram";
import Entity from "../core/Entity";
import WebGLRenderer from "../renderer/WebGLRenderer";
import VertexArrayObject from "../core/VAO";

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

  public render(renderer: WebGLRenderer) {
    renderer.ctx.useProgram(this._program);
    renderer.ctx.drawVAO(this._vao);

    super.render(renderer);
  }
}

export default Projection;
