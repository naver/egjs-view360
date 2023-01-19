import React, { useMemo } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";
import View360 from "../View360";
import styles from "./main.module.css";

import {
  IconView360,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandAngular,
  IconBrandVue,
  IconBrandSvelte
} from "@tabler/icons";

const items = [
  {
    src: "https://i.imgur.com/Z0yjE1j.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/rPObANb.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/BpRbzL4.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/tq9T7Ei.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/mFeCIYu.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/Lj9ggAi.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/I0l4tGE.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/FFN9rOi.jpg",
    license: "dq11"
  },
  {
    src: "https://i.imgur.com/tZr9R7x.jpg",
    license: "witness"
  },
  {
    src: "https://i.imgur.com/yr3VlX5.jpg",
    license: "witness"
  },
  {
    src: "https://i.imgur.com/XtOPvAE.jpg",
    license: "witness"
  },
  {
    src: "https://i.imgur.com/rBqA88I.jpg",
    license: "witness"
  },
  {
    src: "https://i.imgur.com/GM3JG6v.jpg",
    license: "witness"
  },
  {
    src: "https://i.imgur.com/Ma9cYKU.jpg",
    license: "witness"
  },
  {
    src: "https://i.imgur.com/pwDsA3E.jpg",
    license: "battlefieldV"
  },
  {
    src: "https://i.imgur.com/EuaMSrk.jpg",
    license: "battlefieldV"
  },
  {
    src: "https://i.imgur.com/trjoz25.jpg",
    license: "battlefieldV"
  },
  {
    src: "https://i.imgur.com/xk3c3ZD.jpg",
    license: "qube2"
  },
  {
    src: "https://i.imgur.com/oHRPfv2.jpg",
    license: "qube2"
  },
  {
    src: "https://i.imgur.com/jg0YeAB.jpg",
    license: "drg"
  },
  {
    src: "https://i.imgur.com/rafUJ5h.jpg",
    license: "for_honor"
  },
  {
    src: "https://i.imgur.com/DO3fzUw.jpg",
    license: "for_honor"
  },
  {
    src: "https://i.imgur.com/8cOGi4F.jpg",
    license: "for_honor"
  },
  {
    src: "https://i.imgur.com/Pm4XO73.jpg",
    license: "for_honor"
  }
];

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
        <img alt="npm" src="https://img.shields.io/npm/v/@egjs/view360/next?logo=npm"></img>
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
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/view360@next"}</CodeBlock>
      </TabItem>
      <TabItem value="react">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/react-view360@next"}</CodeBlock>
      </TabItem>
      <TabItem value="ng">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/ngx-view360@next"}</CodeBlock>
      </TabItem>
      <TabItem value="vue2">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/vue-view360@next"}</CodeBlock>
      </TabItem>
      <TabItem value="vue3">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/vue3-view360@next"}</CodeBlock>
      </TabItem>
      <TabItem value="svelte">
        <CodeBlock className={clsx(styles.max400, "language-shell")}>{"npm install @egjs/svelte-view360@next"}</CodeBlock>
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
