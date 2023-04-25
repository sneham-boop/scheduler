import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import styles from "./styles.module.scss";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setStudent("");
    setError("");
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    const valid = validate();
    if (valid) setError("");
  };

  const validate = () => {
    const spacesEntered = student.trim();

    if (student === "" || spacesEntered === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    props.onSave(student, interviewer);
    return true;
  };

  return (
    <main
      className={`${styles["appointment__card"]} ${styles["appointment__card--create"]}`}
    >
      <section className={styles["appointment__card-left"]}>
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className={`${styles["appointment__create-input"]} ${styles["text--semi-bold"]}`}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className={styles["appointment__validation"]}>{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className={styles["appointment__card-right"]}>
        <section className={styles["appointment__actions"]}>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
