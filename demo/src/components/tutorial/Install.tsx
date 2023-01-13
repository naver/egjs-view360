import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";
import {
  IconBrandNpm,
  IconBrandReact,
  IconBrandAngular,
  IconBrandVue,
  IconBrandSvelte
} from "@tabler/icons";
import IconBrandYarn from "@site/static/icon/yarn.svg";

export default () => <Tabs
  groupId="pm"
  defaultValue="npm"
  lazy={true}
  values={[
    {
      label: <div className="framework-wrapper">
        <IconBrandNpm width="18" height="18" /> NPM
      </div> as any,
      value: "npm",
      attributes: {
        "data-framework": "npm"
      }
    },
    {
      label: <div className="framework-wrapper">
        <IconBrandYarn width="18" height="18" /> Yarn
      </div> as any,
      value: "yarn",
      attributes: {
        "data-framework": "yarn"
      }
    },
    {
      label: <div className="framework-wrapper">
        <IconBrandReact width="18" height="18" /> React
      </div> as any,
      value: "react",
      attributes: {
        "data-framework": "react"
      }
    },
    {
      label: <div className="framework-wrapper">
        <IconBrandAngular width="18" height="18" /> Angular
      </div> as any,
      value: "ng",
      attributes: {
        "data-framework": "ng"
      }
    },
    {
      label: <div className="framework-wrapper">
        <IconBrandVue width="18" height="18" /> Vue@2
      </div> as any,
      value: "vue2",
      attributes: {
        "data-framework": "vue"
      }
    },
    {
      label: <div className="framework-wrapper">
        <IconBrandVue width="18" height="18" /> Vue@3
      </div> as any,
      value: "vue3",
      attributes: {
        "data-framework": "vue"
      }
    },
    {
      label: <div className="framework-wrapper">
        <IconBrandSvelte width="18" height="18" /> Svelte
      </div> as any,
      value: "svelte",
      attributes: {
        "data-framework": "svelte"
      }
    }
  ]}>
  <TabItem value="npm">
    <CodeBlock className="language-shell">npm install @egjs/view360@next</CodeBlock>
  </TabItem>
  <TabItem value="yarn">
    <CodeBlock className="language-shell">yarn add @egjs/view360@next</CodeBlock>
  </TabItem>
  <TabItem value="react">
    <CodeBlock className="language-shell">npm install @egjs/react-view360@next</CodeBlock>
  </TabItem>
  <TabItem value="ng">
    <CodeBlock className="language-shell">npm install @egjs/ngx-view360@next</CodeBlock>
  </TabItem>
  <TabItem value="vue2">
    <CodeBlock className="language-shell">npm install @egjs/vue-view360@next</CodeBlock>
  </TabItem>
  <TabItem value="vue3">
    <CodeBlock className="language-shell">npm install @egjs/vue3-view360@next</CodeBlock>
  </TabItem>
  <TabItem value="svelte">
    <CodeBlock className="language-shell">npm install @egjs/svelte-view360@next</CodeBlock>
  </TabItem>
</Tabs>
