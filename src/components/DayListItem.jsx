import React from "react";
import styles from "./DayListItem.module.scss";

export default function DayListItem({ name, spots, setDay, selected }) {

  const daySelected = selected ? "day-list__item--selected" : "";
  const dayFull = spots === 0 ? "day-list__item--full" : "";

  const formatSpots = () => {
    return spots === 0
      ? "no spots remaining"
      : spots === 1
      ? "1 spot remaining"
      : `${spots} spots remaining`;
  };

  return (
    <li
      className={`${styles["day-list__item"]} ${styles[daySelected]} ${styles[dayFull]}`}
      onClick={() => {
        setDay(name);
      }}
      data-testid="day"
    >
      <h2 className={styles["text--regular"]}>{name}</h2>
      <h3 className={styles["text--light"]}>{formatSpots()}</h3>
    </li>
  );
}
