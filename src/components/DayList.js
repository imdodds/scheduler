import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({ days, value, onChange }) {
  
  const daylist = days.map(({ id, name, spots }) => {

    return (
        <DayListItem
          key={id}
          name={name}
          spots={spots}
          selected={name === value}
          setDay={onChange}
        />
      );
    });

  return (
    <ul>
      {daylist}
    </ul>
  );

}
  