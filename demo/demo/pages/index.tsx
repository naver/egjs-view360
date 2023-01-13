import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import data from "../data";
import styles from "./index.module.css";

export default function Page(): JSX.Element {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <Layout title="Demo">
      <main className="container margin-vert--lg">
        <div className={styles.grid}>
          {data.map((item, idx) => (
            <div className="card shadow--md" key={item.id}>
              <div className="card__image">
                <div className={styles.thumbWrapper}>
                  <img className={styles.thumb} src={item.thumb ? withBaseUrl(`/thumb/${item.thumb}`) : withBaseUrl("/thumb/placeholder.png")} />
                </div>
              </div>
              <div className="card__body">
                <div className={styles.title}>
                  <Link to={`/demo/${item.id}`}>{item.title}</Link>
                </div>
                <div className={styles.desc}>
                  <span>{item.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
