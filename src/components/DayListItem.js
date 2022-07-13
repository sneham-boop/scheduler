import React from "react";
import "components/DayListItem.scss";
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
      className={dayClass}
      onClick={() => {
        setDay(name);
      }}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
