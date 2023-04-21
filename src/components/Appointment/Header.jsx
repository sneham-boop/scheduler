import React from "react";
import styles from "./styles.module.scss";

export default function Header({ time }) {
  return (
    <header className={styles["appointment__time"]}>
      <h4 className={styles["text--semi-bold"]}>{time}</h4>
      <hr className={styles["appointment__separator"]} />
    </header>
  );
}
