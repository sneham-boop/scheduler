import React from "react";
import styles from "./styles.module.scss";

export default function Error({ message, onClose }) {
  return (
    <main
      className={`${styles["appointment__card"]} ${styles["appointment__card--error"]}`}
    >
      <section className={styles["appointment__error-message"]}>
        <h1 className={styles["text--semi-bold"]}>Error</h1>
        <h3 className={styles["text--light"]}>{message}</h3>
      </section>
      <img
        className={styles["appointment__error-close"]}
        src="images/close.png"
        alt="Close"
        onClick={onClose}
      />
    </main>
  );
}
