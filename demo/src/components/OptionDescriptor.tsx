import clsx from "clsx";
import React from "react";
import styles from "./option-descriptor.module.css";

export default ({ type, defaultVal, added }) => (
  <div className={styles.container}>
    { type && (
      <div className={styles.tags}>
        <span className={clsx(styles.tag, styles.dark)}>Type</span>
        <span className={clsx(styles.tag, styles.info)}>{ type }</span>
      </div>
    ) }
    { defaultVal && (
      <div className={styles.tags}>
        <span className={clsx(styles.tag, styles.dark)}>Default</span>
        <span className={clsx(styles.tag, styles.warning)}>{ defaultVal }</span>
      </div>
    ) }
    { added && (
      <div className={styles.tags}>
        <span className={clsx(styles.tag, styles.dark)}>Added in</span>
        <a className={styles.link} href={`https://github.com/naver/egjs-view360/releases/tag/${added}`} target="_blank" rel="noopener noreferrer">
          <span className={clsx(styles.tag, styles.success)}>v{ added }</span>
        </a>
      </div>
    ) }
  </div>
);
