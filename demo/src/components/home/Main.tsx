import React, { useMemo } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";
import View360 from "../View360";
import items from "./main-pano-items";
import styles from "./main.module.css";

import {
  IconView360,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandAngular,
  IconBrandVue,
  IconBrandSvelte
} from "@tabler/icons";

export default React.memo(() => {
  const item = useMemo(() => {
    return items[Math.floor(Math.random() * items.length)];
  }, []);

  return <section className={styles.mainHero}>
    <View360
      ratio={null}
      className={clsx(styles.heroViewer)}
      projectionOptions={{
        src: item.src
      }}
      autoplay
      license={item.license}
    />
    <div className={styles.packageName}><IconView360 width="60" height="60" />View360</div>
    <div className={styles.packageNameSub}>360° panorama image / video viewer built with Typescript</div>
    <div className={styles.badges}>
      <a href="https://www.npmjs.com/package/@egjs/view360" target="_blank" rel="noopener noreferrer">
        <img alt="npm" src="https://img.shields.io/npm/v/@egjs/view360?logo=npm"></img>
      </a>
      <a href="https://www.npmjs.com/package/@egjs/view360" target="_blank" rel="noopener noreferrer">
        <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@egjs/view360?label=%F0%9F%92%BE%20minzipped"></img>
      </a>
      <a href="https://github.com/naver/egjs-view360/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
        <img alt="License" src="https://img.shields.io/github/license/naver/egjs-view360?label=%F0%9F%93%9C%20license" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
        <img alt="Typescript" src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript" />
      </a>
      <a href="https://github.com/naver/egjs-view360/" target="_blank" rel="noopener noreferrer">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/naver/egjs-view360?style=social" />
      </a>
    </div>
    <Tabs
      groupId="framework"
      defaultValue="js"
      lazy={true}
      className={styles.mainTabs}
      values={[
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
      <TabItem value="js">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/view360"}</CodeBlock>
      </TabItem>
      <TabItem value="react">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/react-view360"}</CodeBlock>
      </TabItem>
      <TabItem value="ng">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/ngx-view360"}</CodeBlock>
      </TabItem>
      <TabItem value="vue2">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/vue-view360"}</CodeBlock>
      </TabItem>
      <TabItem value="vue3">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/vue3-view360"}</CodeBlock>
      </TabItem>
      <TabItem value="svelte">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/svelte-view360"}</CodeBlock>
      </TabItem>
    </Tabs>
    <div className={styles.btnsWrapper}>
      <Link
        className="button button--outline button--primary"
        to="/docs">
          🚀 Get Started
      </Link>
    </div>
  </section>
})
