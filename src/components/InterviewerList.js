import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList({ interviewers, interviewer, setInterviewer}) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((i)=>{
          return <InterviewerListItem key={i.id} setInterviewer={setInterviewer} selected={i.id === interviewer} {...i}/>
        })}
      </ul>
    </section>
  );
}
