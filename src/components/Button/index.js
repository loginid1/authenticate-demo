import React from "react";
import style from "./style.module.css";

const Button = function ({ text }) {
  return <button className={style.button}>{text}</button>;
};

export default Button;
