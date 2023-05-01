import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import styles from "./InterviewerList.module.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  return (
    <section className={styles.interviewers}>
      <h4
        className={`${styles["interviewers__header"]} ${styles["text--light"]}`}
      >
        Interviewer
      </h4>
      <ul className={styles["interviewers__list"]}>
        {interviewers &&
          interviewers.map((interviewer) => {
            return (
              <InterviewerListItem
                key={interviewer._id}
                setInterviewer={() => onChange(interviewer._id)}
                selected={interviewer._id === value}
                {...interviewer}
              />
            );
          })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
