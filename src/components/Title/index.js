import React from "react";
import style from "./style.module.css";

const Title = function ({ children }) {
  return <h1 className={style.title}>{children}</h1>;
};

export default Title;
