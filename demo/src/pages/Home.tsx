import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import styles from "./home.module.css";

class Home extends React.Component {
  public render() {
    return (<Layout>
      <div className="container pb-6">
        <section className="py-4">
          <div className={clsx(styles.packageName, "is-size-1", "has-text-centered", "mb-4")}>View360</div>
          <div className={clsx(styles.badges, "mb-2")}>
            <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@egjs/view360?logo=npm"></img>
            <img alt="License" src="https://img.shields.io/github/license/naver/egjs-view360" />
            <img alt="Typescript" src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript" />
            <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/naver/egjs-view360?style=social" />
          </div>
          <div className="subtitle has-text-centered">360 integrated viewing solution from inside-out view to outside-in view. It provides user-friendly service by rotating 360 degrees through various user interaction such as motion sensor and touch.</div>
          <div className={styles.btnsWrapper}>
            <Link
              className="button mr-2"
              to="/docs">
                🚀 Get Started
            </Link>
          </div>
        </section>
      </div>
    </Layout>);
  }
}

export default Home;
