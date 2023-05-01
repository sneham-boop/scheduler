import React from "react";
import styles from "./styles.module.scss";
import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({
  weight: ["900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Show({ student, interviewer, onEdit, onDelete }) {
  return (
    <main
      className={`${styles["appointment__card"]} ${styles["appointment__card--show"]}`}
    >
      <section className={styles["appointment__card-left"]}>
        <h2 className={styles["text--regular"]}>{student}</h2>
        <section className={styles["interviewer"]}>
          <h4 className={`${noto.className} ${styles["text--light"]}`}>INTERVIEWER</h4>
          <h3 className={styles["text--regular"]}>{interviewer.name}</h3>
        </section>
      </section>
      <section className={styles["appointment__card-right"]}>
        <section className={styles["appointment__actions"]}>
          <img
            className={styles["appointment__actions-button"]}
            src="images/editButton.svg"
            alt="Edit"
            onClick={onEdit}
          />
          <img
            className={styles["appointment__actions-button"]}
            src="images/deleteButton.svg"
            alt="Delete"
            onClick={onDelete}
          />
        </section>
      </section>
    </main>
  );
}
