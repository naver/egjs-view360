import clsx from "clsx";
import React from "react";
import styles from "./option-descriptor.module.css";

export default ({ type, defaultVal }) => (
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
  </div>
);
