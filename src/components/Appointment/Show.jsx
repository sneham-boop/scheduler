import React from "react";
import styles from "./styles.module.scss";

export default function Show({ student, interviewer, onEdit, onDelete }) {
  // console.log("Inshow",interviewer);
  return (
    <main
      className={`${styles["appointment__card"]} ${styles["appointment__card--show"]}`}
    >
      <section className={styles["appointment__card-left"]}>
        <h2 className={styles["text--regular"]}>{student}</h2>
        <section className={styles["interviewer"]}>
          <h4 className={styles["text--light"]}>Interviewer</h4>
          <h3 className={styles["text--regular"]}>{interviewer.name}</h3>
        </section>
      </section>
      <section className={styles["appointment__card-right"]}>
        <section className={styles["appointment__actions"]}>
          <img
            className={styles["appointment__actions-button"]}
            src="images/edit.png"
            alt="Edit"
            onClick={onEdit}
          />
          <img
            className={styles["appointment__actions-button"]}
            src="images/trash.png"
            alt="Delete"
            onClick={onDelete}
          />
        </section>
      </section>
    </main>
  );
}
