import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form({
  student,
  interviewers,
  interviewer,
  onSave,
  onCancel,
}) {
  // const [student, setStudent] = useState("");
  // const [interviewer, setInterviewer] = useState(0);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
          />
        </form>
        <InterviewerList
        interviewers={interviewers}
        value={interviewer}
        // onChange = {onSave}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
