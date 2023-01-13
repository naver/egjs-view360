import clsx from "clsx";
import React from "react";
import styles from "./features.module.css";

export default ({
  title,
  subtitle,
  image,
  items = [],
  reversed = false
}) => {
  return <div className={clsx({
    [styles.feature]: true,
    [styles.reversed]: reversed
  })}>
    <div className={styles.desc}>
      <div className={styles.title}>{ title }</div>
      <div className={styles.subtitle}>{ subtitle }</div>
      <ul>
        {items.map((item, idx) => (<li key={idx}>{ item }</li>))}
      </ul>
    </div>
    <div className={styles.image}>{ image }</div>
  </div>
}
