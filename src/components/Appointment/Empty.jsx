import React from "react";
import styles from "./styles.module.scss";

export default function Empty({ onAdd }) {
  return (
    <main className={styles["appointment__add"]}>
      <img
        className={styles["appointment__add-button"]}
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
        data-testid="add"
      />
    </main>
  );
}
