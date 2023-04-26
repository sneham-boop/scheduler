import React from "react";
import DayListItem from "./DayListItem";
import useApplicationData from "@component/hooks/useApplicationData";

export default function DayList({ days, value, onChange }) {
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const { getEmptySpots } = useApplicationData();
  const showDays = () => {
    return dayOrder.map((dayName) => {
      let day = days.find((d) => d.name === dayName);
      return (
        <DayListItem
          key={day._id}
          id={day._id}
          selected={day.name === value}
          setDay={onChange}
          spots={getEmptySpots(day._id)}
          {...day}
        />
      );
    });
  };

  return (
    <ul>
      {
        days.length !== 0 && showDays()
        // days.map((d) => {
        //   return (
        //     <DayListItem
        //       key={d._id}
        //       selected={d.name === value}
        //       setDay={onChange}
        //       {...d}
        //     />
        //   );
        // })
      }
    </ul>
  );
}
