import React from "react";
import styles from "./InterviewerListItem.module.scss";

export default function InterviewerListItem({
  name,
  avatar,
  selected,
  setInterviewer,
}) {
  const itemSelected = selected ? "interviewers__item--selected" : "";
  return (
    <li
      className={`${styles["interviewers__item"]} ${styles[itemSelected]}`}
      onClick={setInterviewer}
    >
      <img
        className={styles["interviewers__item-image"]}
        src={avatar}
        alt={name}
      />
      {selected && <span>{name}</span>}
    </li>
  );
}
