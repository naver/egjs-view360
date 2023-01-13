import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

import VanillaCode from "./code/VanillaCode";
import ReactCode from "./code/ReactCode";
import NgxCode from "./code/NgxCode";
import VueCode from "./code/VueCode";
import SvelteCode from "./code/SvelteCode";
import ProjectionData from "./code/ProjectionData";
import OptionSerializer from "./code/OptionSerializer";
import { PROJECTION_NAME } from "./const";

import {
  IconBraces,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandAngular,
  IconBrandVue,
  IconBrandSvelte
} from "@tabler/icons";

export default ({ options = {}, projectionType, projectionOptions }) => {
  options["projection"] = new ProjectionData(PROJECTION_NAME[projectionType], projectionOptions);

  const serializer = new OptionSerializer();

  return <div>
    <Tabs
      groupId="options"
      defaultValue="json"
      lazy={true}
      values={[
        {
          label: <div className="framework-wrapper">
            <IconBraces width="18" height="18" /> JSON
          </div> as any,
          value: "json"
        },
        {
          label: <div className="framework-wrapper">
            <IconBrandJavascript width="18" height="18" /> Javascript
          </div> as any,
          value: "js",
          attributes: {
            "data-framework": "js"
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
      <TabItem value="json">
        <CodeBlock className="language-json">{ serializer.serialize(options, 4) }</CodeBlock>
      </TabItem>
      <TabItem value="js">
        <VanillaCode options={options} serializer={serializer} />
      </TabItem>
      <TabItem value="react">
        <ReactCode options={options} serializer={serializer} />
      </TabItem>
      <TabItem value="ng">
        <NgxCode options={options} serializer={serializer} />
      </TabItem>
      <TabItem value="vue2">
        <VueCode vue={"vue"} options={options} serializer={serializer} />
      </TabItem>
      <TabItem value="vue3">
        <VueCode vue={"vue3"} options={options} serializer={serializer} />
      </TabItem>
      <TabItem value="svelte">
        <SvelteCode options={options} serializer={serializer} />
      </TabItem>
    </Tabs>
  </div>;
};
