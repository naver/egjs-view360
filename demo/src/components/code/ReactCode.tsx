import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ options, serializer }) => {
  const { projection, projectionOptions } = options["projection"];

  const importTxt = [
    "import React, { useMemo } from \"react\";",
    `import View360, { ${projection} } from "@egjs/react-view360";`
  ].join("\n");

  return <CodeBlock className="language-jsx">{`${importTxt}

export default () => {
  const projection = useMemo(() => new ${projection}(${serializer.serialize(projectionOptions, 2, 1)}), []);

  return <View360 ${serializer.serializeJSX(options, 2, 1)} />
}`}</CodeBlock>;
}
