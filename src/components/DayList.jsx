import React from "react";
import DayListItem from "./DayListItem";
import useApplicationData from "@component/hooks/useApplicationData";

export default function DayList({ days, value, onChange }) {
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const showDays = () => {
    return dayOrder.map((dayName) => {
      let day = days.find((d) => d.name === dayName);
      return (
        <DayListItem
          key={day._id}
          id={day._id}
          selected={day.name === value}
          setDay={onChange}
          spots={day.spots}
          {...day}
        />
      );
    });
  };

  return <ul>{days.length !== 0 && showDays()}</ul>;
}
