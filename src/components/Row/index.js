import React from "react";
import style from "./style.module.css";

const Row = function ({ title, value, secondary }) {
  return (
    <div className={style.row}>
      <p className={secondary ? style.key : ""}>{title}</p>
      <p className={secondary ? style.value : ""}>{value}</p>
    </div>
  );
};

export const BoldRow = function ({ title, value }) {
  return (
    <div className={style.row}>
      <p>{title}</p>
      <p className={style.bold}>{value}</p>
    </div>
  );
};

export default Row;
