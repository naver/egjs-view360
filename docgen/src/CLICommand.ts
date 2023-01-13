/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import fs from "fs-extra";
import { Command } from "commander";

export interface ProgramOptions {
  config?: string;
  outDir?: string;
  locales?: string[];
  localesDir?: string;
  typedoc?: string;
  tsconfig?: string;
  baseUrl?: string;
}

class CLICommand {
  private _program: Command;

  public constructor() {
    const program = new Command();
    program
      .option("-c, --config <path>", "path to the config file")
      .option("-o, --outDir <path>", "path to the generated mdx files")
      .option("-l, --locales [locales...]", "locales to enable")
      .option("-d, --localesDir <path>", "path to the locales document")
      .option("--typedoc <path>", "path to the typedoc.json")
      .option("--tsconfig <path>", "path to the tsconfig.json");
    program.parse(process.argv);
    this._program = program;
  }

  public getOptions(): ProgramOptions {
    const options = this._program.opts();
    if (options.config) {
      const configFile = fs.readJSONSync(options.config);

      return {
        ...configFile,
        ...options
      };
    } else {
      return options;
    }
  }
}

export default CLICommand;
