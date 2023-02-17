import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ options, serializer }) => {
  const { projection } = options["projection"];

  const importTxt = `import View360, { ${projection} } from "@egjs/view360";`;

  return <CodeBlock className="language-jsx">{
    `${importTxt}\n\nconst viewer = new View360("#ID_OF_YOUR_CONTAINER", ${serializer.serialize(options, 4)});`
  }</CodeBlock>
}
