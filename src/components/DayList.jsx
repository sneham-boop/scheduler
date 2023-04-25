import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {
  return (
    <ul>
      {days.map((d) => {
        return (
          <DayListItem
            key={d._id}
            selected={d.name === value}
            setDay={onChange}
            {...d}
          />
        );
      })}
    </ul>
  );
}
