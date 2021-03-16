import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames';


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  function formatSpots() {
    if (props.spots > 1) {
      return props.spots + ' spots remaining';
    } else if (props.spots === 1) {
      return props.spots + ' spot remaining';
    }
    return 'no spots remaining'
  }


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2> 
      <h3 >{formatSpots()}  </h3>
    </li>
  );
}