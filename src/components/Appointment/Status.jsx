import React from "react";
import styles from "./styles.module.scss";

export default function Status({ message }) {
  return (
    <main
      className={`${styles["appointment__card"]} ${styles["appointment__card--status"]}`}
    >
      <img
        className={styles["appointment__status-image"]}
        src="images/status.png"
        alt="Loading"
      />
      <h1 className={styles["text--semi-bold"]}>{message}</h1>
    </main>
  );
}
