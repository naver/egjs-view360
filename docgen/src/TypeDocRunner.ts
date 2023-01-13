/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";

interface TypeDocRunnerOptions {
  typedoc?: string;
  tsconfig?: string;
}

class TypeDocRunner {
  private _app: TypeDoc.Application;

  public constructor(params: TypeDocRunnerOptions) {
    this._app = this._createTypeDocApp(params);
  }

  public async run() {
    const project = this._app.convert();

    if (!project) throw new Error("Failed to create project reflections");

    return project;
  }

  private _createTypeDocApp(params: TypeDocRunnerOptions) {
    const app = new TypeDoc.Application();

    app.options.addReader(new TypeDoc.TSConfigReader());
    app.options.addReader(new TypeDoc.TypeDocReader());

    app.bootstrap({
      options: params.typedoc ?? "./typedoc.json",
      tsconfig: params.tsconfig ?? "./tsconfig.json"
    });

    return app;
  }
}

export default TypeDocRunner;
