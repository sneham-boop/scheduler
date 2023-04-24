import React from "react";
import styles from "./Button.module.scss";

export default function Button(props) {
  const danger = props.danger ? "button--danger" : "";
  const confirm = props.confirm ? "button--confirm" : "";

  return (
    <button
      onClick={props.onClick}
      className={`${styles.button} ${styles[danger]} ${styles[confirm]}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
