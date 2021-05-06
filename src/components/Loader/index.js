import React from "react";
import style from "./style.module.css";

const Loader = function ({ loading }) {
  return loading ? (
    <div className={loading ? style.loader : style.reverse}></div>
  ) : null;
};

export default Loader;
