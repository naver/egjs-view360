/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import CLICommand from "./CLICommand";
import MDXGenerator from "./MDXGenerator";
import TypeDocRunner from "./TypeDocRunner";

const main = async () => {
  const command = new CLICommand();
  const options = command.getOptions();
  const runner = new TypeDocRunner({
    typedoc: options.typedoc,
    tsconfig: options.tsconfig
  });

  const projectRoot = await runner.run();
  const mdxGenerator = new MDXGenerator(projectRoot, options);

  mdxGenerator.writeDocuments();
};

main();
