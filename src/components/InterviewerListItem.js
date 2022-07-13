import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem({
  id,
  name,
  avatar,
  selected,
  setInterviewer,
}) {
  const className = classNames("interviewers__item", {"interviewers__item--selected" : selected});
  console.log(className)
  return (
    <li className={className}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
        onClick={()=>{setInterviewer(id)}}
      />
      {selected && <span>{name}</span>}
    </li>
  );
}
