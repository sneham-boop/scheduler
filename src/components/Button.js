import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  const buttonClass = classNames("button", {'button--confirm': props.confirm}, {'button--danger': props.danger});

//   if (props.confirm) {
//     buttonClass += " button--confirm";
//   }

//   if (props.danger) {
//     buttonClass += " button--danger";
//   }
  return (
    <button
      onClick={props.onClick}
      className={buttonClass}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
