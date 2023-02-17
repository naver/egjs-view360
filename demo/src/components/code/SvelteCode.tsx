import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ options, serializer }) => {
  const { projection, projectionOptions } = options["projection"];

  const importTxt = [
    `import View360, { ${projection} } from "@egjs/svelte-view360";`
  ].join("\n");

  return <CodeBlock className="language-html">{`<script>
${importTxt}

const projection = new ${projection}(${serializer.serialize(projectionOptions, 2)});
</script>
<View360 ${serializer.serializeJSX(options, 2)} />`
}</CodeBlock>;
}
