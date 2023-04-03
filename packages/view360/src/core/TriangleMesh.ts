/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Object3D from "./Object3D";
import ShaderProgram from "./ShaderProgram";
import VertexArrayObject from "./VertexArrayObject";
import WebGLContext from "./WebGLContext";
import UniformCanvasCube from "../uniform/UniformCanvasCube";
import UniformTexture2D from "../uniform/UniformTexture2D";
import UniformTextureCube from "../uniform/UniformTextureCube";

type CommonProjectionUniforms = {
  uTexture: UniformTexture2D | UniformTextureCube | UniformCanvasCube;
}

/**
 * @hidden
 */
class TriangleMesh<T extends CommonProjectionUniforms = CommonProjectionUniforms> extends Object3D {
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

  public getTexture() {
    return this.program.uniforms.uTexture.texture;
  }
}

export default TriangleMesh;
