import React from "react";
import styles from "./InterviewerListItem.module.scss";
import classNames from "classnames";

export default function InterviewerListItem({
  name,
  avatar,
  selected,
  setInterviewer,
}) {
  const className = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
    <li className={styles[className]} onClick={setInterviewer}>
      <img className={styles["interviewers__item-image"]} src={avatar} alt={name} />
      {selected && <span>{name}</span>}
    </li>
  );
}
