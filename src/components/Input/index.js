import React from "react";
import style from "./style.module.css";

const Input = function ({ className = "", ...props }) {
  className = style.input + " " + className;
  return <input type="text" className={className} {...props} />;
};

export default Input;
