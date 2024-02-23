import React from "react";

export default function CheckBox(props) {
  return (
    <input
      className={props.classname}
      type={props.type}
      id={props.id}
      onChange={props.onchange}
      checked={props.checked}
    />
  );
}
