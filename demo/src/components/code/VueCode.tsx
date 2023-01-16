import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ vue, options, serializer }) => {
  const { projection, projectionOptions } = options["projection"];

  const importTxt = `import { View360, ${projection} } from "@egjs/${vue}-view360";`;

  return <CodeBlock className="language-html">{`<template>
  <View360 ${serializer.serializeVue(options, 2, 1)} />
</template>
<script>
${importTxt}

export default {
  created() {
    this.projection = new ${projection}(${serializer.serialize(projectionOptions, 2, 2)});
  },
  components: {
    View360
  }
}
</script>`
  }</CodeBlock>
}
