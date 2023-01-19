/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Object3D from "./Object3D";
import ShaderProgram from "./ShaderProgram";
import VertexArrayObject from "./VertexArrayObject";
import Uniform from "../uniform/Uniform";
import WebGLContext from "./WebGLContext";

/**
 * @hidden
 */
class TriangleMesh<T extends Record<string, Uniform> = Record<string, never>> extends Object3D {
  /**
   * @internal
   * Geometry data for projection
   */
  public readonly vao: VertexArrayObject;
  /**
   * @internal
   * Material(shader) data for projection
   */
  public readonly program: ShaderProgram<T>;

  public constructor(vao: VertexArrayObject, program: ShaderProgram<T>) {
    super();

    this.vao = vao;
    this.program = program;
  }

  public destroy(ctx: WebGLContext) {
    ctx.releaseVAO(this.vao);
    ctx.releaseShaderResources(this.program);
  }
}

export default TriangleMesh;
