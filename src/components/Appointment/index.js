import React from "react";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// Modes for each appointment
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log(error);
      });
  };

  const deleteInterview = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
        console.log(error);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      {props.time && <Header time={props.time} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          interviewers={interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={() => back()}
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting your interview"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete this interview?"}
          onCancel={() => back()}
          onConfirm={() => deleteInterview()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={() => back()} />
      )}
    </article>
  );
}
