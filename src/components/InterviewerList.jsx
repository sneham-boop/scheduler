import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList({ interviewers, value, onChange}) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((i)=>{
          return <InterviewerListItem key={i.id} setInterviewer={()=>onChange(i.id)} selected={i.id === value} {...i}/>
        })}
      </ul>
    </section>
  );
}
