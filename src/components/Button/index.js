import React from "react";
import style from "./style.module.css";

const Button = function ({ text, ...props }) {
  return (
    <button className={style.button} {...props}>
      {text}
    </button>
  );
};

export const SmallButton = function ({ text, ...props }) {
  return (
    <button className={style.smallbutton} {...props}>
      {text}
    </button>
  );
};

export default Button;
