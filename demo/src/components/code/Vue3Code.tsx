import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ options, serializer }) => {
  const { projection, projectionOptions } = options["projection"];

  const importTxt = `import { View360, ${projection} } from "@egjs/vue3-view360";`;

  return <CodeBlock className="language-html">{`<template>
  <View360 ${serializer.serializeVue(options, 2, 1)} />
</template>
<script>
import { defineComponent } from "vue";
${importTxt}

export default {
  setup() {
    const projection = new ${projection}(${serializer.serialize(projectionOptions, 2, 2)});

    return {
      projection
    }
  },
  components: {
    View360
  }
}
</script>`
  }</CodeBlock>;
};
