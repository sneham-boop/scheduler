import React from "react";
import Button from "../Button";
import styles from "./styles.module.scss";

export default function Confirm({ message, onConfirm, onCancel }) {
  return (
    <main
      className={`${styles["appointment__card"]} ${styles["appointment__card--confirm"]}`}
    >
      <h1 className={styles["text--semi-bold"]}>{message}</h1>
      <section className={styles["appointment__actions"]}>
        <Button danger onClick={onCancel}>
          Cancel
        </Button>
        <Button danger onClick={onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
