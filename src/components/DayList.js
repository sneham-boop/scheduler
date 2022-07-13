import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, setDay, day }) {
  return (
    <ul>
      {days.map((d) => {
        return <DayListItem key={d.id} selected={(d.name === day)} setDay={setDay} {...d} />;
      })}
    </ul>
  );
}
