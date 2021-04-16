import React from "react";
import style from "./style.module.css";

const Input = function ({ placeholder }) {
  return (
    <input type="text" className={style.input} placeholder={placeholder} />
  );
};

export default Input;
