import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ options, serializer }) => {
  const { projection, projectionOptions } = options["projection"];

  const importTxt = [
    "import { Component } from \"@angular/core\";",
    `import { ${projection} } from "@egjs/ngx-view360";`
  ].join("\n");

  return <CodeBlock className="language-ts">{`${importTxt}

@Component({
  selector: "some-demo-component",
  template: \`
    <ngx-pano-viewer ${serializer.serializeNGX(options, 2, 2)} />
  \`
})
export class View360Demo {
  projection = new ${projection}(${serializer.serialize(projectionOptions, 2, 1)});
}`
  }</CodeBlock>
}
