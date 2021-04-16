import React from "react";
import style from "./style.module.css";

const Input = function (props) {
  return <input type="text" className={style.input} {...props} />;
};

export default Input;
