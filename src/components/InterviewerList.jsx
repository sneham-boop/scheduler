import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList({ interviewers, value, onChange }) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers && interviewers.map((interviewer) => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              setInterviewer={() => onChange(interviewer.id)}
              selected={interviewer.id === value}
              {...interviewer}
            />
          );
        })}
      </ul>
    </section>
  );
}
