import React from "react";
import styles from "./DayListItem.module.scss";
import classNames from "classnames";

export default function DayListItem({ name, spots, setDay, selected }) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = () => {
    return spots === 0
      ? "no spots remaining"
      : spots === 1
      ? "1 spot remaining"
      : `${spots} spots remaining`;
  };

  return (
    <li
      className={styles[dayClass]}
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
